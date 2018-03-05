<?php

class optinspin_Coupon_Request extends optinspin_Subscriber {

    function __construct() {
        add_action( 'wp_footer', array($this,'optinspin_coupon_request_javascript') );
        add_action( 'wp_ajax_optinspin_coupon_request', array($this,'optinspin_coupon_request_callback') );
        add_action( 'wp_ajax_nopriv_optinspin_coupon_request', array($this,'optinspin_coupon_request_callback') );
        add_action( 'wp_footer', array($this,'optinspin_coupon_bar') );
    }

    function optinspin_coupon_bar() {
        $coupon_msg = optinspin_crb_get_i18n_theme_option('optinspin_coupon_bar_msg');
        if( isset($_COOKIE['optinspin_coupon_code']) )
            $coupon_msg = str_replace('{coupon}',$_COOKIE['optinspin_coupon_code'],$coupon_msg);
        $html = '<div class="optinspin-optin-bar"><span class="optinspin-congo">'.$coupon_msg.'</span><span>X</span></div>';
        echo $html;
    }

    function optinspin_coupon_request_javascript() {
        global $optinspin_Chatchamp;
        $chatchamp_subscriber = json_decode( $optinspin_Chatchamp->optinspin_get_chatchamp_subscriber_name()['body'] );
        $u_name = 'OptinSpin';
        if( $chatchamp_subscriber->subscriber->firstName != '' )
            $u_name = $chatchamp_subscriber->subscriber->firstName;

        $this->optinspin_win_loss_style(); ?>
        <script type="text/javascript" >
            jQuery(document).ready(function($) {
                var click_test = 0;
                jQuery('.optinspin-name, .optinspin-email').keyup(function (e) {
                    if (e.keyCode === 13 && click_test == 0) {
                        click_test = 1;
                        jQuery('.optinspin-form-btn').trigger('click');
                    }
                });

                jQuery('.optinspin-form-btn').click(function(e) {

                    jQuery('.optinspin-notify-field').remove();
                    jQuery('.optinspin-error').hide();
                    var name = ''; var error_count = 1;
                    if(jQuery('.optinspin-from .optinspin-name').hasClass('field-block')){
                        name = jQuery('.optinspin-form-field.optinspin-name').val();
                        error_count = 0;
                    } else if(jQuery('.optinspin-from .optinspin-name').hasClass('field-none')) {
                        name = 'Guest';
                        error_count = 1;
                    }
                    var email = jQuery('.optinspin-form-field.optinspin-email').val();

                    console.log('name'+name+' - '+email);

                    var chatchamp_validate = getCookie('chatchamp_validate');

                    if( ( name != '' && email != '' ) || ( chatchamp_validate == '' || chatchamp_validate == 1 ) ) {
                        if( optinspin_isValidEmailAddress( email ) || ( chatchamp_validate == '' || chatchamp_validate == 1 ) ) {
                            if( chatchamp_validate == 1 ) {
                                name = '<?php echo $u_name?>';
                                email = 'ChatChamp';
                            }
                            optinspin_add_subsriber( name, email );
                        } else {
                            jQuery('.optinspin-error').html('Email is invalid');
                            jQuery('.optinspin-error').show();
                            jQuery('.optinspin-right').animate({
                                scrollTop: 100
                            }, 'slow');
                        }
                    } else {
                        if( error_count == 1)
                            jQuery('.optinspin-error').html('Email is required');
                        else if( chatchamp_validate == 0 )
                            jQuery('.optinspin-error').html('You must sign in with Facebook');
                        else
                            jQuery('.optinspin-error').html('Email & name are required');

                        jQuery('.optinspin-error').show();
                        jQuery('.optinspin-right').animate({
                            scrollTop: 100
                        }, 'slow');
                    }
                    var spin_width = jQuery(window).width();
                    setCookie('optinspin_spin_start',1,1);
                    setCookie('optinspin_spin_width',spin_width,1);
                });
            });

            function optinspin_isValidEmailAddress(emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            }
            
            function optinspin_add_subsriber( name, email) {

                jQuery('.lds-css.ng-scope').show();
                jQuery('.optinspin-from').css('opacity','0.5');
                jQuery('.optinspin-error').html('');

                var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';

                var data = {
                    'action': 'optinspin_coupon_request',
                    'request_to': 'coupon_request',
                    'name': name,
                    'email': email,
                };
                
                var cookie_expiry = <?php echo ( optinspin_crb_get_i18n_theme_option('optinspin_cookie_expiry') == '' ? 0 : optinspin_crb_get_i18n_theme_option('optinspin_cookie_expiry') ) ?>;

                if(cookie_expiry == 0){
                    setCookie('optinspin_email_for_zero',email,1000);
                    setCookie('optinspin_user_for_zero',name,1000);
                }

                setCookie('optinspin_email',email,cookie_expiry);
                setCookie('optinspin_user',name,cookie_expiry);

                jQuery.post(ajaxurl, data, function(response) {
                    var width = jQuery(window).width();

                    console.log(response);
                    var chatchamp_validate = getCookie('chatchamp_validate');
                    if( response == true || ( chatchamp_validate == '' || chatchamp_validate == 1 ) ) {
                        jQuery('.optinspin-from').fadeOut();
                        jQuery('.optinspin-error').hide();
//                        jQuery('.optinspin-right').fadeOut();
                        setTimeout(function() {
                            jQuery('.lds-css.ng-scope').hide();
                            jQuery('.optinspin-from').css('opacity','1');
                            jQuery('.optinspin-intro').hide();
                            if( width > 480 ) {
                                jQuery('.wheelContainer').animate({
                                    'marginLeft': "30%"
                                }, 300, function () {
                                    jQuery('.optinspin-error').hide();
                                    jQuery('.optinspin-cross-wrapper').hide();
                                    jQuery('.spinBtn').trigger('click');
                                    click_test = 0;
                                });
                            } else if( width <= 480 ) {
                                jQuery('.wheelContainer').animate({
                                    'marginLeft': "0%"
                                }, 300, function () {
                                    jQuery('.optinspin-error').hide();
                                    jQuery('.optinspin-cross-wrapper').hide();
                                    jQuery('.spinBtn').trigger('click');
                                    spin_480_start();
                                    click_test = 0;
                                });
                            }
                        },1000);
                    } else {
                        jQuery('.lds-css.ng-scope').hide();
                        jQuery('.optinspin-from').css('opacity','1');
                        jQuery('.optinspin-error').html('Email Already Exist!');
                        jQuery('.optinspin-error').show();
                        jQuery('.optinspin-right').animate({
                            scrollTop: 100
                        }, 'slow');
                        click_test = 0;
                    }
                });
            }
        </script> <?php
    }

