/**
 * Created by lgobatto on 19/12/16.
 */
(function($) {
    wp.customize('blogname', function(value) {
        value.bind(function(to) {
            $('.brand').text(to);
        });
    });
})(jQuery);