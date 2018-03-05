<div class="ctf_support">
	<br />
<h3 style="padding-bottom: 10px;">Need help?</h3>

<p>
	<span class="ctf-support-title"><i class="fa fa-life-ring" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/custom-twitter-feeds/docs/setup/" target="_blank"><?php _e('Setup Directions'); ?></a></span>
	<?php _e('A step-by-step guide on how to setup and use the plugin.'); ?>
</p>

<p>
	<span class="ctf-support-title"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp; <a href="https://www.youtube.com/watch?v=5WoAv2yscP8" target="_blank" id="ctf-play-support-video"><?php _e('Watch a Video'); ?></a></span>
	<?php _e('How to setup, use, and customize the plugin.'); ?>

	<iframe id="ctf-support-video" src="//www.youtube.com/embed/V_fJ_vhvQXM?theme=light&amp;showinfo=0&amp;controls=2" width="960" height="540" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</p>

<p>
	<span class="ctf-support-title"><i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/custom-twitter-feeds/faq/" target="_blank"><?php _e('FAQs and Docs'); ?></a></span>
	<?php _e('View our FAQs and documentation to help solve your problem as quickly as possible.'); ?>
</p>

<div class="ctf-support-faqs">

	<ul>
		<li><b>FAQs</b></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/how-to-build-a-search-feed/" target="_blank">How to Build a Search Feed</a>'); ?></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/my-feed-wont-show-the-latest-tweets/" target="_blank">My Feed Won\'t Show the Latest Tweets</a>'); ?></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/how-do-i-create-a-twitter-list/" target="_blank">How do I Create a Twitter List</a>'); ?></li>
		<li style="margin-top: 8px; font-size: 12px;"><a href="https://smashballoon.com/custom-twitter-feeds/faq/" target="_blank">See All<i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
	</ul>

	<ul>
		<li><b>Documentation</b></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/custom-twitter-feeds/docs/" target="_blank">Installation and Configuration</a>'); ?></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/custom-twitter-feeds/docs/errors/" target="_blank">Twitter API Error Reference</a>'); ?></li>
		<li>&bull;&nbsp; <?php _e('<a href="https://smashballoon.com/custom-twitter-feeds/docs/create-twitter-app/" target="_blank">Create Your Own Twitter App</a>'); ?></li>
	</ul>
</div>

<p>
	<span class="ctf-support-title"><i class="fa fa-rocket" aria-hidden="true"></i>&nbsp; <a href="admin.php?page=ctf-welcome-new"><?php _e('Welcome Page'); ?></a></span>
	<?php _e("View the plugin welcome page to see what's new in the latest update."); ?>
</p>

<p>
	<span class="ctf-support-title"><i class="fa fa-envelope" aria-hidden="true"></i>&nbsp; <a href="https://smashballoon.com/custom-twitter-feeds/support/" target="_blank"><?php _e('Request Support'); ?></a></span>
	<?php _e('Still need help? Submit a ticket and one of our support experts will get back to you as soon as possible.<br /><b>Important:</b> Please include your <b>System Info</b> below with all support requests.'); ?>
</p>
</div>

<hr />
<h3><?php _e('System Info', 'custom-twitter-feeds' ); ?> &nbsp; <i style="color: #666; font-size: 11px; font-weight: normal;"><?php _e( 'Click the text below to select all', 'custom-twitter-feeds' ); ?></i></h3>

<textarea readonly="readonly" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)." style="width: 70%; height: 500px; white-space: pre; font-family: Menlo,Monaco,monospace;">
## SITE/SERVER INFO: ##
Plugin Version:           <?php echo CTF_PRODUCT_NAME . ' v' . CTF_VERSION. "\n"; ?>
Site URL:                 <?php echo site_url() . "\n"; ?>
Home URL:                 <?php echo home_url() . "\n"; ?>
WordPress Version:        <?php echo get_bloginfo( 'version' ) . "\n"; ?>
PHP Version:              <?php echo PHP_VERSION . "\n"; ?>
Web Server Info:          <?php echo $_SERVER['SERVER_SOFTWARE'] . "\n"; ?>
PHP allow_url_fopen:      <?php echo ini_get( 'allow_url_fopen' ) ? "Yes" . "\n" : "No" . "\n"; ?>
PHP cURL:                 <?php echo is_callable('curl_init') ? "Yes" . "\n" : "No" . "\n"; ?>
JSON:                     <?php echo function_exists("json_decode") ? "Yes" . "\n" : "No" . "\n" ?>
SSL Stream:               <?php echo in_array('https', stream_get_wrappers()) ? "Yes" . "\n" : "No" . "\n" //extension=php_openssl.dll in php.ini ?>

## ACTIVE PLUGINS: ##
<?php
$plugins = get_plugins();
$active_plugins = get_option( 'active_plugins', array() );

foreach ( $plugins as $plugin_path => $plugin ) {
    // If the plugin isn't active, don't show it.
    if ( in_array( $plugin_path, $active_plugins ) ) {
        echo $plugin['Name'] . ': ' . $plugin['Version'] ."\n";
    }
}
?>

## OPTIONS: ##
<?php
$options = get_option( 'ctf_options' );
foreach ( $options as $key => $val ) {
    $label = $key . ':';
    $value = isset( $val ) ? esc_attr( $val ) : 'unset';
    echo str_pad( $label, 24 ) . $value ."\n";
}

$options = get_option( 'ctf_options' );
$consumer_key = ! empty( $options['consumer_key'] ) && $options['have_own_tokens'] ? $options['consumer_key'] : 'FPYSYWIdyUIQ76Yz5hdYo5r7y';
$consumer_secret = ! empty( $options['consumer_secret'] ) && $options['have_own_tokens'] ? $options['consumer_secret'] : 'GqPj9BPgJXjRKIGXCULJljocGPC62wN2eeMSnmZpVelWreFk9z';
$request_settings = array(
    'consumer_key' => $consumer_key,
    'consumer_secret' => $consumer_secret,
    'access_token' => $options['access_token'],
    'access_token_secret' => $options['access_token_secret']
);

if( isset($options['request_method']) ){
    $request_method = isset( $options['request_method'] ) ? $options['request_method'] : 'auto';

    include_once( CTF_URL . '/inc/CtfOauthConnect.php' );
    $twitter_api = new CtfOauthConnect( $request_settings, 'usertimeline' );
    $twitter_api->setUrlBase();
    $get_fields = array( 'count' => '1' );
    $twitter_api->setGetFields( $get_fields );
    $twitter_api->setRequestMethod( $request_method );

    $twitter_api->performRequest();
    $response = json_decode( $twitter_api->json , $assoc = true );
    $screen_name = isset( $response[0] ) ? $response[0]['user']['screen_name'] : 'error';
    if ( $screen_name == 'error' ) {
        if ( isset( $response['errors'][0] ) ) {
            $twitter_api->api_error_no = $response['errors'][0]['code'];
            $twitter_api->api_error_message = $response['errors'][0]['message'];
        }
    }
?>

## Twitter API RESPONSE: ##
<?php
echo 'Screen Name:   ' . $screen_name."\n";
echo 'Error No:      ' . $twitter_api->api_error_no."\n";
echo 'Error Message: ' . $twitter_api->api_error_message."\n";

} //End isset check
?>

</textarea>