    function optinspin_coupon_request_callback() {
        if( $_POST['request_to'] == 'coupon_request' ) {
            $name = sanitize_text_field( $_POST['name'] );
            $email = sanitize_text_field( $_POST['email'] );
            $subscribe = $this->optinspin_add_new_subscriber( $name, $email );
            echo $subscribe;
            die();
        } else if( $_POST['request_to'] == 'apply_coupon' ) {
            $coupon = get_the_title( $_POST['coupon'] );
            $this->optinspin_apply_coupon_on_cart( $coupon );
        } else if( $_POST['request_to'] == 'send_email' ) {
            $coupon = get_the_title( $_POST['coupon'] );
            $email_temp = $_POST['email_temp'];
            if(empty(optinspin_crb_get_i18n_theme_option('optinspin_disable_email_shoot')))
                $this->optinspin_send_coupon_email( $_COOKIE['optinspin_email'],$coupon,$email_temp);
        } else if( $_POST['request_to'] == 'get_coupon' ) {
            echo get_the_title( $_POST['coupon'] );
        } else if( $_POST['request_to'] == 'get_coupon_expiry' ) {
            $coupon_id = (int) $_POST['coupon_id'];
            echo get_post_meta($coupon_id,'expiry_date',true);
        } else if( $_POST['request_to'] == 'generate_coupon' ) {
            $coupon_code = $this->optinspin_unique_coupon(); // Code
            if( !empty( post_exists($coupon_code) ) ) {
                $coupon_code = $this->optinspin_unique_coupon(); // Code
            }
            $amount = $_POST['coupon_discount']; // Amount
            $days = $_POST['coupon_expire'];
            $coupon_expire = date('Y-m-d', strtotime("+".$days." days")); // Amount
            $discount_type = 'percent'; // Type: fixed_cart, percent, fixed_product, percent_product

            $coupon = array(
                'post_title' => $coupon_code,
                'post_content' => '',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type'		=> 'shop_coupon'
            );

            $new_coupon_id = wp_insert_post( $coupon );

            // Add meta
            update_post_meta( $new_coupon_id, 'discount_type', $discount_type );
            update_post_meta( $new_coupon_id, 'coupon_amount', $amount );
            update_post_meta( $new_coupon_id, 'individual_use', 'no' );
            update_post_meta( $new_coupon_id, 'product_ids', '' );
            update_post_meta( $new_coupon_id, 'exclude_product_ids', '' );
            update_post_meta( $new_coupon_id, 'usage_limit', '1' );
            update_post_meta( $new_coupon_id, 'expiry_date', $coupon_expire );
            update_post_meta( $new_coupon_id, 'apply_before_tax', 'yes' );
            update_post_meta( $new_coupon_id, 'free_shipping', 'no' );

            echo $new_coupon_id.'_'.$coupon_code.'_'.$coupon_expire;
        }
        die(); // this is required to terminate immediately and return a proper response
    }

