<?php

/**
 * Created by PhpStorm.
 * User: rehma
 * Date: 9/13/2017
 * Time: 5:53 PM
 */

class optinspin_Wheel_Preview extends optinspin_Wheel{

    function __construct() {
        add_action('admin_footer',array($this,'optinspin_wheel_preview'));
        add_action( 'admin_enqueue_scripts', array($this,'load_custom_wp_admin_style') );
    }

    function load_custom_wp_admin_style() {
        wp_enqueue_style( 'optinspin-wheel-style', optinspin_PLUGIN_URL . 'assets/css/wheel-style.css' );
        wp_enqueue_style( 'optinspin-admin-style', optinspin_PLUGIN_URL . 'assets/css/admin-style.css' );
        wp_enqueue_script( 'optinspin-win-wheel-script', optinspin_PLUGIN_URL . 'assets/js/winwheel.js' );
        wp_enqueue_script( 'optinspin-tweenmax-script', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js' );
    }

    function optinspin_wheel_preview() {
        $this->optinspin_wheel_canvas();
        $this->optinspin_wheel_script();
    }
}