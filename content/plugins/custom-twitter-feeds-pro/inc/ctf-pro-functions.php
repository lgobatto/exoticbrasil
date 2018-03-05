<?php
require_once( CTF_URL . '/inc/widget.php' );

require_once( CTF_URL . '/inc/admin-pro-hooks.php' );

/**
* include the admin files only if in the admin area
*/
if ( is_admin() ) {
require_once( CTF_URL . '/inc/CtfAdmin.php' );

$admin = new CtfAdmin;
}

/**
 * Generates the Twitter feed wherever the shortcode is placed
 *
 * @param $atts array shortcode arguments
 * 
 * @return string
 */
function ctf_init( $atts ) {

    include_once( CTF_URL . '/inc/CtfFeed.php' );
    include_once( CTF_URL . '/inc/CtfFeedPro.php' );

    $twitter_feed = CtfFeedPro::init( $atts );
/*
    echo '<pre>';
    var_dump($twitter_feed);
    echo '</pre>';
*/
    // if there is an error, display the error html, otherwise the feed
    if ( ! $twitter_feed->tweet_set || $twitter_feed->missing_credentials || ! isset( $twitter_feed->tweet_set[0]['created_at'] ) ) {
        return $twitter_feed->getErrorHtml();
    } else {
    	if ( ! $twitter_feed->feed_options['persistentcache'] ) {
		    $twitter_feed->maybeCacheTweets();
	    }

        $feed_html = $twitter_feed->getFeedOpeningHtml();
        $feed_html .= $twitter_feed->getTweetSetHtml();
        $feed_html .= $twitter_feed->getFeedClosingHtml();

        return $feed_html;
    }
}
add_shortcode( 'custom-twitter-feed', 'ctf_init' );
add_shortcode( 'custom-twitter-feeds', 'ctf_init' );

/**
* Called via ajax to get more posts after the "load more" button is clicked
*/
function ctf_get_more_posts() {
    $shortcode_data = json_decode( str_replace( array( '\"', "\\'" ), array( '"', "'" ), sanitize_text_field( $_POST['shortcode_data'] ) ), true ); // necessary to unescape quotes
    $last_id_data = isset( $_POST['last_id_data'] ) ? sanitize_text_field( $_POST['last_id_data'] ) : '';
    $num_needed = isset( $_POST['num_needed'] ) ? (int)$_POST['num_needed'] : 0;
    $ids_to_remove = isset( $_POST['ids_to_remove'] ) ? $_POST['ids_to_remove'] : 0;
    $is_pagination = empty( $last_id_data ) ? 0 : 1;
    $persistent_index = isset( $_POST['persistent_index'] ) ? sanitize_text_field( $_POST['persistent_index'] ) : '';

    include_once( CTF_URL . '/inc/CtfFeed.php' );
    include_once( CTF_URL . '/inc/CtfFeedPro.php' );

    $twitter_feed = CtfFeedPro::init( $shortcode_data, $last_id_data, $num_needed, $ids_to_remove, $persistent_index );

	if ( ! $twitter_feed->feed_options['persistentcache'] ) {
		$twitter_feed->maybeCacheTweets();
	}

    echo $twitter_feed->getTweetSetHtml( $is_pagination );

    die();
}
add_action( 'wp_ajax_nopriv_ctf_get_more_posts', 'ctf_get_more_posts' );
add_action( 'wp_ajax_ctf_get_more_posts', 'ctf_get_more_posts' );

/**
 * the html output is controlled by the user selecting which portions of tweets to show
 *
 * @param $part string          part of the feed in the html
 * @param $feed_options array   options that contain what parts of the tweet to show
 * @return bool                 whether or not to show the tweet
 */
function ctf_show( $part, $feed_options ) {
    $tweet_excludes = isset( $feed_options['tweet_excludes'] ) ? $feed_options['tweet_excludes'] : '';
    $tweet_includes = isset( $feed_options['tweet_includes'] ) ? $feed_options['tweet_includes'] : '';

    // if part is in the array of excluded parts or not in the array of included parts, don't show
    if ( ! empty( $tweet_excludes ) ) {
        return ( in_array( $part, $tweet_excludes ) === false );
    } else {
        return ( in_array( $part, $tweet_includes ) === true );
    }
}

/**
 * this function returns the properly formatted date string based on user input
 *
 * @param $raw_date string      the date from the Twitter api
 * @param $feed_options array   options for the feed that contain date formatting settings
 * @param $utc_offset int       offset in seconds for the time display based on timezone
 * @return string               formatted date
 */
