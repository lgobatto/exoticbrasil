<?php

/**
 * Created by PhpStorm.
 * User: rehma
 * Date: 9/21/2017
 * Time: 4:10 PM
 */
class optinspin_Subscriber {

    function __construct() {
        add_action( 'init', array($this,'optinspin_register_email_subscriber') );
//        add_action( 'admin_menu', array($this,'optinspin_wheel_stats') );
    }

    function optinspin_register_email_subscriber() {
        $labels = array(
            'name'               => _x( 'Email Subscribers', 'post type general name', 'optinspin' ),
            'singular_name'      => _x( 'Email Subscriber', 'post type singular name', 'optinspin' ),
            'menu_name'          => _x( 'Email Subscribers', 'admin menu', 'optinspin' ),
            'name_admin_bar'     => _x( 'Email Subscriber', 'add new on admin bar', 'optinspin' ),
            'add_new'            => _x( 'Add New', 'Email Subscriber', 'optinspin' ),
            'add_new_item'       => __( 'Add New Email Subscriber', 'optinspin' ),
            'new_item'           => __( 'New Email Subscriber', 'optinspin' ),
            'edit_item'          => __( 'Edit Email Subscriber', 'optinspin' ),
            'view_item'          => __( 'View Email Subscriber', 'optinspin' ),
            'all_items'          => __( 'All Email Subscribers', 'optinspin' ),
            'search_items'       => __( 'Search Email Subscribers', 'optinspin' ),
            'parent_item_colon'  => __( 'Parent Email Subscribers:', 'optinspin' ),
            'not_found'          => __( 'No Email Subscribers found.', 'optinspin' ),
            'not_found_in_trash' => __( 'No Email Subscribers found in Trash.', 'optinspin' )
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __( 'Description.', 'optinspin' ),
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'email-subscribers' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title' )
        );

        register_post_type( 'email-subscribers', $args );
    }

    function optinspin_add_new_subscriber($name = '', $email = '') {
        // Create post object
        $subscriber = array(
            'post_title'    => wp_strip_all_tags( $name ),
            'post_type'    => 'email-subscribers',
            'post_status'    => 'publish',
        );

        $args = array(
            'meta_key'         => 'user_email',
            'meta_value'       => $email,
            'post_type'        => 'optin-statistics',
            'post_status'      => 'any',
        );
        $emails = get_posts( $args );
		
        $emails = count($emails);

        if( $emails == 0 ) {
            // Insert the post into the database
            $s_id = wp_insert_post( $subscriber );
            if( !empty( $s_id ) ) {
                update_post_meta($s_id, '_subscribe_email' ,$email);
                update_post_meta($s_id, '_subscribe_name' ,$name);

//                do_action('optinspin_save_email',$email,$name,$s_id);
                return true;
            }
        } else{
            return false;
        }

    }

    function optinspin_wheel_stats() {
        add_submenu_page( 'crb_carbon_fields_container_woo_the_wheel.php', 'Subscriber List', 'Subscriber List',
            'manage_options', 'edit.php?post_type=email-subscribers');
    }
}