<?php
/**
 * Class CtfTwitterCard
 *
 * Creates Twitter Card data to be stored in the WordPress database and
 * to be returned to the browser to display them
 */

if ( ! defined( 'ABSPATH' ) ) {
    die( '-1' );
}

class CtfTwitterCard
{
    /**
     * @var array
     */
    private $twitter_card_data = array();

    /**
     * @var string
     */
    private $url;

	private $url_key;

    /**
     * @var array
     */
    private $existing_twitter_cards = array();

    /**
     * @var array
     */
    private $twitter_card_meta = array();

    /**
     * @var array
     */
    private $open_graph_meta = array();

    /**
     * CtfTwitterCard constructor.
     *
     * @param $url string                       URL to search for twitter card data
     * @param $existing_twitter_cards array     existing twitter cards from the database
     */
    public function __construct( $url, $existing_twitter_cards )
    {
        $this->url = (string)$url;
        $this->existing_twitter_cards = $existing_twitter_cards;
	    $this->url_key = preg_replace('~[^a-zA-Z0-9]+~', '', $url);
    }

    /**
     * the url associated with this twitter card
     *
     * @return string   url
     */
    public function getUrl()
    {
        return $this->url;
    }

    public function getUrlKey()
    {
	    return $this->url_key;
    }

    /**
     * compares the url used to search for twitter card data with currently
     * available data saved to the database to see if a new card needs to be made
     *
     * @return bool whether or not data exists for this url
     */
    public function hasExistingData()
    {
        if ( isset( $this->existing_twitter_cards[$this->url_key] ) ) {
            return true;
        }
        
        return false;
    }

    /**
     * retrieves the data saved for this url
     *
     * @return array    data associated with this url from the database
     */
    public function getExistingData()
    {
        return $this->existing_twitter_cards[$this->url_key];
    }