function ctf_get_formatted_date( $raw_date, $feed_options, $utc_offset ) {
    include_once( CTF_URL . '/inc/CtfDateTime.php' );
    $options = get_option( 'ctf_options' );
    $timezone = isset( $options['timezone'] ) ? $options['timezone'] : 'default';
    // use php DateTimeZone class to handle the date formatting and offsets
    $date_obj = new CtfDateTime( $raw_date, new DateTimeZone( "UTC" ) );

    if( $timezone != 'default' ) {
        $date_obj->setTimeZone( new DateTimeZone( $timezone ) );
        $utc_offset = $date_obj->getOffset();
    }

    $tz_offset_timestamp = $date_obj->getTimestamp() + $utc_offset;

    // use the custom date format if set, otherwise use from the selected defaults
    if ( ! empty( $feed_options['datecustom'] ) ){
        $date_str = date_i18n( $feed_options['datecustom'], $tz_offset_timestamp );
    } else {

        switch ( $feed_options['dateformat'] ) {

            case '2':
                $date_str = date_i18n( 'F j', $tz_offset_timestamp );
                break;
            case '3':
                $date_str = date_i18n( 'F j, Y', $tz_offset_timestamp );
                break;
            case '4':
                $date_str = date_i18n( 'm.d', $tz_offset_timestamp );
                break;
            case '5':
                $date_str = date_i18n( 'm.d.y', $tz_offset_timestamp );
                break;
            default:

                // default format is similar to Twitter
                $ctf_minute = ! empty( $feed_options['mtime'] ) ? $feed_options['mtime'] : 'm';
                $ctf_hour = ! empty( $feed_options['htime'] ) ? $feed_options['htime'] : 'h';
                $ctf_now_str = ! empty( $feed_options['nowtime'] ) ? $feed_options['nowtime'] : 'now';

                $now = time() + $utc_offset;

                $difference = $now - $tz_offset_timestamp;

                if ( $difference < 60 ) {
                    $date_str = $ctf_now_str;
                } elseif ( $difference < 60*60 ) {
                    $date_str = round( $difference/60 ) . $ctf_minute;
                } elseif ( $difference < 60*60*24 ) {
                    $date_str = round( $difference/3600 ) . $ctf_hour;
                } else  {
                    $one_year_from_date = new CtfDateTime( $raw_date, new DateTimeZone( "UTC" ) );
                    $one_year_from_date->modify('+1 year');
                    $one_year_from_date_timestamp = $one_year_from_date->getTimestamp();
                    if ( $now > $one_year_from_date_timestamp ) {
                        $date_str = date_i18n( 'j M Y', $tz_offset_timestamp );
                    } else {
                        $date_str = date_i18n( 'j M', $tz_offset_timestamp );
                    }
                }
                break;
        }

    }

    return $date_str;
}

/**
 * Called via ajax to retrieve twitter card data to be used in the feed
 */
function ctf_twitter_cards() {
    $urls = $_POST['ctf_urls'];
    $urls = array_map('esc_url', $urls);

    include_once( CTF_URL . '/inc/twitter-cards.php' );

    die();
}
add_action( 'wp_ajax_nopriv_ctf_twitter_cards', 'ctf_twitter_cards' );
add_action( 'wp_ajax_ctf_twitter_cards', 'ctf_twitter_cards' );

/**
 * Called via ajax to automatically save access token and access token secret
 * retrieved with the big blue button
 */
function ctf_auto_save_tokens() {
    if ( current_user_can( 'edit_posts' ) ) {
        wp_cache_delete ( 'alloptions', 'options' );

        $options = get_option( 'ctf_options', array() );

        $options['access_token'] = sanitize_text_field( $_POST['access_token'] );
        $options['access_token_secret'] = sanitize_text_field( $_POST['access_token_secret'] );

        update_option( 'ctf_options', $options );
        die();
    }
    die();
}
add_action( 'wp_ajax_ctf_auto_save_tokens', 'ctf_auto_save_tokens' );

/**
* manually clears the cached tweets in case of error or user preference
*
* @return mixed bool whether or not it was successful
*/

