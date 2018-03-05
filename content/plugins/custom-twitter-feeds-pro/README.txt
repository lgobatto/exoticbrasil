=== Custom Twitter Feeds Pro ===
Author: Smash Balloon
Contributors: smashballoon, craig-at-smash-balloon
Support Website: http://smashballoon/custom-twitter-feeds/
Requires at least: 3.0
Tested up to: 4.8
Stable tag: 1.4.3
License: Non-distributable, Not for resale

Custom Twitter Feeds Pro allows you to display completely customizable Twitter feeds of your user timeline, home timeline, hashtag, and more on your website.

== Description ==
Display **completely customizable**, **responsive** and **search engine crawlable** versions of your Twitter feed on your website. Completely match the look and feel of the site with tons of customization options!

* **Completely Customizable** - by default inherits your theme's styles
* Feed content is **crawlable by search engines** adding SEO value to your site
* **Completely responsive and mobile optimized** - works on any screen size
* Display tweets from any user, your own account and those you follow, or from a specific hashtag
* Display multiple feeds from different Twitter users on multiple pages or widgets
* Post caching means that your feed loads lightning fast and minimizes Twitter API requests
* **Infinitely load more** of your Tweets with the 'Load More' button
* Built-in easy to use "Custom Twitter Feeds" Widget
* Fully internationalized and translatable into any language
* Display a beautiful header at the top of your feed
* Enter your own custom CSS for even deeper customization

