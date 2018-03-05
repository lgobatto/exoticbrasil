<?php
if( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

class Mfn_Status extends Mfn_API {
	
	private $data 	= array();
	private $status = array();

	/**
	 * Mfn_Status constructor
	 */
	public function __construct(){
		
		parent::__construct();

		// It runs after the basic admin panel menu structure is in place.
		add_action( 'admin_menu', array( $this, 'init' ), 14 );
		
	}

	/**
	 * Add admin page & enqueue styles
	 */
	public function init(){
		
		$title = __( 'System Status','mfn-opts' );
		
		$this->page = add_submenu_page(
			'betheme',
			$title,
			$title,
			'edit_theme_options',
			'be-status',
			array( $this, 'template' )
		);
		
		// Fires when styles are printed for a specific admin page based on $hook_suffix.
		add_action( 'admin_print_styles-'. $this->page, array( $this, 'enqueue' ) );
		
		$this->set_status();
	}
	
	/**
	 * Status template
	 */
	public function template(){
		include_once LIBS_DIR . '/admin/templates/status.php';
	}
	
	/**
	 * Enqueue styles and scripts
	 */
	public function enqueue(){
		wp_enqueue_style( 'mfn-dashboard', LIBS_URI. '/admin/assets/dashboard.css', array(), THEME_VERSION );
	}
	
	/**
	 * Get system status array
	 */
	public function set_status(){
		
		global $wpdb;
		
		$data 	= array(
			'server'			=> $_SERVER[ 'SERVER_SOFTWARE' ],
			'php'				=> phpversion(),
			'mysql'				=> $wpdb->db_version(),
			'memory_limit' 		=> wp_convert_hr_to_bytes( @ini_get( 'memory_limit' ) ),
			'time_limit' 		=> ini_get( 'max_execution_time' ),
			'max_input_vars' 	=> ini_get( 'max_input_vars' ),
			'max_upload_size'	=> size_format( wp_max_upload_size() ),

			'wp_version'		=> get_bloginfo( 'version' ),	
			'language'			=> get_locale(),	
			'rtl'				=> is_rtl() ? 'RTL' : 'LTR',			
		);
		
		$status = array(
			'php'				=> version_compare( PHP_VERSION, '7.0.0' ) >= 0,
			'suhosin'			=> extension_loaded( 'suhosin' ),
			'memory_limit'		=> $data['memory_limit'] >= 268435456,
			'time_limit'		=> ( ( $data['time_limit'] >= 180 ) || ( $data['time_limit'] == 0 ) ),
			'max_input_vars'	=> $data['max_input_vars'] >= 5000,
			'fsockopen'			=> ( function_exists( 'fsockopen' ) || function_exists( 'curl_init' ) ),
			'dom'				=> class_exists( 'DOMDocument' ),

			'wp_version'		=> version_compare( get_bloginfo( 'version' ), '4.7' ) >= 0,
			'multisite'			=> is_multisite(),
			'debug'				=> ( defined('WP_DEBUG') && WP_DEBUG ),
		);

		$this->data		= $data;
		$this->status 	= $status;
		
	}
	
}

$mfn_status = new Mfn_Status();