function ctf_clear_cache() {
    if ( current_user_can( 'edit_posts' ) ) {
        //Delete all transients
        global $wpdb;
        $table_name = $wpdb->prefix . "options";
        $result = $wpdb->query("
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_ctf\_%')
        ");
        $wpdb->query("
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_ctf\_%')
        ");
        return $result;
    } else {
        return false;
    }

    die();
}
add_action( 'ctf_cron_job', 'ctf_clear_cache' );
add_action( 'wp_ajax_ctf_clear_cache', 'ctf_clear_cache' );

/**
* manually clears the cached twitter cards in case of error or user preference
*
* @return mixed bool whether or not it was successful
*/
function ctf_clear_twitter_card_cache() {
    if ( current_user_can( 'edit_posts' ) ) {
        delete_option( 'ctf_twitter_cards' );
    } else {
        return false;
    }

    die('1');
}
add_action( 'wp_ajax_ctf_clear_twitter_card_cache', 'ctf_clear_twitter_card_cache' );

/**
 * manually clears the persistent cached tweets
 *
 * @return mixed bool whether or not it was successful
 */

function ctf_clear_persistent_cache() {
	if ( current_user_can( 'edit_posts' ) ) {
		//Delete all persistent caches (start with ctf_!)
		global $wpdb;
		$table_name = $wpdb->prefix . "options";
		$result = $wpdb->query("
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%ctf\_\!%')
        ");
		delete_option( 'ctf_cache_list' );
		return $result;
	} else {
		return false;
	}

	die();
}
add_action( 'wp_ajax_ctf_clear_persistent_cache', 'ctf_clear_persistent_cache' );

function ctf_retrieve_lists_by_owner() {
    if ( current_user_can( 'edit_posts' ) ) {

        $options = get_option( 'ctf_options' );
        $consumer_key = ! empty( $options['consumer_key'] ) && $options['have_own_tokens'] ? $options['consumer_key'] : 'FPYSYWIdyUIQ76Yz5hdYo5r7y';
        $consumer_secret = ! empty( $options['consumer_secret'] ) && $options['have_own_tokens'] ? $options['consumer_secret'] : 'GqPj9BPgJXjRKIGXCULJljocGPC62wN2eeMSnmZpVelWreFk9z';
        $request_settings = array(
            'consumer_key' => $consumer_key,
            'consumer_secret' => $consumer_secret,
            'access_token' => $options['access_token'],
            'access_token_secret' => $options['access_token_secret']
        );

        $request_method = 'auto';

        include_once( CTF_URL . '/inc/CtfOauthConnect.php' );
        include_once( CTF_URL . '/inc/CtfOauthConnectPro.php' );
        $twitter_api = new CtfOauthConnectPro( $request_settings, 'listsmeta' );
        $twitter_api->setUrlBase();
        $get_fields = array( 'screen_name' => sanitize_text_field( $_POST['screen_name'] ) );
        $twitter_api->setGetFields( $get_fields );
        $twitter_api->setRequestMethod( $request_method );

        $twitter_api->performRequest();
        $response = json_decode( $twitter_api->json , $assoc = true );
        if( isset( $response[0]['name'] ) ) {
            $lists = array();
            foreach( $response as $list ){
                $lists[] = array(
                    'name' => $list['name'],
                    'id' => $list['id_str']
                );
            }
            echo json_encode($lists);
        } else {
            echo '0';
        }
    }

    die();
}
add_action( 'wp_ajax_ctf_retrieve_lists_by_owner', 'ctf_retrieve_lists_by_owner' );

/**
* clear the cache and unschedule an cron jobs when deactivated
*/
function ctf_deactivate() {
    ctf_clear_cache();

    wp_clear_scheduled_hook( 'ctf_cron_job' );
}
register_deactivation_hook( __FILE__, 'ctf_deactivate' );

/**
* outputs the custom js from the "Customize" tab on the Settings page
*/
function ctf_custom_js() {
    $options = get_option( 'ctf_options' );
    $ctf_custom_js = isset( $options[ 'custom_js' ] ) ? $options[ 'custom_js' ] : '';

    if ( ! empty( $ctf_custom_js ) ) {
        ?>
        <!-- Custom Twitter Feeds JS -->
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                <?php echo 'window.ctf_custom_js = function(){'. "\r\n"; ?>
                <?php echo stripslashes( $ctf_custom_js ) . "\r\n"; ?>
                <?php echo '}'. "\r\n"; ?>
            });
        </script>
        <?php
    }
}
add_action( 'wp_footer', 'ctf_custom_js' );

/**
 * outputs the custom css from the "Customize" tab on the Settings page
 */
function ctf_custom_css() {
    $options = get_option( 'ctf_options' );
    $ctf_custom_css = isset( $options[ 'custom_css' ] ) ? $options[ 'custom_css' ] : '';

    //Show CSS if an admin (so can see Hide Tweet link), if including Custom CSS
    ( current_user_can( 'edit_posts' ) || !empty( $ctf_custom_css ) ) ? $ctf_show_css = true : $ctf_show_css = false;

    if ( $ctf_show_css ) {
        echo "<!-- Custom Twitter Feeds CSS -->" . "\r\n";
        echo "<style type='text/css'>" . "\r\n";
        if( !empty($ctf_custom_css) ) echo stripslashes( $ctf_custom_css ) . "\r\n";
        if( current_user_can( 'edit_posts' ) ) echo "#ctf_mod_link{ display: block; }" . "\r\n";
        echo "</style>" . "\r\n";
    }
}
add_action( 'wp_head', 'ctf_custom_css' );
