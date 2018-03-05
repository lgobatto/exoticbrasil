<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 25/01/17
 * Time: 15:04
 */
/* ---------------------------------------------------------------------------
 * Child Theme URI | DO NOT CHANGE
 * --------------------------------------------------------------------------- */
define( 'CHILD_THEME_URI', get_stylesheet_directory_uri() );

// White Label --------------------------------------------
define( 'WHITE_LABEL', false );

/* ---------------------------------------------------------------------------
 * Load Textdomain
 * --------------------------------------------------------------------------- */
add_action( 'after_setup_theme', 'mfnch_textdomain' );
function mfnch_textdomain() {
	load_child_theme_textdomain( 'betheme', get_stylesheet_directory() . '/languages' );
	load_child_theme_textdomain( 'mfn-opts', get_stylesheet_directory() . '/languages' );
	load_child_theme_textdomain( 'theme', get_stylesheet_directory() . '/languages' );
}

function kill_theme_wpse_188906( $themes ) {
	unset( $themes['betheme'] );

	return $themes;
}

add_filter( 'wp_prepare_themes_for_js', 'kill_theme_wpse_188906' );

require_once ROOT_PATH . '/vendor/autoload.php';

$includes = glob( sprintf( '%s/lib/*.php', dirname( __FILE__ ) ) );
foreach ( $includes as $include ) {
	if ( ! empty( $include ) && file_exists( $include ) ) {
		/** @noinspection PhpIncludeInspection */
		require_once $include;
	}
}
unset( $includes, $include );

$includes = glob( sprintf( '%s/theme/*.php', dirname( __FILE__ ) ) );
foreach ( $includes as $include ) {
	if ( ! empty( $include ) && file_exists( $include ) ) {
		/** @noinspection PhpIncludeInspection */
		require_once $include;
	}
}
unset( $includes, $include );

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

add_filter( 'acf/settings/google_api_key', function () {
	return 'AIzaSyAeq274bKf8x80RgHsMYgtyxtvKjZxWYTg';
} );