<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 31/01/17
 * Time: 21:51
 */

namespace LGobatto;


/**
 * Class Post
 * @package LGobatto
 */
class Post {
	/**
	 * Define post supports values to avoid misspelling.
	 */
	const TITLE = 'title';
	const EDITOR = 'editor';
	const AUTHOR = 'author';
	const THUMBNAIL = 'thumbnail';
	const EXCERPT = 'excerpt';
	const TRACKBACKS = 'trackbacks';
	const CUSTOM_FIELDS = 'custom-fields';
	const COMMENTS = 'comments';
	const REVISIONS = 'revisions';
	const ATTRIBUTES = 'page-attributes';
	const FORMATS = 'post-formats';
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
	 * @var array
	 */
	private $args;
	/**
	 * @var array
	 */
	private $rewrite;

	/**
	 * Post constructor.
	 *
	 * @param $name
	 * @param $singular_label string
	 * @param $plural_label string
	 */
	public function __construct( $name, $singular_label, $plural_label ) {
		$this->name           = $name;
		$this->singular_label = $singular_label;
		$this->plural_label   = $plural_label;
	}

	/**
	 * @return string
	 */
	public function getSingularLabel() {
		return $this->singular_label;
	}

	/**
	 * @return string
	 */
	public function getPluralLabel() {
		return $this->plural_label;
	}


	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @return string[]
	 */
	public function getLabels() {
		$labels = array(
			'name'                  => _x( '%2$s', 'Post Type General Name', 'silkrock' ),
			'singular_name'         => _x( '%1$s', 'Post Type Singular Name', 'silkrock' ),
			'menu_name'             => __( '%2$s', 'silkrock' ),
			'name_admin_bar'        => __( '%2$s', 'silkrock' ),
			'archives'              => __( '%1$s Archives', 'silkrock' ),
			'attributes'            => __( '%1$s Attributes', 'silkrock' ),
			'parent_item_colon'     => __( 'Parent %1$s:', 'silkrock' ),
			'all_items'             => __( 'All %2$s', 'silkrock' ),
			'add_new_item'          => __( 'Add New %1$s', 'silkrock' ),
			'add_new'               => __( 'Add New', 'silkrock' ),
			'new_item'              => __( 'New %1$s', 'silkrock' ),
			'edit_item'             => __( 'Edit %1$s', 'silkrock' ),
			'update_item'           => __( 'Update %1$s', 'silkrock' ),
			'view_item'             => __( 'View %1$s', 'silkrock' ),
			'view_items'            => __( 'View %2$s', 'silkrock' ),
			'search_items'          => __( 'Search %1$s', 'silkrock' ),
			'not_found'             => __( '%1$s not found', 'silkrock' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'silkrock' ),
			'featured_image'        => __( 'Featured %3$s Image', 'silkrock' ),
			'set_featured_image'    => __( 'Set %3$s featured image', 'silkrock' ),
			'remove_featured_image' => __( 'Remove %3$s featured image', 'silkrock' ),
			'use_featured_image'    => __( 'Use as %3$s featured image', 'silkrock' ),
			'insert_into_item'      => __( 'Insert into %3$s', 'silkrock' ),
			'uploaded_to_this_item' => __( 'Uploaded to this %3$s', 'silkrock' ),
			'items_list'            => __( '%2$s list', 'silkrock' ),
			'items_list_navigation' => __( '%1$s list navigation', 'silkrock' ),
			'filter_items_list'     => __( 'Filter %4$s list', 'silkrock' ),
		);
		foreach ( $labels as $key => $value ) {
			$labels[ $key ] = sprintf( $value, $this->singular_label, $this->plural_label, strtolower( $this->singular_label ), strtolower( $this->plural_label ) );
		}

		return $labels;
	}

	/**
	 * @return array
	 * @internal param bool $with_front
	 * @internal param bool $pages
	 * @internal param bool $feeds
	 *
	 */
	public function getRewrite() {
		return $this->rewrite;
	}

	/**
	 * @param null $slug
	 * @param bool $with_front
	 * @param bool $pages
	 * @param bool $feeds
	 *
	 * @internal param array $rewrite
	 */
	public function setRewrite( $slug = null, $with_front = false, $pages = false, $feeds = false ) {
		$rewrite       = array(
			'slug'       => is_null( $slug ) ? $this->getName() : $slug,
			'with_front' => $with_front,
			'pages'      => $pages,
			'feeds'      => $feeds,
		);
		$this->rewrite = $rewrite;
	}

	/**
	 * @param array $supports
	 * @param string $icon
	 * @param bool $hierarchical
	 * @param bool $public
	 * @param bool $show_ui
	 * @param bool $show_in_menu
	 * @param int $menu_position
	 * @param bool $show_admin_bar
	 * @param bool $show_in_nav_menus
	 * @param bool $export
	 * @param bool $archive
	 * @param bool $exclude_from_search
	 * @param bool $queryable
	 * @param string $capability
	 * @param bool $rest
	 *
	 * @internal param $rewrite
	 * @internal param array $args
	 */
	public function setArgs( $supports = [ Post::TITLE ], $icon = '', $archive = true, $hierarchical = false, $public = true, $show_ui = true, $show_in_menu = true, $menu_position = 5, $show_admin_bar = false, $show_in_nav_menus = true, $export = true, $exclude_from_search = false, $queryable = true, $capability = 'page', $rest = true ) {
		$args       = [
			'label'               => __( $this->singular_label, 'silkrock' ),
			'description'         => __( $this->plural_label, 'silkrock' ),
			'labels'              => $this->getLabels(),
			'supports'            => $supports,
			'hierarchical'        => $hierarchical,
			'public'              => $public,
			'show_ui'             => $show_ui,
			'show_in_menu'        => $show_in_menu,
			'menu_position'       => $menu_position,
			'menu_icon'           => $icon,
			'show_in_admin_bar'   => $show_admin_bar,
			'show_in_nav_menus'   => $show_in_nav_menus,
			'can_export'          => $export,
			'has_archive'         => $archive,
			'exclude_from_search' => $exclude_from_search,
			'publicly_queryable'  => $queryable,
			'rewrite'             => $this->getRewrite(),
			'capability_type'     => $capability,
			'show_in_rest'        => $rest,
		];
		$this->args = $args;
	}

	public function getArgs() {
		return $this->args;
	}

	/**
	 * @param [] $args
	 */
	public function register() {
		$reserved_types = [
			"post",
			"page",
			"attachment",
			"revision",
			"nav_menu_item",
			"custom_css",
			"customize_changeset",
			"action",
			"author",
			"order",
			"theme"
		];
		if ( ! in_array( $this->name, $reserved_types ) ) {
			register_post_type( $this->name, $this->args );
		}
	}

}