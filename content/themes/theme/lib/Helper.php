<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 25/01/17
 * Time: 18:46
 */

namespace LGobatto;


class Helper {
	static function theme_image( $name, $width = 'auto', $height = 'auto', $alt = '', $echo = true ) {
		self::print_image( self::relative_url( home_url( '/content/themes/silkrock/dist/images/' . $name ) ), $width, $height, $alt, $echo );
	}

	static function theme_image_url( $name, $echo = true ) {
		$url = self::relative_url( home_url( '/content/themes/silkrock/dist/images/' . $name ) );
		if ( $echo ) {
			print( $url );
		}

		return ( $url );

	}

	private function print_image( $url, $width = 'auto', $height = 'auto', $alt = '', $echo = true ) {
		$img = sprintf( '<img src="%s" width="%s" height="%s" alt="%s">', $url, $width, $height, $alt );
		if ( $echo ) {
			print( $img );
		}

		return $img;
	}

	private function relative_url( $input ) {
		if ( is_feed() ) {
			return $input;
		}

		$url = parse_url( $input );
		if ( ! isset( $url['host'] ) || ! isset( $url['path'] ) ) {
			return $input;
		}
		$site_url = parse_url( network_home_url() );  // falls back to home_url

		if ( ! isset( $url['scheme'] ) ) {
			$url['scheme'] = $site_url['scheme'];
		}
		$hosts_match   = $site_url['host'] === $url['host'];
		$schemes_match = $site_url['scheme'] === $url['scheme'];
		$ports_exist   = isset( $site_url['port'] ) && isset( $url['port'] );
		$ports_match   = ( $ports_exist ) ? $site_url['port'] === $url['port'] : true;

		if ( $hosts_match && $schemes_match && $ports_match ) {
			return wp_make_link_relative( $input );
		}

		return $input;
	}

	/**
	 * Compare URL against relative URL
	 */
	static function url_compare( $url, $rel ) {
		$url = trailingslashit( $url );
		$rel = trailingslashit( $rel );

		return ( ( strcasecmp( $url, $rel ) === 0 ) || self::relative_url( $url ) == $rel );
	}

	/**
	 * @param \WP_Term $val
	 *
	 * @return string
	 */
	public function return_term_slugs( $val ) {
		return $val->slug;
	}
}