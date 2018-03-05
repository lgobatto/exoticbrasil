=== Instagram Feed Pro ===
Contributors: smashballoon
Support Website: http://smashballoon/instagram-feed/
Requires at least: 3.0
Tested up to: 4.8
Stable tag: 2.8
Version: 2.8
License: Non-distributable, Not for resale

Display beautifully clean, customizable, and responsive feeds from multiple Instagram accounts

== Description ==

Display Instagram photos from any non-private Instagram accounts, either in the same single feed or in multiple different ones.

= Features =
* Super **simple to set up**
* Completely **responsive** and mobile ready - layout looks great on any screen size and in any container width
* **Completely customizable** - Customize the width, height, number of photos, number of columns, image size, background color, image spacing, text styling, likes & comments and more!
* Display **multiple Instagram feeds** on the same page or on different pages throughout your site
* Use the built-in **shortcode options** to completely customize each of your Instagram feeds
* Display thumbnail, medium or **full-size photos** from your Instagram feed
* **Infinitely load more** of your Instagram photos with the 'Load More' button
* View photos in a pop-up **lightbox**
* Display photos by User ID or hashtag
* Display photo captions, likes and comments
* Use your own Custom CSS or JavaScript

= Benefits =
* Increase your Instagram followers by displaying your Instagram content on your website
* Save time and increase efficiency by only posting your photos to Instagram and automatically displaying them on your website

== Installation ==

1. Install the Instagram plugin either via the WordPress plugin directory, or by uploading the files to your web server (in the `/wp-content/plugins/` directory).
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to the 'Instagram Feed' settings page to configure your Instagram feed.
4. Use the shortcode `[instagram-feed]` in your page, post or widget to display your photos.
5. You can display multiple Instagram feeds by using shortcode options, for example: `[instagram-feed id=YOUR_USER_ID_HERE cols=3 width=50 widthunit=%]`

== Changelog ==
= 2.8 =
* New: You can now choose to set the number of columns and posts to use for mobile, which allows you to decide how your Instagram feed is displayed across all devices. You can find these settings by navigating to `Customize > Layout`, and clicking on `Show Mobile Options` under the respective setting, or you can use the following shortcode options: `colsmobile=3 nummobile=9`
* New: Visitors to your site can now trigger the loading of more posts as they scroll down your feed. Enable this for all feeds by using the setting located at `Customize > Autoscroll Load More`, or apply this to a specific feed using the shortcode option: `autoscroll=true`
* New: It's now easier to collect post IDs for creating single post feeds as they can be displayed underneath posts while viewing a feed in "Moderation Mode". To view the ID for a post, enable "Moderation Mode" for your feed and simply check the box labeled "Show post ID under image".
* Tweak: Added an icon to carousel posts to let visitors know that it's a carousel
* Fix: Fixed an issue where the video would not play when the first slide in a carousel post was a video

= 2.7 =
* New: "Custom Image Sizes" now available for use in your feeds. These are available image resolutions not officially supported by Instagram. To use them, go to the "Customize" tab and check the box to "Use a Custom Image Size". You can then select from the revealed dropdown menu.
* New: Private feeds and single posts from private feeds will not break a feed but instead display a message to logged-in admins and exclude the private data
* Tweak: Lightbox moved farther to the foreground to prevent an issue with the navigation menu covering the lightbox in certain themes
* Tweak: Several images in the plugin have been optimized to reduce file size
* Tweak: Welcome page now only displayed for major updates
* Fix: Refactored code that was causing a false positive in a security plugin
* Fix: Carousel "slideshow" posts are still included in feeds which are set to only display photos
* Fix: Fixed missing "media" attribute in CSS file inclusion code

= 2.6.1 =
* Fix: Fixed an issue with videos in slideshow posts

= 2.6 =
* New: Added translation files for French (fr_FR), German (de_DE), English (en_EN), Spanish (es_ES), Italian (it_IT), and Russian (ru_RU) to translate "Load More..." and "Follow on Instagram"
* New: Instagram "Slideshow" posts are now supported. When viewing a slideshow post in the popup lightbox you can now scroll through to view the other images.
* Tweak: The lightbox navigation arrows have been moved outside of the image area to make room for slideshow posts and closer emulate the lightbox on Instagram
* Tweak: Font Awesome stylesheet handle has been renamed so it will only be loaded once if Custom Facebook Feed is also active
* Tweak: Removed query string at the end of the Font Awesome css file when being included on the page
* Fix: Undeclared variables in the JavaScript file now declared for strict mode compatibility

