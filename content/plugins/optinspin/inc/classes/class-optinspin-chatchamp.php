<?php

Class optinspin_Chatchamp {

    function __construct() {
//        add_action('optinspin_before_form',array($this,'optinspin_before_form'));
//        add_action('wp_footer',array($this,'test_chatchamp') );
    }

    public function test_chatchamp() {
        echo $this->optinspin_chatchamp_html();
    }

    function optinspin_chatchamp_is_enabled() {
        $is_enabled = optinspin_crb_get_i18n_theme_option('optinspin_chatchamp_enabled');
        if(!empty($is_enabled))
            return true;
        else
            return false;
    }

    function optinspin_hide_form() {
        ?>
        <script>
            jQuery(document).ready(function() {
                jQuery('.optinspin-from .optinspin-name,.optinspin-from .optinspin-email').hide();
                jQuery('.optinspin-form-btn').attr('disabled',true);
            });
        </script>
        <?php
    }

    function optinspin_password_protect_html() {
        global $optinspin_Chatchamp;
        $html = '<div class="optinspin-password">';
        $html .= $optinspin_Chatchamp->optinspin_chatchamp_html();
        $html .= '</div>';

        return $html;
    }

    function optinspin_chatchamp_html() {
        $fb_ids = $this->optinspin_get_chatchamp_config_ids();
        $html = '<div class="fb-send-to-messenger"
              messenger_app_id="'.$fb_ids['facebookAppId'].'" 
              page_id="'.$fb_ids['facebookPageId'].'" 
              data-ref="OptinSpin" 
              color="blue" 
              size="large">
            </div>';
        ?>
        <script>
            jQuery(document).ready(function() {
                setCookie('chatchamp_validate',0);
            });

            window.fbAsyncInit = function() {
                FB.init({
                    appId            : '<?php echo $fb_ids['facebookAppId']?>',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v2.11'
                });


                FB.Event.subscribe('send_to_messenger', function(e) {
                    // callback for events triggered by the plugin
                    if( e.event == 'opt_in' ) {
                        setCookie('chatchamp_validate',1);
                        jQuery('.optinspin-form-btn').attr('disabled',false);
                        jQuery('.optinspin-password').fadeOut("slow", function () {
                            jQuery('.optinspin-from form').fadeIn();
                            jQuery('.wlo_small_text').show();
                            jQuery('.optinspin-intro').css('opacity', 1);
                        });
                        // setCookie('chatchamp_sessionid',e.ref);

                    } else if( e.event == 'rendered' ) {
                        var chatchmp_id = '';
                        if( e.ref != '' ) {
                            var sess_id = e.ref;
                            if( sess_id.indexOf(':') > 0 ) {
                                sess_id = sess_id.split(':');
                                if( sess_id[1] != '' ) {
                                    chatchmp_id = window.chatchamp.sessionId;
                                    jQuery('.fb-send-to-messenger').attr('data-ref','chatchampSessionId:'+chatchmp_id+'/source:OptinSpin');
                                }
                            }
                        }
                    }
                });

                FB.Event.subscribe('messenger_checkbox', function(e) {

                    if( e.is_after_optin == true ) {
                        setCookie('chatchamp_validate',1);
                        jQuery('.optinspin-form-btn').attr('disabled',false);
                        jQuery('.optinspin-password').fadeOut("slow", function () {
                            jQuery('.optinspin-from form').fadeIn();
                            jQuery('.wlo_small_text').show();
                            jQuery('.optinspin-intro').css('opacity', 1);
                        });
                    }

                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        </script>
        <?php
        return $html;
    }

    function optinspin_get_chatchamp_config_ids() {
        $chatchamp_id = optinspin_crb_get_i18n_theme_option('optinspin_chatchamp_id');
        $url = 'https://api.chatchamp.io/config/'.$chatchamp_id;
        $response = wp_remote_get( $url );
        $fb_ids = array();
        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            return $fb_ids['error'] = $error_message;
        } else {
            $response = json_decode( $response['body'] );
            $fb_ids['facebookAppId'] = $response->facebookAppId;
            $fb_ids['facebookPageId'] = $response->facebookPageId;
        }

        return $fb_ids;
    }

    function optinspin_get_chatchamp_subscriber_name() {
        $chatchamp_sessionid = $_COOKIE['chatchamp_session_id'];
        $url = 'https://api.chatchamp.io/subscribers/'.$chatchamp_sessionid;
        $response = wp_remote_get( $url );
        return $response;
    }
}