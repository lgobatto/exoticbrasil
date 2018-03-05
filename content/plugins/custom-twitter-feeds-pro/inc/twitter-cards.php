<?php
$twitter_card = '';

// array to store a php array of new twitter card data
$new_raw_data_to_merge = array();
// array to store a php array of data relevant to the links on the page
$raw_data_to_return = array();
// current twitter card data from the db
$existing_twitter_card_data = get_option( 'ctf_twitter_cards', array() );

require_once( CTF_URL . '/inc/CtfTwitterCard.php' );

$max_new_cards = 5;
$num_new_cards = 0;
$card_limit = 100;

foreach ( $urls as $url ) {
	$twitter_card = new CtfTwitterCard( $url, $existing_twitter_card_data );

	// check if data exists, if it does, add it to the data to return
	if ( $twitter_card->hasExistingData() ) {
		$raw_data_to_return[$url] = $twitter_card->getExistingData();
	} else {

		// to keep the wait for data to return short, the max new twitter cards
		// to create is kept at 5
		if ( $num_new_cards < $max_new_cards ) {
			$twitter_card->setExternalTwitterCardMetaFromUrl( $twitter_card->getUrl() );
			if ( $twitter_card->openGraphDataNeeded() ) {
				$twitter_card->setExternalOpenGraphMetaFromUrl( $twitter_card->getUrl() );
			}
			$twitter_card->setTwitterCardData();

			// add any new data to an array to merge with existing data
			$new_raw_data_to_merge[$twitter_card->getUrlKey()] = $twitter_card->getTwitterCardData();
			// also add the new found data to the relevant data to return
			$raw_data_to_return[$url] = $twitter_card->getTwitterCardData();

			$num_new_cards++;

			// to prevent the twitter card data from getting too large in the db, the oldest
			// twitter card is removed from the array if there are are going to be more than the max
			if ( count( $existing_twitter_card_data ) > $card_limit - $num_new_cards ) {
				array_pop( $existing_twitter_card_data );
			}
		}

	}
}

// no need to merge new data and update the database if there isn't any new data
if ( ! empty( $new_raw_data_to_merge ) ) {
	$twitter_card_merged_data = array_merge( $new_raw_data_to_merge, $existing_twitter_card_data );

	update_option( 'ctf_twitter_cards', $twitter_card_merged_data );
}

// the return function is expecting json
$twitter_card_json_to_return = json_encode( $raw_data_to_return );

echo $twitter_card_json_to_return;