For simple step-by-step directions on how to set up the Custom Twitter Feeds plugin please refer to our [setup guide](http://smashballoon.com/custom-twitter-feeds/docs/setup 'Custom Twitter Feeds setup guide').

= Feedback or Support =
We're dedicated to providing the most customizable, robust and well supported Twitter feed plugin in the world, so if you have an issue or any feedback on how to improve the plugin then please [let us know](https://smashballoon.com/custom-twitter-feeds/support/ 'Twitter Feed Support').

If you like the plugin then please consider leaving a [review](https://wordpress.org/support/view/plugin-reviews/custom-twitter-feeds), as it really helps to support the plugin. If you have an issue then please allow us to help you fix it before leaving a review. Just [let us know](https://smashballoon.com/custom-twitter-feeds/support/ 'Twitter Feed Support') what the problem is and we'll get back to you right away.

== Installation ==
1. Install the Custom Twitter Feeds Pro plugin by uploading the files to your web server (in the /wp-content/plugins/ directory).
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to the 'Twitter Feed' settings page to configure your feed.
4. Use the shortcode [custom-twitter-feeds] in your page, post or widget to display your feed.
5. You can display multiple feeds with different configurations by specifying the necessary parameters directly in the shortcode: [custom-twitter-feeds hashtag=#smashballoon].

For simple step-by-step directions on how to set up Custom Twitter Feeds plugin please refer to our [setup guide](http://smashballoon.com/custom-twitter-feeds/docs/ 'Custom Twitter Feeds setup guide').

== Changelog ==
= 1.4.3 =
* New: Added "Welcome" and "Getting Started" pages when first activating or updating the plugin
* New: Added screen reader labels for improved accessibility
* Tweak: Updated Font Awesome files to version 4.7.0

= 1.4.2 =
* Fix: Encoding of umlauts and certain quote styles were fixed for Twitter Cards
* Fix: Escaped additional urls, attributes and html
* Fix: Added a workaround for a minor formatting issue caused by some themes
* Tweak: Added notice if license is expired or will expire soon

= 1.4.1 =
* Fix: Fixed an issue where some embedded YouTube videos were not playable

= 1.4 =
* New: Added a "Loop Type" option to the Carousel settings which allows you to select how the carousel should loop. Choose from "None", "Infinite", or "Rewind". You can also use the `carouselloop` shortcode option.
* Tweak: Updated the carousel code version
* Fix: Several fixes for Twitter Card retrieval. If some of your Twitter Cards are not generating as expected, check the box next to "Use cURL to retrieve Twitter Cards" on the "Customize" tab near the bottom of the page. You may also need to click "Clear Twitter Card Cache" after doing so to generate missing Twitter Cards.
* Fix: Links would sometimes be removed if no Twitter Card data was found.
* Fix: Additional resize triggered to help images being cut off under certain conditions

= 1.3.8 =
* Fix: Fixed missing avatars in Firefox for some accounts
* Fix: Changed account links to https
* Fix: Mentions timeline now uses the same layout as the home and user timelines
* Fix: Fixed links from Facebook disappearing under certain situations in tweets
* Fix: Fixed retweets always being included in persistent caches during the initial tweet retrieval.
* Fix: Twitter card issue.

= 1.3.7 =
* Fix: Fixed an issue where link information sometimes wasn't able to be displayed as a Twitter Card due to the standard "get_meta_tags" function not working on some servers. A backup method was added as a workaround using cURL.
* Fix: Fixed an issue with include/exclude string to array conversion warning

= 1.3.6 =
* New: Images in feeds are now the smallest resolution available relative to the actual size of the image on the page.
* Fix: Certain characters in "search" feeds causing inconsistent results in feed.

= 1.3.5 =
* Fix: Line breaks were not being recognized in tweet text

= 1.3.4 =
* Fix: Persistent cache was not saving all data in some circumstances. Data is now encoded to ensure that it saves.

= 1.3.3 =
* Fix: Occasionally a format other that .mp4 would be used for videos in the feed. Mp4 will now always be used when available.
* Fix: PHP warnings would appear when updating a persistent cache when all of the new tweets were filtered out due to duplication.

= 1.3.2 =
* Fix: Fixed an issue that would occur when no tweets were available after filtering with the includewords setting
* Fix: Fixed an issue where empty tweets would show up in certain situations

= 1.3.1 =
* Fix: Fixed an issue introduced in the previous updated where some images were not being shown in Tweets
* Fix: Fixed a layout issue when a quote Tweet contained multiple images

= 1.3 =
* New: The plugin now uses persistent tweet caching for search and hashtag feeds. By default, when displaying hashtag or search feeds Twitter only returns Tweets from the last 7 days, but the persistent cache now allows you to display these Tweets indefinitely.
* New: You can now display Tweets from a "List". Just select the "Lists" feed type on the plugin's Settings page, or use the `lists` shortcode option, eg: `lists="18480038"`. You can use the helpful List ID finding tool on the plugin's Settings page to help find your list ID.
* New: Retweets can now be filtered out of user and home timelines. Retweets are filtered out by default for search and hashtag feeds.
* New: Added options for media layouts including the max number of visible images and the number of columns used in the tweet. These can be found under the 'Media Layout' section on the 'Customize' page, or you can use the following shortcode options: `imagecols` and `maxmedia`, eg: `imagecols=2 maxmedia=2`.
* Tweak: Removed links at the end of tweets when media or a twitter card link was available
* Fix: Fixed an issue where ajax calls for twitter cards and additional tweets would return the page url

= 1.2.2 =
* Fix: Fixed an issue with the Twitter Access Token and Secrets not automatically being saved when initially obtaining them
* Fix: Fixed an issue related to the checkbox used to show the bio text in the header
* Fix: Fixed an issue with the header background color not being applied in some feeds
* Fix: Fixed and issue with the custom date format setting not working correctly

= 1.2.1 =
* Fix: Fixed an issue with icons not displayed in the carousl navigation arrows
* Fix: Fixed an issue when creating a Search feed using the built-in Custom Twitter Feeds widget box
* Fix: Fixed an issue with the "Load More" button in the carousel when multiple feeds were on the same page
* Fix: Fixed an issue with the checkbox that allows you to toggle links on/off in the Tweet text

= 1.2 =
* New: Added a Carousel feature which allows you to display your Tweets in a carousel/slideshow. Use the settings on the plugin's "Customize" page, or set `carousel=true` in your shortcode.
* New: Added `mentions=true` as a shortcode setting
* Tweak: Display feed header and bio by default when plugin is first installed
* Tweak: Added a header when combining multiple types of feed into one single feed
* Tweak: Separated the "Hashtag" and "Search" fields on the plugin's Settings page
* Fix: Adjusted the spacing in masonry so that boxed tweets have equal padding
* Fix: Fixed a masonry layout issue
* Fix: Fixed an issue with transient names for search feeds which affected caching
* Fix: Fixed an issue with punctuation in the "includewords" setting
* Fix: Fixed an issue with some setting checkboxes
* Fix: Fixed a rare URL encoding issue which occurred on some server configurations
* Fix: Misc bug fixes
* Tested with the upcoming WordPress 4.6 update

= 1.1 =
* New: Now supports YouTube, Vimeo, Vine, and SoundCloud embeds
* New: When quoting/sharing Tweets it now shows images when applicable
* New: Added support for "Amplify" Twitter cards
* New: Added a Mentions setting to allow you to display Tweets which @mention you
* New: Added a 2 column option for the Masonry layout
* Tweak: Prevented duplicate Tweets from being displayed
* Fix: Fixed a bug with Masonry and Autoscroll checkbox
* Fix: Fixed an issue with the "Disable lightbox" setting not working correctly
* Fix: Added a play button overlay to videos
* Fix: Miscellaneous bug fixes

= 1.0.1 =
* Fix: Fixed an issue with some customize settings not saving successfully
* Fix: Minor bug fixes

= 1.0 =
* Launch!