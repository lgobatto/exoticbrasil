<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit();
}

//If the user is preserving the settings then don't delete them
$options = get_option( 'ctf_options' );
$ctf_preserve_settings = $options[ 'preserve_settings' ];

// allow the user to preserve their settings in case they are upgrading
if ( ! $ctf_preserve_settings ) {
    // clean up options from the database
    delete_option( 'ctf_options' );
	delete_option( 'ctf_configure' );
	delete_option( 'ctf_customize' );
	delete_option( 'ctf_style' );
	delete_option( 'ctf_twitter_cards' );

	delete_option( 'ctf_rating_notice' );

    // delete tweet cache in transients
    global $wpdb;
    $table_name = $wpdb->prefix . "options";
    $wpdb->query( "
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_ctf\_%')
        " );
    $wpdb->query( "
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_ctf\_%')
        " );

	//Delete all persistent caches (start with ctf_!)
	global $wpdb;
	$table_name = $wpdb->prefix . "options";
	$result = $wpdb->query("
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%ctf\_\!%')
        ");
	delete_option( 'ctf_cache_list' );

    // remove any scheduled cron jobs
    wp_clear_scheduled_hook( 'ctf_cron_job' );
}

