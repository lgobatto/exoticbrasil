<?php
/**
 * Created by PhpStorm.
 * User: lgobatto
 * Date: 07/02/18
 * Time: 22:47
 */
$images_dir = 'product_images';
if ( ! is_dir( $images_dir ) ) {
	mkdir( $images_dir );
}
$csv_dir = 'product_images/csv';
if ( ! is_dir( $csv_dir ) ) {
	mkdir( $csv_dir, 0777, true );
}
require_once( 'app/wp-load.php' );
?>
<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foundation for Sites</title>
    <link rel="stylesheet" href="bower_components/foundation-sites/dist/css/foundation.css">
    <style>
        table {
            font-size: 10px;
            margin-bottom: 0;
        }

        table td p {
            margin: 0;
        }
    </style>
</head>
<body>
<div class="grid-container">
	<?php
	/**
	 * @var $terms []
	 * @var $term WP_Term
	 * @var $parent WP_Term
	 */
	$terms     = get_terms( [
		'taxonomy'     => 'product_cat',
		'hide_empty'   => false,
		'exclude_tree' => 334
	] );
	$first_row = [
		'title',
		'description',
		'@image'
	];
	for ( $i = 1; $i <= 5; $i ++ ) {
		$row       = [
			'name_0' . $i,
			'price_0' . $i,
			'sale_0' . $i,
			'gain_0' . $i,
		];
		$first_row = array_merge( $first_row, $row );
	}
	foreach ( $terms as $term ) {
		if ( $term->parent == 0 ) {
			continue;
		}
		$parent = get_term( $term->parent );
		if ( $parent->parent != 0 ) {
			continue;
		}
		$cat_title = sprintf(
			'<div class="grid-x"><div class="cell"><h4 class="title">%s - %s</h4></div></div>',
			$parent->name,
			$term->name
		);
		$fp        = fopen( $csv_dir . '/' . sanitize_title( $cat_title ) . '.csv', 'w' );
		fputcsv( $fp, $first_row );
		$products = new WP_Query( [
			'posts_per_page' => - 1,
			'post_type'      => 'product',
			'fields'         => 'ids',
			'tax_query'      => [
				[
					'taxonomy' => 'product_cat',
					'terms'    => [ $term->term_id ]
				]
			],
			'orderby'        => 'post_title',
			'order'          => 'ASC'
		] );
		foreach ( $products->posts as $product_id ) {
			$product = wc_get_product( $product_id );
			$description = str_replace( PHP_EOL, ' ', $product->get_description() );
			$description = str_replace( PHP_EOL, ' ', $description );
			var_dump($description);
			$image   = '';
			if ( has_post_thumbnail( $product_id ) ) {
				$image         = 'osx_files:lgobatto:Jobs:exoticbrasil.com.br:www:product_images:';
				$product_image = get_attached_file( $product->get_image_id() );
				$filename      = basename( $product_image );
				if ( ! file_exists( $images_dir . '/' . $filename ) ) {
					copy( $product_image, $images_dir . '/' . $filename );
				}
				$image .= $filename;
			}
			$row = [
				$product->get_title(),
				$description,
				$image
			];
			if ( $product->has_child() ) {
				$variations = $product->get_children();
				foreach ( $variations as $variation_id ) {
					$variation = wc_get_product( $variation_id );
					$price     = $variation->get_regular_price();
					$suggested = number_format( $price, 2, ',', '.' );
					$sale      = number_format( $price - ( $price * 0.35 ), 2, ',', '.' );
					$gain      = number_format( $suggested - $sale, 2, ',', '.' );
					$row       = array_merge( $row, [ strip_tags( $variation->get_formatted_name() ), $sale, $suggested, $gain ] );
				}
			} else {
				$price     = $product->get_regular_price();
				$suggested = number_format( $price, 2, ',', '.' );
				$sale      = number_format( $price - ( $price * 0.35 ), 2, ',', '.' );
				$gain      = number_format( $suggested - $sale, 2, ',', '.' );
				$row       = array_merge( $row, [ $product->get_formatted_name(), $sale, $suggested, $gain ] );
			}
			fputcsv( $fp, $row );
		}
		fclose( $fp );
	}
	?>
</div>
<script src="content/themes/theme/dist/scripts/jquery.js"></script>
<script src="content/themes/theme/dist/scripts/main.js"></script>
</body>
</html>
