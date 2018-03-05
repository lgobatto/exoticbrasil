jQuery(document).ready(function($) {

	//Autofill the token and id
	var hash = window.location.hash,
        token = hash.substring(14),
        id = token.split('.')[0];

    function sbSaveToken(token) {
        jQuery.ajax({
            url: sbiA.ajax_url,
            type: 'post',
            data: {
                action: 'sbi_auto_save_tokens',
                access_token: token,
                just_tokens: true
            },
            success: function (data) {
                jQuery('.sb_get_token').append('<span class="sbi-success"><i class="fa fa-check-circle"></i> saved</span>');
                jQuery('#sb_instagram_at').after('<span class="sbi-success"><i class="fa fa-check-circle"></i> saved</span>');
            }
        });
    }
    //If there's a hash then autofill the token and id
    if(hash && !jQuery('#sbi_just_saved').length){
        //$('#sbi_config').append('<div id="sbi_config_info"><p><b>Access Token: </b><input type="text" size=58 readonly value="'+token+'" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p><p><b>User ID: </b><input type="text" size=12 readonly value="'+id+'" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p><p><i class="fa fa-clipboard" aria-hidden="true"></i>&nbsp; <b><span style="color: red;">Important:</span> Copy and paste</b> these into the fields below and click <b>"Save Changes"</b>.</p></div>');
        $('#sbi_config').append('<div id="sbi_config_info"><p class="sb_get_token"><b>Access Token: </b><input type="text" size=58 readonly value="'+token+'" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p><p><b>User ID: </b><input type="text" size=12 readonly value="'+id+'" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p></div>');
        if(jQuery('#sb_instagram_at').val() == '' && token.length > 40) {
            jQuery('#sb_instagram_at').val(token);
            sbSaveToken(token);
        } else {
            jQuery('.sb_get_token').append('<p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Use This Token"></p>');
        }

    }

    $('.sb_get_token #submit').click(function(event) {
        event.preventDefault();
        $(this).closest('.submit').fadeOut();
        jQuery('#sb_instagram_at').val(token);
        sbSaveToken(token);
    });
	
	//Tooltips
	jQuery('#sbi_admin .sbi_tooltip_link').click(function(){
		jQuery(this).siblings('.sbi_tooltip').slideToggle();
	});

    // custom image sizes
    jQuery('#sb_instagram_using_custom_sizes').click(function(){
        var $wrap = jQuery(this).closest('td');
        if (jQuery(this).is(':checked')) {
            jQuery(this).closest('p').siblings('.sbi_extra_info').slideDown();
            $wrap.find('#sb_custom_res_settings').attr('name','sb_instagram_image_res').slideDown();
            $wrap.find('#sb_standard_res_settings').attr('name','').css('opacity',.5);
        } else {
            jQuery(this).closest('p').siblings('.sbi_extra_info').slideUp();
            $wrap.find('#sb_standard_res_settings').attr('name','sb_instagram_image_res').css('opacity',1);;
            $wrap.find('#sb_custom_res_settings').attr('name','').slideUp();
        }
    });

    //Extra Info
  function sbiToggleInfo(elem) {
    if(elem.is(':checked')) {
      elem.siblings('.sbi_extra_info').slideDown();
    } else {
      elem.siblings('.sbi_extra_info').slideUp();
    }
  }
  sbiToggleInfo(jQuery('#sbi_admin #sb_instagram_moderation_mode'));
  jQuery('#sbi_admin #sb_instagram_moderation_mode').click(function(){
    sbiToggleInfo(jQuery(this));
  });

    //Update the shortcode when input is added
    function sbiToggleIncExCode(elem,type) {
    var str = elem.val();
    elem.siblings('.sbi_incex_shortcode').find('code').text(type+'="'+str+'"');
      if(jQuery('#sb_instagram_incex_one').is(':checked')){
          elem.siblings('.sbi_incex_shortcode').show();
      }
    }
    sbiToggleIncExCode(jQuery('#sbi_admin #sb_instagram_exclude_words'), 'excludewords');
    sbiToggleIncExCode(jQuery('#sbi_admin #sb_instagram_include_words'), 'includewords');
    jQuery('#sbi_admin #sb_instagram_exclude_words, #sbi_admin #sb_instagram_include_words').keyup(function(){
        if(jQuery(this).attr('id') == 'sb_instagram_exclude_words') {
            sbiToggleIncExCode(jQuery(this), 'excludewords');
        } else {
            sbiToggleIncExCode(jQuery(this), 'includewords');
        }
    });

    //Reveal or hide the shortcode generator
    function sbiToggleShortcodeGen($el) {
        if($el.is(':checked') && $el.val() === 'one'){
            $el.closest('td').find('.sbi_incex_shortcode').slideDown();
        } else {
            $el.closest('td').find('.sbi_incex_shortcode').slideUp();
        }
    }
    jQuery('.sb_instagram_incex_one_all').click(function() {
        sbiToggleShortcodeGen(jQuery(this));
        sbiToggleIncExCode(jQuery('#sbi_admin #sb_instagram_exclude_words'), 'excludewords');
        sbiToggleIncExCode(jQuery('#sbi_admin #sb_instagram_include_words'), 'includewords');
    });
    
    function sbiToggleVisualManual($el) {
        if ($el.is(':checked') && $el.val() === 'visual'){
            $el.closest('td').find('.sbi_tooltip').slideDown();
        } else {
            $el.closest('td').find('.sbi_tooltip').slideUp();
        }
        if ($el.is(':checked') && $el.val() === 'manual'){
            $('.sbi_mod_manual_settings').slideDown();
        } else if (jQuery('#sb_instagram_moderation_mode_visual').is(':checked')) {
            $('.sbi_mod_manual_settings').slideUp();
        }
    }
    jQuery('.sb_instagram_moderation_mode').click(function() {
        sbiToggleVisualManual(jQuery(this));
    });
    jQuery('.sb_instagram_moderation_mode').each(function() {
        sbiToggleVisualManual(jQuery(this));
    });
    jQuery('.sb_instagram_mobile_layout_setting').hide();
    jQuery('.sb_instagram_mobile_layout_reveal').click(function() {
        if (jQuery(this).siblings('.sb_instagram_mobile_layout_setting').is(':visible')) {
            jQuery(this).siblings('.sb_instagram_mobile_layout_setting').slideUp();
            jQuery(this).siblings('.sb_instagram_mobile_layout_reveal').html('Show Mobile Options');
        } else {
            jQuery(this).siblings('.sb_instagram_mobile_layout_setting').slideDown();
            jQuery(this).siblings('.sb_instagram_mobile_layout_reveal').html('Hide Mobile Options');
        }
    });

    // clear white lists
    var $sbiClearWhiteListsButton = $('#sbi_admin #sbi_clear_white_lists');

    $sbiClearWhiteListsButton.click(function(event) {
        event.preventDefault();

        jQuery('#sbi-clear-cache-success').remove();
        jQuery(this).prop("disabled",true);

        $.ajax({
            url : sbiA.ajax_url,
            type : 'post',
            data : {
                action : 'sbi_clear_white_lists'
            },
            success : function(data) {
                $sbiClearWhiteListsButton.prop('disabled',false);
                if(!data===false) {
                    $sbiClearWhiteListsButton.after('<i id="sbi-clear-cache-success" class="fa fa-check-circle sbi-success"></i>');
                    jQuery('.sbi_white_list_names_wrapper').html('');
                } else {
                    $sbiClearWhiteListsButton.after('<span>error</span>');
                }
            }
        }); // ajax call
    }); // clear_white_lists click

    // clear white lists
    var $sbiClearCommentCacheButton = $('#sbi_admin #sbi_clear_comment_cache');

    $sbiClearCommentCacheButton.click(function(event) {
        event.preventDefault();

        jQuery('#sbi-clear-cache-success').remove();
        jQuery(this).prop("disabled",true);

        $.ajax({
            url : sbiA.ajax_url,
            type : 'post',
            data : {
                action : 'sbi_clear_comment_cache'
            },
            success : function(data) {
                $sbiClearCommentCacheButton.prop('disabled',false);
                if(!data===false) {
                    $sbiClearCommentCacheButton.after('<i id="sbi-clear-cache-success" class="fa fa-check-circle sbi-success"></i>');
                } else {
                    $sbiClearCommentCacheButton.after('<span>error</span>');
                }
            }
        }); // ajax call
    }); // clear_comment_cache click

  jQuery('#sbi_admin label').click(function(){
    var $sbi_shortcode = jQuery(this).siblings('.sbi_shortcode');
    if($sbi_shortcode.is(':visible')){
      jQuery(this).siblings('.sbi_shortcode').css('display','none');
    } else {
      jQuery(this).siblings('.sbi_shortcode').css('display','block');
    }  
  });

  //Single post directions
  jQuery('#sbi_admin .sbi_single_directions .sbi_one, #sbi_admin .sbi_single_directions .sbi_two .sbi_click_area').click(function(){va
    jQuery(this).closest('.sbi_row').find('.sbi_tooltip').slideToggle();
  });

  //Shortcode label on hover
  jQuery('#sbi_admin label').hover(function(){
    if( jQuery(this).siblings('.sbi_shortcode').length > 0 ){
      jQuery(this).attr('title', 'Click for shortcode option').append('<code class="sbi_shortcode_symbol">[]</code>');
    }
  }, function(){
    jQuery(this).find('.sbi_shortcode_symbol').remove();
  });

  //Add the color picker
	if( jQuery('.sbi_colorpick').length > 0 ) jQuery('.sbi_colorpick').wpColorPicker();

	//Check User ID is numeric
	jQuery("#sb_instagram_user_id").change(function() {

		var sbi_user_id = jQuery('#sb_instagram_user_id').val(),
			$sbi_user_id_error = $(this).closest('td').find('.sbi_user_id_error');

		if (sbi_user_id.match(/[^0-9, _.-]/)) {
  			$sbi_user_id_error.fadeIn();
  		} else {
  			$sbi_user_id_error.fadeOut();
  		}

	});

  //Mobile width
  var sb_instagram_feed_width = jQuery('#sbi_admin #sb_instagram_width').val(),
      sb_instagram_width_unit = jQuery('#sbi_admin #sb_instagram_width_unit').val(),
      $sb_instagram_width_options = jQuery('#sbi_admin #sb_instagram_width_options');

  if (typeof sb_instagram_feed_width !== 'undefined') {

    //Show initially if a width is set
    if( (sb_instagram_feed_width.length > 1 && sb_instagram_width_unit == 'px') || (sb_instagram_feed_width !== '100' && sb_instagram_width_unit == '%') ) $sb_instagram_width_options.show();

    jQuery('#sbi_admin #sb_instagram_width, #sbi_admin #sb_instagram_width_unit').change(function(){
      sb_instagram_feed_width = jQuery('#sbi_admin #sb_instagram_width').val();
      sb_instagram_width_unit = jQuery('#sbi_admin #sb_instagram_width_unit').val();

      if( sb_instagram_feed_width.length < 2 || (sb_instagram_feed_width == '100' && sb_instagram_width_unit == '%') ) {
        $sb_instagram_width_options.slideUp();      
      } else {
        $sb_instagram_width_options.slideDown();
      }
    });

  }

  //Hide the location coordinates initially
  jQuery('#sbi_loc_radio_coordinates_opts').hide();

  var sbi_loc_type = 'id';
  //Toggle location id/coordinates options
  jQuery('#sbi_loc_radio_id, #sbi_loc_radio_coordinates').change(function(){
    if( jQuery('#sbi_loc_radio_id').is(':checked') ){
      jQuery('#sbi_loc_radio_id_opts').show();
      jQuery('#sbi_loc_radio_coordinates_opts').hide();
      sbi_loc_type = 'id';
    } else {
      jQuery('#sbi_loc_radio_coordinates_opts').show();
      jQuery('#sbi_loc_radio_id_opts').hide();
      sbi_loc_type = 'coordinates';
    }
  });

	//Add new location
	var sbiCoordinatesShow = false,
      $sb_instagram_coordinates_options = jQuery('#sb_instagram_coordinates_options');
  jQuery('#sb_instagram_new_coordinates').on('click', function(){
      if( sbiCoordinatesShow ){
          $sb_instagram_coordinates_options.hide();
          sbiCoordinatesShow = false;
      } else {
          $sb_instagram_coordinates_options.show();
          sbiCoordinatesShow = true;
      }
      
  });

  var $sb_instagram_coordinates = jQuery('#sb_instagram_coordinates'),
      sbi_coordinates = $sb_instagram_coordinates.val();
  $sb_instagram_coordinates.blur(function() {
      sbi_coordinates = $sb_instagram_coordinates.val();
  });

  jQuery('#sb_instagram_add_location').on('click', function(){
      if( sbi_coordinates.length > 0 ) sbi_coordinates = sbi_coordinates + ',';

      sbi_coordinates = sbi_coordinates + '(' + jQuery('#sb_instagram_lat').val() + ',' + jQuery('#sb_instagram_long').val() + ',' + jQuery('#sb_instagram_dist').val() + ')';
      $sb_instagram_coordinates.val( sbi_coordinates );

      //Clear fields
      jQuery('#sb_instagram_long').val('');
      jQuery('#sb_instagram_lat').val('');
      jQuery('#sb_instagram_loc_id').val('');
  });

  //Scroll to hash for quick links
  jQuery('#sbi_admin a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : this.hash.slice(1);
      if (target.length) {
        jQuery('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  //Boxed header options
  var sb_instagram_header_style = $('#sb_instagram_header_style').val(),
    $sb_instagram_header_style_boxed_options = $('#sb_instagram_header_style_boxed_options');

  //Should we show anything initially?
  if(sb_instagram_header_style == 'circle') $sb_instagram_header_style_boxed_options.hide();
  if(sb_instagram_header_style == 'boxed') $sb_instagram_header_style_boxed_options.show();

  //When page type is changed show the relevant item
  $('#sb_instagram_header_style').change(function(){
    sb_instagram_header_style = $('#sb_instagram_header_style').val();

    if( sb_instagram_header_style == 'boxed' ) {
      $sb_instagram_header_style_boxed_options.fadeIn();
    } else {
      $sb_instagram_header_style_boxed_options.fadeOut();
    }
  });

    //Support tab show video
    jQuery('#sbi-play-support-video').on('click', function(e){
        e.preventDefault();
        jQuery('#sbi-support-video').show().attr('src', jQuery('#sbi-support-video').attr('src')+'&amp;autoplay=1' );
    });
});