<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 25/01/17
 * Time: 16:49
 */

namespace LGobatto;


class Customizer {
	function __construct() {
		add_action( 'customize_register', [ $this, 'customize_register' ] );
		add_action( 'customize_preview_init', [ $this, 'customize_preview_js' ] );
	}

	function customize_register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport = 'postMessage';
	}

	function customize_preview_js() {
		wp_enqueue_script( 'sage/customizer', asset_path( 'scripts/customizer.js' ), [ 'customize-preview' ], null, true );
	}
}

new Customizer();