	private function get_meta_tags_curl( $url )
	{
		$ch = curl_init();

		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false ); // must be false to connect without signed certificate
		curl_setopt( $ch, CURLOPT_ENCODING, '' );
		curl_setopt( $ch, CURLOPT_HEADER, 1);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1 );
		curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
		curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie.txt');

		$html = curl_exec( $ch );

		curl_close( $ch );
		//parsing begins here:
		$doc = new DOMDocument();
		@$doc->loadHTML( $html );

		//get and display what you need:
		$metas = $doc->getElementsByTagName( 'meta' );

		$twitter_card_names = array(
			'twitter:card',
			'twitter:site',
			'twitter:site:id',
			'twitter:title',
			'twitter:description',
			'twitter:image',
			'twitter:image:src',
			'twitter:image:alt',
			'twitter:card',
			'twitter:player',
			'twitter:amplify:teaser_segments_stream',
			'twitter:image:src',
			'twitter:amplify:vmap',
			'twitter:amplify:media:ctfsrc',
			'og:title',
			'og:image',
			'og:description'
		);

		$twitter_card_meta = array();

		for ( $i = 0; $i < $metas->length; $i++ ) {
			$meta = $metas->item( $i );

			if ( in_array( $meta->getAttribute( 'name' ), $twitter_card_names, true ) ) {
				if ( $meta->getAttribute( 'content' ) !== '' ) {
					$twitter_card_meta[ $meta->getAttribute( 'name' ) ] = $meta->getAttribute( 'content' );
				} elseif( $meta->getAttribute( 'value' ) !== '' ) {
					$twitter_card_meta[ $meta->getAttribute( 'name' ) ] = $meta->getAttribute( 'content' );
				}
			} elseif ( in_array( $meta->getAttribute( 'property' ), $twitter_card_names, true ) ) {
				if ( $meta->getAttribute( 'content' ) !== '' ) {
					$twitter_card_meta[ $meta->getAttribute( 'property' ) ] = $meta->getAttribute( 'content' );
				} elseif( $meta->getAttribute( 'value' ) !== '' ) {
					$twitter_card_meta[ $meta->getAttribute( 'property' ) ] = $meta->getAttribute( 'content' );
				}
			}
		}

		return $twitter_card_meta;
	}
	public function encodeHelper( $string ) {
		return wp_strip_all_tags( str_replace( array( 'â','â', 'â', '“', '”', '’', '‘', 'â', 'Ã¼', 'â', 'â', 'Ã', 'Ã¤', 'Ã¶' ), array( '&#8220;', '&#8221;', '&#8221;', '&#8220;', '&#8221;', '&#8217;', '&#8216;', '&#8216;', '&#252;', '&#8220;', '&#8220;', '&#223;', '&#228;', '&#246;' ), $string ) );
	}
    /**
     * connects with an external url and saves relevant meta data
     *
     * @param $url string  url to get meta data from
     */
    public function setExternalTwitterCardMetaFromUrl( $url )
    {
        $options = get_option( 'ctf_options' );
	    $use_curl = isset( $options['curlcards'] ) ? $options['curlcards'] : true;
    	$values = array();

	    if ( $use_curl && is_callable( 'curl_init' ) ) {
		    $meta = $this->get_meta_tags_curl( $url );
	    } else {
		    $meta = @get_meta_tags( $url );
	    }

        if ( ! empty( $meta ) ) {
	        $values['twitter:card'] = isset( $meta['twitter:card'] ) ? sanitize_text_field( $meta['twitter:card'] ) : '';
	        $values['twitter:site'] = isset( $meta['twitter:site'] ) ? sanitize_text_field( $meta['twitter:site'] ) : '';
	        $values['twitter:site:id'] = isset( $meta['twitter:site:id'] ) ? sanitize_text_field( $meta['twitter:site:id'] ) : '';
	        $values['twitter:creator'] = isset( $meta['twitter:creator'] ) ? sanitize_text_field( $meta['twitter:creator'] ) : '';
	        $values['twitter:creator:id'] = isset( $meta['twitter:creator:id'] ) ? sanitize_text_field( $meta['twitter:creator:id'] ) : '';
	        $values['twitter:title'] = isset( $meta['twitter:title'] ) ? $this->encodeHelper( $meta['twitter:title'] ) : '';
	        $values['twitter:description'] = isset( $meta['twitter:description'] ) ? $this->encodeHelper( $meta['twitter:description'] ) : '';
	        $values['twitter:image'] = isset( $meta['twitter:image'] ) ? esc_url( $meta['twitter:image'] ) : '';
	        if ( $values['twitter:image'] === '' && isset( $meta['twitter:image:src'] ) ) {
		        $values['twitter:image'] = esc_url( $meta['twitter:image:src'] );
	        }
	        if ( $values['twitter:title'] === '' && isset( $meta['og:title'] ) ) {
	        	$values['twitter:title'] = $this->encodeHelper( $meta['og:title'] );
	        }
	        if ( $values['twitter:description'] === '' && isset( $meta['og:description'] ) ) {
		        $values['twitter:description'] = $this->encodeHelper( $meta['og:description'] );
	        }
	        if ( $values['twitter:image'] === '' && isset( $meta['og:image'] ) ) {
		        $values['twitter:image'] = $meta['og:image'];
	        }
	        $values['twitter:image:alt'] = isset( $meta['twitter:image:alt'] ) ? sanitize_text_field( $meta['twitter:image:alt'] ) : '';

	        $parsed_main = parse_url( $url );
	        if ( $values['twitter:image'] !== '' ) {
		        if ( strpos( $values['twitter:image'], 'http' ) === false ) {
		        	$start = ! empty( $parsed_main['scheme'] ) ? $parsed_main['scheme'] : 'http';
			        $host = ! empty( $parsed_main['host'] ) ? $parsed_main['host'] : '';
			        $values['twitter:image'] = $start .'://' . trailingslashit( $host ) . $values['twitter:image'];
		        }
	        }

            if ( $values['twitter:card'] === 'player' ) {
                $values['twitter:player'] = isset( $meta['twitter:player'] ) ? sanitize_text_field( $meta['twitter:player'] ) : '';
            }

	        if ( $values['twitter:card'] == '' && $values['twitter:description'] !== '' ) {
		        $values['twitter:card'] = 'summary';
	        }

            if ( $values['twitter:card'] === 'amplify' ) {
                $values['twitter:image:src'] = isset( $meta['twitter:image:src'] ) ? sanitize_text_field( $meta['twitter:image:src'] ) : '';
                $values['twitter:amplify:teaser_segments_stream'] = isset( $meta['twitter:amplify:teaser_segments_stream'] ) ? sanitize_text_field( $meta['twitter:amplify:teaser_segments_stream'] ) : '';
                $vmap_url = isset( $meta['twitter:amplify:vmap'] ) ? sanitize_text_field( $meta['twitter:amplify:vmap'] ) : '';
                $media_src = $this->getAmplifyCardVideoSource( $vmap_url );
                $values['twitter:amplify:media:ctfsrc'] = $media_src ? trim( $media_src ) : '';
            }
        }

        $this->twitter_card_meta = $values;
    }

    /**
     * checks to see if any critical data for twitter cards is missing after first request
     *
     * @return bool whether or not more data is needed
     */
    public function openGraphDataNeeded()
    {
        if ( ! empty( $this->twitter_card_meta['twitter:card'] ) ) {
            if ( empty( $this->twitter_card_meta['twitter:title'] ) || empty( $this->twitter_card_meta['twitter:site'] ) || empty( $this->twitter_card_meta['twitter:description'] ) || empty( $this->twitter_card_meta['twitter:image'] ) ) {
                return true;
            }
        }

        return false;
    }

    /**
     * connect to external website and retrieve other open graph info
     *
     * @param $url string url to get meta data from
     */
    public function setExternalOpenGraphMetaFromUrl( $url )
    {
        $values = array();

        require_once( CTF_URL . 'inc/CtfOpenGraph.php' );

        $graph = CtfOpenGraph::fetch( $url );

        $values['twitter:title'] = isset( $graph->title ) ? sanitize_text_field( $graph->title ) : '';
        $values['twitter:description'] = isset( $graph->description ) ? sanitize_text_field( $graph->description ) : '';
        $values['twitter:image'] = isset( $graph->image ) ? sanitize_text_field( $graph->image ) : '';

        $this->open_graph_meta = $values;
    }

    /**
     * connect to external website and retrieve other open graph info
     *
     * @param $url string url to get meta data from
     * @return $src url of media file
     */
    public function getAmplifyCardVideoSource( $url )
    {
        $xml_str = file_get_contents( $url );

        $p = xml_parser_create();
        xml_parse_into_struct( $p, $xml_str, $data, $index );
        xml_parser_free( $p );

        $src = ! empty( $data[6]["value"] ) ? $data[6]["value"] : false;

        return $src;
    }

    /**
     * parse out all relevant data to create the most complete set of Twitter Card data
     */
    public function setTwitterCardData()
    {
        $tc_data = array();
        $tc_meta = $this->twitter_card_meta;
        $og_meta = $this->open_graph_meta;

        foreach( $tc_meta as $key => $value ) {
            $tc_data[$key] = ! empty( $tc_meta[$key] ) ? $tc_meta[$key] : ( isset( $og_meta[$key] ) ? $og_meta[$key] : '' );
        }

        $this->twitter_card_data = $tc_data;
    }

    /**
     * return the complete twitter card
     *
     * @return array
     */
    public function getTwitterCardData()
    {
        return $this->twitter_card_data;
    }

}