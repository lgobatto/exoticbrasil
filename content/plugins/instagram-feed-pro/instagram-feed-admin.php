<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
function sb_instagram_menu() {
    add_menu_page(
        'Instagram Feed',
        'Instagram Feed',
        'manage_options',
        'sb-instagram-feed',
        'sb_instagram_settings_page'
    );
    add_submenu_page(
        'sb-instagram-feed',
        'Settings',
        'Settings',
        'manage_options',
        'sb-instagram-feed',
        'sb_instagram_settings_page'
    );
    add_submenu_page(
        'sb-instagram-feed',
        'License',
        'License',
        'manage_options',
        'sb-instagram-license',
        'sbi_license_page'
    );
}
add_action('admin_menu', 'sb_instagram_menu');

//Add Welcome page
add_action('admin_menu', 'sbi_welcome_menu');
function sbi_welcome_menu() {
    add_submenu_page(
        'sb-instagram-feed',
        "What's New?",
        "What's New?",
        'manage_options',
        'sbi-welcome-new',
        'sbi_welcome_screen_new_content'
    );
    add_submenu_page(
        'sb-instagram-feed',
        'Getting Started',
        'Getting Started',
        'manage_options',
        'sbi-welcome-started',
        'sbi_welcome_screen_started_content'
    );
}
function sbi_welcome_screen_new_content() { ?>
    <div class="wrap about-wrap sbi-welcome">
        <?php sbi_welcome_header(); ?>

        <h2 class="nav-tab-wrapper">
            <a href="?page=sbi-welcome-new" class="nav-tab nav-tab-active"><?php _e("What's New?"); ?></a>
            <a href="?page=sbi-welcome-started" class="nav-tab"><?php _e('Getting Started'); ?></a>
        </h2>

        <p class="about-description"><?php _e("Let's take a look at what's new in version 2.8."); ?></p>

        <div class="changelog">
            <h3><?php _e('Mobile layout settings'); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-mobile-layout.jpg' , __FILE__ ) ?>">
                </div>

                <div class="sbi-feature-section-content">
                    <p><?php _e("You can now choose to set the number of columns and posts to use for mobile, which allows you to decide how your Instagram feed is displayed across all devices."); ?></p>

                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("You can find these settings by navigating to <i>Customize &gt; Layout</i>, and clicking on <b>\"Show Mobile Options\"</b> under the respective setting.."); ?></p>
                    <p><?php _e("To change the settings in specific feeds you can use the <code>nummobile</code> and <code>colsmobile</code> shortcode options. Eg: <code>nummobile='4'</code> <code>colsmobile='2'</code>."); ?></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <h3><?php _e('Load more on scroll'); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-load-on-scroll.jpg' , __FILE__ ) ?>">
                </div>

                <div class="sbi-feature-section-content">
                    <p><?php _e("Visitors to your site can now trigger the loading of more posts as they scroll down your feed."); ?></p>

                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e('You can enable this for all feeds by using the setting <i>Customize &gt; Autoscroll Load More &gt; Set Load More on Scroll as Default</i>. Here, you can also set the "Trigger Distance" which is the distance from the bottom of the feed that the user has reached before the plugin will load more posts.'); ?></p>
                    <p><?php _e('You can apply the autoscroll setting to specific feeds using <code>autoscroll=true</code>. Feeds with a scrollbar applied will load more posts when the user reaches the bottom of the scrollable area.'); ?></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <h3><?php _e('Post IDs visible in "Moderation Mode"'); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-mod-ids.jpg' , __FILE__ ) ?>">
                </div>

                <div class="sbi-feature-section-content">
                    <p><?php _e("It's now easier to collect post IDs for creating single post feeds, which are curated feeds comprised of specific single posts."); ?></p>

                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("To view the ID for a post, enable \"Moderation Mode\" for your feed, which can be done either on the Customize tab or in the shortcode, using <code>moderationmode=true</code>. Once enabled, click the \"Moderate Feed\" button while viewing the feed on the front end of your site. Check the box labeled <b>\"Show post ID under image\"</b> and the ID for each post will be displayed below the image for you to conveniently copy and paste into a single post feed."); ?></p>
                </div>
            </div>
        </div>

        <p class="about-description"><?php _e("Here are some other features that were recently added:"); ?></p>

        <div class="changelog">
		    <h3><?php _e('Custom image sizes'); ?></h3>
		    <div class="feature-section">
			    <div class="sbi-feature-section-media">
				    <img src="<?php echo plugins_url( 'img/welcome-custom-sizes.png' , __FILE__ ) ?>">
			    </div>

			    <div class="sbi-feature-section-content">
				    <p><?php _e("Instagram has many image sizes beyond the thumbnail (150x150), medium (320x320), and large (640x640) resolution types. You can now use these unofficial sizes in the plugin. If Instagram removes support for these in the future, the plugin will simply revert back to the best, officially supported image size."); ?></p>

				    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("Go to the \"Customize\" tab, check the box \"Use a Custom Image Size\" and select from the available options"); ?></p>
				    <p><?php _e("You can also specify a custom image size in a specific feed by using the <code>imageres</code> shortcode option, like so: <code>imageres=90</code>"); ?></p>
			    </div>
		    </div>
	    </div>

	    <div class="changelog">
		    <h3><?php _e('Private feeds and posts no longer disrupt the feed'); ?></h3>
		    <div class="feature-section">
			    <div class="sbi-feature-section-media">
				    <img src="<?php echo plugins_url( 'img/welcome-new-errors.jpg' , __FILE__ ) ?>">
			    </div>

			    <div class="sbi-feature-section-content">
				    <p><?php _e("If one of your feeds includes an account that becomes private, or you are displaying a single post that is from an account that has changed to private, then your feed will now continue to work while simply excluding the private data. A warning message will appear to logged-in admins to explain what happened."); ?></p>
			    </div>
		    </div>
	    </div>

	    <div class="changelog">
		    <h3><?php _e('Support for "Slideshow" posts'); ?></h3>
		    <div class="feature-section">
			    <div class="sbi-feature-section-media">
				    <img src="<?php echo plugins_url( 'img/welcome-slideshow.jpg' , __FILE__ ) ?>">
			    </div>

			    <div class="sbi-feature-section-content">
				    <p><?php _e('When viewing a slideshow post in the popup lightbox you can now scroll through to view the other images.'); ?></p>
			    </div>
		    </div>
	    </div>

        <div class="changelog">
            <h3><?php _e("Visual Moderation Mode"); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-moderation.png' , __FILE__ ) ?>">
                </div>
                
                <div class="sbi-feature-section-content">
                    <p><?php _e("Moderating your feed is now easier than ever. We've added a visual moderation system that allows you choose which photos in your feed to hide or display with a click of your mouse."); ?></p>

                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("Enable 'Moderation Mode' in either the settings or shortcode and then use the private button added to your feed to enter moderation mode. Once inside, you'll be able to select which photos in your feed to show or display, or block certain users. For a full overview of how to use this feature, see <a href='https://smashballoon.com/guide-to-moderation-mode/' target='_blank'>this FAQ</a>."); ?></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <h3><?php _e("Lightbox Redesign"); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-lightbox.png' , __FILE__ ) ?>">
                </div>
                <div class="sbi-feature-section-content">
                    <p><?php _e("We've redesigned the popup lightbox to include post comments just like on Instagram."); ?></p>
                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("You can disable the new lightbox layout by using the following shortcode option:"); ?><code>lightboxcomments=false</code>. <?php _e("Or, you can disable it for all feeds by using the setting in the following location: <i>Customize > Lightbox Comments</i>."); ?></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <h3><?php _e('"Shoppable" Feeds'); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-shoppable.png' , __FILE__ ) ?>">
                </div>
                <div class="sbi-feature-section-content">
                    <p><?php _e("This feature allows you to link your Instagram posts to custom URLs of your choosing by simply adding the URL to the caption of your post on Instagram. This means you can link specific posts in your feed to pages or products on your site (or other sites) in a quick and easy way."); ?></p>
                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("You can either enable this feature for all feeds by using the following setting: <i>Customize > Photos > Link Posts to URL in Caption</i>, or you can enable it for a specific feed using the following shortcode option: <code>captionlinks=true</code>"); ?></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <h3><?php _e("Only Show Posts by a Specific User"); ?></h3>
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-showusers.png' , __FILE__ ) ?>">
                </div>
                <div class="sbi-feature-section-content">
                    <p><?php _e("Until now, you could choose to prevent posts by certain users appearing in your feed, but you can now also choose to only <i>show</i> posts by specific users."); ?></p>
                    <h4><?php _e("Directions"); ?></h4>
                    <p><?php _e("You can either apply this setting to all feeds by using the following setting: <i>Customize > Moderation > Show posts only from these users</i>, or you can apply it to a specific feed using <code>showusers</code> shortcode option. Eg: <code>showusers='smashballoon'</code>"); ?></p>
                </div>
            </div>
        </div>

        <p class="sbi-footnote"><i class="fa fa-heart"></i>Your friends @ <a href="https://smashballoon.com/" target="_blank">Smash Balloon</a></p>

    </div>
<?php }
function sbi_welcome_screen_started_content() { ?>
    <div class="wrap about-wrap sbi-welcome">
        <?php sbi_welcome_header(); ?>

        <h2 class="nav-tab-wrapper">
            <a href="?page=sbi-welcome-new" class="nav-tab"><?php _e("What's New?"); ?></a>
            <a href="?page=sbi-welcome-started" class="nav-tab nav-tab-active"><?php _e('Getting Started'); ?></a>
        </h2>

        <p class="about-description"><?php _e("Your first time using the plugin? Let's help you get started..."); ?></p>

        <div class="sbi-123">
            <div class="changelog">
                <div class="feature-section">
                    <div class="sbi-feature-section-media">
                        <img src="<?php echo plugins_url( 'img/welcome-license.png' , __FILE__ ) ?>">
                    </div>
                    
                    <div class="sbi-feature-section-content">
                        <h3><span class="sbi-big-text">1</span><?php _e("Activate Your License Key"); ?></h3>
                        <p><?php _e("In order to receive updates for the plugin you'll need to activate your license key by entering it "); ?><a href="admin.php?page=sb-instagram-license" target="_blank"><?php _e("here."); ?></a></p>
                    </div>
                </div>
            </div>

            <div class="changelog">
                <div class="feature-section">
                    <div class="sbi-feature-section-media">
                        <img src="<?php echo plugins_url( 'img/welcome-token.png' , __FILE__ ) ?>">
                    </div>
                    <div class="sbi-feature-section-content">
                        <h3><span class="sbi-big-text">2</span><?php _e("Get your Access Token"); ?></h3>
                        <p><?php _e("We've made configuring your feed super simple. Just use the big blue button on the plugin's "); ?><a href="admin.php?page=sb-instagram-feed&amp;tab=configure" target="_blank"><?php _e("Settings page"); ?></a> <?php _e(" to obtain your Instagram Access Token and User ID. Then, copy and paste them into the relevant fields."); ?></p>
                    </div>
                </div>
            </div>

            <div class="changelog">
                <div class="feature-section">
                    <div class="sbi-feature-section-media">
                        <img src="<?php echo plugins_url( 'img/welcome-type.png' , __FILE__ ) ?>">
                    </div>
                    <div class="sbi-feature-section-content">
                        <h3><span class="sbi-big-text">3</span><?php _e("Select your Feed Type"); ?></h3>
                        <p><?php _e("Choose to display posts from a User ID, hashtag, location, or coordinates. You can also choose to display single posts, or only posts that you've liked on Instagram."); ?></p>
                    </div>
                </div>
            </div>

            <div class="changelog">
                <div class="feature-section">
                    <div class="sbi-feature-section-media">
                        <img src="<?php echo plugins_url( 'img/welcome-shortcode.png' , __FILE__ ) ?>">
                    </div>
                    <div class="sbi-feature-section-content">
                        <h3><span class="sbi-big-text">4</span><?php _e("Display Your Feed"); ?></h3>
                        <p><?php _e("To display your feed simply copy and paste the <nobr><code>[instagram-feed]</code></nobr> shortcode wherever you want the feed to show up; any page, post, or widget. It really is that simple!");?></p>

                        <p><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; Need more help? See our <a href="admin.php?page=sb-instagram-feed&amp;tab=support" target="_blank">Support Section</a>.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="changelog">
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-multiple.png' , __FILE__ ) ?>">
                </div>
                <div class="sbi-feature-section-content">
                    <h3><?php _e("Multiple Feeds"); ?></h3>
                    <p><?php _e("You can display as many feeds on your site as you'd like. Just use our handy "); ?><a href="admin.php?page=sb-instagram-feed&amp;tab=display" target="_blank"><?php _e("shortcode options");?></a> <?php _e("to customize each one as needed.");?></p>

                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/display-multiple-instagram-feeds/" target="_blank">More help</a></p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <img src="<?php echo plugins_url( 'img/welcome-customize.png' , __FILE__ ) ?>">
                </div>
                <div class="sbi-feature-section-content">
                    <h3><?php _e("Customize Your Feed"); ?></h3>
                    <p><?php _e("There are countless ways to customize your Instagram feed. Whether it be translating the text, changing layouts and colors, or using powerful custom code snippets.");?></p>

                    <h4><?php _e("Layout"); ?></h4>
                    <p><?php _e("Choose from different feed types, change the layout, and even display your content in a rotating carousel."); ?></p>

                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; <?php _e("Find out more:"); ?>
                        <a href="https://smashballoon.com/creating-basic-instagram-slideshow/" target="_blank"><?php _e("Creating carousels"); ?></a>.
                    </p>

                    <h4><?php _e("Styling options"); ?></h4>
                    <p><?php _e("Choose which information to show or hide, customize colors and text, and style each individual part of your feed."); ?> <a href="admin.php?page=sb-instagram-feed&amp;tab=customize"><?php _e("Go to the Customize page"); ?></a>.</p>

                    <h4><?php _e("Advanced Customizations"); ?></h4>
                    <p><?php _e("You can achieve some pretty advanced customizations using the plugin. Here's some examples:"); ?></p>

                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="https://smashballoon.com/guide-to-moderation-mode/" target="_blank"><?php _e("Moderating your feed"); ?></a> &nbsp;&middot;&nbsp;
                    <i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="https://smashballoon.com/can-display-photos-specific-hashtag-specific-user-id/" target="_blank"><?php _e("Filtering posts by word or hashtag"); ?></a> &nbsp;&middot;&nbsp;
                    <i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="https://smashballoon.com/make-a-shoppable-feed/" target="_blank"><?php _e('Creating a "Shoppable" feed'); ?></a>
                    </p>
                </div>
            </div>
        </div>

        <div class="changelog">
            <div class="feature-section">
                <div class="sbi-feature-section-media">
                    <a href='admin.php?page=sbi-top&amp;tab=support'><img src="<?php echo plugins_url( 'img/welcome-support.png' , __FILE__ ) ?>"></a>
                </div>
                <div class="sbi-feature-section-content">
                    <h3><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <?php _e("Need some more help?"); ?></h3>
                    <p><?php _e("Check out our <a href='admin.php?page=sb-instagram-feed&tab=support'>Support Section</a> which includes helpful links, a tutorial video, and more.");?></p>
                </div>
            </div>
        </div>

        <p class="sbi-footnote"><i class="fa fa-heart"></i>Your friends @ <a href="https://smashballoon.com/" target="_blank">Smash Balloon</a></p>

    </div>
<?php }
function sbi_welcome_header(){ ?>
    <?php
    //Set an option that shows that the welcome page has been seen
    update_option( 'sbi_welcome_seen', true );
    ?>
    <div id="sbi-header">
        <a href="admin.php?page=sb-instagram-feed" class="sbi-welcome-close"><i class="fa fa-times"></i></a>
        <a href="https://smashballoon.com" class="sbi-welcome-image" title="Your friends at Smash Balloon" target="_blank">
            <img src="<?php echo plugins_url( 'img/balloon.png' , __FILE__ ) ?>" alt="Instagram Feed Pro">
        </a>
        <h1><?php _e("Welcome to Instagram Feed Pro"); ?></h1>
        <p class="about-text">
            <?php _e("Thanks for installing <b>Version 2.8</b> of the Instagram Feed Pro plugin! Use the tabs below to see what's new or to get started using the plugin."); ?>
        </p>
    </div>
<?php }


add_action( 'admin_init', 'sbi_welcome_screen_do_activation_redirect' );
function sbi_welcome_screen_do_activation_redirect() {
	//delete_option( 'sbi_ver' );

    // Bail if activating from network, or bulk
    if ( is_network_admin() || isset( $_GET['activate-multi'] ) )
        return;

	$sbi_ver = get_option( 'sbi_ver' );

	if ( ! $sbi_ver ) {
		update_option( 'sbi_ver', SBIVER );
		wp_safe_redirect( admin_url( 'admin.php?page=sbi-welcome-started' ) );

		exit;
	} elseif ( $sbi_ver && version_compare( $sbi_ver, SBIVER ) === -1 ) { // updated
		update_option( 'sbi_ver', SBIVER );
        wp_safe_redirect( admin_url( 'admin.php?page=sbi-welcome-new' ) );

        exit;
	}
}


function sbi_register_option() {
    // creates our settings in the options table
    register_setting('sbi_license', 'sbi_license_key', 'sbi_sanitize_license' );
}
add_action('admin_init', 'sbi_register_option');

function sbi_sanitize_license( $new ) {
    $old = get_option( 'sbi_license_key' );
    if( $old && $old != $new ) {
        delete_option( 'sbi_license_status' ); // new license has been entered, so must reactivate
    }
    return $new;
}

