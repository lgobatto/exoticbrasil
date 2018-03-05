<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 21/02/18
 * Time: 01:07
 */
add_filter( 'woocommerce_variable_price_html', 'custom_variation_price', 10, 2 );

function custom_variation_price( $price, $product ) {
	/**
	 * @var $product WC_Product
	 */
	$price = '';
	$price .= wc_price( $product->get_price() );

	return $price;

}

add_filter( 'woocommerce_get_price_html', 'theme_price_html', 10, 2 );

function theme_price_html( $price, $product ) {
	/**
	 * @var $product WC_Product
	 */
	$result = sprintf( '<small>A partir de: </small><span class="big">%s</span><br><small>em 3x sem juros ou<br>%s à vista.</small>', wc_price( $product->get_price() / 3 ), wc_price( $product->get_price() ) );

	return $result;
}

/**
 * @snippet       Remove Add Cart, Add View Product @ WooCommerce Loop
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @sourcecode    https://businessbloomer.com/?p=20721
 * @author        Rodolfo Melogli
 * @testedwith    WooCommerce 3.1.1
 */

// First, remove Add to Cart Button

remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

// Second, add View Product Button

add_action( 'woocommerce_after_shop_loop_item', 'bbloomer_view_product_button', 10);

function bbloomer_view_product_button() {
	global $product;
	$link = $product->get_permalink();
	echo '<a href="' . $link . '" class="button expanded">Mais Detalhes</a>';
}