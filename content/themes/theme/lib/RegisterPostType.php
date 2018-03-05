<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 31/01/17
 * Time: 20:27
 */

namespace LGobatto;

class RegisterPostType {
	/**
	 * @var $post Post
	 */
	private $post;
	/**
	 * @var $taxonomies Taxonomy[]
	 */
	private $taxonomies;

	/**
	 * RegisterPostType constructor.
	 *
	 * @param $post Post
	 * @param $taxonomies Taxonomy[]
	 */
	public function __construct( $post, $taxonomies = null ) {
		$this->post       = $post;
		$this->taxonomies = $taxonomies;
		add_action( 'init', [ $this, 'register_post_type' ], 0 );
		if ( ! empty( $taxonomies ) && ! is_null( $taxonomies ) ) {
			add_action( 'init', [ $this, 'register_taxonomy' ], 0 );
		}
	}

	public function register_post_type() {
		$this->post->register();
	}

	function register_taxonomy() {
		foreach ( $this->taxonomies as $taxonomy ) {
			$taxonomy->register();
			register_taxonomy_for_object_type( $taxonomy->getName(), $this->post->getName() );
		}
	}
}