    function optinspin_apply_coupon_on_cart( $coupon_code ) {
        global $woocommerce;
        $coupon_code = $coupon_code;
        $woocommerce->cart->add_discount( $coupon_code );

        die(); // this is required to terminate immediately and return a proper response
    }

    function optinspin_send_coupon_email( $to, $coupon, $email_temp ) {

        if( $email_temp == 'win' ) {
            $subject = optinspin_crb_get_i18n_theme_option('optinspin_email_subject');
            $msg = optinspin_crb_get_i18n_theme_option('optinspin_email_body');
        } else {
            $subject = optinspin_crb_get_i18n_theme_option('optinspin_loss_email_subject');
            $msg = optinspin_crb_get_i18n_theme_option('optinspin_loss_email_body');
        }

        if( !empty( $_COOKIE['optinspin_user'] ) )
            $username = $_COOKIE['optinspin_user'];
        else
            $username = 'There!';

        $msg = str_replace('{user}',$username,$msg);
        $msg = str_replace('{coupon}',$coupon,$msg);
        $wc_email = new WC_Emails();
        $wc_email->send( $to, $subject, $wc_email->wrap_message($subject,$msg) );
    }

    function optinspin_win_loss_style() {
        ?>
        <canvas id="world"></canvas>
        <style>
            .winning_lossing {
                background-color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_win_background_color') ?>;
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_win_text_color') ?>;
                border: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_win_border_color') ?>;
                font-size: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_font_size') ?>;
            }
            .winning_lossing a {
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_add_cart_link_color') ?> !important;
                text-decoration: none;
            }
            .optinspin-decline-coupon a {
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_skip_link_color') ?>  !important;
            }
            .optinspin-win-info {
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_msg_text_color') ?>  !important;
                background-color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_msg_bg') ?>  !important;
            }
            .optinspin-optin-bar {
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_bar_color') ?>  !important;
                background-color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_bar_bg') ?>  !important;
            }
            span.exp-time {
                background-color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_bar_timer_color') ?>  !important;
                color: <?php echo optinspin_crb_get_i18n_theme_option('optinspin_coupon_bar_timer_text_color') ?>  !important;
            }
        </style>
        <?php
    }

    function optinspin_unique_coupon() {
        $str = 'abcdefghijklmnopqrstuvwxyz01234567891011121314151617181920212223242526';
        $shuffled = str_shuffle($str);
        $shuffled = substr($shuffled,1,5);
        return $shuffled;
    }
}