function sbi_activate_license() {

    // listen for our activate button to be clicked
    if( isset( $_POST['sbi_license_activate'] ) ) {

        // run a quick security check
        if( ! check_admin_referer( 'sbi_nonce', 'sbi_nonce' ) )
            return; // get out if we didn't click the Activate button

        // retrieve the license from the database
        $sbi_license = trim( get_option( 'sbi_license_key' ) );


        // data to send in our API request
        $api_params = array(
            'edd_action'=> 'activate_license',
            'license'   => $sbi_license,
            'item_name' => urlencode( SBI_PLUGIN_NAME ), // the name of our product in EDD
            'url'       => home_url()
        );

        // Call the custom API.
        $response = wp_remote_get( add_query_arg( $api_params, SBI_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );

        // make sure the response came back okay
        if ( is_wp_error( $response ) )
            return false;

        // decode the license data
        $sbi_license_data = json_decode( wp_remote_retrieve_body( $response ) );

        //store the license data in an option
        update_option( 'sbi_license_data', $sbi_license_data );

        // $license_data->license will be either "valid" or "invalid"

        update_option( 'sbi_license_status', $sbi_license_data->license );

    }
}
add_action('admin_init', 'sbi_activate_license');

function sbi_deactivate_license() {

    // listen for our activate button to be clicked
    if( isset( $_POST['sbi_license_deactivate'] ) ) {

        // run a quick security check
        if( ! check_admin_referer( 'sbi_nonce', 'sbi_nonce' ) )
            return; // get out if we didn't click the Activate button

        // retrieve the license from the database
        $sbi_license= trim( get_option( 'sbi_license_key' ) );


        // data to send in our API request
        $api_params = array(
            'edd_action'=> 'deactivate_license',
            'license'   => $sbi_license,
            'item_name' => urlencode( SBI_PLUGIN_NAME ), // the name of our product in EDD
            'url'       => home_url()
        );

        // Call the custom API.
        $response = wp_remote_get( add_query_arg( $api_params, SBI_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );

        // make sure the response came back okay
        if ( is_wp_error( $response ) )
            return false;

        // decode the license data
        $sbi_license_data = json_decode( wp_remote_retrieve_body( $response ) );

        // $license_data->license will be either "deactivated" or "failed"
        if( $sbi_license_data->license == 'deactivated' )
            delete_option( 'sbi_license_status' );

    }
}
add_action('admin_init', 'sbi_deactivate_license');

function sbi_check_license() {

    global $wp_version;

    $sbi_license= trim( get_option( 'sbi_license_key' ) );

    $api_params = array(
        'edd_action' => 'check_license',
        'license' => $sbi_license,
        'item_name' => urlencode( SBI_PLUGIN_NAME ),
        'url'       => home_url()
    );

    // Call the custom API.
    $response = wp_remote_get( add_query_arg( $api_params, SBI_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );


    if ( is_wp_error( $response ) )
        return false;

    $sbi_license_data = json_decode( wp_remote_retrieve_body( $response ) );

    if( $sbi_license_data->license == 'valid' ) {
        echo 'valid'; exit;
        // this license is still valid
    } else {
        echo 'invalid'; exit;
        // this license is no longer valid
    }
}



//License page
function sbi_license_page() {
    $sbi_license    = trim( get_option( 'sbi_license_key' ) );
    $sbi_status     = get_option( 'sbi_license_status' );
    ?>

    <div id="sbi_admin" class="wrap">

        <div id="header">
            <h1><?php _e('Instagram Feed Pro'); ?></h1>
        </div>

        <?php sbi_expiration_notice(); ?>

        <form name="form1" method="post" action="options.php">

            <h2 class="nav-tab-wrapper">
                <a href="?page=sb-instagram-feed&amp;tab=configure" class="nav-tab"><?php _e('1. Configure'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=customize" class="nav-tab"><?php _e('2. Customize'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=display" class="nav-tab"><?php _e('3. Display Your Feed'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=support" class="nav-tab"><?php _e('Support'); ?></a>
                <a href="?page=sb-instagram-license" class="nav-tab nav-tab-active"><?php _e('License'); ?></a>
            </h2>

            <?php settings_fields('sbi_license'); ?>

            <?php
            // data to send in our API request
            $sbi_api_params = array(
                'edd_action'=> 'check_license',
                'license'   => $sbi_license,
                'item_name' => urlencode( SBI_PLUGIN_NAME ) // the name of our product in EDD
            );

            // Call the custom API.
            $sbi_response = wp_remote_get( add_query_arg( $sbi_api_params, SBI_STORE_URL ), array( 'timeout' => 60, 'sslverify' => false ) );

            // decode the license data
            $sbi_license_data = (array) json_decode( wp_remote_retrieve_body( $sbi_response ) );

            //Store license data in db unless the data comes back empty as wasn't able to connect to our website to get it
            if( !empty($sbi_license_data) ) update_option( 'sbi_license_data', $sbi_license_data );

            ?>

            <table class="form-table">
                <tbody>
                    <h3><?php _e('License'); ?></h3>

                    <tr valign="top">
                        <th scope="row" valign="top">
                            <?php _e('Enter your license key'); ?>
                        </th>
                        <td>
                            <input id="sbi_license_key" name="sbi_license_key" type="text" class="regular-text" value="<?php esc_attr_e( $sbi_license ); ?>" />

                            <?php if( false !== $sbi_license ) { ?>

                                <?php if( $sbi_status !== false && $sbi_status == 'valid' ) { ?>
                                    <?php wp_nonce_field( 'sbi_nonce', 'sbi_nonce' ); ?>
                                    <input type="submit" class="button-secondary" name="sbi_license_deactivate" value="<?php _e('Deactivate License'); ?>"/>

                                    <?php if($sbi_license_data['license'] == 'expired'){ ?>
                                        <span class="sbi_license_status" style="color:red;"><?php _e('Expired'); ?></span>
                                    <?php } else { ?>
                                        <span class="sbi_license_status" style="color:green;"><?php _e('Active'); ?></span>
                                    <?php } ?>

                                <?php } else {
                                    wp_nonce_field( 'sbi_nonce', 'sbi_nonce' ); ?>
                                    <input type="submit" class="button-secondary" name="sbi_license_activate" value="<?php _e('Activate License'); ?>"/>

                                    <?php if($sbi_license_data['license'] == 'expired'){ ?>
                                        <span class="sbi_license_status" style="color:red;"><?php _e('Expired'); ?></span>
                                    <?php } else { ?>
                                        <span class="sbi_license_status" style="color:red;"><?php _e('Inactive'); ?></span>
                                    <?php } ?>

                                <?php } ?>
                            <?php } ?>

                            <br />
                            <i style="color: #666; font-size: 11px;"><?php _e('The license key you received when purchasing the plugin.'); ?></i>
                            <?php global $sbi_download_id; ?>
                            <p style="font-size: 13px;">
                                <a href='https://smashballoon.com/checkout/?edd_license_key=<?php echo trim($sbi_license) ?>&amp;download_id=<?php echo $sbi_download_id ?>' target='_blank'><?php _e("Renew your license"); ?></a>
                                &nbsp;&nbsp;&nbsp;&middot;
                                <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("Upgrade your license"); ?></a>

                                <span class="sbi_tooltip">
                                    <?php _e("You can upgrade your license in two ways:<br />
                                    &bull;&nbsp; Log into <a href='https://smashballoon.com/account' target='_blank'>your Account</a> and click on the 'Upgrade my License' tab<br />
                                    &bull;&nbsp; <a href='https://smashballoon.com/contact/' target='_blank'>Contact us directly</a>"); ?>
                                </span>

                            </p>


                        </td>
                    </tr>

                </tbody>
            </table>
            <?php submit_button(); ?>

        </form>

    </div>

    <?php
} //End License page



function sb_instagram_settings_page() {

    $sbi_welcome_seen = get_option( 'sbi_welcome_seen' );
    if( $sbi_welcome_seen == false ){ ?>
        <p class="sbi-page-loading"><?php _e("Loading..."); ?></p>
        <script>window.location = "<?php echo admin_url( 'admin.php?page=sbi-welcome-new' ); ?>";</script>
    <?php }

    //Hidden fields
    $sb_instagram_settings_hidden_field = 'sb_instagram_settings_hidden_field';
    $sb_instagram_configure_hidden_field = 'sb_instagram_configure_hidden_field';
    $sb_instagram_customize_hidden_field = 'sb_instagram_customize_hidden_field';

    //Declare defaults
    $sb_instagram_settings_defaults = array(
        'sb_instagram_at'                   => '',
        'sb_instagram_type'                 => 'user',
        'sb_instagram_user_id'              => '',
        'sb_instagram_hashtag'              => '',
        'sb_instagram_type_self_likes'      => '',
        'sb_instagram_location'             => '',
        'sb_instagram_coordinates'          => '',
        'sb_instagram_preserve_settings'    => '',
        'sb_instagram_ajax_theme'           => false,
        'sb_instagram_cache_time'           => '1',
        'sb_instagram_cache_time_unit'      => 'hours',

        'sb_instagram_width'                => '100',
        'sb_instagram_width_unit'           => '%',
        'sb_instagram_feed_width_resp'      => false,
        'sb_instagram_height'               => '',
        'sb_instagram_num'                  => '20',
        'sb_instagram_nummobile'            => '',
        'sb_instagram_height_unit'          => '',
        'sb_instagram_cols'                 => '4',
        'sb_instagram_colsmobile'           => 'auto',
        'sb_instagram_image_padding'        => '5',
        'sb_instagram_image_padding_unit'   => 'px',

        //Hover style
        'sb_instagram_hover_effect'         => 'fade',
        'sb_hover_background'               => '',
        'sb_hover_text'                     => '',
        'sbi_hover_inc_username'            => true,
        'sbi_hover_inc_icon'                => true,
        'sbi_hover_inc_date'                => true,
        'sbi_hover_inc_instagram'           => true,
        'sbi_hover_inc_location'            => false,
        'sbi_hover_inc_caption'             => false,
        'sbi_hover_inc_likes'               => false,
        // 'sb_instagram_hover_text_size'      => '',

        'sb_instagram_sort'                 => 'none',
        'sb_instagram_disable_lightbox'     => false,
        'sb_instagram_captionlinks'         => false,
        'sb_instagram_background'           => '',
        'sb_instagram_show_btn'             => true,
        'sb_instagram_btn_background'       => '',
        'sb_instagram_btn_text_color'       => '',
        'sb_instagram_btn_text'             => 'Load More',
        'sb_instagram_image_res'            => 'auto',
        'sb_instagram_media_type'           => 'all',
        'sb_instagram_hide_photos'          => '',
        'sb_instagram_block_users'          => '',
        'sb_instagram_ex_apply_to'          => 'all',
        'sb_instagram_inc_apply_to'         => 'all',
        'sb_instagram_show_users'           => '',
        'sb_instagram_exclude_words'        => '',
        'sb_instagram_include_words'        => '',

        //Text
        'sb_instagram_show_caption'         => true,
        'sb_instagram_caption_length'       => '50',
        'sb_instagram_caption_color'        => '',
        'sb_instagram_caption_size'         => '13',

        //lightbox comments
        'sb_instagram_lightbox_comments'    => true,
        'sb_instagram_num_comments'         => '20',

        //Meta
        'sb_instagram_show_meta'            => true,
        'sb_instagram_meta_color'           => '',
        'sb_instagram_meta_size'            => '13',
        //Header
        'sb_instagram_show_header'          => true,
        'sb_instagram_header_color'         => '',
        'sb_instagram_header_style'         => 'circle',
        'sb_instagram_show_followers'       => true,
        'sb_instagram_show_bio'             => true,
        'sb_instagram_header_primary_color'  => '517fa4',
        'sb_instagram_header_secondary_color'  => 'eeeeee',

        //Follow button
        'sb_instagram_show_follow_btn'      => true,
        'sb_instagram_moderation_mode'      => 'manual',
        'sb_instagram_folow_btn_background' => '',
        'sb_instagram_follow_btn_text_color' => '',
        'sb_instagram_follow_btn_text'      => 'Follow',

        //Autoscroll
        'sb_instagram_autoscroll' => false,
        'sb_instagram_autoscrolldistance' => 200,

        //Misc
        'sb_instagram_custom_css'           => '',
        'sb_instagram_custom_js'            => '',
        'sb_instagram_requests_max'         => '5',
        'sb_instagram_cron'                 => 'unset',
        'sb_instagram_disable_font'         => false,
        'check_api'         => false,
        'enqueue_css_in_shortcode' => false,

        //Carousel
        'sb_instagram_carousel'             => false,
        'sb_instagram_carousel_arrows'      => false,
        'sb_instagram_carousel_pag'         => true,
        'sb_instagram_carousel_autoplay'    => false,
        'sb_instagram_carousel_interval'    => '5000'

    );
    //Save defaults in an array
    $options = wp_parse_args(get_option('sb_instagram_settings'), $sb_instagram_settings_defaults);
    update_option( 'sb_instagram_settings', $options );
    if ( isset( $_POST['sbi_just_saved'] )) {
        echo '<input id="sbi_just_saved" type="hidden" name="sbi_just_saved" value="1">';
    }
    //Set the page variables
    $sb_instagram_at = $options[ 'sb_instagram_at' ];
    $sb_instagram_type = $options[ 'sb_instagram_type' ];
    $sb_instagram_user_id = $options[ 'sb_instagram_user_id' ];
    $sb_instagram_hashtag = $options[ 'sb_instagram_hashtag' ];
    $sb_instagram_type_self_likes = $options[ 'sb_instagram_type_self_likes' ];
    $sb_instagram_location = $options[ 'sb_instagram_location' ];
    $sb_instagram_coordinates = $options[ 'sb_instagram_coordinates' ];
    $sb_instagram_preserve_settings = $options[ 'sb_instagram_preserve_settings' ];
    $sb_instagram_ajax_theme = $options[ 'sb_instagram_ajax_theme' ];
    $sb_instagram_cache_time = $options[ 'sb_instagram_cache_time' ];
    $sb_instagram_cache_time_unit = $options[ 'sb_instagram_cache_time_unit' ];

    $sb_instagram_width = $options[ 'sb_instagram_width' ];
    $sb_instagram_width_unit = $options[ 'sb_instagram_width_unit' ];
    $sb_instagram_feed_width_resp = $options[ 'sb_instagram_feed_width_resp' ];
    $sb_instagram_height = $options[ 'sb_instagram_height' ];
    $sb_instagram_height_unit = $options[ 'sb_instagram_height_unit' ];
    $sb_instagram_num = $options[ 'sb_instagram_num' ];
	$sb_instagram_nummobile = $options[ 'sb_instagram_nummobile' ];
	$sb_instagram_cols = $options[ 'sb_instagram_cols' ];
	$sb_instagram_colsmobile = $options[ 'sb_instagram_colsmobile' ];

	$sb_instagram_disable_mobile = isset( $options[ 'sb_instagram_disable_mobile' ] ) && ( $options[ 'sb_instagram_disable_mobile' ] == 'on' || $options[ 'sb_instagram_disable_mobile' ] == true ) ? true : false;
    $sb_instagram_image_padding = $options[ 'sb_instagram_image_padding' ];
    $sb_instagram_image_padding_unit = $options[ 'sb_instagram_image_padding_unit' ];

    //Lightbox Comments
    $sb_instagram_lightbox_comments = $options[ 'sb_instagram_lightbox_comments' ];
    $sb_instagram_num_comments = $options[ 'sb_instagram_num_comments' ];

    //Photo hover style
    $sb_instagram_hover_effect = $options[ 'sb_instagram_hover_effect' ];
    $sb_hover_background = $options[ 'sb_hover_background' ];
    $sb_hover_text = $options[ 'sb_hover_text' ];
    $sbi_hover_inc_username = $options[ 'sbi_hover_inc_username' ];
    $sbi_hover_inc_icon = $options[ 'sbi_hover_inc_icon' ];
    $sbi_hover_inc_date = $options[ 'sbi_hover_inc_date' ];
    $sbi_hover_inc_instagram = $options[ 'sbi_hover_inc_instagram' ];
    $sbi_hover_inc_location = $options[ 'sbi_hover_inc_location' ];
    $sbi_hover_inc_caption = $options[ 'sbi_hover_inc_caption' ];
    $sbi_hover_inc_likes = $options[ 'sbi_hover_inc_likes' ];

    $sb_instagram_sort = $options[ 'sb_instagram_sort' ];
    $sb_instagram_disable_lightbox = $options[ 'sb_instagram_disable_lightbox' ];
    $sb_instagram_captionlinks = $options[ 'sb_instagram_captionlinks' ];
    $sb_instagram_background = $options[ 'sb_instagram_background' ];
    $sb_instagram_show_btn = $options[ 'sb_instagram_show_btn' ];
    $sb_instagram_btn_background = $options[ 'sb_instagram_btn_background' ];
    $sb_instagram_btn_text_color = $options[ 'sb_instagram_btn_text_color' ];
    $sb_instagram_btn_text = $options[ 'sb_instagram_btn_text' ];
    $sb_instagram_image_res = $options[ 'sb_instagram_image_res' ];
    $sb_instagram_media_type = $options[ 'sb_instagram_media_type' ];
    $sb_instagram_hide_photos = $options[ 'sb_instagram_hide_photos' ];
    $sb_instagram_block_users = $options[ 'sb_instagram_block_users' ];
    $sb_instagram_ex_apply_to = $options[ 'sb_instagram_ex_apply_to' ];
    $sb_instagram_inc_apply_to = $options[ 'sb_instagram_inc_apply_to' ];
    $sb_instagram_show_users = $options[ 'sb_instagram_show_users' ];
    $sb_instagram_exclude_words = $options[ 'sb_instagram_exclude_words' ];
    $sb_instagram_include_words = $options[ 'sb_instagram_include_words' ];

    //Text
    $sb_instagram_show_caption = $options[ 'sb_instagram_show_caption' ];
    $sb_instagram_caption_length = $options[ 'sb_instagram_caption_length' ];
    $sb_instagram_caption_color = $options[ 'sb_instagram_caption_color' ];
    $sb_instagram_caption_size = $options[ 'sb_instagram_caption_size' ];
    //Meta
    $sb_instagram_show_meta = $options[ 'sb_instagram_show_meta' ];
    $sb_instagram_meta_color = $options[ 'sb_instagram_meta_color' ];
    $sb_instagram_meta_size = $options[ 'sb_instagram_meta_size' ];
    //Header
    $sb_instagram_show_header = $options[ 'sb_instagram_show_header' ];
    $sb_instagram_header_color = $options[ 'sb_instagram_header_color' ];
    $sb_instagram_header_style = $options[ 'sb_instagram_header_style' ];
    $sb_instagram_show_followers = $options[ 'sb_instagram_show_followers' ];
    $sb_instagram_show_bio = $options[ 'sb_instagram_show_bio' ];
    $sb_instagram_header_primary_color = $options[ 'sb_instagram_header_primary_color' ];
    $sb_instagram_header_secondary_color = $options[ 'sb_instagram_header_secondary_color' ];

    //Follow button
    $sb_instagram_show_follow_btn = $options[ 'sb_instagram_show_follow_btn' ];
    $sb_instagram_moderation_mode = $options[ 'sb_instagram_moderation_mode' ];
    $sb_instagram_folow_btn_background = $options[ 'sb_instagram_folow_btn_background' ];
    $sb_instagram_follow_btn_text_color = $options[ 'sb_instagram_follow_btn_text_color' ];
    $sb_instagram_follow_btn_text = $options[ 'sb_instagram_follow_btn_text' ];

    //Autoscroll
    $sb_instagram_autoscroll = $options[ 'sb_instagram_autoscroll' ];
    $sb_instagram_autoscrolldistance = $options[ 'sb_instagram_autoscrolldistance' ];

    //Misc
    $sb_instagram_custom_css = $options[ 'sb_instagram_custom_css' ];
    $sb_instagram_custom_js = $options[ 'sb_instagram_custom_js' ];
    $sb_instagram_requests_max = $options[ 'sb_instagram_requests_max' ];
    $sb_instagram_cron = $options[ 'sb_instagram_cron' ];
    $sb_instagram_disable_font = $options[ 'sb_instagram_disable_font' ];
    $check_api = $options[ 'check_api' ];
    $enqueue_css_in_shortcode = $options[ 'enqueue_css_in_shortcode' ];

    //Carousel
    $sb_instagram_carousel = $options[ 'sb_instagram_carousel' ];
    $sb_instagram_carousel_arrows = $options[ 'sb_instagram_carousel_arrows' ];
    $sb_instagram_carousel_pag = $options[ 'sb_instagram_carousel_pag' ];
    $sb_instagram_carousel_autoplay = $options[ 'sb_instagram_carousel_autoplay' ];
    $sb_instagram_carousel_interval = $options[ 'sb_instagram_carousel_interval' ];


    //Check nonce before saving data
    if ( ! isset( $_POST['sb_instagram_pro_settings_nonce'] ) || ! wp_verify_nonce( $_POST['sb_instagram_pro_settings_nonce'], 'sb_instagram_pro_saving_settings' ) ) {
        //Nonce did not verify
    } else {

        // See if the user has posted us some information. If they did, this hidden field will be set to 'Y'.
        if( isset($_POST[ $sb_instagram_settings_hidden_field ]) && $_POST[ $sb_instagram_settings_hidden_field ] == 'Y' ) {

            if( isset($_POST[ $sb_instagram_configure_hidden_field ]) && $_POST[ $sb_instagram_configure_hidden_field ] == 'Y' ) {
                if (isset($_POST[ 'sb_instagram_at' ]) ) $sb_instagram_at = sanitize_text_field( $_POST[ 'sb_instagram_at' ] );
                if (isset($_POST[ 'sb_instagram_type' ]) ) $sb_instagram_type = $_POST[ 'sb_instagram_type' ];
                if (isset($_POST[ 'sb_instagram_user_id' ]) ) $sb_instagram_user_id = sanitize_text_field( $_POST[ 'sb_instagram_user_id' ] );
                if (isset($_POST[ 'sb_instagram_hashtag' ]) ) $sb_instagram_hashtag = sanitize_text_field( $_POST[ 'sb_instagram_hashtag' ] );
                if (isset($_POST[ 'sb_instagram_type_self_likes' ]) ) $sb_instagram_type_self_likes = $_POST[ 'sb_instagram_type_self_likes' ];
                if (isset($_POST[ 'sb_instagram_location' ]) ) $sb_instagram_location = sanitize_text_field( $_POST[ 'sb_instagram_location' ] );
                if (isset($_POST[ 'sb_instagram_coordinates' ]) ) $sb_instagram_coordinates = sanitize_text_field( $_POST[ 'sb_instagram_coordinates' ] );

                isset($_POST[ 'sb_instagram_preserve_settings' ]) ? $sb_instagram_preserve_settings = $_POST[ 'sb_instagram_preserve_settings' ] : $sb_instagram_preserve_settings = '';
                isset($_POST[ 'sb_instagram_ajax_theme' ]) ? $sb_instagram_ajax_theme = $_POST[ 'sb_instagram_ajax_theme' ] : $sb_instagram_ajax_theme = '';
                if (isset($_POST[ 'sb_instagram_cache_time' ]) ) $sb_instagram_cache_time = sanitize_text_field( $_POST[ 'sb_instagram_cache_time' ] );
                isset($_POST[ 'sb_instagram_cache_time_unit' ]) ? $sb_instagram_cache_time_unit = $_POST[ 'sb_instagram_cache_time_unit' ] : $sb_instagram_cache_time_unit = '';

                $options[ 'sb_instagram_at' ] = $sb_instagram_at;
                $options[ 'sb_instagram_type' ] = $sb_instagram_type;
                $options[ 'sb_instagram_user_id' ] = $sb_instagram_user_id;
                $options[ 'sb_instagram_hashtag' ] = $sb_instagram_hashtag;
                $options[ 'sb_instagram_type_self_likes' ] = $sb_instagram_type_self_likes;
                $options[ 'sb_instagram_location' ] = $sb_instagram_location;
                $options[ 'sb_instagram_coordinates' ] = $sb_instagram_coordinates;

                $options[ 'sb_instagram_preserve_settings' ] = $sb_instagram_preserve_settings;
                $options[ 'sb_instagram_ajax_theme' ] = $sb_instagram_ajax_theme;

                $options[ 'sb_instagram_cache_time' ] = $sb_instagram_cache_time;
                $options[ 'sb_instagram_cache_time_unit' ] = $sb_instagram_cache_time_unit;

                //Delete all SBI transients
                global $wpdb;
                $table_name = $wpdb->prefix . "options";
                $wpdb->query( "
                    DELETE
                    FROM $table_name
                    WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
                    " );
                $wpdb->query( "
                    DELETE
                    FROM $table_name
                    WHERE `option_name` LIKE ('%\_transient\_timeout\_sbi\_%')
                    " );

            } //End config tab post

            if( isset($_POST[ $sb_instagram_customize_hidden_field ]) && $_POST[ $sb_instagram_customize_hidden_field ] == 'Y' ) {
                //Customize
                if (isset($_POST[ 'sb_instagram_width' ]) ) $sb_instagram_width = sanitize_text_field( $_POST[ 'sb_instagram_width' ] );
                if (isset($_POST[ 'sb_instagram_width_unit' ]) ) $sb_instagram_width_unit = $_POST[ 'sb_instagram_width_unit' ];
                (isset($_POST[ 'sb_instagram_feed_width_resp' ]) ) ? $sb_instagram_feed_width_resp = $_POST[ 'sb_instagram_feed_width_resp' ] : $sb_instagram_feed_width_resp = '';

                if (isset($_POST[ 'sb_instagram_height' ]) ) $sb_instagram_height = sanitize_text_field( $_POST[ 'sb_instagram_height' ] );
                if (isset($_POST[ 'sb_instagram_height_unit' ]) ) $sb_instagram_height_unit = $_POST[ 'sb_instagram_height_unit' ];
                if (isset($_POST[ 'sb_instagram_num' ]) ) $sb_instagram_num = sanitize_text_field( $_POST[ 'sb_instagram_num' ] );
	            if (isset($_POST[ 'sb_instagram_nummobile' ]) ) $sb_instagram_nummobile = sanitize_text_field( $_POST[ 'sb_instagram_nummobile' ] );
	            if (isset($_POST[ 'sb_instagram_cols' ]) ) $sb_instagram_cols = sanitize_text_field( $_POST[ 'sb_instagram_cols' ] );
	            if (isset($_POST[ 'sb_instagram_colsmobile' ]) ) $sb_instagram_colsmobile = sanitize_text_field( $_POST[ 'sb_instagram_colsmobile' ] );
                if (isset($_POST[ 'sb_instagram_colsmobile' ]) ) $options[ 'sb_instagram_disable_mobile' ] = false;

                if (isset($_POST[ 'sb_instagram_image_padding' ]) ) $sb_instagram_image_padding = sanitize_text_field( $_POST[ 'sb_instagram_image_padding' ] );
                if (isset($_POST[ 'sb_instagram_image_padding_unit' ]) ) $sb_instagram_image_padding_unit = $_POST[ 'sb_instagram_image_padding_unit' ];

                //Lightbox comments
                (isset($_POST[ 'sb_instagram_lightbox_comments' ]) ) ? $sb_instagram_lightbox_comments = $_POST[ 'sb_instagram_lightbox_comments' ] : $sb_instagram_lightbox_comments = '';
                if(isset($_POST[ 'sb_instagram_num_comments' ]) ) $sb_instagram_num_comments = sanitize_text_field( $_POST[ 'sb_instagram_num_comments' ] );

                //Photo hover style
                if (isset($_POST[ 'sb_instagram_hover_effect' ]) ) $sb_instagram_hover_effect = $_POST[ 'sb_instagram_hover_effect' ];
                if (isset($_POST[ 'sb_hover_background' ]) ) $sb_hover_background = $_POST[ 'sb_hover_background' ];
                (isset($_POST[ 'sb_hover_text' ]) && !empty($_POST[ 'sb_hover_text' ]) ) ? $sb_hover_text = $_POST[ 'sb_hover_text' ] : $sb_hover_text = '#fff';
                (isset($_POST[ 'sbi_hover_inc_username' ]) ) ? $sbi_hover_inc_username = $_POST[ 'sbi_hover_inc_username' ] : $sbi_hover_inc_username = '';
                (isset($_POST[ 'sbi_hover_inc_icon' ]) ) ? $sbi_hover_inc_icon = $_POST[ 'sbi_hover_inc_icon' ] : $sbi_hover_inc_icon = '';
                (isset($_POST[ 'sbi_hover_inc_date' ]) ) ? $sbi_hover_inc_date = $_POST[ 'sbi_hover_inc_date' ] : $sbi_hover_inc_date = '';
                (isset($_POST[ 'sbi_hover_inc_instagram' ]) ) ? $sbi_hover_inc_instagram = $_POST[ 'sbi_hover_inc_instagram' ] : $sbi_hover_inc_instagram = '';
                (isset($_POST[ 'sbi_hover_inc_location' ]) ) ? $sbi_hover_inc_location = $_POST[ 'sbi_hover_inc_location' ] : $sbi_hover_inc_location = '';
                (isset($_POST[ 'sbi_hover_inc_caption' ]) ) ? $sbi_hover_inc_caption = $_POST[ 'sbi_hover_inc_caption' ] : $sbi_hover_inc_caption = '';
                (isset($_POST[ 'sbi_hover_inc_likes' ]) ) ? $sbi_hover_inc_likes = $_POST[ 'sbi_hover_inc_likes' ] : $sbi_hover_inc_likes = '';

                if (isset($_POST[ 'sb_instagram_sort' ]) ) $sb_instagram_sort = $_POST[ 'sb_instagram_sort' ];
                (isset($_POST[ 'sb_instagram_disable_lightbox' ]) ) ? $sb_instagram_disable_lightbox = $_POST[ 'sb_instagram_disable_lightbox' ] : $sb_instagram_disable_lightbox = '';
                (isset($_POST[ 'sb_instagram_captionlinks' ]) ) ? $sb_instagram_captionlinks = $_POST[ 'sb_instagram_captionlinks' ] : $sb_instagram_captionlinks = '';
                if (isset($_POST[ 'sb_instagram_background' ]) ) $sb_instagram_background = $_POST[ 'sb_instagram_background' ];
                isset($_POST[ 'sb_instagram_show_btn' ]) ? $sb_instagram_show_btn = $_POST[ 'sb_instagram_show_btn' ] : $sb_instagram_show_btn = '';
                if (isset($_POST[ 'sb_instagram_btn_background' ]) ) $sb_instagram_btn_background = $_POST[ 'sb_instagram_btn_background' ];
                if (isset($_POST[ 'sb_instagram_btn_text_color' ]) ) $sb_instagram_btn_text_color = $_POST[ 'sb_instagram_btn_text_color' ];
                if (isset($_POST[ 'sb_instagram_btn_text' ]) ) $sb_instagram_btn_text = sanitize_text_field( $_POST[ 'sb_instagram_btn_text' ] );
                if (isset($_POST[ 'sb_instagram_image_res' ]) ) $sb_instagram_image_res = $_POST[ 'sb_instagram_image_res' ];
                if (isset($_POST[ 'sb_instagram_media_type' ]) ) $sb_instagram_media_type = $_POST[ 'sb_instagram_media_type' ];
                if (isset($_POST[ 'sb_instagram_hide_photos' ]) ) $sb_instagram_hide_photos = $_POST[ 'sb_instagram_hide_photos' ];
                if (isset($_POST[ 'sb_instagram_block_users' ]) ) $sb_instagram_block_users = $_POST[ 'sb_instagram_block_users' ];

                if (isset($_POST[ 'sb_instagram_ex_apply_to' ]) ) $sb_instagram_ex_apply_to = $_POST[ 'sb_instagram_ex_apply_to' ];
                if (isset($_POST[ 'sb_instagram_inc_apply_to' ]) ) $sb_instagram_inc_apply_to = $_POST[ 'sb_instagram_inc_apply_to' ];

                if ($sb_instagram_ex_apply_to === 'all') {
                    if (isset($_POST[ 'sb_instagram_exclude_words' ]) ) $sb_instagram_exclude_words = sanitize_text_field( $_POST[ 'sb_instagram_exclude_words' ] );
                } else {
                    $sb_instagram_exclude_words = '';
                }
                if ($sb_instagram_inc_apply_to === 'all') {
                    if (isset($_POST[ 'sb_instagram_include_words' ]) ) $sb_instagram_include_words = sanitize_text_field( $_POST[ 'sb_instagram_include_words' ] );
                } else {
                    $sb_instagram_include_words = '';
                }
                if (isset($_POST[ 'sb_instagram_show_users' ]) ) $sb_instagram_show_users = sanitize_text_field( $_POST[ 'sb_instagram_show_users' ] );

                //Text
                isset($_POST[ 'sb_instagram_show_caption' ]) ? $sb_instagram_show_caption = $_POST[ 'sb_instagram_show_caption' ] : $sb_instagram_show_caption = '';
                if (isset($_POST[ 'sb_instagram_caption_length' ]) ) $sb_instagram_caption_length = sanitize_text_field( $_POST[ 'sb_instagram_caption_length' ] );
                if (isset($_POST[ 'sb_instagram_caption_color' ]) ) $sb_instagram_caption_color = $_POST[ 'sb_instagram_caption_color' ];
                if (isset($_POST[ 'sb_instagram_caption_size' ]) ) $sb_instagram_caption_size = $_POST[ 'sb_instagram_caption_size' ];
                //Meta
                isset($_POST[ 'sb_instagram_show_meta' ]) ? $sb_instagram_show_meta = $_POST[ 'sb_instagram_show_meta' ] : $sb_instagram_show_meta = '';
                if (isset($_POST[ 'sb_instagram_meta_color' ]) ) $sb_instagram_meta_color = $_POST[ 'sb_instagram_meta_color' ];
                if (isset($_POST[ 'sb_instagram_meta_size' ]) ) $sb_instagram_meta_size = $_POST[ 'sb_instagram_meta_size' ];
                //Header
                isset($_POST[ 'sb_instagram_show_header' ]) ? $sb_instagram_show_header = $_POST[ 'sb_instagram_show_header' ] : $sb_instagram_show_header = '';
                if (isset($_POST[ 'sb_instagram_header_color' ]) ) $sb_instagram_header_color = $_POST[ 'sb_instagram_header_color' ];
                if (isset($_POST[ 'sb_instagram_header_style' ]) ) $sb_instagram_header_style = $_POST[ 'sb_instagram_header_style' ];
                isset($_POST[ 'sb_instagram_show_followers' ]) ? $sb_instagram_show_followers = $_POST[ 'sb_instagram_show_followers' ] : $sb_instagram_show_followers = '';
                isset($_POST[ 'sb_instagram_show_bio' ]) ? $sb_instagram_show_bio = $_POST[ 'sb_instagram_show_bio' ] : $sb_instagram_show_bio = '';
                if (isset($_POST[ 'sb_instagram_header_primary_color' ]) ) $sb_instagram_header_primary_color = $_POST[ 'sb_instagram_header_primary_color' ];
                if (isset($_POST[ 'sb_instagram_header_secondary_color' ]) ) $sb_instagram_header_secondary_color = $_POST[ 'sb_instagram_header_secondary_color' ];

                //Follow button
                isset($_POST[ 'sb_instagram_show_follow_btn' ]) ? $sb_instagram_show_follow_btn = $_POST[ 'sb_instagram_show_follow_btn' ] : $sb_instagram_show_follow_btn = '';
                isset($_POST[ 'sb_instagram_moderation_mode' ]) ? $sb_instagram_moderation_mode = $_POST[ 'sb_instagram_moderation_mode' ] : $sb_instagram_moderation_mode = '';
                if (isset($_POST[ 'sb_instagram_folow_btn_background' ]) ) $sb_instagram_folow_btn_background = $_POST[ 'sb_instagram_folow_btn_background' ];
                if (isset($_POST[ 'sb_instagram_follow_btn_text_color' ]) ) $sb_instagram_follow_btn_text_color = $_POST[ 'sb_instagram_follow_btn_text_color' ];
                if (isset($_POST[ 'sb_instagram_follow_btn_text' ]) ) $sb_instagram_follow_btn_text = sanitize_text_field( $_POST[ 'sb_instagram_follow_btn_text' ] );

                //AutoScroll
                isset($_POST[ 'sb_instagram_autoscroll' ]) ? $sb_instagram_autoscroll = $_POST[ 'sb_instagram_autoscroll' ] : $sb_instagram_autoscroll = '';
                if (isset($_POST[ 'sb_instagram_autoscrolldistance' ]) ) $sb_instagram_autoscrolldistance = sanitize_text_field( $_POST[ 'sb_instagram_autoscrolldistance' ] );
                //Misc
                if (isset($_POST[ 'sb_instagram_custom_css' ]) ) $sb_instagram_custom_css = $_POST[ 'sb_instagram_custom_css' ];
                if (isset($_POST[ 'sb_instagram_custom_js' ]) ) $sb_instagram_custom_js = $_POST[ 'sb_instagram_custom_js' ];
                if (isset($_POST[ 'sb_instagram_requests_max' ]) ) $sb_instagram_requests_max = $_POST[ 'sb_instagram_requests_max' ];
                if (isset($_POST[ 'sb_instagram_cron' ]) ) $sb_instagram_cron = $_POST[ 'sb_instagram_cron' ];
                isset($_POST[ 'sb_instagram_disable_font' ]) ? $sb_instagram_disable_font = $_POST[ 'sb_instagram_disable_font' ] : $sb_instagram_disable_font = '';
                isset($_POST[ 'check_api' ]) ? $check_api = $_POST[ 'check_api' ] : $check_api = '';
                isset($_POST[ 'enqueue_css_in_shortcode' ]) ? $enqueue_css_in_shortcode = $_POST[ 'enqueue_css_in_shortcode' ] : $enqueue_css_in_shortcode = '';

                //Carousel
                isset($_POST[ 'sb_instagram_carousel' ]) ? $sb_instagram_carousel = $_POST[ 'sb_instagram_carousel' ] : $sb_instagram_carousel = '';
                isset($_POST[ 'sb_instagram_carousel_arrows' ]) ? $sb_instagram_carousel_arrows = $_POST[ 'sb_instagram_carousel_arrows' ] : $sb_instagram_carousel_arrows = '';
                isset($_POST[ 'sb_instagram_carousel_pag' ]) ? $sb_instagram_carousel_pag = $_POST[ 'sb_instagram_carousel_pag' ] : $sb_instagram_carousel_pag = '';
                isset($_POST[ 'sb_instagram_carousel_autoplay' ]) ? $sb_instagram_carousel_autoplay = $_POST[ 'sb_instagram_carousel_autoplay' ] : $sb_instagram_carousel_autoplay = '';
                if (isset($_POST[ 'sb_instagram_carousel_interval' ]) ) $sb_instagram_carousel_interval = sanitize_text_field( $_POST[ 'sb_instagram_carousel_interval' ] );


                //Customize
                $options[ 'sb_instagram_width' ] = $sb_instagram_width;
                $options[ 'sb_instagram_width_unit' ] = $sb_instagram_width_unit;
                $options[ 'sb_instagram_feed_width_resp' ] = $sb_instagram_feed_width_resp;
                $options[ 'sb_instagram_height' ] = $sb_instagram_height;
                $options[ 'sb_instagram_height_unit' ] = $sb_instagram_height_unit;
                $options[ 'sb_instagram_num' ] = $sb_instagram_num;
	            $options[ 'sb_instagram_nummobile' ] = $sb_instagram_nummobile;
	            $options[ 'sb_instagram_cols' ] = $sb_instagram_cols;
	            $options[ 'sb_instagram_colsmobile' ] = $sb_instagram_colsmobile;
                $options[ 'sb_instagram_image_padding' ] = $sb_instagram_image_padding;
                $options[ 'sb_instagram_image_padding_unit' ] = $sb_instagram_image_padding_unit;

                //Lightbox Comments
                $options[ 'sb_instagram_lightbox_comments' ] = $sb_instagram_lightbox_comments;
                $options[ 'sb_instagram_num_comments' ] = $sb_instagram_num_comments;

                //Photo hover style
                $options[ 'sb_instagram_hover_effect' ] = $sb_instagram_hover_effect;
                $options[ 'sb_hover_background' ] = $sb_hover_background;
                $options[ 'sb_hover_text' ] = $sb_hover_text;
                $options[ 'sbi_hover_inc_username' ] = $sbi_hover_inc_username;
                $options[ 'sbi_hover_inc_icon' ] = $sbi_hover_inc_icon;
                $options[ 'sbi_hover_inc_date' ] = $sbi_hover_inc_date;
                $options[ 'sbi_hover_inc_instagram' ] = $sbi_hover_inc_instagram;
                $options[ 'sbi_hover_inc_location' ] = $sbi_hover_inc_location;
                $options[ 'sbi_hover_inc_caption' ] = $sbi_hover_inc_caption;
                $options[ 'sbi_hover_inc_likes' ] = $sbi_hover_inc_likes;

                $options[ 'sb_instagram_sort' ] = $sb_instagram_sort;
                $options[ 'sb_instagram_disable_lightbox' ] = $sb_instagram_disable_lightbox;
                $options[ 'sb_instagram_captionlinks' ] = $sb_instagram_captionlinks;
                $options[ 'sb_instagram_background' ] = $sb_instagram_background;
                $options[ 'sb_instagram_show_btn' ] = $sb_instagram_show_btn;
                $options[ 'sb_instagram_btn_background' ] = $sb_instagram_btn_background;
                $options[ 'sb_instagram_btn_text_color' ] = $sb_instagram_btn_text_color;
                $options[ 'sb_instagram_btn_text' ] = $sb_instagram_btn_text;
                $options[ 'sb_instagram_image_res' ] = $sb_instagram_image_res;
                $options[ 'sb_instagram_media_type' ] = $sb_instagram_media_type;
                $options[ 'sb_instagram_hide_photos' ] = $sb_instagram_hide_photos;
                $options[ 'sb_instagram_block_users' ] = $sb_instagram_block_users;
                $options[ 'sb_instagram_ex_apply_to' ] = $sb_instagram_ex_apply_to;
                $options[ 'sb_instagram_inc_apply_to' ] = $sb_instagram_inc_apply_to;

                $options[ 'sb_instagram_show_users' ] = $sb_instagram_show_users;
                $options[ 'sb_instagram_exclude_words' ] = $sb_instagram_exclude_words;
                $options[ 'sb_instagram_include_words' ] = $sb_instagram_include_words;

                //Text
                $options[ 'sb_instagram_show_caption' ] = $sb_instagram_show_caption;
                $options[ 'sb_instagram_caption_length' ] = $sb_instagram_caption_length;
                $options[ 'sb_instagram_caption_color' ] = $sb_instagram_caption_color;
                $options[ 'sb_instagram_caption_size' ] = $sb_instagram_caption_size;
                //Meta
                $options[ 'sb_instagram_show_meta' ] = $sb_instagram_show_meta;
                $options[ 'sb_instagram_meta_color' ] = $sb_instagram_meta_color;
                $options[ 'sb_instagram_meta_size' ] = $sb_instagram_meta_size;
                //Header
                $options[ 'sb_instagram_show_header' ] = $sb_instagram_show_header;
                $options[ 'sb_instagram_header_color' ] = $sb_instagram_header_color;
                $options[ 'sb_instagram_header_style' ] = $sb_instagram_header_style;
                $options[ 'sb_instagram_show_followers' ] = $sb_instagram_show_followers;
                $options[ 'sb_instagram_show_bio' ] = $sb_instagram_show_bio;
                $options[ 'sb_instagram_header_primary_color' ] = $sb_instagram_header_primary_color;
                $options[ 'sb_instagram_header_secondary_color' ] = $sb_instagram_header_secondary_color;

                //Follow button
                $options[ 'sb_instagram_show_follow_btn' ] = $sb_instagram_show_follow_btn;
                $options[ 'sb_instagram_moderation_mode' ] = $sb_instagram_moderation_mode;
                $options[ 'sb_instagram_folow_btn_background' ] = $sb_instagram_folow_btn_background;
                $options[ 'sb_instagram_follow_btn_text_color' ] = $sb_instagram_follow_btn_text_color;
                $options[ 'sb_instagram_follow_btn_text' ] = $sb_instagram_follow_btn_text;
                //AutoScroll
                $options[ 'sb_instagram_autoscroll' ] = $sb_instagram_autoscroll;
                $options[ 'sb_instagram_autoscrolldistance' ] = $sb_instagram_autoscrolldistance;

                //Misc
                $options[ 'sb_instagram_custom_css' ] = $sb_instagram_custom_css;
                $options[ 'sb_instagram_custom_js' ] = $sb_instagram_custom_js;
                $options[ 'sb_instagram_requests_max' ] = $sb_instagram_requests_max;
                $options[ 'sb_instagram_cron' ] = $sb_instagram_cron;
                $options[ 'sb_instagram_disable_font' ] = $sb_instagram_disable_font;
                $options[ 'check_api' ] = $check_api;
                $options['enqueue_css_in_shortcode'] = $enqueue_css_in_shortcode;

                //Carousel
                $options[ 'sb_instagram_carousel' ] = $sb_instagram_carousel;
                $options[ 'sb_instagram_carousel_arrows' ] = $sb_instagram_carousel_arrows;
                $options[ 'sb_instagram_carousel_pag' ] = $sb_instagram_carousel_pag;
                $options[ 'sb_instagram_carousel_autoplay' ] = $sb_instagram_carousel_autoplay;
                $options[ 'sb_instagram_carousel_interval' ] = $sb_instagram_carousel_interval;

                //Delete all SBI transients
                global $wpdb;
                $table_name = $wpdb->prefix . "options";
                $wpdb->query( "
                    DELETE
                    FROM $table_name
                    WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
                    " );
                $wpdb->query( "
                    DELETE
                    FROM $table_name
                    WHERE `option_name` LIKE ('%\_transient\_timeout\_sbi\_%')
                    " );


                if( $sb_instagram_cron == 'no' ) wp_clear_scheduled_hook('sb_instagram_cron_job');

                //Run cron when Misc settings are saved
                if( $sb_instagram_cron == 'yes' ){
                    //Clear the existing cron event
                    wp_clear_scheduled_hook('sb_instagram_cron_job');

                    $sb_instagram_cache_time = $options[ 'sb_instagram_cache_time' ];
                    $sb_instagram_cache_time_unit = $options[ 'sb_instagram_cache_time_unit' ];

                    //Set the event schedule based on what the caching time is set to
                    $sb_instagram_cron_schedule = 'hourly';
                    if( $sb_instagram_cache_time_unit == 'hours' && $sb_instagram_cache_time > 5 ) $sb_instagram_cron_schedule = 'twicedaily';
                    if( $sb_instagram_cache_time_unit == 'days' ) $sb_instagram_cron_schedule = 'daily';

                    $options[ 'sb_instagram_cache_time' ] = 3;
                    $options[ 'sb_instagram_cache_time_unit' ] = 'days';

                    wp_schedule_event(time(), $sb_instagram_cron_schedule, 'sb_instagram_cron_job');

                    sb_instagram_clear_page_caches();
                }


            } //End customize tab post

            //Save the settings to the settings array
            update_option( 'sb_instagram_settings', $options );
            $sb_instagram_using_custom_sizes = get_option( 'sb_instagram_using_custom_sizes');
            if ( isset( $_POST['sb_instagram_using_custom_sizes'] ) ) {
                $sb_instagram_using_custom_sizes = (int)$_POST['sb_instagram_using_custom_sizes'];
            } elseif( isset( $_GET[ 'tab' ] ) && $_GET[ 'tab' ] === 'customize' ) {
	            $sb_instagram_using_custom_sizes = false;
            }
            update_option( 'sb_instagram_using_custom_sizes', $sb_instagram_using_custom_sizes );

        ?>
        <div class="updated"><p><strong><?php _e('Settings saved.', 'instagram-feed-pro' ); ?></strong></p></div>
        <?php } ?>

    <?php } //End nonce check ?>


    <div id="sbi_admin" class="wrap">

        <div id="header">
            <h1><?php _e('Instagram Feed Pro'); ?></h1>
        </div>

        <?php sbi_expiration_notice(); ?>

        <form name="form1" method="post" action="">
            <input type="hidden" name="<?php echo $sb_instagram_settings_hidden_field; ?>" value="Y">
            <?php wp_nonce_field( 'sb_instagram_pro_saving_settings', 'sb_instagram_pro_settings_nonce' ); ?>

            <?php $sbi_active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'configure'; ?>
            <h2 class="nav-tab-wrapper">
                <a href="?page=sb-instagram-feed&amp;tab=configure" class="nav-tab <?php echo $sbi_active_tab == 'configure' ? 'nav-tab-active' : ''; ?>"><?php _e('1. Configure'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=customize" class="nav-tab <?php echo $sbi_active_tab == 'customize' ? 'nav-tab-active' : ''; ?>"><?php _e('2. Customize'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=display" class="nav-tab <?php echo $sbi_active_tab == 'display' ? 'nav-tab-active' : ''; ?>"><?php _e('3. Display Your Feed'); ?></a>
                <a href="?page=sb-instagram-feed&amp;tab=support" class="nav-tab <?php echo $sbi_active_tab == 'support' ? 'nav-tab-active' : ''; ?>"><?php _e('Support'); ?></a>
                <a href="?page=sb-instagram-license" class="nav-tab"><?php _e('License'); ?></a>
            </h2>

            <?php if( $sbi_active_tab == 'configure' ) { //Start Configure tab ?>
            <input type="hidden" name="<?php echo $sb_instagram_configure_hidden_field; ?>" value="Y">

            <table class="form-table">
                <tbody>
                    <h3><?php _e('Configure'); ?></h3>

                    <div id="sbi_config">
                        <a href="https://instagram.com/oauth/authorize/?client_id=3a81a9fa2a064751b8c31385b91cc25c&scope=basic+public_content&redirect_uri=https://smashballoon.com/instagram-feed/instagram-token-plugin/?return_uri=<?php echo admin_url('admin.php?page=sb-instagram-feed'); ?>&response_type=token" class="sbi_admin_btn"><?php _e('Log in and get my Access Token and User ID'); ?></a>
                        <a href="https://smashballoon.com/instagram-feed/token/" target="_blank" style="position: relative; top: 14px; left: 15px;"><?php _e('Button not working?', 'instagram-feed-pro'); ?></a>
                    </div>

                    <tr valign="top">
                        <th scope="row"><label><?php _e('Access Token'); ?></label></th>
                        <td>
                            <input name="sb_instagram_at" id="sb_instagram_at" type="text" value="<?php esc_attr_e( $sb_instagram_at ); ?>" size="60" placeholder="Click button above to get your Access Token" />
                            &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("In order to display your photos you need an Access Token from Instagram. To get yours, simply click the button above and log into Instagram. You can also use the button on <a href='https://smashballoon.com/instagram-feed/token/' target='_blank'>this page</a>."); ?></p>
                        </td>
                    </tr>

                    <tr valign="top">
                        <th scope="row"><label><?php _e('Show Photos From:'); ?></label><code class="sbi_shortcode"> type
                            Eg: type=user id=12986477
                            Eg: type=hashtag hashtag="dogs"
                            Eg: type=location location=213456451
                            Eg: type=coordinates coordinates="(25.76,-80.19,500)"</code></th>
                        <td>
                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" id="sb_instagram_type_user" value="user" <?php if($sb_instagram_type == "user") echo "checked"; ?> />
                                    <label class="sbi_radio_label" for="sb_instagram_type_user">User ID:</label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_user_id" id="sb_instagram_user_id" type="text" value="<?php esc_attr_e( $sb_instagram_user_id ); ?>" size="45" placeholder="Eg: 13460080" />
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("This is the <b>numeric ID</b> of the Instagram account you want to display photos from. To get your ID simply click on the button above and log into Instagram.<br /><br />You can also display photos from other peoples Instagram accounts. To find their User ID you can use <a href='https://smashballoon.com/instagram-feed/find-instagram-user-id/' target='_blank'>this tool</a>."); ?></p>
                                    <div class="sbi_notice sbi_user_id_error">
                                        <?php _e("<p>Please be sure to enter your numeric <b>User ID</b> and not your Username. You can find your User ID by clicking the blue Instagram Login button above, or by entering your username into <a href='https://smashballoon.com/instagram-feed/find-instagram-user-id/' target='_blank'>this tool</a>.</p>"); ?>
                                    </div>
                                </div>

                            </div>



                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" id="sb_instagram_type_hashtag" value="hashtag" <?php if($sb_instagram_type == "hashtag") echo "checked"; ?> />
                                    <label class="sbi_radio_label" for="sb_instagram_type_hashtag">Hashtag:</label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_hashtag" id="sb_instagram_hashtag" type="text" value="<?php esc_attr_e( $sb_instagram_hashtag ); ?>" size="45" placeholder="Eg: balloon" />
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("Display photos from a specific hashtag instead of from a user. Separate multiple hashtags using commas."); ?></p>
                                </div>
                            </div>

                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" id="sb_instagram_type_self_likes" value="liked" <?php if($sb_instagram_type == "liked") echo "checked"; ?> />
                                    <label class="sbi_radio_label" for="sb_instagram_type_self_likes">Liked:</label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_type_self_likes" id="sb_instagram_type_self_likes" type="text" value="<?php esc_attr_e( $sb_instagram_type_self_likes ); ?>" size="45" disabled />
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("Display posts that your user has liked. Note, that this is for the user that the Access Token is associated with and so will only display posts liked by the account that you obtained your Access Token through."); ?></p>
                                </div>
                            </div>

                            <div class="sbi_row sbi_single_directions">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" disabled />
                                    <label class="sbi_radio_label">Single Posts:</label>
                                </div>
                                <div class="sbi_col sbi_two" style="position: relative;">
                                    <input type="text" size="45" disabled />
                                    <div class="sbi_click_area"></div>
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("Directions"); ?></a>
                                    <p class="sbi_tooltip"><?php _e('You can display a feed comprised of specific single posts by using the <code>single</code> shortcode setting. To use this, first set the feed "type" to be "single", then paste the ID of the post(s) into the <code>single</code> shortcode setting, like so:<br /><br /><code>[instagram-feed type="single" single="sbi_1349591022052854916_10145706"]</code><br /><br />You can find the post ID by clicking on a photo in your feed (while logged in as a site administrator) and then clicking the "Hide Photo" link in the popup lightbox. This will display the ID of the post (<a href="https://smashballoon.com/wp-content/uploads/2015/01/hide-photo-link.jpg" target="_blank">screenshot</a>). Separate multiple IDs by using commas.'); ?></p>
                                </div>
                            </div>

                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" id="sb_instagram_type_location" value="location" <?php if($sb_instagram_type == "location") echo "checked"; ?> />
                                    <label class="sbi_radio_label" for="sb_instagram_type_location">Location ID:</label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_location" id="sb_instagram_location" type="text" value="<?php esc_attr_e( $sb_instagram_location ); ?>" size="45" placeholder="Eg: 213456451" />
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("Display photos from a specific location ID. You can find the ID of a location in the URL of the location on Instagram. For example; the ID for <a href='https://instagram.com/explore/locations/251659598/' target='_blank'>this location</a> would be <b>251659598</b>."); ?></p>
                                </div>
                            </div>
                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <input type="radio" name="sb_instagram_type" id="sb_instagram_type_coordinates" value="coordinates" <?php if($sb_instagram_type == "coordinates") echo "checked"; ?> />
                                    <label class="sbi_radio_label" for="sb_instagram_type_coordinates">Coordinates:</label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_coordinates" id="sb_instagram_coordinates" type="text" value="<?php esc_attr_e( $sb_instagram_coordinates ); ?>" size="45" placeholder="Eg: (51.507351,-0.127758,1000)" />
                                    &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("Display photos from specific location coordinates. Enter coordinates into this field using the following format: <code>(latitude,longitude,distance)</code>. For help adding coordinates just click the <b>'Add coordinates helper'</b> button below. You can add multiple coordinates by separating them with commas: <code>(lat,long,dist),(lat,long,dist)</code>."); ?></p>
                                    <br /><a href="javascript:void(0);" class="button button-secondary" id="sb_instagram_new_coordinates"><b>+</b> Add coordinates helper</a>
                                    <div id="sb_instagram_coordinates_options">

                                            <div class="sbi_row">
                                                <div class="sbi_col sbi_one"><label for="sb_instagram_lat">Latitude:</label></div>
                                                <input name="sb_instagram_lat" id="sb_instagram_lat" type="text" size="20" placeholder="Eg: 51.507346" />
                                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                                <p class="sbi_tooltip"><?php _e("The <strong>latitude</strong> coordinate of your location. You can use <a href='http://www.latlong.net/' target='_blank'>this website</a> to find the coordinates of any location."); ?></p>
                                            </div>
                                            <div class="sbi_row">
                                                <div class="sbi_col sbi_one"><label for="sb_instagram_long">Longitude:</label></div>
                                                <input name="sb_instagram_long" id="sb_instagram_long" type="text" size="20" placeholder="Eg: -0.127761" />
                                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                                <p class="sbi_tooltip"><?php _e("The <strong>longitude</strong> coordinate of your location. You can use <a href='http://www.latlong.net/' target='_blank'>this website</a> to find the coordinates of any location."); ?></p>
                                            </div>
                                            <div class="sbi_row">
                                                <div class="sbi_col sbi_one"><label for="sb_instagram_dist">Distance:</label></div>
                                                <input name="sb_instagram_dist" id="sb_instagram_dist" type="text" size="6" placeholder="Eg: 2000" value="1000" /><span>meters</span>
                                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                                <p class="sbi_tooltip"><?php _e("The distance (in meters) from your coordinates that you'd like to display photos from. Specifying 2000 meters would only show photos from within a 2000 meter radius of your location (1600 meters = 1 mile). The maximum value is 5000."); ?></p>
                                            </div>
                                        <!-- </div> -->

                                        <div class="sbi_row">
                                            <a href="javascript:void(0);" class="button button-primary" id="sb_instagram_add_location" style="margin-top: 7px;">Add coordinates</a>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="sbi_row">
                                <span class="sbi_note" style="margin: 10px 0 0 0; display: block;"><?php _e('Separate multiple IDs, hashtags, or locations using commas'); ?></span>
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <th class="bump-left"><label class="bump-left"><?php _e("Preserve settings when plugin is removed"); ?></label></th>
                        <td>
                            <input name="sb_instagram_preserve_settings" type="checkbox" id="sb_instagram_preserve_settings" <?php if($sb_instagram_preserve_settings == true) echo "checked"; ?> />
                            <label for="sb_instagram_preserve_settings"><?php _e('Yes'); ?></label>
                            <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                            <p class="sbi_tooltip"><?php _e('When removing the plugin your settings are automatically erased. Checking this box will prevent any settings from being deleted. This means that you can uninstall and reinstall the plugin without losing your settings.'); ?></p>
                        </td>
                    </tr>

                    <tr>
                        <th class="bump-left"><label class="bump-left"><?php _e("Are you using an Ajax powered theme?"); ?></label><code class="sbi_shortcode"> ajaxtheme
                            Eg: ajaxtheme=true</code></th>
                        <td>
                            <input name="sb_instagram_ajax_theme" type="checkbox" id="sb_instagram_ajax_theme" <?php if($sb_instagram_ajax_theme == true) echo "checked"; ?> />
                            <label for="sb_instagram_ajax_theme"><?php _e('Yes'); ?></label>
                            <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                            <p class="sbi_tooltip"><?php _e("When navigating your site, if your theme uses Ajax to load content into your pages (meaning your page doesn't refresh) then check this setting. If you're not sure then it's best to leave this setting unchecked while checking with your theme author, otherwise checking it may cause a problem."); ?></p>
                        </td>
                    </tr>

                    <tr valign="top">
                        <th scope="row"><label><?php _e('Check for new posts every'); ?></label></th>
                        <td>
                            <input name="sb_instagram_cache_time" type="text" value="<?php esc_attr_e( $sb_instagram_cache_time ); ?>" size="4" />
                            <select name="sb_instagram_cache_time_unit">
                                <option value="minutes" <?php if($sb_instagram_cache_time_unit == "minutes") echo 'selected="selected"' ?> ><?php _e('Minutes'); ?></option>
                                <option value="hours" <?php if($sb_instagram_cache_time_unit == "hours") echo 'selected="selected"' ?> ><?php _e('Hours'); ?></option>
                                <option value="days" <?php if($sb_instagram_cache_time_unit == "days") echo 'selected="selected"' ?> ><?php _e('Days'); ?></option>
                            </select>
                            <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                            <p class="sbi_tooltip"><?php _e('Your Instagram posts are temporarily cached by the plugin in your WordPress database. You can choose how long the posts should be cached for. If you set the time to 1 hour then the plugin will clear the cache after that length of time and check Instagram for posts again.'); ?></p>
                        </td>
                    </tr>

                </tbody>
            </table>

            <?php submit_button(); ?>
        </form>

        <p><i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp; <?php _e('Next Step: <a href="?page=sb-instagram-feed&tab=customize">Customize your Feed</a>'); ?></p>
        <p><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <?php _e('Need help setting up the plugin? Check out our <a href="https://smashballoon.com/instagram-feed/docs/" target="_blank">setup directions</a>'); ?></p>


    <?php } // End Configure tab ?>



    <?php if( $sbi_active_tab == 'customize' ) { //Start Configure tab ?>

    <p class="sb_instagram_contents_links" id="general">
        <span><?php _e('Jump to:'); ?> </span>
        <a href="#general">General</a>
        <a href="#layout">Layout</a>
        <a href="#photos">Photos</a>
        <a href="#hover">Photo Hover Style</a>
        <a href="#carousel">Carousel</a>
        <a href="#headeroptions">Header</a>
        <a href="#caption">Caption</a>
        <a href="#likes">Likes &amp; Comments Icons</a>
        <a href="#comments">Lightbox Comments</a>
        <a href="#loadmore">'Load More' Button</a>
        <a href="#follow">'Follow' Button</a>
        <a href="#autoscroll">Auto Load More</a>
        <a href="#filtering">Post Filtering</a>
        <a href="#moderation">Moderation</a>
        <a href="#misc">Misc</a>
    </p>

    <input type="hidden" name="<?php echo $sb_instagram_customize_hidden_field; ?>" value="Y">

        <h3><?php _e('General'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Width of Feed'); ?></label><code class="sbi_shortcode"> width  widthunit
                        Eg: width=50 widthunit=%</code></th>
                    <td>
                        <input name="sb_instagram_width" type="text" value="<?php esc_attr_e( $sb_instagram_width ); ?>" id="sb_instagram_width" size="4" />
                        <select name="sb_instagram_width_unit" id="sb_instagram_width_unit">
                            <option value="px" <?php if($sb_instagram_width_unit == "px") echo 'selected="selected"' ?> ><?php _e('px'); ?></option>
                            <option value="%" <?php if($sb_instagram_width_unit == "%") echo 'selected="selected"' ?> ><?php _e('%'); ?></option>
                        </select>
                        <div id="sb_instagram_width_options">
                            <input name="sb_instagram_feed_width_resp" type="checkbox" id="sb_instagram_feed_width_resp" <?php if($sb_instagram_feed_width_resp == true) echo "checked"; ?> /><label for="sb_instagram_feed_width_resp"><?php _e('Set to be 100% width on mobile?'); ?></label>
                            <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                            <p class="sbi_tooltip"><?php _e("If you set a width on the feed then this will be used on mobile as well as desktop. Check this setting to set the feed width to be 100% on mobile so that it is responsive."); ?></p>
                        </div>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Height of Feed'); ?></label><code class="sbi_shortcode"> height  heightunit
                        Eg: height=500 heightunit=px</code></th>
                    <td>
                        <input name="sb_instagram_height" type="text" value="<?php esc_attr_e( $sb_instagram_height ); ?>" size="4" />
                        <select name="sb_instagram_height_unit">
                            <option value="px" <?php if($sb_instagram_height_unit == "px") echo 'selected="selected"' ?> ><?php _e('px'); ?></option>
                            <option value="%" <?php if($sb_instagram_height_unit == "%") echo 'selected="selected"' ?> ><?php _e('%'); ?></option>
                        </select>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Background Color'); ?></label><code class="sbi_shortcode"> background
                        Eg: background=d89531</code></th>
                    <td>
                        <input name="sb_instagram_background" type="text" value="<?php esc_attr_e( $sb_instagram_background ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="layout" />
        <h3><?php _e('Layout'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Number of Photos'); ?></label><code class="sbi_shortcode"> num
                        Eg: num=6</code></th>
                    <td>
                        <input name="sb_instagram_num" type="text" value="<?php esc_attr_e( $sb_instagram_num ); ?>" size="4" />
                        <span class="sbi_note"><?php _e('Number of photos to show initially'); ?></span>
                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                        <p class="sbi_tooltip"><?php _e("This is the number of photos which will be displayed initially and also the number which will be loaded in when you click on the 'Load More' button in your feed. For optimal performance it is recommended not to set this higher than 50."); ?></p>
                        <br>
                        <a href="javascript:void(0);" class="sb_instagram_mobile_layout_reveal button-secondary"><?php esc_attr_e( 'Show Mobile Options' ); ?></a>
                        <br>
                        <div class="sb_instagram_mobile_layout_setting">
                            <p style="font-weight: bold; padding-bottom: 5px;">Number of Photos on Mobile</p>
                            <input name="sb_instagram_nummobile" type="number" value="<?php esc_attr_e( $sb_instagram_nummobile ); ?>" min="0" max="100" style="width: 50px;" />
                            <span class="sbi_note"><?php _e('Leave blank to use the same as above'); ?></span>
                        </div>
                        </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Number of Columns'); ?></label><code class="sbi_shortcode"> cols
                        Eg: cols=3</code></th>
                    <td>
                        <select name="sb_instagram_cols">
                            <option value="1" <?php if($sb_instagram_cols == "1") echo 'selected="selected"' ?> ><?php _e('1'); ?></option>
                            <option value="2" <?php if($sb_instagram_cols == "2") echo 'selected="selected"' ?> ><?php _e('2'); ?></option>
                            <option value="3" <?php if($sb_instagram_cols == "3") echo 'selected="selected"' ?> ><?php _e('3'); ?></option>
                            <option value="4" <?php if($sb_instagram_cols == "4") echo 'selected="selected"' ?> ><?php _e('4'); ?></option>
                            <option value="5" <?php if($sb_instagram_cols == "5") echo 'selected="selected"' ?> ><?php _e('5'); ?></option>
                            <option value="6" <?php if($sb_instagram_cols == "6") echo 'selected="selected"' ?> ><?php _e('6'); ?></option>
                            <option value="7" <?php if($sb_instagram_cols == "7") echo 'selected="selected"' ?> ><?php _e('7'); ?></option>
                            <option value="8" <?php if($sb_instagram_cols == "8") echo 'selected="selected"' ?> ><?php _e('8'); ?></option>
                            <option value="9" <?php if($sb_instagram_cols == "9") echo 'selected="selected"' ?> ><?php _e('9'); ?></option>
                            <option value="10" <?php if($sb_instagram_cols == "10") echo 'selected="selected"' ?> ><?php _e('10'); ?></option>
                        </select>
                        <br>
                        <a href="javascript:void(0);" class="sb_instagram_mobile_layout_reveal button-secondary"><?php esc_attr_e( 'Show Mobile Options' ); ?></a>
                        <br>
                        <div class="sb_instagram_mobile_layout_setting">

                            <p style="font-weight: bold; padding-bottom: 5px;">Number of Columns on Mobile</p>
                                <select name="sb_instagram_colsmobile">
                                    <option value="auto" <?php if($sb_instagram_colsmobile == "auto") echo 'selected="selected"' ?> ><?php _e('Auto'); ?></option>
                                    <option value="same" <?php if($sb_instagram_colsmobile == "same") echo 'selected="selected"' ?> ><?php _e('Same as desktop'); ?></option>
                                    <option value="1" <?php if($sb_instagram_colsmobile == "1") echo 'selected="selected"' ?> ><?php _e('1'); ?></option>
                                    <option value="2" <?php if($sb_instagram_colsmobile == "2") echo 'selected="selected"' ?> ><?php _e('2'); ?></option>
                                    <option value="3" <?php if($sb_instagram_colsmobile == "3") echo 'selected="selected"' ?> ><?php _e('3'); ?></option>
                                    <option value="4" <?php if($sb_instagram_colsmobile == "4") echo 'selected="selected"' ?> ><?php _e('4'); ?></option>
                                    <option value="5" <?php if($sb_instagram_colsmobile == "5") echo 'selected="selected"' ?> ><?php _e('5'); ?></option>
                                    <option value="6" <?php if($sb_instagram_colsmobile == "6") echo 'selected="selected"' ?> ><?php _e('6'); ?></option>
                                    <option value="7" <?php if($sb_instagram_colsmobile == "7") echo 'selected="selected"' ?> ><?php _e('7'); ?></option>
                                </select>
                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What does \"Auto\" mean?"); ?></a>
                                <p class="sbi_tooltip" style="padding: 10px 0 0 0;"><?php _e("This means that the plugin will automatically calculate how many columns to use for mobile based on the screen size and number of columns selected above. For example, a feed which is set to use 4 columns will show 2 columns for screen sizes less than 640 pixels and 1 column for screen sizes less than 480 pixels."); ?></p>
                        </div>
                        <?php /*var_dump($options);*/ if($sb_instagram_disable_mobile == true) $sb_instagram_colsmobile = 'same'; ?>

                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Padding around Images'); ?></label><code class="sbi_shortcode"> imagepadding  imagepaddingunit</code></th>
                    <td>
                        <input name="sb_instagram_image_padding" type="text" value="<?php esc_attr_e( $sb_instagram_image_padding ); ?>" size="4" />
                        <select name="sb_instagram_image_padding_unit">
                            <option value="px" <?php if($sb_instagram_image_padding_unit == "px") echo 'selected="selected"' ?> ><?php _e('px'); ?></option>
                            <option value="%" <?php if($sb_instagram_image_padding_unit == "%") echo 'selected="selected"' ?> ><?php _e('%'); ?></option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <?php submit_button(); ?>

        <hr id="photos" />
        <h3><?php _e('Photos'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Sort Photos By'); ?></label><code class="sbi_shortcode"> sortby
                        Eg: sortby=random</code></th>
                    <td>
                        <select name="sb_instagram_sort">
                            <option value="none" <?php if($sb_instagram_sort == "none") echo 'selected="selected"' ?> ><?php _e('Newest to oldest'); ?></option>
                            <option value="random" <?php if($sb_instagram_sort == "random") echo 'selected="selected"' ?> ><?php _e('Random'); ?></option>
                        </select>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Image Resolution'); ?></label><code class="sbi_shortcode"> imageres
                        Eg: imageres=thumb</code></th>
                    <td>
                    <?php
                    $sb_instagram_using_custom_sizes = get_option( 'sb_instagram_using_custom_sizes' );
                    $sb_standard_res_name = 'sb_instagram_image_res';
                    $sb_standard_res_class = '';
                    $sb_custom_res_name = '';
                    $sb_custom_res_class = ' style="display:none;"';
                    if ( $sb_instagram_using_custom_sizes == 1 ) {
                        $sb_custom_res_name = 'sb_instagram_image_res';
                        $sb_standard_res_name = '';
                        $sb_custom_res_class = '';
	                    $sb_standard_res_class = ' style="opacity:.5"';
                    }

                    ?>
                        <select id="sb_standard_res_settings" name="<?php echo $sb_standard_res_name; ?>"<?php echo $sb_standard_res_class; ?>>
                            <option value="auto" <?php if($sb_instagram_image_res == "auto") echo 'selected="selected"' ?> ><?php _e('Auto-detect (recommended)'); ?></option>
                            <option value="thumb" <?php if($sb_instagram_image_res == "thumb") echo 'selected="selected"' ?> ><?php _e('Thumbnail (150x150)'); ?></option>
                            <option value="medium" <?php if($sb_instagram_image_res == "medium") echo 'selected="selected"' ?> ><?php _e('Medium (306x306)'); ?></option>
                            <option value="full" <?php if($sb_instagram_image_res == "full") echo 'selected="selected"' ?> ><?php _e('Full size (640x640)'); ?></option>
                        </select>

                        &nbsp<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What does Auto-detect mean?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("Auto-detect means that the plugin automatically sets the image resolution based on the size of your feed."); ?></p>
                            <p>
                        <input value="1" type="checkbox" name="sb_instagram_using_custom_sizes" id="sb_instagram_using_custom_sizes" <?php if($sb_instagram_using_custom_sizes == 1) echo 'checked="checked"' ?> /><label for="sb_instagram_using_custom_sizes"><?php _e('Use a Custom Image Size'); ?></label>
                            </p>
                        <p class="sbi_extra_info"><?php _e("Custom image sizes are not officially supported in Instagram's API. If custom image sizes are deprecated then the plugin will simply fall back to the closest supported image size so that your feed will not be disrupted. To use a custom size in a shortcode you can use the <code>imageres</code> setting, like so: <code>imageres=90</code>. This will display images at the 90x90 size."); ?></p>
                        <p>
                        <select id="sb_custom_res_settings" name="<?php echo $sb_custom_res_name; ?>"<?php echo $sb_custom_res_class; ?>>
                            <option value="auto" <?php if($sb_instagram_image_res == "auto") echo 'selected="selected"' ?> ><?php _e('Auto-detect (recommended)'); ?></option>
                            <?php
                            $sizes = array(30,40,50,60,80,90,100,120,130,150,160,180,190,200,240,270,280,320,350,360,390,480,540,600,640,720,750,800,810,960,1280);
                            foreach ( $sizes as $size ) : ?>
                                <option value="<?php echo $size; ?>" <?php if($sb_instagram_image_res == $size) echo 'selected="selected"' ?> ><?php echo $size.'x'.$size; ?></option>
                            <?php endforeach; ?>
                        </select>
                        </p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Media Type to Display'); ?></label><code class="sbi_shortcode"> media
                        Eg: media=photos
                        media=videos
                        media=all</code></th>
                    <td>
                        <select name="sb_instagram_media_type">
                            <option value="all" <?php if($sb_instagram_media_type == "all") echo 'selected="selected"' ?> ><?php _e('All'); ?></option>
                            <option value="photos" <?php if($sb_instagram_media_type == "photos") echo 'selected="selected"' ?> ><?php _e('Photos only'); ?></option>
                            <option value="videos" <?php if($sb_instagram_media_type == "videos") echo 'selected="selected"' ?> ><?php _e('Videos only'); ?></option>
                        </select>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e("Disable Pop-up Lightbox"); ?></label><code class="sbi_shortcode"> disablelightbox
                        Eg: disablelightbox=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_disable_lightbox" id="sb_instagram_disable_lightbox" <?php if($sb_instagram_disable_lightbox == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e("Link Posts to URL in Caption (Shoppable feed)"); ?></label><code class="sbi_shortcode"> captionlinks
                            Eg: captionlinks=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_captionlinks" id="sb_instagram_captionlinks" <?php if($sb_instagram_captionlinks == true) echo 'checked="checked"' ?> />
                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What will this do?"); ?></a>
                        <p class="sbi_tooltip"><?php _e("Checking this box will change the link for each post to any url included in the caption for that Instagram post. The lightbox will be disabled. Visit <a href='https://smashballoon.com/make-a-shoppable-feed'>this link</a> to learn how this works."); ?></p>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="hover" />
        <h3><?php _e('Photo Hover Style'); ?></h3>

        <table class="form-table">
            <tbody>
                <!-- <tr valign="top">
                    <th scope="row"><label><?php _e('Hover Effect'); ?></label><code class="sbi_shortcode"> hovereffect
                        Eg: hovereffect=flip</code></th>
                    <td>
                        <select name="sb_instagram_hover_effect">
                            <option value="fade" <?php if($sb_instagram_hover_effect == "fade") echo 'selected="selected"' ?> ><?php _e('Fade'); ?></option>
                            <option value="flip" <?php if($sb_instagram_hover_effect == "flip") echo 'selected="selected"' ?> ><?php _e('Flip'); ?></option>
                            <option value="none" <?php if($sb_instagram_hover_effect == "none") echo 'selected="selected"' ?> ><?php _e('None'); ?></option>
                        </select>
                    </td>
                </tr> -->
                <tr valign="top">
                    <th scope="row"><label><?php _e('Hover Background Color'); ?></label><code class="sbi_shortcode"> hovercolor
                        Eg: hovercolor=1e73be</code></th>
                    <td>
                        <input name="sb_hover_background" type="text" value="<?php esc_attr_e( $sb_hover_background ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Hover Text Color'); ?></label><code class="sbi_shortcode"> hovertextcolor
                        Eg: hovertextcolor=fff</code></th>
                    <td>
                        <input name="sb_hover_text" type="text" value="<?php esc_attr_e( $sb_hover_text ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Information to display'); ?></label><code class="sbi_shortcode"> hoverdisplay
                        Eg: hoverdisplay='username,date'

                        Options: username, icon, date, instagram, location, caption, likes</code></th>
                    <td>
                        <div>
                            <input name="sbi_hover_inc_username" type="checkbox" id="sbi_hover_inc_username" <?php if($sbi_hover_inc_username == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_username"><?php _e('Username'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_icon" type="checkbox" id="sbi_hover_inc_icon" <?php if($sbi_hover_inc_icon == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_icon"><?php _e('Expand Icon'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_date" type="checkbox" id="sbi_hover_inc_date" <?php if($sbi_hover_inc_date == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_date"><?php _e('Date'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_instagram" type="checkbox" id="sbi_hover_inc_instagram" <?php if($sbi_hover_inc_instagram == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_instagram"><?php _e('Instagram Icon/Link'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_location" type="checkbox" id="sbi_hover_inc_location" <?php if($sbi_hover_inc_location == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_location"><?php _e('Location'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_caption" type="checkbox" id="sbi_hover_inc_caption" <?php if($sbi_hover_inc_caption == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_caption"><?php _e('Caption'); ?></label>
                        </div>
                        <div>
                            <input name="sbi_hover_inc_likes" type="checkbox" id="sbi_hover_inc_likes" <?php if($sbi_hover_inc_likes == true) echo "checked"; ?> />
                            <label for="sbi_hover_inc_likes"><?php _e('Like/Comment Icons'); ?></label>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

        <?php submit_button(); ?>

        <hr id="carousel" />
        <h3><?php _e('Carousel'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Enable Carousel"); ?></label><code class="sbi_shortcode"> carousel
                        Eg: carousel=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_carousel" id="sb_instagram_carousel" <?php if($sb_instagram_carousel == true) echo 'checked="checked"' ?> />
                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("Enable this setting to create a carousel slider out of your photos."); ?></p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Navigation Arrows"); ?></label><code class="sbi_shortcode"> carouselarrows
                        Eg: carouselarrows=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_carousel_arrows" id="sb_instagram_carousel_arrows" <?php if($sb_instagram_carousel_arrows == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Pagination"); ?></label><code class="sbi_shortcode"> carouselpag
                        Eg: carouselpag=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_carousel_pag" id="sb_instagram_carousel_pag" <?php if($sb_instagram_carousel_pag == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Enable Autoplay"); ?></label><code class="sbi_shortcode"> carouselautoplay
                        Eg: carouselautoplay=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_carousel_autoplay" id="sb_instagram_carousel_autoplay" <?php if($sb_instagram_carousel_autoplay == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Interval Time"); ?></label><code class="sbi_shortcode"> carouseltime
                        Eg: carouseltime=8000</code></th>
                    <td>
                        <input name="sb_instagram_carousel_interval" type="text" value="<?php esc_attr_e( $sb_instagram_carousel_interval ); ?>" size="6" /><?php _e("miliseconds"); ?>
                    </td>
                </tr>

            </tbody>
        </table>

        <hr id="headeroptions" />
        <h3><?php _e("Header"); ?></h3>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show the Header"); ?></label><code class="sbi_shortcode"> showheader
                        Eg: showheader=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_header" id="sb_instagram_show_header" <?php if($sb_instagram_show_header == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Header Style'); ?></label><code class="sbi_shortcode"> headerstyle
                        Eg: headerstyle=boxed</code></th>
                    <td>
                        <select name="sb_instagram_header_style" id="sb_instagram_header_style" style="float: left;">
                            <option value="circle" <?php if($sb_instagram_header_style == "circle") echo 'selected="selected"' ?> ><?php _e('Circle'); ?></option>
                            <option value="boxed" <?php if($sb_instagram_header_style == "boxed") echo 'selected="selected"' ?> ><?php _e('Boxed'); ?></option>
                        </select>
                        <div id="sb_instagram_header_style_boxed_options">
                            <p><?php _e('Please select 2 background colors for your Boxed header:'); ?></p>
                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <label><?php _e('Primary Color'); ?></label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_header_primary_color" type="text" value="<?php esc_attr_e( $sb_instagram_header_primary_color ); ?>" class="sbi_colorpick" />
                                </div>
                            </div>

                            <div class="sbi_row">
                                <div class="sbi_col sbi_one">
                                    <label><?php _e('Secondary Color'); ?></label>
                                </div>
                                <div class="sbi_col sbi_two">
                                    <input name="sb_instagram_header_secondary_color" type="text" value="<?php esc_attr_e( $sb_instagram_header_secondary_color ); ?>" class="sbi_colorpick" />
                                </div>
                            </div>
                            <p style="margin-top: 10px;"><?php _e("Don't forget to set your text color below."); ?></p>
                        </div>
                    </td>
                </tr>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Number of Followers"); ?></label><code class="sbi_shortcode"> showfollowers
                        Eg: showfollowers=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_followers" id="sb_instagram_show_followers" <?php if($sb_instagram_show_followers == true) echo 'checked="checked"' ?> />
                        <span class="sbi_note"><?php _e("This only applies when displaying photos from a User ID"); ?></span>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Bio Text"); ?></label><code class="sbi_shortcode"> showbio
                        Eg: showbio=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_bio" id="sb_instagram_show_bio" <?php if($sb_instagram_show_bio == true) echo 'checked="checked"' ?> />
                        <span class="sbi_note"><?php _e("This only applies when displaying photos from a User ID"); ?></span>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Header Text Color'); ?></label><code class="sbi_shortcode"> headercolor
                        Eg: headercolor=fff</code></th>
                    <td>
                        <input name="sb_instagram_header_color" type="text" value="<?php esc_attr_e( $sb_instagram_header_color ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
            </tbody>
        </table>

        <?php submit_button(); ?>

        <hr id="caption" />
        <h3><?php _e("Caption"); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Caption"); ?></label><code class="sbi_shortcode"> showcaption
                        Eg: showcaption=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_caption" id="sb_instagram_show_caption" <?php if($sb_instagram_show_caption == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Maximum Text Length"); ?></label><code class="sbi_shortcode"> captionlength
                        Eg: captionlength=20</code></th>
                    <td>
                        <input name="sb_instagram_caption_length" id="sb_instagram_caption_length" type="text" value="<?php esc_attr_e( $sb_instagram_caption_length ); ?>" size="4" />Characters
                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("The number of characters of text to display in the caption. An elipsis link will be added to allow the user to reveal more text if desired."); ?></p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Text Color'); ?></label><code class="sbi_shortcode"> captioncolor
                        Eg: captioncolor=dd3333</code></th>
                    <td>
                        <input name="sb_instagram_caption_color" type="text" value="<?php esc_attr_e( $sb_instagram_caption_color ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Text Size'); ?></label><code class="sbi_shortcode"> captionsize
                        Eg: captionsize=12</code></th>
                    <td>
                        <select name="sb_instagram_caption_size" style="width: 180px;">
                            <option value="inherit" <?php if($sb_instagram_caption_size == "inherit") echo 'selected="selected"' ?> ><?php _e('Inherit from theme'); ?></option>
                            <option value="10" <?php if($sb_instagram_caption_size == "10") echo 'selected="selected"' ?> ><?php _e('10px'); ?></option>
                            <option value="11" <?php if($sb_instagram_caption_size == "11") echo 'selected="selected"' ?> ><?php _e('11px'); ?></option>
                            <option value="12" <?php if($sb_instagram_caption_size == "12") echo 'selected="selected"' ?> ><?php _e('12px'); ?></option>
                            <option value="13" <?php if($sb_instagram_caption_size == "13") echo 'selected="selected"' ?> ><?php _e('13px'); ?></option>
                            <option value="14" <?php if($sb_instagram_caption_size == "14") echo 'selected="selected"' ?> ><?php _e('14px'); ?></option>
                            <option value="16" <?php if($sb_instagram_caption_size == "16") echo 'selected="selected"' ?> ><?php _e('16px'); ?></option>
                            <option value="18" <?php if($sb_instagram_caption_size == "18") echo 'selected="selected"' ?> ><?php _e('18px'); ?></option>
                            <option value="20" <?php if($sb_instagram_caption_size == "20") echo 'selected="selected"' ?> ><?php _e('20px'); ?></option>
                            <option value="24" <?php if($sb_instagram_caption_size == "24") echo 'selected="selected"' ?> ><?php _e('24px'); ?></option>
                            <option value="28" <?php if($sb_instagram_caption_size == "28") echo 'selected="selected"' ?> ><?php _e('28px'); ?></option>
                            <option value="32" <?php if($sb_instagram_caption_size == "32") echo 'selected="selected"' ?> ><?php _e('32px'); ?></option>
                            <option value="36" <?php if($sb_instagram_caption_size == "36") echo 'selected="selected"' ?> ><?php _e('36px'); ?></option>
                            <option value="40" <?php if($sb_instagram_caption_size == "40") echo 'selected="selected"' ?> ><?php _e('40px'); ?></option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="likes" />
        <h3><?php _e("Likes &amp; Comments Icons"); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show Icons"); ?></label><code class="sbi_shortcode"> showlikes
                        Eg: showlikes=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_meta" id="sb_instagram_show_meta" <?php if($sb_instagram_show_meta == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Icon Color'); ?></label><code class="sbi_shortcode"> likescolor
                        Eg: likescolor=fff</code></th>
                    <td>
                        <input name="sb_instagram_meta_color" type="text" value="<?php esc_attr_e( $sb_instagram_meta_color ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Icon Size'); ?></label><code class="sbi_shortcode"> likessize
                        Eg: likessize=14</code></th>
                    <td>
                        <select name="sb_instagram_meta_size" style="width: 180px;">
                            <option value="inherit" <?php if($sb_instagram_meta_size == "inherit") echo 'selected="selected"' ?> ><?php _e('Inherit from theme'); ?></option>
                            <option value="10" <?php if($sb_instagram_meta_size == "10") echo 'selected="selected"' ?> ><?php _e('10px'); ?></option>
                            <option value="11" <?php if($sb_instagram_meta_size == "11") echo 'selected="selected"' ?> ><?php _e('11px'); ?></option>
                            <option value="12" <?php if($sb_instagram_meta_size == "12") echo 'selected="selected"' ?> ><?php _e('12px'); ?></option>
                            <option value="13" <?php if($sb_instagram_meta_size == "13") echo 'selected="selected"' ?> ><?php _e('13px'); ?></option>
                            <option value="14" <?php if($sb_instagram_meta_size == "14") echo 'selected="selected"' ?> ><?php _e('14px'); ?></option>
                            <option value="16" <?php if($sb_instagram_meta_size == "16") echo 'selected="selected"' ?> ><?php _e('16px'); ?></option>
                            <option value="18" <?php if($sb_instagram_meta_size == "18") echo 'selected="selected"' ?> ><?php _e('18px'); ?></option>
                            <option value="20" <?php if($sb_instagram_meta_size == "20") echo 'selected="selected"' ?> ><?php _e('20px'); ?></option>
                            <option value="24" <?php if($sb_instagram_meta_size == "24") echo 'selected="selected"' ?> ><?php _e('24px'); ?></option>
                            <option value="28" <?php if($sb_instagram_meta_size == "28") echo 'selected="selected"' ?> ><?php _e('28px'); ?></option>
                            <option value="32" <?php if($sb_instagram_meta_size == "32") echo 'selected="selected"' ?> ><?php _e('32px'); ?></option>
                            <option value="36" <?php if($sb_instagram_meta_size == "36") echo 'selected="selected"' ?> ><?php _e('36px'); ?></option>
                            <option value="40" <?php if($sb_instagram_meta_size == "40") echo 'selected="selected"' ?> ><?php _e('40px'); ?></option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="comments" />
        <h3><?php _e('Lightbox Comments'); ?></h3>

        <table class="form-table">
            <tbody>

            <tr valign="top">
                <th scope="row"><label><?php _e('Show Comments in Lightbox'); ?></label><code class="sbi_shortcode"> lightboxcomments
                        Eg: lightboxcomments="true"</code></th>
                <td style="padding: 5px 10px 0 10px;">
                    <input type="checkbox" name="sb_instagram_lightbox_comments" id="sb_instagram_lightbox_comments" <?php if($sb_instagram_lightbox_comments == true) echo 'checked="checked"' ?> style="margin-right: 15px;" />
                    <input id="sbi_clear_comment_cache" class="button-secondary" style="margin-top: -5px;" type="submit" value="<?php esc_attr_e( 'Clear Comment Cache' ); ?>" />
                    &nbsp<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                    <p class="sbi_tooltip"><?php _e("This will remove the cached comments saved in the database"); ?></p>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Number of Comments'); ?></label><code class="sbi_shortcode"> numcomments
                        Eg: numcomments="10"</code></th>
                <td>
                    <input name="sb_instagram_num_comments" type="text" value="<?php esc_attr_e( $sb_instagram_num_comments ); ?>" size="4" />
                    <span class="sbi_note"><?php _e('Max number of latest comments.'); ?></span>
                    &nbsp<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                    <p class="sbi_tooltip"><?php _e("This is the maximum number of comments that will be shown in the lightbox. If there are more comments available than the number set, only the latest comments will be shown"); ?></p>
                </td>
            </tr>

            </tbody>
        </table>

        <?php submit_button(); ?>

        <hr id="loadmore" />
        <h3><?php _e("'Load More' Button"); ?></h3>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show the 'Load More' button"); ?></label><code class="sbi_shortcode"> showbutton
                        Eg: showbutton=false</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_btn" id="sb_instagram_show_btn" <?php if($sb_instagram_show_btn == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Background Color'); ?></label><code class="sbi_shortcode"> buttoncolor
                        Eg: buttoncolor=8224e3</code></th>
                    <td>
                        <input name="sb_instagram_btn_background" type="text" value="<?php esc_attr_e( $sb_instagram_btn_background ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Text Color'); ?></label><code class="sbi_shortcode"> buttontextcolor
                        Eg: buttontextcolor=eeee22</code></th>
                    <td>
                        <input name="sb_instagram_btn_text_color" type="text" value="<?php esc_attr_e( $sb_instagram_btn_text_color ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Text'); ?></label><code class="sbi_shortcode"> buttontext
                        Eg: buttontext="Show more.."</code></th>
                    <td>
                        <input name="sb_instagram_btn_text" type="text" value="<?php echo stripslashes( esc_attr( $sb_instagram_btn_text ) ); ?>" size="30" />
                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="follow" />
        <h3><?php _e("'Follow' Button"); ?></h3>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e("Show the Follow button"); ?></label><code class="sbi_shortcode"> showfollow
                        Eg: showfollow=true</code></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_show_follow_btn" id="sb_instagram_show_follow_btn" <?php if($sb_instagram_show_follow_btn == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Background Color'); ?></label><code class="sbi_shortcode"> followcolor
                        Eg: followcolor=28a1bf</code></th>
                    <td>
                        <input name="sb_instagram_folow_btn_background" type="text" value="<?php esc_attr_e( $sb_instagram_folow_btn_background ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Text Color'); ?></label><code class="sbi_shortcode"> followtextcolor
                        Eg: followtextcolor=000</code></th>
                    <td>
                        <input name="sb_instagram_follow_btn_text_color" type="text" value="<?php esc_attr_e( $sb_instagram_follow_btn_text_color ); ?>" class="sbi_colorpick" />
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Button Text'); ?></label><code class="sbi_shortcode"> followtext
                        Eg: followtext="Follow me"</code></th>
                    <td>
                        <input name="sb_instagram_follow_btn_text" type="text" value="<?php echo stripslashes( esc_attr( $sb_instagram_follow_btn_text ) ); ?>" size="30" />
                    </td>
                </tr>
            </tbody>
        </table>

        <?php submit_button(); ?>
        <hr id="autoscroll" />
        <h3><?php _e('Autoscroll Load More'); ?></h3>
        <table class="form-table">
            <tbody>
            <tr valign="top">
                <th class="bump-left"><label class="bump-left"><?php _e("Set Load More on Scroll as Default"); ?></label><code class="sbi_shortcode"> autoscroll
                        Eg: autoscroll=true</code></th>
                <td>
                    <input name="sb_instagram_autoscroll" type="checkbox" id="sb_instagram_autoscroll" <?php if($sb_instagram_autoscroll == true) echo "checked"; ?> />
                    <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What is this?'); ?></a>
                    <p class="sbi_tooltip"><?php _e('This will make every Instagram feed load more posts as the user gets to the bottom of the feed.'); ?></p>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Scroll Trigger Distance'); ?></label><code class="sbi_shortcode"> autoscrolldistance
                        Eg: autoscrolldistance=200</code></th>
                <td>
                    <input name="sb_instagram_autoscrolldistance" type="text" value="<?php echo stripslashes( esc_attr( $sb_instagram_autoscrolldistance ) ); ?>" size="30" />
                    <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What is this?'); ?></a>
                    <p class="sbi_tooltip"><?php _e('This is the distance in pixels from the bottom of the page the user must scroll to to trigger the loading of more posts.'); ?></p>
                </td>
            </tr>
            </tbody>
        </table>

        <hr id="filtering" />
        <h3><?php _e('Post Filtering'); ?></h3>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Remove photos containing these words or hashtags'); ?></label><code class="sbi_shortcode"> excludewords
                        Eg: excludewords="naughty, words"</code></th>
                    <td>
                        <div class="sb_instagram_apply_labels">
                            <p>Apply to:</p>
                            <input name="sb_instagram_ex_apply_to" id="sb_instagram_ex_all" class="sb_instagram_incex_one_all" type="radio" value="all" <?php if ( $sb_instagram_ex_apply_to == 'all' ) echo 'checked'; ?>/><label for="sb_instagram_ex_all">All feeds</label>
                            <input name="sb_instagram_ex_apply_to" id="sb_instagram_ex_one" class="sb_instagram_incex_one_all" type="radio" value="one" <?php if ( $sb_instagram_ex_apply_to == 'one' ) echo 'checked'; ?>/><label for="sb_instagram_ex_one">One feed</label>
                        </div>

                        <input name="sb_instagram_exclude_words" id="sb_instagram_exclude_words" type="text" style="width: 70%;" value="<?php esc_attr_e( stripslashes($sb_instagram_exclude_words) ); ?>" />
                        <p class="sbi_extra_info sbi_incex_shortcode" <?php if ( $sb_instagram_ex_apply_to == 'one' ) echo 'style="display:block;"'; ?>><?php _e('Add this to the shortcode for your feed <code></code>'); ?></p>

                        <br />
                        <span class="sbi_note" style="margin-left: 0;"><?php _e('Separate words/hashtags using commas'); ?></span>

                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("You can use this setting to remove photos which contain certain words or hashtags in the caption. Separate multiple words or hashtags using commas."); ?></p>

                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Show photos containing these words or hashtags'); ?></label><code class="sbi_shortcode"> includewords
                        Eg: includewords="sunshine"</code></th>
                    <td>
                        <div class="sb_instagram_apply_labels">
                            <p>Apply to:</p>
                            <input name="sb_instagram_inc_apply_to" id="sb_instagram_inc_all" class="sb_instagram_incex_one_all" type="radio" value="all" <?php if ( $sb_instagram_inc_apply_to == 'all' ) echo 'checked'; ?>/><label for="sb_instagram_inc_all">All feeds</label>
                            <input name="sb_instagram_inc_apply_to" id="sb_instagram_inc_one" class="sb_instagram_incex_one_all" type="radio" value="one" <?php if ( $sb_instagram_inc_apply_to == 'one' ) echo 'checked'; ?>/><label for="sb_instagram_inc_one">One feed</label>
                        </div>

                        <input name="sb_instagram_include_words" id="sb_instagram_include_words" type="text" style="width: 70%;" value="<?php esc_attr_e( stripslashes($sb_instagram_include_words) ); ?>" />
                        <p class="sbi_extra_info sbi_incex_shortcode" <?php if ( $sb_instagram_ex_apply_to == 'one' ) echo 'style="display:block;"'; ?>><?php _e('Add this to the shortcode for your feed <code></code>'); ?></p>

                        <br />
                        <span class="sbi_note" style="margin-left: 0;"><?php _e('Separate words/hashtags using commas'); ?></span>

                        <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                            <p class="sbi_tooltip"><?php _e("You can use this setting to only show photos which contain certain words or hashtags in the caption. For example, adding <code>sheep, cow, dog</code> will show any photos which contain either the word sheep, cow, or dog. Separate multiple words or hashtags using commas."); ?></p>

                    </td>
                </tr>
            </tbody>
        </table>

        <hr id="moderation" />
        <h3><?php _e('Moderation'); ?></h3>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Moderation Type'); ?></label></th>
                    <td>
                        <input name="sb_instagram_moderation_mode" id="sb_instagram_moderation_mode_visual" class="sb_instagram_moderation_mode" type="radio" value="visual" <?php if ( $sb_instagram_moderation_mode === 'visual' ) echo 'checked'; ?> style="margin-top: 0;" /><label for="sb_instagram_moderation_mode_visual">Visual</label>
                        <input name="sb_instagram_moderation_mode" id="sb_instagram_moderation_mode_manual" class="sb_instagram_moderation_mode" type="radio" value="manual" <?php if ( $sb_instagram_moderation_mode === 'manual' ) echo 'checked'; ?> style="margin-top: 0; margin-left: 10px;"/><label for="sb_instagram_moderation_mode_manual">Manual</label>

                        <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                        <p class="sbi_tooltip"><?php _e("<b>Visual Moderation Mode</b><br />This adds a button to each feed that will allow you to hide posts, block users, and create white lists from the front end using a visual interface. Visit <a href='https://smashballoon.com/guide-to-moderation-mode/' target='_blank'>this page</a> for details"); ?></p>


                        <div class="sbi_mod_manual_settings">
                            
                            <div class="sbi_row">
                                <label><?php _e('Hide specific photos'); ?></label>
                                <textarea name="sb_instagram_hide_photos" id="sb_instagram_hide_photos" style="width: 100%;" rows="3"><?php esc_attr_e( stripslashes($sb_instagram_hide_photos) ); ?></textarea>
                                <br />
                                <span class="sbi_note" style="margin-left: 0;"><?php _e('Separate IDs using commas'); ?></span>

                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("You can use this setting to hide specific photos in your feed. Just click the 'Hide Photo' link in the photo pop-up in your feed to get the ID of the photo, then copy and paste it into this text box."); ?></p>
                            </div>
                                        
                            <div class="sbi_row">
                                <label><?php _e('Block users'); ?></label>
                                <input name="sb_instagram_block_users" id="sb_instagram_block_users" type="text" style="width: 100%;" value="<?php esc_attr_e( stripslashes($sb_instagram_block_users) ); ?>" />

                                <br />
                                <span class="sbi_note" style="margin-left: 0;"><?php _e('Separate usernames using commas'); ?></span>

                                &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                                    <p class="sbi_tooltip"><?php _e("You can use this setting to block photos from certain users in your feed. Just enter the usernames here which you want to block. Separate multiple usernames using commas."); ?></p>
                            </div>

                        </div>

                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Only show posts by these users'); ?></label></th>
                    <td>

                        <input name="sb_instagram_show_users" id="sb_instagram_show_users" type="text" style="width: 70%;" value="<?php esc_attr_e( stripslashes($sb_instagram_show_users) ); ?>" />

                        <br />
                        <span class="sbi_note" style="margin-left: 0;"><?php _e('Separate usernames using commas'); ?></span>

                        &nbsp<a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e("What is this?"); ?></a>
                        <p class="sbi_tooltip"><?php _e("You can use this setting to show photos only from certain users in your feed. Just enter the usernames here which you want to show. Separate multiple usernames using commas."); ?></p>

                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><label><?php _e('White lists'); ?></label></th>
                    <td>
                        <div class="sbi_white_list_names_wrapper">
                            <?php
                            $sbi_current_white_names = get_option( 'sb_instagram_white_list_names', array() );

                            if( empty($sbi_current_white_names) ){
                                _e("No white lists currently created");
                            } else {
                                $sbi_white_size = count( $sbi_current_white_names );
                                $sbi_i = 1;
                                echo 'IDs: ';
                                foreach ( $sbi_current_white_names as $white ) {
                                    if( $sbi_i !== $sbi_white_size ) {
                                        echo '<span>'.$white.', </span>';
                                    } else {
                                        echo '<span>'.$white.'</span>';
                                    }
                                    $sbi_i++;
                                }
                                echo '<br />';
                            }
                            ?>
                        </div>
                        
                        <input id="sbi_clear_white_lists" class="button-secondary" type="submit" value="<?php esc_attr_e( 'Clear White Lists' ); ?>" />
                        &nbsp;<a class="sbi_tooltip_link" href="JavaScript:void(0);" style="display: inline-block; margin-top: 5px;"><?php _e("What is this?"); ?></a>
                        <p class="sbi_tooltip"><?php _e("This will remove all of the white lists from the database"); ?></p>

                    </td>
                </tr>

            </tbody>
        </table>

        <?php submit_button(); ?>

        <hr id="misc" />
        <h3><?php _e('Misc'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <td style="padding-bottom: 0;">
                    <?php _e('<strong style="font-size: 15px;">Custom CSS</strong><br />Enter your own custom CSS in the box below'); ?>
                    </td>
                </tr>
                <tr valign="top">
                    <td>
                        <textarea name="sb_instagram_custom_css" id="sb_instagram_custom_css" style="width: 70%;" rows="7"><?php esc_attr_e( stripslashes($sb_instagram_custom_css) ); ?></textarea>
                    </td>
                </tr>
                <tr valign="top">
                    <td style="padding-bottom: 0;">
                    <?php _e('<strong style="font-size: 15px;">Custom JavaScript</strong><br />Enter your own custom JavaScript/jQuery in the box below'); ?>
                    </td>
                </tr>
                <tr valign="top">
                    <td>
                        <textarea name="sb_instagram_custom_js" id="sb_instagram_custom_js" style="width: 70%;" rows="7"><?php esc_attr_e( stripslashes($sb_instagram_custom_js) ); ?></textarea>
                        <br /><span class="sbi_note" style="margin: 5px 0 0 2px; display: block;"><b>Note:</b> Custom JavaScript reruns every time more posts are loaded into the feed</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><label><?php _e('Max concurrent API requests'); ?></label><code class="sbi_shortcode"> maxrequests
                        Eg: maxrequests=2</code></th>
                    <td>
                        <input name="sb_instagram_requests_max" type="number" min="1" max="10" value="<?php esc_attr_e( $sb_instagram_requests_max ); ?>" />
                        <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                        <p class="sbi_tooltip"><?php _e("Change the number of maximum concurrent API requests. This is not recommended unless directed by a member of the support team."); ?></p>
                    </td>
                </tr>

                <tr>
                    <th class="bump-left">
                        <label for="sb_instagram_cron" class="bump-left"><?php _e("Force cache to clear on interval"); ?></label>
                    </th>
                    <td>
                        <select name="sb_instagram_cron">
                            <option value="unset" <?php if($sb_instagram_cron == "unset") echo 'selected="selected"' ?> ><?php _e(' - '); ?></option>
                            <option value="yes" <?php if($sb_instagram_cron == "yes") echo 'selected="selected"' ?> ><?php _e('Yes'); ?></option>
                            <option value="no" <?php if($sb_instagram_cron == "no") echo 'selected="selected"' ?> ><?php _e('No'); ?></option>
                        </select>

                        <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                        <p class="sbi_tooltip"><?php _e("If you're experiencing an issue with the plugin not auto-updating then you can set this to 'Yes' to run a scheduled event behind the scenes which forces the plugin cache to clear on a regular basis and retrieve new data from Instagram."); ?></p>
                    </td>
                </tr>
                <tr valign="top">
                <th scope="row"><label><?php _e('Cache error API recheck'); ?></label></th>
                <td>
                    <input type="checkbox" name="check_api" id="sb_instagram_check_api" <?php if($check_api == true) echo 'checked="checked"' ?> />
                    <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                    <p class="sbi_tooltip"><?php _e("If your site uses caching, minification, or JavaScript concatenation, this option can help prevent missing cache problems with the feed."); ?></p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e('Enqueue CSS file with shortcode'); ?></label></th>
                    <td>
                        <input type="checkbox" name="enqueue_css_in_shortcode" id="sb_instagram_enqueue_css_in_shortcode" <?php if($enqueue_css_in_shortcode == true) echo 'checked="checked"' ?> />
                        <a class="sbi_tooltip_link" href="JavaScript:void(0);"><?php _e('What does this mean?'); ?></a>
                        <p class="sbi_tooltip"><?php _e("Check this box if you'd like to only include the CSS file for the plugin when the feed is on the page."); ?></p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row"><label><?php _e("Disable icon font"); ?></label></th>
                    <td>
                        <input type="checkbox" name="sb_instagram_disable_font" id="sb_instagram_disable_font" <?php if($sb_instagram_disable_font == true) echo 'checked="checked"' ?> />
                    </td>
                </tr>
            </tbody>
        </table>

        <?php submit_button(); ?>

    </form>

    <p><i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp; <?php _e('Next Step: <a href="?page=sb-instagram-feed&tab=display">Display your Feed</a>'); ?></p>

    <p><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <?php _e('Need help setting up the plugin? Check out our <a href="https://smashballoon.com/instagram-feed/docs/" target="_blank">setup directions</a>'); ?></p>


    <?php } //End Customize tab ?>



    <?php if( $sbi_active_tab == 'display' ) { //Start Configure tab ?>

        <h3><?php _e('Display your Feed'); ?></h3>
        <p><?php _e("Copy and paste the following shortcode directly into the page, post or widget where you'd like the feed to show up:"); ?></p>
        <input type="text" value="[instagram-feed]" size="16" readonly="readonly" style="text-align: center;" onclick="this.focus();this.select()" title="<?php _e('To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac).'); ?>" />

        <h3 style="padding-top: 10px;"><?php _e( 'Multiple Feeds', 'custom-twitter-feed' ); ?></h3>
        <p><?php _e("If you'd like to display multiple feeds then you can set different settings directly in the shortcode like so:"); ?>
        <code>[instagram-feed num=9 cols=3]</code></p>
        <p>You can display as many different feeds as you like, on either the same page or on different pages, by just using the shortcode options below. For example:<br />
        <code>[instagram-feed]</code><br />
        <code>[instagram-feed id="12986477"]</code><br />
        <code>[instagram-feed type=hashtag hashtag="#sun,#beach" num=4 cols=4 showcaption=false]</code>
        </p>
        <p><?php _e("See the table below for a full list of available shortcode options:"); ?></p>

        <table class="sbi_shortcode_table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><?php _e('Shortcode option'); ?></th>
                    <th scope="row"><?php _e('Description'); ?></th>
                    <th scope="row"><?php _e('Example'); ?></th>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Configure Options"); ?></td></tr>
                <tr>
                    <td>type</td>
                    <td><?php _e("Display photos from a User ID (user)<br />Display posts from a Hashtag (hashtag)<br />Display posts from a Location (location)<br />Display posts from Coordinates (coordinates)<br />Display post(s) by Post ID (single)"); ?></td>
                    <td><code>[instagram-feed type=user]</code><br /><code>[instagram-feed type=hashtag]</code><br/><code>[instagram-feed type=location]</code><br /><code>[instagram-feed type=coordinates]</code><br /><code>[instagram-feed type=single]</code></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td><?php _e('An Instagram User ID. Separate multiple IDs by commas.'); ?></td>
                    <td><code>[instagram-feed id="ANY_USER_ID"]</code></td>
                </tr>
                <tr>
                    <td>hashtag</td>
                    <td><?php _e('Any hashtag. Separate multiple IDs by commas.'); ?></td>
                    <td><code>[instagram-feed hashtag="#awesome"]</code></td>
                </tr>
                <tr>
                    <td>location</td>
                    <td><?php _e('The ID of the location. Separate multiple IDs by commas.'); ?></td>
                    <td><code>[instagram-feed location="213456451"]</code></td>
                </tr>
                <tr>
                    <td>coordinates</td>
                    <td><?php _e('The coordinates to display photos from. Separate multiple sets of coordinates by commas.<br />The format is (latitude,longitude,distance).'); ?></td>
                    <td><code>[instagram-feed coordinates="(25.76,-80.19,500)"]</code></td>
                </tr>
                <tr>
                    <td>single</td>
                    <td><?php _e('The id of the single post you would like to show. Seperate multiple ids by comma'); ?></td>
                    <td><code>[instagram-feed single="1334423402283195360_13460080"]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Customize Options"); ?></td></tr>
                <tr>
                    <td>width</td>
                    <td><?php _e("The width of your feed. Any number."); ?></td>
                    <td><code>[instagram-feed width=50]</code></td>
                </tr>
                <tr>
                    <td>widthunit</td>
                    <td><?php _e("The unit of the width. 'px' or '%'"); ?></td>
                    <td><code>[instagram-feed widthunit=%]</code></td>
                </tr>
                <tr>
                    <td>height</td>
                    <td><?php _e("The height of your feed. Any number."); ?></td>
                    <td><code>[instagram-feed height=250]</code></td>
                </tr>
                <tr>
                    <td>heightunit</td>
                    <td><?php _e("The unit of the height. 'px' or '%'"); ?></td>
                    <td><code>[instagram-feed heightunit=px]</code></td>
                </tr>
                <tr>
                    <td>background</td>
                    <td><?php _e("The background color of the feed. Any hex color code."); ?></td>
                    <td><code>[instagram-feed background=#ffff00]</code></td>
                </tr>


                <tr class="sbi_table_header"><td colspan=3><?php _e("Layout Options"); ?></td></tr>
                <tr>
                    <td>num</td>
                    <td><?php _e("The number of photos to display initially. Maximum is 33."); ?></td>
                    <td><code>[instagram-feed num=10]</code></td>
                </tr>
                <tr>
                    <td>nummobile</td>
                    <td><?php _e("The number of photos to display initially for mobile screens (smaller than 480 pixels)."); ?></td>
                    <td><code>[instagram-feed nummobile=6]</code></td>
                </tr>
                <tr>
                    <td>cols</td>
                    <td><?php _e("The number of columns in your feed. 1 - 10."); ?></td>
                    <td><code>[instagram-feed cols=5]</code></td>
                </tr>
                <tr>
                    <td>colsmobile</td>
                    <td><?php _e("The number of columns in your feed for mobile screens (smaller than 480 pixels)."); ?></td>
                    <td><code>[instagram-feed colsmobile=2]</code></td>
                </tr>
                <tr>
                    <td>imagepadding</td>
                    <td><?php _e("The spacing around your photos"); ?></td>
                    <td><code>[instagram-feed imagepadding=10]</code></td>
                </tr>
                <tr>
                    <td>imagepaddingunit</td>
                    <td><?php _e("The unit of the padding. 'px' or '%'"); ?></td>
                    <td><code>[instagram-feed imagepaddingunit=px]</code></td>
                </tr>


                <tr class="sbi_table_header"><td colspan=3><?php _e("Photos Options"); ?></td></tr>
                <tr>
                    <td>sortby</td>
                    <td><?php _e("Sort the posts by Newest to Oldest (none) or Random (random)"); ?></td>
                    <td><code>[instagram-feed sortby=random]</code></td>
                </tr>
                <tr>
                    <td>imageres</td>
                    <td><?php _e("The resolution/size of the photos. 'auto', full', 'medium' or 'thumb'."); ?></td>
                    <td><code>[instagram-feed imageres=full]</code></td>
                </tr>
                <tr>
                    <td>media</td>
                    <td><?php _e("Display all media, only photos, or only videos"); ?></td>
                    <td><code>[instagram-feed media=photos]</code></td>
                </tr>
                <tr>
                    <td>disablelightbox</td>
                    <td><?php _e("Whether to disable the photo Lightbox. It is enabled by default."); ?></td>
                    <td><code>[instagram-feed disablelightbox=true]</code></td>
                </tr>
                <tr>
                    <td>captionlinks</td>
                    <td><?php _e("Whether to use urls in captions for the photo's link instead of linking to instagram.com."); ?></td>
                    <td><code>[instagram-feed captionlinks=true]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Lightbox Comments Options"); ?></td></tr>
                <tr>
                    <td>lightboxcomments</td>
                    <td><?php _e("Whether to show comments in the lightbox for this feed."); ?></td>
                    <td><code>[instagram-feed lightboxcomments=true]</code></td>
                </tr>
                <tr>
                    <td>numcomments</td>
                    <td><?php _e("Number of comments to show starting from the most recent."); ?></td>
                    <td><code>[instagram-feed numcomments=10]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Photos Hover Style Options"); ?></td></tr>
                <tr>
                    <td>hovercolor</td>
                    <td><?php _e("The background color when hovering over a photo. Any hex color code."); ?></td>
                    <td><code>[instagram-feed hovercolor=#ff0000]</code></td>
                </tr>
                <tr>
                    <td>hovertextcolor</td>
                    <td><?php _e("The text/icon color when hovering over a photo. Any hex color code."); ?></td>
                    <td><code>[instagram-feed hovertextcolor=#fff]</code></td>
                </tr>
                <tr>
                    <td>hoverdisplay</td>
                    <td><?php _e("The info to display when hovering over the photo. Available options:<br />username, icon, date, instagram, location, caption, likes"); ?></td>
                    <td><code>[instagram-feed hoverdisplay="date, location, likes"]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Carousel Options"); ?></td></tr>
                <tr>
                    <td>carousel</td>
                    <td><?php _e("Display this feed as a carousel"); ?></td>
                    <td><code>[instagram-feed carousel=true]</code></td>
                </tr>
                <tr>
                    <td>carouselarrows</td>
                    <td><?php _e("Display directional arrows on the carousel"); ?></td>
                    <td><code>[instagram-feed carouselarrows=true]</code></td>
                </tr>
                <tr>
                    <td>carouselpag</td>
                    <td><?php _e("Display pagination links below the carousel"); ?></td>
                    <td><code>[instagram-feed carouselpag=true]</code></td>
                </tr>
                <tr>
                    <td>carouselautoplay</td>
                    <td><?php _e("Make the carousel autoplay"); ?></td>
                    <td><code>[instagram-feed carouselautoplay=true]</code></td>
                </tr>
                <tr>
                    <td>carouseltime</td>
                    <td><?php _e("The interval time between slides for autoplay. Time in miliseconds."); ?></td>
                    <td><code>[instagram-feed carouseltime=8000]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Header Options"); ?></td></tr>
                <tr>
                    <td>showheader</td>
                    <td><?php _e("Whether to show the feed Header. 'true' or 'false'."); ?></td>
                    <td><code>[instagram-feed showheader=false]</code></td>
                </tr>
                <tr>
                    <td>headerstyle</td>
                    <td><?php _e("Which header style to use. Choose from boxed or circle."); ?></td>
                    <td><code>[instagram-feed headerstyle=boxed]</code></td>
                </tr>
                <tr>
                    <td>headerprimarycolor</td>
                    <td><?php _e("The primary color to use for the <b>boxed</b> header. Any hex color code."); ?></td>
                    <td><code>[instagram-feed headerprimarycolor=#333]</code></td>
                </tr>
                <tr>
                    <td>headersecondarycolor</td>
                    <td><?php _e("The secondary color to use for the <b>boxed</b> header. Any hex color code."); ?></td>
                    <td><code>[instagram-feed headersecondarycolor=#ccc]</code></td>
                </tr>
                <tr>
                    <td>showfollowers</td>
                    <td><?php _e("Display the number of followers in the header"); ?></td>
                    <td><code>[instagram-feed showfollowers=true]</code></td>
                </tr>
                <tr>
                    <td>showbio</td>
                    <td><?php _e("Display the bio in the header"); ?></td>
                    <td><code>[instagram-feed showbio=true]</code></td>
                </tr>
                <tr>
                    <td>headercolor</td>
                    <td><?php _e("The color of the Header text. Any hex color code."); ?></td>
                    <td><code>[instagram-feed headercolor=#333]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Caption Options"); ?></td></tr>
                <tr>
                    <td>showcaption</td>
                    <td><?php _e("Whether to show the photo caption. 'true' or 'false'."); ?></td>
                    <td><code>[instagram-feed showcaption=false]</code></td>
                </tr>
                <tr>
                    <td>captionlength</td>
                    <td><?php _e("The number of characters of the caption to display"); ?></td>
                    <td><code>[instagram-feed captionlength=50]</code></td>
                </tr>
                <tr>
                    <td>captioncolor</td>
                    <td><?php _e("The text color of the caption. Any hex color code."); ?></td>
                    <td><code>[instagram-feed captioncolor=#000]</code></td>
                </tr>
                <tr>
                    <td>captionsize</td>
                    <td><?php _e("The size of the caption text. Any number."); ?></td>
                    <td><code>[instagram-feed captionsize=24]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Likes &amp; Comments Options"); ?></td></tr>
                <tr>
                    <td>showlikes</td>
                    <td><?php _e("Whether to show the Likes &amp; Comments. 'true' or 'false'."); ?></td>
                    <td><code>[instagram-feed showlikes=false]</code></td>
                </tr>
                <tr>
                    <td>likescolor</td>
                    <td><?php _e("The color of the Likes &amp; Comments. Any hex color code."); ?></td>
                    <td><code>[instagram-feed likescolor=#FF0000]</code></td>
                </tr>
                <tr>
                    <td>likessize</td>
                    <td><?php _e("The size of the Likes &amp; Comments. Any number."); ?></td>
                    <td><code>[instagram-feed likessize=14]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("'Load More' Button Options"); ?></td></tr>
                <tr>
                    <td>showbutton</td>
                    <td><?php _e("Whether to show the 'Load More' button. 'true' or 'false'."); ?></td>
                    <td><code>[instagram-feed showbutton=false]</code></td>
                </tr>
                <tr>
                    <td>buttoncolor</td>
                    <td><?php _e("The background color of the button. Any hex color code."); ?></td>
                    <td><code>[instagram-feed buttoncolor=#000]</code></td>
                </tr>
                <tr>
                    <td>buttontextcolor</td>
                    <td><?php _e("The text color of the button. Any hex color code."); ?></td>
                    <td><code>[instagram-feed buttontextcolor=#fff]</code></td>
                </tr>
                <tr>
                    <td>buttontext</td>
                    <td><?php _e("The text used for the button."); ?></td>
                    <td><code>[instagram-feed buttontext="Load More Photos"]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("'Follow' Button Options"); ?></td></tr>
                <tr>
                    <td>showfollow</td>
                    <td><?php _e("Whether to show the Instagram 'Follow' button. 'true' or 'false'."); ?></td>
                    <td><code>[instagram-feed showfollow=true]</code></td>
                </tr>
                <tr>
                    <td>followcolor</td>
                    <td><?php _e("The background color of the button. Any hex color code."); ?></td>
                    <td><code>[instagram-feed followcolor=#ff0000]</code></td>
                </tr>
                <tr>
                    <td>followtextcolor</td>
                    <td><?php _e("The text color of the button. Any hex color code."); ?></td>
                    <td><code>[instagram-feed followtextcolor=#fff]</code></td>
                </tr>
                <tr>
                    <td>followtext</td>
                    <td><?php _e("The text used for the button."); ?></td>
                    <td><code>[instagram-feed followtext="Follow me"]</code></td>
                </tr>
                <tr class="sbi_table_header"><td colspan=3><?php _e("Auto Load More on Scroll"); ?></td></tr>
                <tr>
	                <td>autoscroll</td>
	                <td><?php _e("Load more posts automatically as the user scrolls down the page."); ?></td>
	                <td><code>[instagram-feed autoscroll=true]</code></td>
                </tr>
                <tr>
	                <td>autoscrolldistance</td>
	                <td><?php _e("Distance before the end of feed or page that triggers the loading of more posts."); ?></td>
	                <td><code>[instagram-feed autoscrolldistance=200]</code></td>
                </tr>
                <tr class="sbi_table_header"><td colspan=3><?php _e("Post Filtering Options"); ?></td></tr>
                <tr>
                    <td>excludewords</td>
                    <td><?php _e("Remove posts which contain certain words or hashtags in the caption."); ?></td>
                    <td><code>[instagram-feed excludewords="bad, words"]</code></td>
                </tr>
                <tr>
                    <td>includewords</td>
                    <td><?php _e("Only display posts which contain certain words or hashtags in the caption."); ?></td>
                    <td><code>[instagram-feed includewords="sunshine"]</code></td>
                </tr>
                <tr>
                    <td>showusers</td>
                    <td><?php _e("Only display posts from this user. Separate multiple users with a comma"); ?></td>
                    <td><code>[instagram-feed showusers="smashballoon,taylorswift"]</code></td>
                </tr>
                <tr>
                    <td>whitelist</td>
                    <td><?php _e("Only display posts that match one of the post ids in this \"whitelist\""); ?></td>
                    <td><code>[instagram-feed whitelist="2"]</code></td>
                </tr>

                <tr class="sbi_table_header"><td colspan=3><?php _e("Misc Options"); ?></td></tr>
                <tr>
                    <td>maxrequests</td>
                    <td><?php _e("Change the number of maximum concurrent API requests.<br />This is not recommended unless directed by a member of the support team."); ?></td>
                    <td><code>[instagram-feed maxrequests="2"]</code></td>
                </tr>

            </tbody>
        </table>

        <p><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <?php _e('Need help setting up the plugin? Check out our <a href="https://smashballoon.com/instagram-feed/docs/" target="_blank">setup directions</a>'); ?></p>

    <?php } //End Display tab ?>


    <?php if( $sbi_active_tab == 'support' ) { //Start Support tab ?>
        <div class="sbi_support">

                <br />
            <h3 style="padding-bottom: 10px;">Need help?</h3>

            <p>
                <span class="sbi-support-title"><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/instagram-feed/docs/" target="_blank"><?php _e('Setup Directions'); ?></a></span>
                <?php _e('A step-by-step guide on how to setup and use the plugin.'); ?>
            </p>

            <p>
                <span class="sbi-support-title"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp; <a href="https://www.youtube.com/embed/V_fJ_vhvQXM" target="_blank" id="sbi-play-support-video"><?php _e('Watch a Video'); ?></a></span>
                <?php _e('How to setup, use, and customize the plugin.'); ?>

                <iframe id="sbi-support-video" src="//www.youtube.com/embed/V_fJ_vhvQXM?theme=light&amp;showinfo=0&amp;controls=2" width="960" height="540" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
            </p>

            <p>
                <span class="sbi-support-title"><i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/instagram-feed/support/faq/" target="_blank"><?php _e('FAQs and Docs'); ?></a></span>
                <?php _e('View our expansive library of FAQs and documentation to help solve your problem as quickly as possible.'); ?>
            </p>

            <div class="sbi-support-faqs">

                <ul>
                    <li><b>FAQs</b></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/my-instagram-access-token-keep-expiring/" target="_blank">My Access Token Keeps Expiring</a>'); ?></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/my-photos-wont-load/" target="_blank">My Instagram Feed Won\'t Load</a>'); ?></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/can-display-photos-specific-hashtag-specific-user-id/" target="_blank">Filter a User Feed by Hashtag</a>'); ?></li>
                    <li style="margin-top: 8px; font-size: 12px;"><a href="https://smashballoon.com/instagram-feed/support/faq/" target="_blank">See All<i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
                </ul>

                <ul>
                    <li><b>Documentation</b></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/instagram-feed/docs/" target="_blank">Installation and Configuration</a>'); ?></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/display-multiple-instagram-feeds/" target="_blank">Displaying multiple feeds</a>'); ?></li>
                    <li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/instagram-feed-faq/customization/" target="_blank">Customizing your Feed</a>'); ?></li>
                </ul>
            </div>

            <p>
                <span class="sbi-support-title"><i class="fa fa-rocket" aria-hidden="true"></i>&nbsp; <a href="admin.php?page=sbi-welcome-new"><?php _e('Welcome Page'); ?></a></span>
                <?php _e("View the plugin welcome page to see what's new in the latest update."); ?>
            </p>

            <p>
                <span class="sbi-support-title"><i class="fa fa-envelope" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/instagram-feed/support/" target="_blank"><?php _e('Request Support'); ?></a></span>
                <?php _e('Still need help? Submit a ticket and one of our support experts will get back to you as soon as possible.<br /><b>Important:</b> Please include your <b>System Info</b> below with all support requests.'); ?>
            </p>
        </div>

        <hr />

        <h3><?php _e('System Info &nbsp; <i style="color: #666; font-size: 11px; font-weight: normal;">Click the text below to select all</i>'); ?></h3>


        <?php $sbi_options = get_option('sb_instagram_settings'); ?>
        <textarea readonly="readonly" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)." style="width: 100%; max-width: 960px; height: 500px; white-space: pre; font-family: Menlo,Monaco,monospace;">
## SITE/SERVER INFO: ##
Site URL:                 <?php echo site_url() . "\n"; ?>
Home URL:                 <?php echo home_url() . "\n"; ?>
WordPress Version:        <?php echo get_bloginfo( 'version' ) . "\n"; ?>
PHP Version:              <?php echo PHP_VERSION . "\n"; ?>
Web Server Info:          <?php echo $_SERVER['SERVER_SOFTWARE'] . "\n"; ?>

## ACTIVE PLUGINS: ##
<?php
$plugins = get_plugins();
$active_plugins = get_option( 'active_plugins', array() );

foreach ( $plugins as $plugin_path => $plugin ) {
    // If the plugin isn't active, don't show it.
    if ( ! in_array( $plugin_path, $active_plugins ) )
        continue;

    echo $plugin['Name'] . ': ' . $plugin['Version'] ."\n";
}
?>

## PLUGIN SETTINGS: ##
sb_instagram_license => <?php echo get_option( 'sbi_license_key' ) . "\n"; ?>
sb_instagram_license_type => <?php echo SBI_PLUGIN_NAME . "\n"; ?>
<?php
while (list($key, $val) = each($sbi_options)) {
    echo "$key => $val\n";
}
?>

## LISTS AND CACHES: ##
<?php
$sbi_current_white_names = get_option( 'sb_instagram_white_list_names', array() );

if( empty( $sbi_current_white_names ) ){
    _e("No white lists currently created");
} else {
    $sbi_white_size = count( $sbi_current_white_names );
    $sbi_i = 1;
    echo 'IDs: ';
    foreach ( $sbi_current_white_names as $white ) {
        if( $sbi_i !== $sbi_white_size ) {
            echo $white.', ';
        } else {
            echo $white;
        }
        $sbi_i++;
    }
}
echo "\n";

if ( isset( $sbi_current_white_names[0] ) ) {
    $sb_instagram_white_lists = get_option( 'sb_instagram_white_lists_'.$sbi_current_white_names[0] , '' );
    $sb_instagram_white_list_ids = ! empty( $sb_instagram_white_lists ) ? implode( ', ', $sb_instagram_white_lists ) : '';
    echo 'White list ' . $sbi_current_white_names[0] . ': ' .$sb_instagram_white_list_ids . "\n";
}

global $wpdb;
$table_name = esc_sql( $wpdb->prefix . "options" );
$result = $wpdb->get_results( "
        SELECT *
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
        LIMIT 1;
        ", ARRAY_A );
if ( $result !== 0 ) {
    echo 'Most recent cache: ' . substr( $result[0]['option_value'], 0, 100 ) . "\n";
} else {
    echo 'No feed caches found' . "\n";
}
?>

## API RESPONSE: ##
<?php
$url = isset( $sbi_options['sb_instagram_at'] ) ? 'https://api.instagram.com/v1/users/self/?access_token=' . $sbi_options['sb_instagram_at'] : 'no_at';
if ( $url !== 'no_at' ) {
    $args = array(
        'timeout' => 60,
        'sslverify' => false
    );
    $result = wp_remote_get( $url, $args );

    $data = json_decode( $result['body'] );

    if ( isset( $data->data->id ) ) {
        echo 'id: ' . $data->data->id . "\n";
        echo 'username: ' . $data->data->username . "\n";

        $url = 'https://api.instagram.com/v1/users/search?q=nike&access_token=' . $sbi_options['sb_instagram_at'];
        $args = array(
            'timeout' => 60,
            'sslverify' => false
        );
        $search_result = wp_remote_get( $url, $args );
        $search_data = json_decode( $search_result['body'] );

        if ( isset( $data->meta->code ) ) {
            echo 'Search Response' . "\n";
            echo 'code: ' . $search_data->meta->code . "\n";
            if ( isset( $search_data->meta->error_message ) ) {
                echo 'error_message: ' . $search_data->meta->error_message . "\n";
            }
        }

    } else {
        echo 'No id returned' . "\n";
        echo 'code: ' . $data->meta->code . "\n";
        if ( isset( $data->meta->error_message ) ) {
            echo 'error_message: ' . $data->meta->error_message . "\n";
        }
    }

} else {
    echo 'No Access Token';
}

?>
        </textarea>


<?php
} //End Support tab
?>

    <div class="sbi_quickstart">
        <h3><i class="fa fa-rocket" aria-hidden="true"></i>&nbsp; Display your feed</h3>
        <p>Copy and paste this shortcode directly into the page, post or widget where you'd like to display the feed:        <input type="text" value="[instagram-feed]" size="15" readonly="readonly" style="text-align: center;" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p>
        <p>Find out how to display <a href="?page=sb-instagram-feed&amp;tab=display">multiple feeds</a>.</p>
    </div>

    <hr />

    <p><i class="fa fa-facebook-square" aria-hidden="true" style="color: #3B5998; font-size: 23px; margin-right: 1px;"></i>&nbsp; <span style="display: inline-block; top: -3px; position: relative;">Want to display Facebook posts? Check out our <a href="https://wordpress.org/plugins/custom-facebook-feed/" target="_blank">Custom Facebook Feed</a> plugin</span></p>

    <p><i class="fa fa-twitter-square" aria-hidden="true" style="color: #00aced; font-size: 23px; margin-right: 1px;"></i>&nbsp; <span style="display: inline-block; top: -3px; position: relative;">Got Tweets? Check out our <a href="https://wordpress.org/plugins/custom-twitter-feeds/" target="_blank">Custom Twitter Feeds</a> plugin</span></p>

</div> <!-- end #sbi_admin -->

<?php } //End Settings page

function sb_instagram_admin_style() {
        wp_register_style( 'sb_instagram_admin_css', plugin_dir_url( __FILE__ ) . 'css/sb-instagram-admin.css', false, SBIVER );
        wp_enqueue_style( 'sb_instagram_font_awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' );
        wp_enqueue_style( 'sb_instagram_admin_css' );
        wp_enqueue_style( 'wp-color-picker' );
}
add_action( 'admin_enqueue_scripts', 'sb_instagram_admin_style' );

function sb_instagram_admin_scripts() {
    wp_enqueue_script( 'sb_instagram_admin_js', plugin_dir_url( __FILE__ ) . 'js/sb-instagram-admin.js', false, SBIVER );
	wp_localize_script( 'sb_instagram_admin_js', 'sbiA', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
            'sbi_nonce' => wp_create_nonce( 'sbi-smash-balloon' )
        )
	);
	if( !wp_script_is('jquery-ui-draggable') ) {
        wp_enqueue_script(
            array(
            'jquery',
            'jquery-ui-core',
            'jquery-ui-draggable'
            )
        );
    }
    wp_enqueue_script(
        array(
        'hoverIntent',
        'wp-color-picker'
        )
    );
}
add_action( 'admin_enqueue_scripts', 'sb_instagram_admin_scripts' );

// Add a Settings link to the plugin on the Plugins page
$sbi_plugin_file = 'instagram-feed-pro/instagram-feed.php';
add_filter( "plugin_action_links_{$sbi_plugin_file}", 'sbi_add_settings_link', 10, 2 );

//modify the link by unshifting the array
function sbi_add_settings_link( $links, $file ) {
    $sbi_settings_link = '<a href="' . admin_url( 'admin.php?page=sb-instagram-feed' ) . '">' . __( 'Settings', 'sb-instagram-feed' ) . '</a>';
    array_unshift( $links, $sbi_settings_link );

    return $links;
}

function sbi_expiration_notice(){

    //If the user is re-checking the license key then use the API below to recheck it
    ( isset( $_GET['sbichecklicense'] ) ) ? $sbi_check_license = true : $sbi_check_license = false;

    $sbi_license = trim( get_option( 'sbi_license_key' ) );

    //If there's no license key then don't do anything
    if( empty($sbi_license) || !isset($sbi_license) && !$sbi_check_license ) return;

    //Is there already license data in the db?
    if( get_option( 'sbi_license_data' ) && !$sbi_check_license ){
        //Yes
        //Get license data from the db and convert the object to an array
        $sbi_license_data = (array) get_option( 'sbi_license_data' );
    } else {
        //No
        // data to send in our API request
        $sbi_api_params = array( 
            'edd_action'=> 'check_license', 
            'license'   => $sbi_license, 
            'item_name' => urlencode( SBI_PLUGIN_NAME ) // the name of our product in EDD
        );
        
        // Call the custom API.
        $sbi_response = wp_remote_get( add_query_arg( $sbi_api_params, SBI_STORE_URL ), array( 'timeout' => 60, 'sslverify' => false ) );

        // decode the license data
        $sbi_license_data = (array) json_decode( wp_remote_retrieve_body( $sbi_response ) );

        //Store license data in db
        update_option( 'sbi_license_data', $sbi_license_data );
    }

    //Number of days until license expires
    $sbi_date1 = isset( $sbi_license_data['expires'] ) ? $sbi_license_data['expires'] : $sbi_date1 = '2036-12-31 23:59:59'; //If expires param isn't set yet then set it to be a date to avoid PHP notice
    if( $sbi_date1 == 'lifetime' ) $sbi_date1 = '2036-12-31 23:59:59';
    $sbi_date2 = date('Y-m-d');
    $sbi_interval = round(abs(strtotime($sbi_date2)-strtotime($sbi_date1))/86400);

    //Is license expired?
    ( $sbi_interval == 0 || strtotime($sbi_date1) < strtotime($sbi_date2) ) ? $sbi_license_expired = true : $sbi_license_expired = false;

    //If expired date is returned as 1970 (or any other 20th century year) then it means that the correct expired date was not returned and so don't show the renewal notice
    if( $sbi_date1[0] == '1' ) $sbi_license_expired = false;

    //If there's no expired date then don't show the expired notification
    if( empty($sbi_date1) || !isset($sbi_date1) ) $sbi_license_expired = false;

    //Is license missing - ie. on very first check
    if( isset($sbi_license_data['error']) ){
        if( $sbi_license_data['error'] == 'missing' ) $sbi_license_expired = false;
    }

    //If license expires in less than 30 days and it isn't currently expired then show the expire countdown instead of the expiration notice
    if($sbi_interval < 30 && !$sbi_license_expired){
        $sbi_expire_countdown = true;
    } else {
        $sbi_expire_countdown = false;
    }

    global $sbi_download_id;

    //Is the license expired?
    if( ($sbi_license_expired || $sbi_expire_countdown) || $sbi_check_license ) {
        
        //If expire countdown then add the countdown class to the notice box
        if($sbi_expire_countdown){
            $sbi_expired_box_classes = "sbi-license-expired sbi-license-countdown";
            $sbi_expired_box_msg = "Hey ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key expires in " . $sbi_interval . " days.";
        } else {
            $sbi_expired_box_classes = "sbi-license-expired";
            $sbi_expired_box_msg = "Hey ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key has expired.";
        }

        //Create the re-check link using the existing query string in the URL
        $sbi_url = '?' . $_SERVER["QUERY_STRING"];
        //Determine the separator
        ( !empty($sbi_url) && $sbi_url != '' ) ? $separator = '&' : $separator = '';
        //Add the param to check license if it doesn't already exist in URL
        if( strpos($sbi_url, 'sbichecklicense') === false ) $sbi_url .= $separator . "sbichecklicense=true";

        //Create the notice message
        $sbi_expired_box_msg .= " Click <a href='https://smashballoon.com/checkout/?edd_license_key=".$sbi_license."&download_id=".$sbi_download_id."' target='_blank'>here</a> to renew your license. <a href='javascript:void(0);' id='sbi-why-renew-show' onclick='sbiShowReasons()'>Why renew?</a><a href='javascript:void(0);' id='sbi-why-renew-hide' onclick='sbiHideReasons()' style='display: none;'>Hide text</a> <a href='".$sbi_url."' class='sbi-button'>Re-check License</a></p>
            <div id='sbi-why-renew' style='display: none;'>
                <h4>Customer Support</h4>
                <p>Without a valid license key you will no longer be able to receive updates or support for the Instagram Feed plugin. A renewed license key grants you access to our top-notch, quick and effective support for another full year.</p>

                <h4>Maintenance Upates</h4>
                <p>With both WordPress and the Instagram API being updated on a regular basis we stay on top of the latest changes and provide frequent updates to keep pace.</p>

                <h4>New Feature Updates</h4>
                <p>We're continually adding new features to the plugin, based on both customer suggestions and our own ideas for ways to make it better, more useful, more customizable, more robust and just more awesome! Renew your license to prevent from missing out on any of the new features added in the future.</p>
            </div>";

        if( $sbi_check_license && !$sbi_license_expired && !$sbi_expire_countdown ){
            $sbi_expired_box_classes = "sbi-license-expired sbi-license-valid";
            $sbi_expired_box_msg = "Thanks ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key is valid.";
        }

        _e("
        <div class='".$sbi_expired_box_classes."'>
            <p>".$sbi_expired_box_msg." 
        </div>
        <script type='text/javascript'>
        function sbiShowReasons() {
            document.getElementById('sbi-why-renew').style.display = 'block';
            document.getElementById('sbi-why-renew-show').style.display = 'none';
            document.getElementById('sbi-why-renew-hide').style.display = 'inline';
        }
        function sbiHideReasons() {
            document.getElementById('sbi-why-renew').style.display = 'none';
            document.getElementById('sbi-why-renew-show').style.display = 'inline';
            document.getElementById('sbi-why-renew-hide').style.display = 'none';
        }
        </script>
        ");
    }

}


/* Display a license expired notice that can be dismissed */
add_action('admin_notices', 'sbi_renew_license_notice');
function sbi_renew_license_notice() {

    //Show this notice on every page apart from the Instagram Feed settings pages
    isset($_GET['page'])? $sbi_check_page = $_GET['page'] : $sbi_check_page = '';
    if ( $sbi_check_page !== 'sb-instagram-feed' && $sbi_check_page !== 'sb-instagram-license' ) {

        //If the user is re-checking the license key then use the API below to recheck it
        ( isset( $_GET['sbichecklicense'] ) ) ? $sbi_check_license = true : $sbi_check_license = false;

        $sbi_license = trim( get_option( 'sbi_license_key' ) );

        global $current_user;
        $user_id = $current_user->ID;

        // Use this to show notice again
        //delete_user_meta($user_id, 'sbi_ignore_notice');

        /* Check that the license exists and the user hasn't already clicked to ignore the message */
        if( empty($sbi_license) || !isset($sbi_license) || get_user_meta($user_id, 'sbi_ignore_notice') && !$sbi_check_license ) return;

        //Is there already license data in the db?
        if( get_option( 'sbi_license_data' ) && !$sbi_check_license ){
            //Yes
            //Get license data from the db and convert the object to an array
            $sbi_license_data = (array) get_option( 'sbi_license_data' );
        } else {
            //No
            // data to send in our API request
            $sbi_api_params = array( 
                'edd_action'=> 'check_license', 
                'license'   => $sbi_license, 
                'item_name' => urlencode( SBI_PLUGIN_NAME ) // the name of our product in EDD
            );
            
            // Call the custom API.
            $sbi_response = wp_remote_get( add_query_arg( $sbi_api_params, SBI_STORE_URL ), array( 'timeout' => 60, 'sslverify' => false ) );

            // decode the license data
            $sbi_license_data = (array) json_decode( wp_remote_retrieve_body( $sbi_response ) );

            //Store license data in db
            update_option( 'sbi_license_data', $sbi_license_data );

        }

        //Number of days until license expires
        $sbi_date1 = $sbi_license_data['expires'];
        if( $sbi_date1 == 'lifetime' ) $sbi_date1 = '2036-12-31 23:59:59';
        $sbi_date2 = date('Y-m-d');
        $sbi_interval = round(abs(strtotime($sbi_date2)-strtotime($sbi_date1))/86400);

        //Is license expired?
        ( $sbi_interval == 0 || strtotime($sbi_date1) < strtotime($sbi_date2) ) ? $sbi_license_expired = true : $sbi_license_expired = false;

        //If expired date is returned as 1970 (or any other 20th century year) then it means that the correct expired date was not returned and so don't show the renewal notice
        if( $sbi_date1[0] == '1' ) $sbi_license_expired = false;

        //If there's no expired date then don't show the expired notification
        if( empty($sbi_date1) || !isset($sbi_date1) ) $sbi_license_expired = false;

        //Is license missing - ie. on very first check
        if( isset($sbi_license_data['error']) ){
            if( $sbi_license_data['error'] == 'missing' ) $sbi_license_expired = false;
        }

        //If license expires in less than 30 days and it isn't currently expired then show the expire countdown instead of the expiration notice
        if($sbi_interval < 30 && !$sbi_license_expired){
            $sbi_expire_countdown = true;
        } else {
            $sbi_expire_countdown = false;
        }


        //Is the license expired?
        if( ($sbi_license_expired || $sbi_expire_countdown) || $sbi_check_license ) {

            global $sbi_download_id;
            
            //If expire countdown then add the countdown class to the notice box
            if($sbi_expire_countdown){
                $sbi_expired_box_classes = "sbi-license-expired sbi-license-countdown";
                $sbi_expired_box_msg = "Hey ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key expires in " . $sbi_interval . " days.";
            } else {
                $sbi_expired_box_classes = "sbi-license-expired";
                $sbi_expired_box_msg = "Hey ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key has expired.";
            }

            //Create the re-check link using the existing query string in the URL
            $sbi_url = '?' . $_SERVER["QUERY_STRING"];
            //Determine the separator
            ( !empty($sbi_url) && $sbi_url != '' ) ? $separator = '&' : $separator = '';
            //Add the param to check license if it doesn't already exist in URL
            if( strpos($sbi_url, 'sbichecklicense') === false ) $sbi_url .= $separator . "sbichecklicense=true";
            
            //Create the notice message
            $sbi_expired_box_msg .= " Click <a href='https://smashballoon.com/checkout/?edd_license_key=".$sbi_license."&download_id=".$sbi_download_id."' target='_blank'>here</a> to renew your license. <a href='javascript:void(0);' id='sbi-why-renew-show' onclick='sbiShowReasons()'>Why renew?</a><a href='javascript:void(0);' id='sbi-why-renew-hide' onclick='sbiHideReasons()' style='display: none;'>Hide text</a> <a href='".$sbi_url."' class='sbi-button'>Re-check License</a></p>
                <div id='sbi-why-renew' style='display: none;'>
                    <h4>Customer Support</h4>
                    <p>Without a valid license key you will no longer be able to receive updates or support for the Instagram Feed plugin. A renewed license key grants you access to our top-notch, quick and effective support for another full year.</p>

                    <h4>Maintenance Upates</h4>
                    <p>With both WordPress and the Instagram API being updated on a regular basis we stay on top of the latest changes and provide frequent updates to keep pace.</p>

                    <h4>New Feature Updates</h4>
                    <p>We're continually adding new features to the plugin, based on both customer suggestions and our own ideas for ways to make it better, more useful, more customizable, more robust and just more awesome! Renew your license to prevent from missing out on any of the new features added in the future.</p>
                </div>";

            if( $sbi_check_license && !$sbi_license_expired && !$sbi_expire_countdown ){
                $sbi_expired_box_classes = "sbi-license-expired sbi-license-valid";
                $sbi_expired_box_msg = "Thanks ".$sbi_license_data["customer_name"].", your Instagram Feed Pro license key is valid.";
            }

            _e("
            <div class='".$sbi_expired_box_classes."'>
                <a style='float:right; color: #dd3d36; text-decoration: none;' href='" .esc_url( add_query_arg( 'sbi_nag_ignore', '0' ) ). "'>Dismiss</a>
                <p>".$sbi_expired_box_msg." 
            </div>
            <script type='text/javascript'>
            function sbiShowReasons() {
                document.getElementById('sbi-why-renew').style.display = 'block';
                document.getElementById('sbi-why-renew-show').style.display = 'none';
                document.getElementById('sbi-why-renew-hide').style.display = 'inline';
            }
            function sbiHideReasons() {
                document.getElementById('sbi-why-renew').style.display = 'none';
                document.getElementById('sbi-why-renew-show').style.display = 'inline';
                document.getElementById('sbi-why-renew-hide').style.display = 'none';
            }
            </script>
            ");
        }

    }
}
add_action('admin_init', 'sbi_nag_ignore');
function sbi_nag_ignore() {
    global $current_user;
        $user_id = $current_user->ID;
        if ( isset($_GET['sbi_nag_ignore']) && '0' == $_GET['sbi_nag_ignore'] ) {
             add_user_meta($user_id, 'sbi_ignore_notice', 'true', true);
    }
}

function sb_instagram_clear_page_caches() {
    if ( isset( $GLOBALS['wp_fastest_cache'] ) && method_exists( $GLOBALS['wp_fastest_cache'], 'deleteCache' ) ){
        $GLOBALS['wp_fastest_cache']->deleteCache();
    }

    if ( function_exists( 'wp_cache_clear_cache' ) ) {
        wp_cache_clear_cache();
    }

    if ( class_exists('W3_Plugin_TotalCacheAdmin') ) {
        $plugin_totalcacheadmin = & w3_instance('W3_Plugin_TotalCacheAdmin');

        $plugin_totalcacheadmin->flush_all();
    }
}
//Cron job to clear transients
add_action('sb_instagram_cron_job', 'sb_instagram_cron_clear_cache');
function sb_instagram_cron_clear_cache() {
    //Delete all transients
    global $wpdb;
    $table_name = $wpdb->prefix . "options";
    $wpdb->query( "
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_sbi\_%')
        " );
    $wpdb->query( "
        DELETE
        FROM $table_name
        WHERE `option_name` LIKE ('%\_transient\_timeout\_sbi\_%')
        " );

    sb_instagram_clear_page_caches();
}

?>