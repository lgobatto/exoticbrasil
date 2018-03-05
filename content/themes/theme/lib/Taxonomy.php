<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 31/01/17
 * Time: 21:51
 */

namespace LGobatto;


/**
 * Class Taxonomy
 * @package LGobatto
 */
class Taxonomy
{
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $singular_label;
    /**
     * @var string
     */
    private $plural_label;
    /**
     * @var string
     */
    private $slug;
    /**
     * @var bool
     */
    private $with_front;
    /**
     * @var bool
     */
    private $hierarchical;
    /**
     * @var bool
     */
    private $public;
    /**
     * @var bool
     */
    private $show_ui;
    /**
     * @var bool
     */
    private $show_admin_column;
    /**
     * @var bool
     */
    private $show_in_nav_menu;
    /**
     * @var bool
     */
    private $show_tagcloud;

    /**
     * Taxonomy constructor.
     * @param string $name
     * @param string $singular_label
     * @param string $plural_label
     * @param string $slug
     * @param bool $with_front
     * @param bool $hierarchical
     * @param bool $public
     * @param bool $show_ui
     * @param bool $show_admin_column
     * @param bool $show_in_nav_menu
     * @param bool $show_tagcloud
     */
    public function __construct($name, $singular_label = '', $plural_label = '', $slug = null, $with_front = true, $hierarchical = false, $public = true, $show_ui = true, $show_admin_column = true, $show_in_nav_menu = true, $show_tagcloud = true)
    {
        $this->name = $name;
        $this->singular_label = $singular_label;
        $this->plural_label = $plural_label;
        $this->slug = is_null($slug) ? $name : $slug;
        $this->with_front = $with_front;
        $this->hierarchical = $hierarchical;
        $this->public = $public;
        $this->show_ui = $show_ui;
        $this->show_admin_column = $show_admin_column;
        $this->show_in_nav_menu = $show_in_nav_menu;
        $this->show_tagcloud = $show_tagcloud;
    }


	/**
	 * Register custom taxonomy. should be called from init action.
	 */
	public function register()
    {
        $reserved_terms = ["attachment", "attachment_id", "author", "author_name", "calendar", "cat", "category", "category__and", "category__in", "category__not_in", "category_name", "comments_per_page", "comments_popup", "customize_messenger_channel", "customized", "cpage", "day", "debug", "error", "exact", "feed", "fields", "hour", "link_category", "m", "minute", "monthnum", "more", "name", "nav_menu", "nonce", "nopaging", "offset", "order", "orderby", "p", "page", "page_id", "paged", "pagename", "pb", "perm", "post", "post__in", "post__not_in", "post_format", "post_mime_type", "post_status", "post_tag", "post_type", "posts", "posts_per_archive_page", "posts_per_page", "preview", "robots", "s", "search", "second", "sentence", "showposts", "static", "subpost", "subpost_id", "tag", "tag__and", "tag__in", "tag__not_in", "tag_id", "tag_slug__and", "tag_slug__in", "taxonomy", "tb", "term", "theme", "type", "w", "withcomments", "withoutcomments", "year"];
        if (!in_array($this->name, $reserved_terms) && !taxonomy_exists($this->name) && !empty($this->plural_label && !empty($this->singular_label))) {
            $labels = array(
                'name' => _x('%2$s', 'Taxonomy General Name', 'lgobatto'),
                'singular_name' => _x('%1$s', 'Taxonomy Singular Name', 'lgobatto'),
                'menu_name' => __('%1$s', 'lgobatto'),
                'all_items' => __('All %2$s', 'lgobatto'),
                'parent_item' => __('Parent %1$s', 'lgobatto'),
                'parent_item_colon' => __('Parent %1$s:', 'lgobatto'),
                'new_item_name' => __('New %1$s Name', 'lgobatto'),
                'add_new_item' => __('Add New %1$s', 'lgobatto'),
                'edit_item' => __('Edit %1$s', 'lgobatto'),
                'update_item' => __('Update %1$s', 'lgobatto'),
                'view_item' => __('View %1$s', 'lgobatto'),
                'separate_items_with_commas' => __('Separate %4$s with commas', 'lgobatto'),
                'add_or_remove_items' => __('Add or remove %4$s', 'lgobatto'),
                'choose_from_most_used' => __('Choose from the most used %4$s', 'lgobatto'),
                'popular_items' => __('Popular %2$s', 'lgobatto'),
                'search_items' => __('Search %2$s', 'lgobatto'),
                'not_found' => __('Not Found', 'lgobatto'),
                'no_terms' => __('No %4$s', 'lgobatto'),
                'items_list' => __('%2$s list', 'lgobatto'),
                'items_list_navigation' => __('%2$s list navigation', 'lgobatto'),
            );
            foreach ($labels as $key => $value) {
                $labels[$key] = sprintf($value, $this->singular_label, $this->plural_label, strtolower($this->singular_label), strtolower($this->plural_label));
            }
            $rewrite = array(
                'slug' => $this->slug,
                'with_front' => $this->with_front,
                'hierarchical' => $this->hierarchical,
            );
            $args = array(
                'labels' => $labels,
                'hierarchical' => $this->hierarchical,
                'public' => $this->public,
                'show_ui' => $this->show_ui,
                'show_admin_column' => $this->show_admin_column,
                'show_in_nav_menus' => $this->show_in_nav_menu,
                'show_tagcloud' => $this->show_tagcloud,
                'rewrite' => $rewrite,
            );
            register_taxonomy($this->name, null, $args);
        }
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

}