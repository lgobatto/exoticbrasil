<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

Class optinspin_Settings {

    function __construct() {
        add_action( 'carbon_fields_register_fields', array($this,'optinspin_add_settings_page') );
        add_action( 'after_setup_theme', array($this,'optinspin_crb_load') );
    }

    function optinspin_add_settings_page() {

		$optinspin_mailchimp_get_list = get_option( 'optinspin_mailchimp_get_list');
		if(!empty($optinspin_mailchimp_get_list)){
			$optinspin_mailchimp_get_list = json_decode($optinspin_mailchimp_get_list);
			if(!empty($optinspin_mailchimp_get_list->data)){
				$arraysfor_optinspin_mailchimp_get_list[''] = 'Select Email List';
				foreach($optinspin_mailchimp_get_list->data as $data){
					$arraysfor_optinspin_mailchimp_get_list[$data->id] =  $data->name;
				}
			} else {
				$arraysfor_optinspin_mailchimp_get_list[''] = 'Email List not found!';
			}
		}else{
			$arraysfor_optinspin_mailchimp_get_list[''] = 'Email List not found!';
		}
		
		$optinspin_active_campaign_get_list = get_option( 'optinspin_active_campaign_get_list');
		if(!empty($optinspin_active_campaign_get_list)){
			if(!empty($optinspin_active_campaign_get_list)){
				$arraysfor_optinspin_active_campaign_get_list[''] = 'Select Email List';
				foreach($optinspin_active_campaign_get_list as $data){
					if(!empty($data['id']) and !empty($data['name'])){
						$arraysfor_optinspin_active_campaign_get_list[$data['id']] =  $data['name'];
					}
				}
				
			} else {
				$arraysfor_optinspin_active_campaign_get_list[''] = 'Email List not found!';
			}
		}else{
			$arraysfor_optinspin_active_campaign_get_list[''] = 'Email List not found!';
		}
		if(function_exists( 'mailster' )){
			$lists = mailster( 'lists' )->get();
			$mailsteractive = 1;
			update_option('_optinspin_mailsteractive',1);
			if(!empty($lists)){
				$arraysfor_optinspin_mailster_get_list[''] = 'Select Email List';
				foreach($lists as $list){
					$arraysfor_optinspin_mailster_get_list[$list->ID] = $list->name;
				}
			} else {
				$arraysfor_optinspin_mailster_get_list[''] = 'Email List not found!';
			}
		} else {
			update_option('_optinspin_mailsteractive',0);
			$arraysfor_optinspin_mailster_get_list = array();
			$mailsteractive = 0;
		}
        Container::make( 'theme_options', __( 'Optin Spin', 'optinspin ' ) )
            ->set_page_file( 'optinspin-settings' )
            ->add_tab( __('General'), array(

                Field::make( 'text', 'optinspin_spin_speed'.optinspin_crb_get_i18n_suffix(), 'Wheel Spin Speed' )
                    ->set_attribute('type','number')
                    ->set_default_value('0.5')
                    ->set_help_text('Control the speed of the wheel'),
                    
                Field::make( 'text', 'optinspin_cookie_expiry'.optinspin_crb_get_i18n_suffix(), 'Cookie Expiry Time' )
                    ->set_attribute('type','number')
                    ->set_default_value('2')
                    ->set_help_text('Expire Cookie in Days'),

                /*Field::make( 'text', 'optinspin_no_of_spin', 'Number of Spin' )
                    ->set_attribute('type','number')
                    ->set_default_value('3')
                    ->set_help_text('Number of spin'),*/

                Field::make( 'checkbox', 'optinspin_enable_cart_redirect'.optinspin_crb_get_i18n_suffix(), 'Enable Cart Redirect' )
                    ->set_help_text( 'Enable Cart Redirect after successfuly added coupon to cart' )
                    ->set_option_value( 'Enable Cart Redirect after successfuly added coupon to cart' ),


                Field::make( 'separator', 'optinspin_wheel_style', 'Style' ),

                /*Field::make( 'image', 'optinspin_wheel_logo', 'Wheel Logo' )
                    ->set_value_type( 'url' )
                    ->set_help_text( 'Set Logo in the spinner wheel' ),*/

                Field::make( 'image', 'optinspin_background_image'.optinspin_crb_get_i18n_suffix(), 'Background Image' )
                    ->set_value_type( 'url' ),

                Field::make( 'text', 'optinspin_text_size'.optinspin_crb_get_i18n_suffix(), 'Wheel Text Size' )
                    ->set_attribute('type','number')
                    ->set_default_value('2.3')
                    ->set_help_text('Adjust Text Size of Segments'),

                Field::make( 'text', 'optinspin_border_width'.optinspin_crb_get_i18n_suffix(), 'Border Width' )
                    ->set_attribute('type','number')
                    ->set_default_value('18')
                    ->set_help_text('Set Border Width'),

                Field::make( 'image', 'optinspin_logo'.optinspin_crb_get_i18n_suffix(), 'Logo' )
                    ->set_value_type( 'url' )
                    ->set_help_text( 'Set Logo in the above the form' ),

                Field::make( 'checkbox', 'optinspin_enable_sound'.optinspin_crb_get_i18n_suffix(), 'Enable Sound' )
                    ->set_option_value( 'Enable Sound' ),

                Field::make( 'checkbox', 'optinspin_enable_sparkle'.optinspin_crb_get_i18n_suffix(), 'Enable Sparkel' )
                    ->set_option_value( 'Enable Sparkel after win' ),

                Field::make( 'separator', 'optinspin_wheel_setting', 'Colors' ),

                Field::make( 'color', 'optinspin_background_color'.optinspin_crb_get_i18n_suffix(), 'Background' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set background Color of Wheel' ),

                Field::make( 'color', 'optinspin_border_color'.optinspin_crb_get_i18n_suffix(), 'Outer Border' )
                    ->set_palette( array( '#FF0000', '#00FF00'.optinspin_crb_get_i18n_suffix(), '#0000FF' ) )
                    ->set_help_text( 'Set outer border Color of wheel' ),

                Field::make( 'color', 'optinspin_inner_border_color'.optinspin_crb_get_i18n_suffix(), 'Inner Border' )
                    ->set_palette( array( '#FF0000', '#00FF00'.optinspin_crb_get_i18n_suffix(), '#0000FF' ) )
                    ->set_help_text( 'Set inner border Color of wheel' ),

                Field::make( 'color', 'optinspin_text_color'.optinspin_crb_get_i18n_suffix(), 'Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Text Color Of Segment' ),

                Field::make( 'color', 'optinspin_buttons_color'.optinspin_crb_get_i18n_suffix(), 'Button Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Color of the Button' ),

                Field::make( 'color', 'optinspin_buttons_text_color'.optinspin_crb_get_i18n_suffix(), 'Button Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Color of the Button' ),

                Field::make( 'color', 'optinspin_buttons_hover_color'.optinspin_crb_get_i18n_suffix(), 'Button Hover Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Color of the Button Hover' ),

                Field::make( 'separator', 'optinspin_wheel_formating', 'Labels / Text' ),

                Field::make( 'text', 'optinspin_spinner_label'.optinspin_crb_get_i18n_suffix(), 'Spinner Label' )
                    ->set_help_text('Set Text of Spinner Label')
                    ->set_default_value('Try Spin to Win!'),

                Field::make( 'text', 'optinspin_cross_label'.optinspin_crb_get_i18n_suffix(), 'Cross Label' )
                    ->set_help_text('Cross Label'),

                Field::make( 'text', 'optinspin_email_label'.optinspin_crb_get_i18n_suffix(), 'Email Label' )
                    ->set_help_text( 'Set label of the Email Field' )
                    ->set_default_value('Your Email'),

                Field::make( 'text', 'optinspin_name_label'.optinspin_crb_get_i18n_suffix(), 'Name Label' )
                    ->set_help_text( 'Set label of the Name Field (Leave Empty if you don\t want to show this field on frontend)' )
                    ->set_default_value('Your Name'),

                Field::make( 'text', 'optinspin_button_label'.optinspin_crb_get_i18n_suffix(), 'Button Label' )
                    ->set_help_text( 'Set Label of the button' ),

                Field::make( 'textarea', 'optinspin_intro_text'.optinspin_crb_get_i18n_suffix(), 'Intro Text' )
                    ->set_default_value('<div id="optinspin-content" style="text-align: left;padding: 0px 0px 0px 10px;"><div class="wlo_title" style="font-family: sans-serif  !important;font-size: 25px;line-height: 1.3em;    font-weight: bold;color: white;margin-bottom: 20px;" >OptinSpins <b style="color: #f1c40f;focnt-size: 25px;line-height: 1.3em;font-family: sans-serif;font-weight:bold;">special offer</b> unlocked!</div><div class="wlo_text" style="color: white;font-size: 14px;text-shadow: none;">You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.</div>						<div class="wlo_small_text wlo_disclaimer_text"style="    font-size: 12px;color: #b1b1b1;" >* You can spin the wheel only once.<br>* If you win, you can claim your coupon within limited time <br>* OptinSpin reserves the right to cancel the coupon anytime </div></div>'),

                ) )

                ->add_tab( __('Triggers'), array(
                    
                Field::make( 'separator', 'optinspin_wheel_clickable_tab', 'Open Spin By Clickable Tab' ),
                       
                Field::make( 'checkbox', 'optinspin_enable_clickable_tab_desktop'.optinspin_crb_get_i18n_suffix(), 'Show Clickable Tab on Desktop' )
                    ->set_option_value( 'Enable Time Delay Popup on Deskto' ),
                    
                Field::make( 'checkbox', 'optinspin_enable_clickable_tab_mobile'.optinspin_crb_get_i18n_suffix(), 'Show Clickable Tab on Mobile' )
                    ->set_option_value( 'Enable Intent Exit Popup on Mobile' ),
                    
                Field::make( 'separator', 'optinspin_wheel_time_interval_separator', 'Open Spin By Time' ),

                Field::make( 'select', 'optinspin_wheel_open_at'.optinspin_crb_get_i18n_suffix(), 'Open Wheel at' )
                    ->add_options( array(
                        'none' => 'none',
                        'once' => 'once',
                        'every' => 'every',
                    ) )
                    ->set_help_text('Time/Interval'),

                Field::make( 'text', 'optinspin_open_wheel_after'.optinspin_crb_get_i18n_suffix(), 'Open Wheel After' )
                    ->set_help_text( 'Open Wheel after X seconds' )
                    ->set_default_value( '5' ),
                    
                Field::make( 'checkbox', 'optinspin_enable_time_delay_desktop'.optinspin_crb_get_i18n_suffix(), 'Enable Time Delay Popup on Desktop' )
                    ->set_option_value( 'Enable Time Delay Popup on Deskto' ),
                    
                Field::make( 'checkbox', 'optinspin_enable_time_delay_mobile'.optinspin_crb_get_i18n_suffix(), 'Enable Time Delay Popup on Mobile' )
                    ->set_option_value( 'Enable Intent Exit Popup on Mobile' ),

                Field::make( 'separator', 'optinspin_wheel_intent_exit', 'Open Spin By Intent Exit' ),
                
                Field::make( 'checkbox', 'optinspin_enable_intent_exit_popup_desktop'.optinspin_crb_get_i18n_suffix(), 'Enable Intent Exit Popup Desktop' )
                    ->set_option_value( 'Enable Intent Exit Popup on Desktop' ),
                    
                Field::make( 'checkbox', 'optinspin_enable_intent_exit_popup_mobile'.optinspin_crb_get_i18n_suffix(), 'Enable Intent Exit Popup Mobile' )
                    ->set_option_value( 'Enable Intent Exit Popup on Mobile' ),
                    
                                  
                    
                ) )
            ->add_tab( __('Section'), array(

                Field::make( 'complex', 'crb_section'.optinspin_crb_get_i18n_suffix() )
                    ->set_collapsed( true )
                    ->add_fields( 'no_prize', array(

                        Field::make( 'text', 'optinspin_section_label', 'Label' )
                            ->set_help_text('Label of wheel section')
                            ->set_classes( 'optinspin_section_label' ),

                        Field::make( 'color', 'segment_color', 'Section color' )
                            ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                            ->set_help_text( 'Set the color of the respective section/segment' ),
                        Field::make( 'textarea', 'optinspin_win_loss_text', 'Lossing text' ),
                        Field::make( 'text', 'optinspin_probability', 'Probability' )
                            ->set_attribute('type','number')
                            ->set_help_text( 'How much chances to stop at this segment ( 0 - 100 )' ),

                    ))->set_collapsed( true )
                    ->add_fields( 'win_prize', array(


                        Field::make( 'text', 'optinspin_section_label', 'Label' )
                            ->set_help_text('Label of wheel section')
                            ->set_classes( 'optinspin_section_label' ),

                        Field::make( 'checkbox', 'optinspin_section_generate_coupon', 'Generate Coupon Automatically' )
                            ->set_option_value( 'Generate Coupon Automatically' )
                            ->set_classes( 'optinspin_generate_coupon_checkbox' ),

                        Field::make( 'text', 'optinspin_section_discount', 'Coupon Discount in %' )
                            ->set_help_text('Set Coupon Discount')
                            ->set_conditional_logic( array(
                                array(
                                    'field' => 'optinspin_section_generate_coupon',
                                    'value' => true,
                                )
                            ) ),

                        Field::make( 'text', 'optinspin_section_discount_expiry_day', 'Coupon Expire Time' )
                            ->set_help_text('Coupon Expire in Days')
                            ->set_conditional_logic( array(
                                array(
                                    'field' => 'optinspin_section_generate_coupon',
                                    'value' => true,
                                )
                            ) ),

                        Field::make( 'select', 'optinspin_coupon', 'Coupon' )
                            ->add_options( $this->get_list_coupons() )
                            ->set_help_text('Choose Coupon for this section')
                            ->set_classes( 'optinspin_coupon_list' )
                            ->set_conditional_logic( array(
                                array(
                                    'field' => 'optinspin_section_generate_coupon',
                                    'value' => false,
                                )
                            ) ),

                        Field::make( 'text', 'optinspin_probability', 'Probability' )
                            ->set_attribute('type','number'),
                        Field::make( 'color', 'segment_color', 'Section color' )
                            ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                            ->set_help_text( 'Set the color of the respective section/segment' ),
                        Field::make( 'textarea', 'optinspin_win_loss_text', 'Winning text' ),
                    ))->set_collapsed( true ),
            ) )

            ->add_tab( __('Privacy'), array(

                Field::make( 'text', 'optinspin_privacy_label'.optinspin_crb_get_i18n_suffix(), 'Label' )
                    ->set_help_text('Enter Privacy Label')
                    ->set_default_value('Privacy'),

                Field::make( 'select', 'optinspin_privacy_page'.optinspin_crb_get_i18n_suffix(), 'Privacy Page' )
                    ->add_options( $this->optinspin_lists_of_pages() )
                    ->set_help_text('Select Privacy Page'),
            ) )

            ->add_tab( __('Integration'), array(

                Field::make( 'separator', 'optinspin_mailchimp_label', 'Mail Chimp' )
                    ->set_classes( 'optinspin_mailchimp_label_class' ),

                Field::make( 'text', 'optinspin_mailchimp_api_key', 'API KEY' )
                    ->set_help_text('Enter Mailchimp API Key'),

             	Field::make( 'select', 'crb_show_socials', 'Mailchimp Email Lists' )
					->add_options( $arraysfor_optinspin_mailchimp_get_list ),

				Field::make( 'radio', 'opt_ins', 'Single Opt-in Or Double Opt-in' )
				->add_options( array(
					'single' => 'Single Opt-in',
					'double' => 'Double Opt-in'
				) ),

				Field::make( 'text', 'optinspin_mailchimp_get_list', 'Get Mailchimp Email List' )
				->set_default_value( 'Get Mailchimp Email List' )
				->set_attribute( 'type', 'button' )
				->set_classes( 'get_mailchimp' ),

                Field::make( 'separator', 'optinspin_remarkety_label', 'Remarkety' )
                    ->set_classes( 'optinspin_remarkety_label_class' ),

                Field::make( 'checkbox', 'optinspin_enable_remarkety', 'Enable Remarkety' ),

                Field::make( 'text', 'optinspin_remarkety_store_id', 'Remarkety Store Id' )
                    ->set_help_text('Enter Remarkety Store Id<br> <a target="_blank" href="https://support.remarkety.com/hc/en-us/articles/115000520263-Sending-contact-information-via-API">Click here for further Information how to get store id</a>'),
            
				Field::make( 'separator', 'optinspin_active_campaign_label', 'Active Campaign' )
					
                    ->set_classes( 'optinspin_active_campaign_label_class' ),
				
				Field::make( 'text', 'optinspin_active_campaign_url', 'URL' )
                    ->set_help_text('Enter Active Campaign URL'),
					
                Field::make( 'text', 'optinspin_active_campaign_api_key', 'API KEY' )
                    ->set_help_text('Enter Active Campaign API Key'),
				
				// @$arraysfor_optinspin_active_campaign_get_list
             	Field::make( 'select', 'crb_show_socials_active_campaign', 'Active Campaign Email Lists' )
					->add_options( $arraysfor_optinspin_active_campaign_get_list ),
					
				Field::make( 'text', 'optinspin_active_campaign_form_id', 'Form ID' )
				->set_attribute( 'type', 'number' )
				->set_help_text('Enter Form ID to inherit your form settings!'),

				/* Field::make( 'radio', 'opt_ins_active_campaign', 'Single Opt-in Or Double Opt-in' )
				->add_options( array(
					'single' => 'Single Opt-in',
					'double' => 'Double Opt-in'
				) ), */

				Field::make( 'text', 'optinspin_active_campaign_get_list', 'Get Active Campaign Email List' )
				->set_default_value( 'Get Active Campaign Email List' )
				->set_attribute( 'type', 'button' )
				->set_classes( 'get_active_campaign' ),
				
				Field::make( 'text', 'optinspin_mailsteractive')
				->set_default_value( $mailsteractive )
				->set_attribute( 'type', 'hidden' )
				->set_classes(  'custom_class_mailsteractive' ),
				
				
				
				Field::make( 'separator', 'optinspin_mailster_label', 'Mailster' )
				->set_classes( 'optinspin_mailster_label_class' )
				->set_conditional_logic( array(
				array(
					'field' => 'optinspin_mailsteractive',
					'value' => 1,
				)
				) ),
					
				
				
				Field::make( 'select', 'crb_show_socials_amailster', 'mailster Email Lists' )
					->add_options( $arraysfor_optinspin_mailster_get_list )
					->set_classes(  'custom_class_mailsteractive_Lists' ),
					
					Field::make( 'radio', 'opt_ins_mailster', 'Single Opt-in Or Double Opt-in' )
				->add_options( array(
					'single' => 'Single Opt-in',
					'double' => 'Double Opt-in'
				) ),	
					
				Field::make( 'separator', 'optinspin_zapier_label', 'Zapier' )
                    ->set_classes( 'optinspin_zapier_label_class' ),
				
				Field::make( 'text', 'optinspin_zapier_url', 'Zapier Webhook URL' )
                    ->set_help_text('Enter Zapier Webhook URL'),
					
                Field::make( 'text', 'optinspin_zapier_webhook_url', '' )
                    ->set_help_text('Test Zapier Webhook Url')
					->set_attribute( 'type', 'button' )
					->set_classes( 'link_zapier_url_webhook' ),

                Field::make( 'separator', 'optinspin_drip_label', 'Drip' )
                    ->set_classes( 'optinspin_drip_label_class' ),
                Field::make( 'checkbox', 'optinspin_enable_drip', 'Enable Drip' ),    
                Field::make( 'text', 'optinspin_drip_account_id', 'Drip Account ID' )
                    ->set_help_text('Enter Drip Account ID'),
                Field::make( 'text', 'optinspin_drip_api_token', 'Drip Secret API Token' )
                    ->set_help_text('Enter Drip Account ID'),

                Field::make( 'separator', 'optinspin_chatchamp', 'ChatChamp' )
                    ->set_classes( 'optinspin_chatchamp_label_class' ),

                Field::make( 'checkbox', 'optinspin_chatchamp_enabled', 'Enable ChatChamp' )
                    ->set_option_value( 'Enable Chatchamp' ),

                Field::make( 'text', 'optinspin_chatchamp_id', 'Enter ChatChamp ID' )
                    ->set_help_text('Enter ChatChamp ID'),
			))
            
            ->add_tab( __('Winning/Lossing'), array(
                Field::make( 'color', 'optinspin_win_background_color'.optinspin_crb_get_i18n_suffix(), 'Background Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Background Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_win_border_color'.optinspin_crb_get_i18n_suffix(), 'Border Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Border Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_win_text_color'.optinspin_crb_get_i18n_suffix(), 'Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Text Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_add_cart_link_color'.optinspin_crb_get_i18n_suffix(), 'Link Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Link Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_skip_link_color'.optinspin_crb_get_i18n_suffix(), 'Link Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Link Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_coupon_msg_bg'.optinspin_crb_get_i18n_suffix(), 'Coupon Message Background Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Link Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_coupon_msg_text_color'.optinspin_crb_get_i18n_suffix(), 'Coupon Message Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Set Link Color after winning or lossing' ),

                Field::make( 'color', 'optinspin_add_cart_bg_color'.optinspin_crb_get_i18n_suffix(), 'Add to Cart Background Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Add to Cart Button Background Color' ),

                Field::make( 'textarea', 'optinspin_coupon_message'.optinspin_crb_get_i18n_suffix(), 'Coupon Message Text' )
                    ->set_help_text( 'Add Message for coupon' )
                    ->set_default_value('Your coupon have been sent to you via email. You can also use the coupon now by clicking the button below:'),

                Field::make( 'text', 'optinspin_add_to_cart_btn'.optinspin_crb_get_i18n_suffix(), 'Add To Cart Label' )
                    ->set_help_text( 'Add To Cart Label' )
                    ->set_default_value('Continue and Apply To Cart'),

                Field::make( 'text', 'optinspin_skip_btn'.optinspin_crb_get_i18n_suffix(), 'Skip Coupon Label' )
                    ->set_help_text( 'Skip Coupon Label' )
                    ->set_default_value('Skip for Now'),
            ))

            ->add_tab( __('Email Template'), array(
                
                Field::make( 'checkbox', 'optinspin_disable_email_shoot'.optinspin_crb_get_i18n_suffix(), 'Disabled Email Triggered from OptinSpin' )
                    ->set_option_value( 'Disabled Email' ),

                Field::make( 'separator', 'optinspin_win_email_temp', 'Winning Email Template' ),

                Field::make( 'text', 'optinspin_email_subject'.optinspin_crb_get_i18n_suffix(), 'Email Subject' )
                    ->set_help_text( 'Email Subject' )
                    ->set_default_value('Congrats, You Won Free Coupon'),

                Field::make( 'textarea', 'optinspin_email_body'.optinspin_crb_get_i18n_suffix(), 'Email Message' )
                    ->set_help_text( 'Email Message' )
                    ->set_default_value('Hi {user}!

you won a free coupon {coupon} , enjoy & keep shopping.'),

                Field::make( 'separator', 'optinspin_loss_email_temp', 'Loss Email Template' ),

                Field::make( 'text', 'optinspin_loss_email_subject'.optinspin_crb_get_i18n_suffix(), 'Email Subject' )
                    ->set_help_text( 'Email Subject' )
                    ->set_default_value('You Miss the chance'),

                Field::make( 'textarea', 'optinspin_loss_email_body'.optinspin_crb_get_i18n_suffix(), 'Email Message' )
                    ->set_help_text( 'Email Message' )
                    ->set_default_value('Hi {user}!

Oohh! You miss the chance. Better luck next time'),
            ))

            ->add_tab( __('Coupon Bar'), array(

                Field::make( 'checkbox', 'optinspin_disable_coupon_bar'.optinspin_crb_get_i18n_suffix(), 'Disable Coupon Bar' )
                    ->set_option_value( 'Disable Coupon Bar' ),

                Field::make( 'text', 'optinspin_coupon_bar_msg'.optinspin_crb_get_i18n_suffix(), 'Coupon Message' )
                    ->set_help_text( 'Enter Coupon Message' )
                    ->set_default_value('Congrats! You Won a Free Coupon "{coupon}". Use this coupon in your cart now and get discount!!'),

                Field::make( 'text', 'optinspin_coupon_bar_expire_label'.optinspin_crb_get_i18n_suffix(), 'Coupon Expire Label' )
                    ->set_help_text( 'Enter Coupon Expire Label' )
                    ->set_default_value('Coupon Time Left'),

                Field::make( 'color', 'optinspin_coupon_bar_color'.optinspin_crb_get_i18n_suffix(), 'Coupon Bar Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Text Color of coupon bar' ),

                Field::make( 'color', 'optinspin_coupon_bar_bg'.optinspin_crb_get_i18n_suffix(), 'Coupon Bar Background Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Background Color of coupon bar' ),

                Field::make( 'color', 'optinspin_coupon_bar_timer_color'.optinspin_crb_get_i18n_suffix(), 'Coupon Bar Timer Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Background Color of coupon Timer' ),

                Field::make( 'color', 'optinspin_coupon_bar_timer_text_color'.optinspin_crb_get_i18n_suffix(), 'Coupon Bar Timer Text Color' )
                    ->set_palette( array( '#FF0000', '#00FF00', '#0000FF' ) )
                    ->set_help_text( 'Color of Timer Counter' ),
            ))

            ->add_tab( __('Additional CSS'), array(
                Field::make( 'textarea', 'optinspin_custom_css'.optinspin_crb_get_i18n_suffix(), 'Custom CSS' )
                    ->set_help_text( 'Apply Custom CSS' )
                    ->set_default_value('/**
You Custom CSS
**/')
                    ->set_rows( 10 ),
            ))

            ->add_tab( __('Display Settings'), array(

                Field::make( 'checkbox', 'optinspin_enable_pages_display'.optinspin_crb_get_i18n_suffix(), 'Enable OptinSpin on specific pages' )
                    ->set_option_value( 'Enable OptinSpin on specific pages' ),

                Field::make( 'checkbox', 'optinspin_enable_home_page'.optinspin_crb_get_i18n_suffix(), 'Enable OptinSpin on Home Page' )
                    ->set_option_value( 'enable_home_page' )
                    ->set_conditional_logic( array(
                        array(
                            'field' => 'optinspin_enable_pages_display',
                            'value' => true,
                        )
                    ) ),

                Field::make( 'text', 'optinspin_pages_to_show'.optinspin_crb_get_i18n_suffix(), 'Select Pages' )
                    ->set_attribute( 'placeholder', 'home, sample page etc' )
                    ->set_help_text('enter comma(,) sperated page tile where you would like to display OptinSpin')
                    ->set_conditional_logic( array(
                        array(
                            'field' => 'optinspin_enable_pages_display',
                            'value' => true,
                        )
                    ) )
                    ->set_classes( 'optinspin_pages_list' ),



                Field::make( 'text', 'optinspin_pages_to_show_hidden'.optinspin_crb_get_i18n_suffix(), '' )
                    ->set_attribute( 'type', 'hidden' )
                    ->set_conditional_logic( array(
                        array(
                            'field' => 'a',
                            'value' => true,
                        )
                    ) )
                    ->set_classes( 'optinspin_pages_list_hidden' ),
                /*Field::make( 'complex', 'optinspin_show_pages_complex', 'Display on Specific Pages' )
                    ->setup_labels( array(
                        'plural_name' => 'Pages',
                        'singular_name' => 'Another Page',
                    ) )
                    ->set_conditional_logic( array(
                        array(
                            'field' => 'optinspin_enable_pages_display',
                            'value' => true,
                        )
                    ) )
                    ->set_collapsed( false )
                    ->add_fields( array(
                        /*Field::make( 'select', 'optinspin_show_pages', 'Select Page' )
                            ->add_options( $this->optinspin_pages_to_show() )
                            ->set_help_text('Select page where you would like to display OptinSpin'),*/
                /*Field::make( 'text', 'optinspin_posts_to_show', 'Select Post' )
                    ->set_attribute( 'placeholder', 'products, posts,  your_custom_post_type' )
                    ->set_help_text('enter comma(,) sperated posts name where you would like to display OptinSpin'),*/


                Field::make( 'checkbox', 'optinspin_enable_posts_display'.optinspin_crb_get_i18n_suffix(), 'Enable OptinSpin on specific posts' )
                    ->set_option_value( 'Enable OptinSpin on specific posts' ),

                Field::make( 'complex', 'optinspin_show_posts_complex'.optinspin_crb_get_i18n_suffix(), 'Display on Specific Post' )
                    ->setup_labels( array(
                        'plural_name' => 'Posts',
                        'singular_name' => 'Another Posts',
                    ) )
                    ->set_conditional_logic( array(
                        array(
                            'field' => 'optinspin_enable_posts_display',
                            'value' => true,
                        )
                    ) )
                    ->add_fields( array(
                        Field::make( 'select', 'optinspin_show_posts', 'Select Post' )
                            ->add_options( $this->optinspin_lists_of_posts() )
                            ->set_help_text('Select post where you would like to display OptinSpin'),
                        /*Field::make( 'text', 'optinspin_posts_to_show', 'Select Post' )
                            ->set_attribute( 'placeholder', 'products, posts,  your_custom_post_type' )
                            ->set_help_text('enter comma(,) sperated posts name where you would like to display OptinSpin'),*/
                    ) )
                    ) )
            ->add_tab( __('Snow Fall'), array(
                
				Field::make( 'checkbox', 'optinspin_snowflak_enable'.optinspin_crb_get_i18n_suffix(), 'Enable / Disable Snowflake' )
					->set_help_text( 'Enable Snow showering in OptinSpin Wheel Page!' ),

				
				Field::make( 'text', 'optinspin_snow_numfla'.optinspin_crb_get_i18n_suffix(), 'Number of Snowflake ' )
                    ->set_attribute('type','number')
                    ->set_default_value('40')
                    ->set_help_text('Control the number snowflake ( keep the flakes count less than 50 to keep the functionality smooth!  )'),
									
				Field::make( 'image', 'optinspin_image_snowflake'.optinspin_crb_get_i18n_suffix(), 'Image of snowflake' )
                    ->set_value_type( 'url' ),
							
				
				Field::make( 'text', 'optinspin_snowflake_width'.optinspin_crb_get_i18n_suffix(), 'Width of Snowflake Image' )
                    ->set_attribute('type','number')
                    ->set_default_value('25')
                    ->set_help_text('Control the width of Snowflake image.'),
					
				Field::make( 'text', 'speed_of_flake'.optinspin_crb_get_i18n_suffix(), 'Speed of Snowflake ' )
					->set_attribute('type','number')
					->set_default_value('40')
					->set_help_text('Control the Speed Snow Falling.'),
			
					
				));
    }

    function optinspin_crb_load() {
        require_once( optinspin_PLUGIN_PATH . '/inc/settings/carbon-fields/vendor/autoload.php' );
        \Carbon_Fields\Carbon_Fields::boot();
    }

    function get_list_coupons() {
        $coupons_list = array();
        $args = array(
            'posts_per_page'   => -1,
            'orderby'          => 'title',
            'order'            => 'asc',
            'post_type'        => 'shop_coupon',
            'post_status'      => 'publish',
        );

        $coupons = get_posts( $args );
        foreach( $coupons as $coupon ) {
            $coupons_list[$coupon->ID] = $coupon->post_title;
        }

        return $coupons_list;
    }

    function optinspin_lists_of_pages() {
        $page_list = array();
        $args = array(
            'posts_per_page'   => -1,
            'orderby'          => 'title',
            'order'            => 'asc',
            'post_type'        => 'page',
            'post_status'      => 'publish',
        );

        $pages = get_posts( $args );
        $page_list['none'] = 'none';
        foreach( $pages as $page ) {
            $page_list[get_permalink($page->ID)] = $page->post_title;
        }

        $data = Field::make( 'checkbox', 'optinspin_disable_coupon_bar', 'Disable Coupon Bar' )
            ->set_option_value( 'Disable Coupon Bar' );

        return $page_list;
    }

    /*function optinspin_pages_to_show() {
        $page_list = array();
        $args = array(
            'posts_per_page'   => 100,
            'orderby'          => 'title',
            'order'            => 'asc',
            'post_type'        => array('page','product','post'),
            'post_status'      => 'publish',
        );

        $pages = get_posts( $args );
        $page_list['none'] = 'none';
        $page_list['home'] = 'Home';
        foreach( $pages as $page ) {
            $page_list[$page->ID] = $page->post_title;
        }
        return $page_list;
    }*/

    function optinspin_lists_of_posts() {

        $default_value = array();
        $default_value['page'] = 'page';
        $default_value['post'] = 'post';
        $available_posts = get_option('optinspin_available_posts',false);

        if($available_posts) {
            $available_posts = array_merge($default_value, $available_posts);
            return $available_posts;
        } else {
            return $default_value;
        }
    }
}