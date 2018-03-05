<div id="ctf-admin" class="wrap">
    <h1>Custom Twitter Feeds</h1>
    <?php
    // this controls which view is included based on the selected tab
    if ( ! isset ( $tab ) ) {
        $tab = isset( $_GET["tab"] ) ? $_GET["tab"] : '';
    }
    $active_tab = CtfAdmin::get_active_tab( $tab );
    ?>
    <?php ctf_expiration_notice(); ?>

    <!-- Display the tabs along with styling for the 'active' tab -->
    <h2 class="nav-tab-wrapper">
        <a href="admin.php?page=custom-twitter-feeds&tab=configure" class="nav-tab <?php if ( $active_tab == 'configure' ){ echo 'nav-tab-active'; } ?>"><?php _e( '1. Configure', 'ctf' ); ?></a>
        <a href="admin.php?page=custom-twitter-feeds&tab=customize" class="nav-tab <?php if ( $active_tab == 'customize' ){ echo 'nav-tab-active'; } ?>"><?php _e( '2. Customize', 'ctf' ); ?></a>
        <a href="admin.php?page=custom-twitter-feeds&tab=style" class="nav-tab <?php if ( $active_tab == 'style' ){ echo 'nav-tab-active'; } ?>"><?php _e( '3. Style', 'ctf' ); ?></a>
        <a href="admin.php?page=custom-twitter-feeds&tab=display" class="nav-tab <?php if ( $active_tab == 'display' ){ echo 'nav-tab-active'; } ?>"><?php _e( '4. Display Your Feed', 'ctf' ); ?></a>
        <a href="admin.php?page=custom-twitter-feeds&tab=support" class="nav-tab <?php if ( $active_tab == 'support' ){ echo 'nav-tab-active'; } ?>"><?php _e( 'Support', 'ctf' ); ?></a>
        <a href="admin.php?page=custom-twitter-feeds-license" class="nav-tab <?php if ( $active_tab == 'license' ){ echo 'nav-tab-active'; } ?>"><?php _e( 'License', 'ctf' ); ?></a>
    </h2>
    <?php

    function ctf_expiration_notice(){
        //If the user is re-checking the license key then use the API below to recheck it
        ( isset( $_GET['ctfchecklicense'] ) ) ? $ctf_check_license = true : $ctf_check_license = false;

        $ctf_license = trim( get_option( 'ctf_license_key' ) );

        //If there's no license key then don't do anything
        if( empty($ctf_license) || !isset($ctf_license) && !$ctf_check_license ) return;

        //Is there already license data in the db?
        if( get_option( 'ctf_license_data' ) && !$ctf_check_license ){
            //Yes
            //Get license data from the db and convert the object to an array
            $ctf_license_data = (array) get_option( 'ctf_license_data' );
        } else {
            //No
            // data to send in our API request
            $ctf_api_params = array(
                'edd_action'=> 'check_license',
                'license'   => $ctf_license,
                'item_name' => urlencode( CTF_PRODUCT_NAME ) // the name of our product in EDD
            );

            // Call the custom API.
            $ctf_response = wp_remote_get( add_query_arg( $ctf_api_params, CTF_STORE_URL ), array( 'timeout' => 60, 'sslverify' => false ) );

            // decode the license data
            $ctf_license_data = (array) json_decode( wp_remote_retrieve_body( $ctf_response ) );

            //Store license data in db
            update_option( 'ctf_license_data', $ctf_license_data );
        }

        //Number of days until license expires
        $ctf_date1 = isset( $ctf_license_data['expires'] ) ? $ctf_license_data['expires'] : $ctf_date1 = '2036-12-31 23:59:59'; //If expires param isn't set yet then set it to be a date to avoid PHP notice
        if( $ctf_date1 == 'lifetime' ) $ctf_date1 = '2036-12-31 23:59:59';
        $ctf_date2 = date('Y-m-d');
        $ctf_interval = round(abs(strtotime($ctf_date2)-strtotime($ctf_date1))/86400);

        //Is license expired?
        ( $ctf_interval == 0 || strtotime($ctf_date1) < strtotime($ctf_date2) ) ? $ctf_license_expired = true : $ctf_license_expired = false;

        //If expired date is returned as 1970 (or any other 20th century year) then it means that the correct expired date was not returned and so don't show the renewal notice
        if( $ctf_date1[0] == '1' ) $ctf_license_expired = false;

        //If there's no expired date then don't show the expired notification
        if( empty($ctf_date1) || !isset($ctf_date1) ) $ctf_license_expired = false;

        //Is license missing - ie. on very first check
        if( isset($ctf_license_data['error']) ){
            if( $ctf_license_data['error'] == 'missing' ) $ctf_license_expired = false;
        }

        //If license expires in less than 30 days and it isn't currently expired then show the expire countdown instead of the expiration notice
        if($ctf_interval < 30 && !$ctf_license_expired){
            $ctf_expire_countdown = true;
        } else {
            $ctf_expire_countdown = false;
        }

        //Is the license expired?
        if( ($ctf_license_expired || $ctf_expire_countdown) || $ctf_check_license ) {

            //If expire countdown then add the countdown class to the notice box
            if($ctf_expire_countdown){
                $ctf_expired_box_classes = "ctf-license-expired ctf-license-countdown";
                $ctf_expired_box_msg = "Hey ".$ctf_license_data["customer_name"].", your Custom Twitter Feeds Pro license key expires in " . $ctf_interval . " days.";
            } else {
                $ctf_expired_box_classes = "ctf-license-expired";
                $ctf_expired_box_msg = "Hey ".$ctf_license_data["customer_name"].", your Custom Twitter Feeds Pro license key has expired.";
            }

            //Create the re-check link using the existing query string in the URL
            $ctf_url = '?' . $_SERVER["QUERY_STRING"];
            //Determine the separator
            ( !empty($ctf_url) && $ctf_url != '' ) ? $separator = '&' : $separator = '';
            //Add the param to check license if it doesn't already exist in URL
            if( strpos($ctf_url, 'ctfchecklicense') === false ) $ctf_url .= $separator . "ctfchecklicense=true";

            //Create the notice message
            $ctf_expired_box_msg .= " Click <a href='https://smashballoon.com/checkout/?edd_license_key=".$ctf_license."&download_id=".CTF_PRODUCT_ID."' target='_blank'>here</a> to renew your license. <a href='javascript:void(0);' id='ctf-why-renew-show' onclick='ctfShowReasons()'>Why renew?</a><a href='javascript:void(0);' id='ctf-why-renew-hide' onclick='ctfHideReasons()' style='display: none;'>Hide text</a> <a href='".$ctf_url."' class='ctf-button'>Re-check License</a></p>
            <div id='ctf-why-renew' style='display: none;'>
                <h4>Customer Support</h4>
                <p>Without a valid license key you will no longer be able to receive updates or support for the Custom Twitter Feeds plugin. A renewed license key grants you access to our top-notch, quick and effective support for another full year.</p>

                <h4>Maintenance Upates</h4>
                <p>With both WordPress and the Twitter API being updated on a regular basis we stay on top of the latest changes and provide frequent updates to keep pace.</p>

                <h4>New Feature Updates</h4>
                <p>We're continually adding new features to the plugin, based on both customer suggestions and our own ideas for ways to make it better, more useful, more customizable, more robust and just more awesome! Renew your license to prevent from missing out on any of the new features added in the future.</p>
            </div>";

            if( $ctf_check_license && !$ctf_license_expired && !$ctf_expire_countdown ){
                $ctf_expired_box_classes = "ctf-license-expired ctf-license-valid";
                $ctf_expired_box_msg = "Thanks ".$ctf_license_data["customer_name"].", your Custom Twitter Feeds Pro license key is valid.";
            }

            _e("
        <div class='".$ctf_expired_box_classes."'>
            <p>".$ctf_expired_box_msg." 
        </div>
        <script type='text/javascript'>
        function ctfShowReasons() {
            document.getElementById('ctf-why-renew').style.display = 'block';
            document.getElementById('ctf-why-renew-show').style.display = 'none';
            document.getElementById('ctf-why-renew-hide').style.display = 'inline';
        }
        function ctfHideReasons() {
            document.getElementById('ctf-why-renew').style.display = 'none';
            document.getElementById('ctf-why-renew-show').style.display = 'inline';
            document.getElementById('ctf-why-renew-hide').style.display = 'none';
        }
        </script>
        ");
        }

    }

    if ( isset( $active_tab ) ) {
        if ( $active_tab === 'customize' ) {
            require_once CTF_URL . 'views/admin/customize.php';
        } elseif ( $active_tab === 'style' ) {
            require_once CTF_URL . 'views/admin/style.php';
        }  elseif ( $active_tab === 'configure' ) {
            require_once CTF_URL . 'views/admin/configure.php';
        } elseif ( $active_tab === 'display' ) {
            require_once CTF_URL .'views/admin/display.php';
        } elseif ( $active_tab === 'support' ) {
            require_once CTF_URL .'views/admin/support.php';
        } elseif ( $active_tab === 'license' ) {
            require_once CTF_URL .'views/admin/license.php';
        }
    }
    ?>

    <?php if( $active_tab !== 'license' ){ ?>
    <p><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <?php _e('Need help setting up the plugin? Check out our <a href="https://smashballoon.com/custom-twitter-feeds/docs/" target="_blank">setup directions</a>', 'custom-twitter-feeds'); ?></p>

    <div class="ctf-quick-start">
        <h3><i class="fa fa-rocket" aria-hidden="true"></i>&nbsp; <?php _e( 'Display your feed', 'custom-twitter-feeds'); ?></h3>
        <p><?php _e( "Copy and paste this shortcode directly into the page, post or widget where you'd like to display the feed:", "custom-twitter-feeds" ); ?>
        <input type="text" value="[custom-twitter-feeds]" size="20" readonly="readonly" style="text-align: center;" onclick="this.focus();this.select()" title="<?php _e( 'To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac).', 'custom-twitter-feeds' ); ?>" /></p>
        <p><?php _e( "Find out how to display <a href='?page=custom-twitter-feeds&tab=display'>multiple feeds</a>.", "custom-twitter-feeds" ); ?></p>
    </div>
    <?php } ?>

    <p class="ctf-footnote dashicons-before dashicons-admin-plugins"> Check out our free plugins: <a href="https://wordpress.org/plugins/custom-facebook-feed/" target="_blank">Facebook</a> and <a href="https://wordpress.org/plugins/instagram-feed/" target="_blank">Instagram</a>.</p>
    
</div>