= 2.5.1 =
* Fix: Feed cache was being assigned to the header cache under certain conditions causing the header to show as "undefined"
* Fix: Php notice when saving moderation mode settings without any blocked users

= 2.5 =
* New: Added a workaround for an issue caused by some caching plugins. Enabling the "Force cache to clear on interval" setting on the "Customize" tab will now clear the page cache in some of the major caching plugins when the Instagram feed updates.
* Tweak: Reduced Ajax calls made by the plugin to one per feed to retrieve cached data
* Tweak: The plugin JavaScript file is now only included on pages where the feed is displayed, and a setting has been added to only load the CSS file on pages where the feed is displayed
* Tweak: Access token is now automatically saved if retrieved with the button on the "configure" tab
* Tweak: Changed how the caching errors caused by page caching plugins are handled
* Tweak: If you're using an Ajax theme and calling the plugin's `sbi_init()` function when the page content loads then we advise updating this to add a caching parameter. See [this page](https://smashballoon.com/my-photos-dont-show-up-sometimes-unless-i-refresh-my-page-ajax-theme/) for how you can update any custom code to take advantage of this.
* Fix: Improved sanitization and validation of data to be cached before saving to the database
* Fix: Added workaround for jQuery 3.0+ breaking jQuery mobile code
* Fix: Added space between an attribute to make feed html valid

= 2.4.2 =
* Fix: Using the "Load More" button in moderation mode would cause the moderation settings to submit more than once under certain circumstances.

= 2.4.1 =
* Fix: When used in conjunction with plugins that concatenate/minify/cache JavaScript the feed would sometimes load photos multiple times when certain settings were used. A setting was added to provide a workaround for cached pages as an option in the "Misc" section of the plugin's "Customize" tab.
* Fix: Fixed a bug caused when the HTML element that the Instagram Feed is inside doesn't have a class on it
* Fix: Fixed a JavaScript error that occurred in the lightbox when a post has no caption

= 2.4 =
* New: Added a visual moderation system (moderation mode) to allow you to create feeds of approved posts, block users, and remove specific posts from your feeds. Enable this feature on the "Customize" tab or add this to your shortcode: `[instagram-feed moderationmode="true"]`. Then click the 'moderate feed' button on the front end of your site. For further information, see [these directions](https://smashballoon.com/guide-to-moderation-mode/).
* New: Comments for individual posts are now available to be displayed in the lightbox. Enable this on the "Customize" tab or by adding this to your shortcode: `[instagram-feed lightboxcomments="true"]`. The number of comments shown can be changed as well: `[instagram-feed numcomments="10"]`.
* New: Create a "Shoppable" feed using links in the captions of your Instagram posts. Check the box next to this setting on the "Customize" tab or add this to the shortcode: `[instagram-feed captionlinks="true"]`. This requires an extra step when you post to Instagram. For further information, see [these directions](https://smashballoon.com/make-a-shoppable-feed/).
* New: Ability to show posts only from a specific user. Add a user to the setting on the "Customize" tab or add this to the shortcode: `[instagram-feed showusers="smashballoon"]`.
* Tweak: Improved hashtag detection of the "includewords" setting
* Fix: Spaces in the shortcode were causing issues for "single" feeds
* Fix: Removed padding on the "load more" button if it is hidden in the feed
* Fix: The first hashtag was not always being made into a link in the lightbox
* Fix: Lightboxes are now separated when there are more than one of them on the page
* Fix: Pagination would sometimes break for multiple user/location/hashtag feeds

= 2.3.1 =
* Fix: Instagram's new "Slideshow" post feature isn't supported yet by their API and so this was causing an error in feeds that included them. This error has been fixed but as Instagram hasn't yet added support in their API for slideshow posts then the plugin isn't able to display them. Once they add support then it will be added into the plugin.

= 2.3 =
* New: Added the ability to display a feed of specific posts. You can do this by using the `single` shortcode setting. First set the feed type to be "single", then paste the ID of the post(s) into the single shortcode setting, like so: `[instagram-feed type="single" single="sbi_1349591022052854916_10145706"]`. For further information, see [these directions](https://smashballoon.com/how-do-i-create-a-single-post-feed/).
* New: We've added a widget with the "Instagram Feed" label so that you no longer need to use the default "Text" widget
* Tweak: Addressed an occasional error with includewords/excludewords setting
* Tweak: Added commas to large numbers
* Tweak: When displaying photos by random the plugin will now randomize from the last 33 posts for unfiltered feeds rather than just randomizing the posts shown in the feed
* Tweak: User names can now be used instead of user ids for user feeds
* Fix: International characters are now supported in includewords/excludewords settings
* Fix: Fixed an undefined constant warning

= 2.2.1 =
* Tweak: Added a setting to disable the icon font used in the plugin
* Tweak: The "Include words" filtering option now only returns posts for an exact match instead of fuzzy matching
* Tweak: Change Instagram link to go to https
* Tweak: Added coordinates as attributes to the location element
* Fix: Fixed an issue with the Instagram image URLs which was resulting in inconsistent url references in some feeds
* Fix: Fixed an imcompatibility issue the MediaElement.js plugin
* Fix: Fixed an issue with videos not pausing in the lightbox when navigating using the keyboard arrows

= 2.2 =
* **IMPORTANT: Due to the recent Instagram API changes, in order for the Instagram Feed plugin to continue working after June 1st you must obtain a new Access Token by using the Instagram button on the plugin's Settings page.** This is required even if you recently already obtained a new token. Apologies for any inconvenience.

= 2.1.1 =
* Tweak: Updated the Instagram icon to match their new branding
* Tweak: Added a help link next to the Instagram login button in case there's an issue using it
* Fix: Updated the Font Awesome icon font to the latest version: 4.6.3

= 2.1 =
* Compatible with Instagram's new API changes effective June 1st
* New: Added the ability to display posts that your user has "liked" on Instagram. Thanks to Anders Hjort Straarup for his code contribution.
* New: Added a setting to allow you to use a fixed pixel width for the feed on desktop but switch to a 100% width responsive layout on mobile
* Tweak: Added a width and height attribute to the images to help improve Google PageSpeed score
* Tweak: When a feed contains posts from multiple hashtags then all of the hashtags are listed in the feed header
* Tweak: Allow users with WordPress "Editor" role to be able to moderate images in the feed
* Tweak: Added descriptive error messages
* Tweak: A few minor UI tweaks on the settings pages
* Fix: Hashtags which include foreign characters are now linked correctly
* Fix: Fixed an issue with the `showfollowers` shortcode option
* Fix: Fixed an issue with the carousel shortcode setting not working reliably
* Fix: Fixed an issue with the carousel script firing too soon when multiple API requests were required to fill the feed
* Misc bug fixes

= 2.0.4.2 =
* Fix: Fixed a JavaScript error in the admin area when using WordPress 4.5

= 2.0.4.1 =
* Fix: Fixed an issue with images in carousels not scaling correctly on mobile
* Fix: Fixed an issue with the lightbox breaking when an image didn't have a caption

= 2.0.4 =
* Fix: Fixed a bug which was causing the height of the photos to be shorter than they should have been in some themes
* Fix: Fixed an issue where when a feed was initially hidden (in a tab, for example) then the photo resolution was defaulting to 'thumbnail'

= 2.0.3 =
* Fix: Fixed an issue which was setting the visibility of some photos to be hidden in certain browsers
* Fix: The new square photo cropping is no longer being applied to feeds displaying images at less than 150px wide as the images from Instagram at this size are already square cropped
* Fix: Fixed a JavaScript error in Internet Explorer 8 caused by the 'addEventListener' function not being supported
* Note: If you notice any other bugs then please let us know so we can get them fixed right away. Thanks!

= 2.0.2 =
* Tweak: Added an option to force the plugin cache to clear on an interval if it isn't automatically clearing as expected
* Fix: Fixed an issue where photo wouldn't appear in the Instagram feed if it was initially being hidden
* Fix: Fixed an issue where the new image cropping fuction was failing to run on some sites and causing the images to appear as blank
* Fix: Fixed a bug where stray commas at the beginning or end of lists of IDs or hashtags would cause an error
* Fix: Removed the document ready function from around the plugin's initiating function so that it can be called externally if needed

= 2.0.1 =
* Fix: Fixed an issue with the number of likes and comments not showing over the photo when selected
* Fix: Fixed an issue with the carousel navigation arrows not being correctly aligned vertically when the caption was displayed beneath the photos
* Fix: The icons in the header for the number of photos and followers are now the right way around

= 2.0 =
* **MAJOR UDPATE**
* New: Completely rebuilt the core of the plugin to drastically improve the flexibility of the plugin and allow us to add some new post filtering options
* New: Added caching to minimize Instagram API requests
* New: Added a new Carousel feature which allows you to create awesome, customizable, and responsive carousels out of your Instagram feeds. Includes the ability to display navigation arrows, pagination, or enable autoplay. Use the Carousel settings on the plugin's Customize page or enable the carousel directly in your shortcode by using `carousel=true`. See [here]('https://smashballoon.com/instagram-feed/demo/carousel/') for an example of the carousel in action.
* New: You can now display photos from location ID. Use the field on the plugin's Settings page or the following shortcode options: `type=location location=213456451`.
* New: Display photos by location coordinates. Use the field on the plugin's Settings page or the following shortcode options: `type=coordinates coordinates="(25.76,-80.19,500)"`. See the directions on the plugin's Settings page for help on how to find coordinates.
* New: If you have uploaded a photo in portrait or landscape then the plugin will now display the square cropped version of photo in your feed and the full landscape/portrait image in the pop-up lightbox. **Important:** To enable this you will need to refresh your Access Token by using the big blue Instagram login button on the plugin's Settings page, and then copying your new token into the plugin's Access Token field.
* New: You can now choose to only show photos from your feeds which contain certain words or hashtags. For example, you can display photos from a User account which only contain a specific hashtag. Use the settings in the new 'Post Filtering' section on the Customize page, or define words or hashtags directly in your shortcode; `includewords="#sunshine"`
* New: You can now also remove photos which contain certain words or hashtags. Use the setting in the 'Post Filtering' section, or the following shortcode option `excludewords="bad, words"`
* New: Block photos from certain users by entering their usernames into the 'Block Users' field on the plugin's Customize page
* New: Added a second style of header. The 'boxed' header style can be configured under the 'Header' section of the plugin's Customize page, or enabled using `headerstyle=boxed`
* New: The plugin now automatically removes duplicate photos from your feed
* New: When you click on the name of a setting on the plugin's Settings pages it now displays the shortcode option for that setting, making it easier to find the option that you need
* New: Hashtags and @tags in the caption are now linked to the relevant pages on Instagram
* New: Text in the pop-up lightbox is now formatted with line breaks as it is on Instagram
* New: Choose to show the number of photos and followers an account has in the feed header. Use the setting under the 'Header' section, or the following shortcode option `showfollowers=true`.
* New: You can now choose to include only photos or only videos in your feed. Use the setting under the 'Photos' section on the Customize page, or the following shortcode option: `media=photos`.
* New: You can now display the photo location, caption, or number of likes and comments over the photo when it's hovered upon
* New: Pick and choose which information to show over the photo when it's hovered upon. Use the checkboxes under the 'Photo Hover Style' section, or the `hoverdisplay` shortcode option: `hoverdisplay="date, location, likes"`.
* Tweak: A header is now added to the hashtag feed and displays the hashtag
* Tweak: Added a loading symbol to the 'Load more' button to indicate when new photos are loading
* Fix: Fixed an issue where duplicate photos would be loaded into a feed if the 'Are you using an Ajax powered theme' setting was checked on a non-Ajax powered theme
* Fix: The play button icon shown over the top of the photo is now clickable
* Fix: Fixed an issue with emojis in the feed header displaying on a separate line
* Fix: Fixed a bug where the image resolution 'Auto-detect' setting would sometimes display the wrong image size

= 1.3.1 =
* New: Added an email option to the share icons in the pop-up lightbox
* Fix: Fixed an issue with the 'Load more' button not always showing when displaying photos from multiple hashtags or User IDs
* Fix: Fixed an issue where clicking on the play icon on the photo didn't launch the video pop-up
* Fix: Moved the initiating sbi_init function outside of the jQuery ready function so that it can be called externally if needed by Ajax powered themes/plugins
* Fix: Fixed a problem which sometimes caused the lightbox to conflict with lightboxes built into themes or other plugins

= 1.3 =
* New: Added an option to disable the pop-up photo lightbox
* New: Added swipe support for the popup lightbox on touch screen devices
* New: Added an setting which allows you to use the plugin with an Ajax powered theme
* New: Added an option to disable the mobile layout
* New: Added a Support tab which contains System Info to help with troubleshooting
* New: Added friendly error messages which display only to WordPress admins
* New: Added validation to the User ID field to prevent usernames being entered instead of IDs
* Tweak: Disabled the hover event on touch screen devices so that tapping the photo once launches the lightbox
* Tweak: Made the Access Token field slightly wider to prevent tokens being copy and pasted incorrectly
* Tweak: Updated the plugin updater/license check script

= 1.2.2 =
* New: Added the ability to add a class to the feed via the shortcode, like so: [instagram-feed class="my-feed"]
* Fix: Fixed an issue with videos not playing on some touch-screen devices
* Fix: Fixed an issue with video sizing on some mobile devices
* Fix: Addressed a few CSS issues which were causing some minor formatting issues on certain themes

= 1.2.1 =
* Fix: Fixed an issue with the width of videos exceeding the lightbox container on smaller screen sizes and mobile devices
* Fix: Fixed an issue with both buttons being hidden when there were no more posts to load, rather than just the 'Load More' button
* Fix: Added a small amount of margin to the top of the buttons to prevent them touching when displayed in narrow columns or on mobile

= 1.2 =
* New: You can now display photos from multiple User IDs or hashtags. Simply separate your IDs or hashtags by commas.
* New: Added an optional header to the feed which contains your profile picture, username and bio. You can activate this on the Customize page.
* New: Specific photos in your feed can now be hidden. A link is displayed in the popup photo lightbox to site admins only which reveals the photos ID. This can then be added to the new 'Hide Photos' section on the plugin's Customize page.
* New: The plugin now includes an 'Auto-detect' option for the Image Resolution setting which will automatically set the correct image resolution based on the size of your feed.
* New: Added the username and profile picture to the popup photo lightbox
* New: Added a 'Share' button to the photo lightbox which allows you to share the photo on various social media platforms
* New: Added an Instagram button to the photo lightbox which allows you to view the photo on Instagram
* New: Added an optional 'Follow on Instagram' button which can be displayed at the bottom of your feed. You can activate this on the Customize page.
* New: Added the ability to use your own custom text for the 'Load More' button
* New: You can now change the color of the text and icons which are displayed when hovering over the photos
* New: Added a loader icon to indicate that the images are loading
* Tweak: Tweaked some CSS to improve spacing and cross-browser consistency
* Tweak: Removed the semi-transparent background color from caption and likes section. can now be added via CSS instead using: #sb_instagram .sbi_info{ background: rgba(255,255,255,0.5); }
* Tweak: Improved the documentation within the plugin settings pages
* Fix: Fixed an issue with some photos not displaying at full size in the popup photo lightbox
* Fix: Added word wrapping to captions so that long sentences or hashtags without spaces to wrap onto the next line

= 1.1 =
* New: Added video support. Videos now play in the lightbox!
* New: Redesigned the photo hover state to use icons and include the date and author name
* New: Added an option to change the color of the hover background
* Tweak: You can now specify the hashtag with or without the # symbol
* Tweak: Tweaked the responsive design and modified the media queries so that the feed switches to 1 or 2 columns on mobile
* Tweak: Added a friendly message if you activate the Pro version of the plugin while the free version is still activated
* Tweak: Added a 'Settings' link to the Plugins page
* Tweak: Added a link to the [setup directions](https://smashballoon.com/instagram-feed/docs/)
* Fix: Replaced the 'on' function with the 'click' function to increase compatibility with themes using older versions of jQuery
* Fix: Fixed an issue with double quotes in photo captions
* Fix: Removed float from the feed container to prevent clearing issues with other widgets

= 1.0.3 =
* Tweak: If you have more than one Instagram feed on a page then the photos in each lightbox slideshow are now grouped by feed
* Tweak: Added an initialize function to the plugin
* Fix: Added a unique class and data attribute to the lightbox to prevent conflicts with other lightboxes on your site
* Fix: Fixed an occasional issue with the 'Sort Photos By' option being undefined

= 1.0.2 =
* Tweak: Added the photo caption as the 'alt' tag of the images
* Fix: Fixed an issue with the caption elipsis link not always working correctly after having clicked the 'Load More' button
* Fix: Changed the double quotes to single quotes on the 'data-options' attribute

= 1.0.1 =
* Fix: Fixed a minor issue with the Custom JavaScript being run before the photos are loaded

= 1.0 =
* Launched the Instagram Feed Pro plugin!