<?php
add_action( 'admin_footer', 'optinspin_pages_suggestion_javascript' );
add_action( 'wp_ajax_optinspin_pages_suggestion', 'optinspin_pages_suggestion_callback');
add_action( 'wp_ajax_nopriv_optinspin_pages_suggestion', 'optinspin_pages_suggestion_callback' );

function optinspin_pages_suggestion_javascript() {

    if( isset($_GET['page']) && $_GET['page'] == 'optinspin-settings' ) { ?>
        <script type="text/javascript">
            jQuery(document).ready(function ($) {
                var words_type_count = 0;

                jQuery('.optinspin_pages_list input').before('<div class="pages-boxes"></div>');

                get_all_pages_boxes();

                jQuery('.optinspin_pages_list input').keyup(function (e) {

                    var search = jQuery(this).val();
                    var resultid = search.split(",");
                    var getid = resultid [resultid.length - 1];

                    words_type_count++;

                    var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';

                    var data = {
                        'action': 'optinspin_pages_suggestion',
                        'search': getid
                    };


                    jQuery.post(ajaxurl, data, function (response) {
                        //                var width = jQuery(window).width();
                        jQuery('.pages-suggestion').remove();
                        jQuery('.optinspin_pages_list input').after('<div class="pages-suggestion">' + response + '</div>');

                        jQuery('.pages-suggestion ul li').on('click', function () {
                            var select_post_id = jQuery(this).find('span.post-id').text();
                            var select_keyword = jQuery(this).find('span.post-title').text();

                            jQuery('.pages-boxes').append('<div class="page-name"><span class="post-id">' + select_post_id + '</span><span class="post-title">' + select_keyword + '</span><span class="remove">X</span></div>');
                            // GET ALL VALUES FROM TEXT
                            var search = jQuery('.optinspin_pages_list_hidden input').val();
                            console.log('search' + search_words);
                            //search = search.slice(0, -words_type_count);
                            // MERGE NEW WORDS WITH OLD
                            var search_words = search + select_keyword + ', ';
                            console.log('words_type_count' + search_words);
                            var search_words_all = '';
                            jQuery('.pages-boxes .page-name span.post-id').each(function () {
                                var current_word = jQuery(this).text();
                                search_words_all += current_word + ',';
                            });
                            jQuery('.optinspin_pages_list_hidden input').val(search_words_all);
                            jQuery('.optinspin_pages_list input').val('');

                            words_type_count = 0;

                            jQuery('.pages-suggestion').remove();
                        });
                    });

                });

                remove_page_from_list();

                jQuery('.optinspin_pages_list input').blur(function () {
                    setTimeout(function () {
                        jQuery('.pages-suggestion').remove();
                    }, 1000);
                });

            });

            function remove_page_from_list() {
                jQuery('.pages-boxes .page-name span.remove').live('click', function () {
                    var remove_page = jQuery(this).closest('.page-name').find('span.post-id').text();
                    jQuery(this).closest('.page-name').remove();
                    // remove_page = remove_page.replace('X','');
                    var pages_list = jQuery('.optinspin_pages_list_hidden input').val();
                    var updated_page = pages_list.replace(remove_page, '');
                    jQuery('.optinspin_pages_list_hidden input').val(updated_page);
                });
            }

            function get_all_pages_boxes() {
                var pages_list_array = new Array();
                var pages_list = jQuery('.optinspin_pages_list_hidden input').val();

                if( pages_list != '' ) {
                    pages_list_array = pages_list.split(',');

                    for (var i = 0; i < pages_list_array.length; i++) {
                        if (pages_list_array[i] != '' && typeof pages_list_array[i] != 'undefined') {
                            var html = '<div class="page-name" id="post-' + pages_list_array[i] + '"><span class="post-id">' + pages_list_array[i] + '</span><span class="post-title">' + get_page_title(pages_list_array[i]) + '</span><span class="remove">X</span></div>';
                            jQuery('.pages-boxes').append(html);
                        }
                    }
                }
            }

            function get_page_title(post_id) {

                var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';

                var data = {
                    'action': 'optinspin_pages_suggestion',
                    'post_id': post_id,
                    'target': 'get_title'
                };

                jQuery.post(ajaxurl, data, function (response) {
                    jQuery('#post-' + post_id + ' span.post-title').text(response);
                });

            }
        </script>
        <?php
    }
}

function optinspin_pages_suggestion_callback() {
    global $post;

    if(isset($_POST['target']) && $_POST['target'] == 'get_title') {
        echo get_the_title( $_POST['post_id'] );
        die();
    }
    $search = $_POST['search'];
    $page_list = array();
    $args = array(
        'posts_per_page'   => 10,
        's'                => $search,
        'post_type'      => array('page','product','post'),
    );

    $query = new WP_Query( $args );

    // The Loop
    $html  = '<ul>';
    if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post();
        $html  .= '<li><span class="post-id" style="display:none">'.get_the_ID().'</span><span class="post-title">'.get_the_title().'</span></li>';
    endwhile; endif;

    $html .= '</ul>';
    echo  $html;

    die(); // this is required to terminate immediately and return a proper response
}