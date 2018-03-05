var ctf_js_exists = (typeof ctf_js_exists !== 'undefined') ? true : false;
if(!ctf_js_exists){

    (function ($) {

        //Runs every time new tweets are loaded
        function ctfScripts($ctf) {

            var ctfIsMasonry = $ctf.hasClass('ctf-masonry'),
                imageCols = $ctf.attr('data-ctfimagecols'),
                feedWidth = parseInt($ctf.find('.ctf-tweet-media').innerWidth()),
                maxMedia = parseInt($ctf.attr('data-ctfmaxmedia'));


            //Loop through each newly loaded tweet
            $ctf.find('.ctf-item.ctf-new').each(function () {

                var $ctfItem = $(this),
                    $ctfText = $ctfItem.find('.ctf-tweet-text'),
                    ctfTextStr = ' ' + $ctfText.html(),
                    ctfLinkColor = $ctf.attr('data-ctflinktextcolor'),
                    ctfLinkColorHex = '',
                    numMedia = $(this).find('.ctf-tweet-media a').length,
                    visibleMedia = Math.min(numMedia, maxMedia);

                if ($ctfItem.find('.ctf-image img').length && $ctfItem.find('.ctf-image img').attr('data-ctfsizes') !== 'full' ) {
                    $ctfItem.find('.ctf-image img').each(function() {
                        $(this).attr('src', getImageSource(imageCols, $(this).attr('src'), visibleMedia, feedWidth, $(this).attr('data-ctfsizes')));
                    });
                }

                if (ctfLinkColor) ctfLinkColorHex = ctfLinkColor.replace(';', '').split("#")[1];

                //Link URLs
                window.ctfLinkify = (function () {
                    var k = "[a-z\\d.-]+://", h = "(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])", c = "(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+", n = "(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)", f = "(?:" + c + n + "|" + h + ")", o = "(?:[;/][^#?<>\\s]*)?", e = "(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?", d = "\\b" + k + "[^<>\\s]+", a = "\\b" + f + o + e + "(?!\\w)", m = "mailto:", j = "(?:" + m + ")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" + f + e + "(?!\\w)", l = new RegExp("(?:" + d + "|" + a + "|" + j + ")", "ig"), g = new RegExp("^" + k, "i"), b = {
                        "'": "`",
                        ">": "<",
                        ")": "(",
                        "]": "[",
                        "}": "{",
                        "B;": "B+",
                        "b:": "b9"
                    }, i = {
                        callback: function (q, p) {
                            return p ? '<a href="' + p + '" title="' + p + '" target="_blank">' + q + "</a>" : q
                        }, punct_regexp: /(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/
                    };
                    return function (u, z) {
                        z = z || {};
                        var w, v, A, p, x = "", t = [], s, E, C, y, q, D, B, r;
                        for (v in i) {
                            if (z[v] === undefined) {
                                z[v] = i[v]
                            }
                        }
                        while (w = l.exec(u)) {
                            A = w[0];
                            E = l.lastIndex;
                            C = E - A.length;
                            if (/[\/:]/.test(u.charAt(C - 1))) {
                                continue
                            }
                            do {
                                y = A;
                                r = A.substr(-1);
                                B = b[r];
                                if (B) {
                                    q = A.match(new RegExp("\\" + B + "(?!$)", "g"));
                                    D = A.match(new RegExp("\\" + r, "g"));
                                    if ((q ? q.length : 0) < (D ? D.length : 0)) {
                                        A = A.substr(0, A.length - 1);
                                        E--
                                    }
                                }
                                if (z.punct_regexp) {
                                    A = A.replace(z.punct_regexp, function (F) {
                                        E -= F.length;
                                        return ""
                                    })
                                }
                            } while (A.length && A !== y);
                            p = A;
                            if (!g.test(p)) {
                                p = (p.indexOf("@") !== -1 ? (!p.indexOf(m) ? "" : m) : !p.indexOf("irc.") ? "irc://" : !p.indexOf("ftp.") ? "ftp://" : "http://") + p
                            }
                            if (s != C) {
                                t.push([u.slice(s, C)]);
                                s = E
                            }
                            t.push([A, p])
                        }
                        t.push([u.substr(s)]);
                        for (v = 0; v < t.length; v++) {
                            x += z.callback.apply(window, t[v])
                        }
                        return x || u
                    }
                })();
                ctfTextStr = ctfLinkify(ctfTextStr);

                //Link hashtags
                var ctfHashRegex = /(^|\s)#(\w*[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+\w*)/gi;

                function ctfHashReplacer(hash) {
                    //Remove white space at beginning of hash
                    var replacementString = jQuery.trim(hash);
                    //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
                    if (/^#[0-9A-F]{6}$/i.test(replacementString)) {
                        return replacementString;
                    } else {
                        return ' <a href="https://twitter.com/hashtag/' + replacementString.substring(1) + '" target="_blank" rel="nofollow">' + replacementString + '</a>';
                    }
                }

                //Link @tags
                function ctfReplaceTags(tag) {
                    var replacementString = jQuery.trim(tag);
                    return ' <a href="https://twitter.com/' + replacementString.substring(1) + '" target="_blank" rel="nofollow">' + replacementString + '</a>';
                }

                //Only add links if not disabled in settings
                if ($ctf.attr('data-ctfdisablelinks') != 'true' && typeof ctfTextStr !== 'undefined') {

                    //Replace hashtags in text
                    if (ctfTextStr.length > 0) {
                        //Add a space after all <br> tags so that #hashtags immediately after them are also converted to hashtag links. Without the space they aren't captured by the regex.
                        ctfTextStr = ctfTextStr.replace(/<br>/g, "<br> ");
                        ctfTextStr = ctfTextStr.replace(ctfHashRegex, ctfHashReplacer);
                    }

                    var tagRegex = /[\s][@]+[A-Za-z0-9-_]+/g;
                    ctfTextStr = ctfTextStr.replace(tagRegex, ctfReplaceTags);

                    //Replace text with linked version
                    $ctfText.html(ctfTextStr.trim());

                    //Add link color
                    $ctfText.find('a').css('color', '#' + ctfLinkColorHex);

                    //Set color of Twitter card text
                    $ctfItem.find('.ctf-twitter-card').css('color', $ctfText.css('color'));

                } // End "ctfdata-disablelinks" check

                //Fade in links on hover
                $ctfItem.find('.ctf-tweet-content:not(.ctf-disable-lightbox) .ctf-tweet-media a').on({
                    mouseenter: function () {
                        $(this).find('.ctf-photo-hover').fadeIn(200);
                    },
                    mouseleave: function () {
                        $(this).find('.ctf-photo-hover').stop().fadeOut(600);
                    }
                });
/*
                if ($ctfItem.find('.ctf-tweet-media').length || $ctfItem.find('.ctf-twitter-card').length || $ctfItem.find('.ctf-quoted-tweet').length) {
                    $ctfItem.find('.ctf-tweet-text').find('a[href*="https://t.co/"], a[href*="http://t.co/"]').last().remove();
                }
*/
                //Append more masonry items
                if (ctfIsMasonry && $ctf.attr('data-ctf-masonry-init') == 'true') $ctf.find('.ctf-tweets').masonry('appended', $ctfItem);

            }); // End .ctfItem loop

            //Adds a class if the feed is in a narrow column or on mobile so we can make styling adjustments
            ctfNarrowClass($ctf);

            //Change color of retweet icon to match text
            // $ctf.find('.ctf-retweet-icon').css({'background' : $ctf.find('.ctf-tweet-text a').css('color')}); //This doesn't work well if the link color is set to white as the default color of the icon text is also white

            //Change colors of some items to match tweet text
            $ctf.find('.ctf-author-name, .ctf-tweet-date, .ctf-author-screenname, .ctf-twitterlink, .ctf-author-box-link, .ctf-quoted-tweet, .ctf-context a').css('color', $ctf.find('.ctf-tweet-text').css('color'));

            //Set the line height of the twitter link to match the icons so that it's centered vertically
            var $ctfIconFirst = $ctf.find('.ctf-tweet-actions a').first();
            $ctf.find('.ctf-twitterlink').css('line-height', $ctfIconFirst.height() + 'px');

            //Adjust icon number font size to be slightly smaller than the icon size
            if ($ctfIconFirst.length) {
                var ctfIconSize = parseInt($ctfIconFirst.css('font-size').replace('px', ''));
                $ctf.find('.ctf-action-count').css({
                    'display': 'block',
                    'font-size': (ctfIconSize - 4) + 'px',
                    'line-height': $ctfIconFirst.height() + 'px'
                });
            }

            //Header profile pic hover
            $ctf.find('.ctf-header .ctf-header-link').hover(function () {
                $ctf.find('.ctf-header .ctf-header-img-hover').fadeIn(200);
            }, function () {
                $ctf.find('.ctf-header .ctf-header-img-hover').stop().fadeOut(600);
            });

            //Lightbox hide photo function
            jQuery('.ctf_lightbox_action a').unbind().bind('click', function () {
                jQuery(this).parent().find('.ctf_lightbox_tooltip').toggle();
            });

            // very small delay to ensure other code has run, needs to be less than the timeout for masonry feeds
            setTimeout(function() {
                ctfAddTweetMediaMasonry($ctf);
            }, 1);
            // run additional time in case images are not displaying properly
            setTimeout(function() {
                ctfAddTweetMediaMasonry($ctf);
            }, 300);

            //Create masonry layout
            if (ctfIsMasonry) {

                // Conditionally applies the masonry script if the feed is wide enough or
                // if the user chose to keep the masonry style for small devices as well.
                function ctfAddMasonry($ctf) {
                    if ($(window).width() > 780 || $ctf.hasClass('masonry-2-mobile') ) {
                        $ctf.addClass('ctf-masonry');
                        if ($ctf.find('.ctf-item').length) {
                            $ctf.attr('data-ctf-masonry-init', true).find('.ctf-tweets').masonry({itemSelector: '.ctf-item, .ctf-out-of-tweets'});
                        }
                    } else {
                        $ctf.removeClass('ctf-masonry');
                    }
                }

                setTimeout(function () {
                    ctfAddMasonry($ctf);
                }, 2);

                //Reinitiates the masonry layout after images are loaded
                $ctf.find('.ctf-tweet-media img').bind('load', function () {
                    ctfAddMasonry($ctf);
                });

            } // End if( ctfIsMasonry )

            //Add class if feed/col is narrow
            function ctfNarrowClass($ctf) {
                var ctfItemWidth = $ctf.find('.ctf-item').first().width();
                if (ctfItemWidth <= 480) $ctf.addClass('ctf-narrow');
                if (ctfItemWidth <= 320) $ctf.addClass('ctf-super-narrow');
                if (ctfItemWidth > 480) $ctf.removeClass('ctf-narrow ctf-super-narrow');
            }

            // Resizing the window can affect the masonry feed so it is reset on resize
            window.addEventListener('resize', function (event) {
                ctfdelay(function () {
                    ctfNarrowClass($ctf);
                    ctfAddTweetMediaMasonry($ctf);
                    if (ctfIsMasonry) ctfAddMasonry($ctf);
                    ctfCropImages('.ctf-tc-image');
                }, 500);
            });
            //Only runs once resize event is over
            var ctfdelay = (function () {
                var ctftimer = 0;
                return function (ctfcallback, ctfms) {
                    clearTimeout(ctftimer);
                    ctftimer = setTimeout(ctfcallback, ctfms);
                };
            })();


            //Crop the Twitter card images
            ctfCropImages('.ctf-tc-image');

            // Call Custom JS if it exists
            setTimeout(function(){
                if (typeof ctf_custom_js == 'function') ctf_custom_js($);
            }, 100);

        } // end ctfScripts()

        //Masonry
        !function (t) {
            function e() {
            }

            function i(t) {
                function i(e) {
                    e.prototype.option || (e.prototype.option = function (e) {
                        t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                    })
                }

                function o(e, i) {
                    t.fn[e] = function (o) {
                        if ("string" == typeof o) {
                            for (var s = n.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                                var h = this[a], p = t.data(h, e);
                                if (p)if (t.isFunction(p[o]) && "_" !== o.charAt(0)) {
                                    var f = p[o].apply(p, s);
                                    if (void 0 !== f)return f
                                } else r("no such method '" + o + "' for " + e + " instance"); else r("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                            }
                            return this
                        }
                        return this.each(function () {
                            var n = t.data(this, e);
                            n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
                        })
                    }
                }

                if (t) {
                    var r = "undefined" == typeof console ? e : function (t) {
                        console.error(t)
                    };
                    return t.bridget = function (t, e) {
                        i(e), o(t, e)
                    }, t.bridget
                }
            }

            var n = Array.prototype.slice;
            "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
        }(window), function (t) {
            function e(e) {
                var i = t.event;
                return i.target = i.target || i.srcElement || e, i
            }

            var i = document.documentElement, n = function () {
            };
            i.addEventListener ? n = function (t, e, i) {
                t.addEventListener(e, i, !1)
            } : i.attachEvent && (n = function (t, i, n) {
                t[i + n] = n.handleEvent ? function () {
                    var i = e(t);
                    n.handleEvent.call(n, i)
                } : function () {
                    var i = e(t);
                    n.call(t, i)
                }, t.attachEvent("on" + i, t[i + n])
            });
            var o = function () {
            };
            i.removeEventListener ? o = function (t, e, i) {
                t.removeEventListener(e, i, !1)
            } : i.detachEvent && (o = function (t, e, i) {
                t.detachEvent("on" + e, t[e + i]);
                try {
                    delete t[e + i]
                } catch (n) {
                    t[e + i] = void 0
                }
            });
            var r = {bind: n, unbind: o};
            "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
        }(window), function () {
            function t() {
            }

            function e(t, e) {
                for (var i = t.length; i--;)if (t[i].listener === e)return i;
                return -1
            }

            function i(t) {
                return function () {
                    return this[t].apply(this, arguments)
                }
            }

            var n = t.prototype, o = this, r = o.EventEmitter;
            n.getListeners = function (t) {
                var e, i, n = this._getEvents();
                if (t instanceof RegExp) {
                    e = {};
                    for (i in n)n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
                } else e = n[t] || (n[t] = []);
                return e
            }, n.flattenListeners = function (t) {
                var e, i = [];
                for (e = 0; e < t.length; e += 1)i.push(t[e].listener);
                return i
            }, n.getListenersAsObject = function (t) {
                var e, i = this.getListeners(t);
                return i instanceof Array && (e = {}, e[t] = i), e || i
            }, n.addListener = function (t, i) {
                var n, o = this.getListenersAsObject(t), r = "object" == typeof i;
                for (n in o)o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {listener: i, once: !1});
                return this
            }, n.on = i("addListener"), n.addOnceListener = function (t, e) {
                return this.addListener(t, {listener: e, once: !0})
            }, n.once = i("addOnceListener"), n.defineEvent = function (t) {
                return this.getListeners(t), this
            }, n.defineEvents = function (t) {
                for (var e = 0; e < t.length; e += 1)this.defineEvent(t[e]);
                return this
            }, n.removeListener = function (t, i) {
                var n, o, r = this.getListenersAsObject(t);
                for (o in r)r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
                return this
            }, n.off = i("removeListener"), n.addListeners = function (t, e) {
                return this.manipulateListeners(!1, t, e)
            }, n.removeListeners = function (t, e) {
                return this.manipulateListeners(!0, t, e)
            }, n.manipulateListeners = function (t, e, i) {
                var n, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners;
                if ("object" != typeof e || e instanceof RegExp)for (n = i.length; n--;)r.call(this, e, i[n]); else for (n in e)e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
                return this
            }, n.removeEvent = function (t) {
                var e, i = typeof t, n = this._getEvents();
                if ("string" === i)delete n[t]; else if (t instanceof RegExp)for (e in n)n.hasOwnProperty(e) && t.test(e) && delete n[e]; else delete this._events;
                return this
            }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (t, e) {
                var i, n, o, r, s = this.getListenersAsObject(t);
                for (o in s)if (s.hasOwnProperty(o))for (n = s[o].length; n--;)i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
                return this
            }, n.trigger = i("emitEvent"), n.emit = function (t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(t, e)
            }, n.setOnceReturnValue = function (t) {
                return this._onceReturnValue = t, this
            }, n._getOnceReturnValue = function () {
                return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
            }, n._getEvents = function () {
                return this._events || (this._events = {})
            }, t.noConflict = function () {
                return o.EventEmitter = r, t
            }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
                return t
            }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
        }.call(this), function (t) {
            function e(t) {
                if (t) {
                    if ("string" == typeof n[t])return t;
                    t = t.charAt(0).toUpperCase() + t.slice(1);
                    for (var e, o = 0, r = i.length; r > o; o++)if (e = i[o] + t, "string" == typeof n[e])return e
                }
            }

            var i = "Webkit Moz ms Ms O".split(" "), n = document.documentElement.style;
            "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
                return e
            }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
        }(window), function (t) {
            function e(t) {
                var e = parseFloat(t), i = -1 === t.indexOf("%") && !isNaN(e);
                return i && e
            }

            function i() {
            }

            function n() {
                for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = s.length; i > e; e++) {
                    var n = s[e];
                    t[n] = 0
                }
                return t
            }

            function o(i) {
                function o() {
                    if (!d) {
                        d = !0;
                        var n = t.getComputedStyle;
                        if (h = function () {
                                var t = n ? function (t) {
                                    return n(t, null)
                                } : function (t) {
                                    return t.currentStyle
                                };
                                return function (e) {
                                    var i = t(e);
                                    return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                                }
                            }(), p = i("boxSizing")) {
                            var o = document.createElement("div");
                            o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[p] = "border-box";
                            var s = document.body || document.documentElement;
                            s.appendChild(o);
                            var a = h(o);
                            f = 200 === e(a.width), s.removeChild(o)
                        }
                    }
                }

                function a(t) {
                    if (o(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                        var i = h(t);
                        if ("none" === i.display)return n();
                        var r = {};
                        r.width = t.offsetWidth, r.height = t.offsetHeight;
                        for (var a = r.isBorderBox = !(!p || !i[p] || "border-box" !== i[p]), d = 0, l = s.length; l > d; d++) {
                            var c = s[d], m = i[c];
                            m = u(t, m);
                            var y = parseFloat(m);
                            r[c] = isNaN(y) ? 0 : y
                        }
                        var g = r.paddingLeft + r.paddingRight, v = r.paddingTop + r.paddingBottom, E = r.marginLeft + r.marginRight, b = r.marginTop + r.marginBottom, z = r.borderLeftWidth + r.borderRightWidth, _ = r.borderTopWidth + r.borderBottomWidth, x = a && f, L = e(i.width);
                        L !== !1 && (r.width = L + (x ? 0 : g + z));
                        var T = e(i.height);
                        return T !== !1 && (r.height = T + (x ? 0 : v + _)), r.innerWidth = r.width - (g + z), r.innerHeight = r.height - (v + _), r.outerWidth = r.width + E, r.outerHeight = r.height + b, r
                    }
                }

                function u(e, i) {
                    if (t.getComputedStyle || -1 === i.indexOf("%"))return i;
                    var n = e.style, o = n.left, r = e.runtimeStyle, s = r && r.left;
                    return s && (r.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = o, s && (r.left = s), i
                }

                var h, p, f, d = !1;
                return a
            }

            var r = "undefined" == typeof console ? i : function (t) {
                console.error(t)
            }, s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
            "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("desandro-get-style-property")) : t.getSize = o(t.getStyleProperty)
        }(window), function (t) {
            function e(t) {
                "function" == typeof t && (e.isReady ? t() : s.push(t))
            }

            function i(t) {
                var i = "readystatechange" === t.type && "complete" !== r.readyState;
                e.isReady || i || n()
            }

            function n() {
                e.isReady = !0;
                for (var t = 0, i = s.length; i > t; t++) {
                    var n = s[t];
                    n()
                }
            }

            function o(o) {
                return "complete" === r.readyState ? n() : (o.bind(r, "DOMContentLoaded", i), o.bind(r, "readystatechange", i), o.bind(t, "load", i)), e
            }

            var r = t.document, s = [];
            e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
        }(window), function (t) {
            function e(t, e) {
                return t[s](e)
            }

            function i(t) {
                if (!t.parentNode) {
                    var e = document.createDocumentFragment();
                    e.appendChild(t)
                }
            }

            function n(t, e) {
                i(t);
                for (var n = t.parentNode.querySelectorAll(e), o = 0, r = n.length; r > o; o++)if (n[o] === t)return !0;
                return !1
            }

            function o(t, n) {
                return i(t), e(t, n)
            }

            var r, s = function () {
                if (t.matches)return "matches";
                if (t.matchesSelector)return "matchesSelector";
                for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
                    var o = e[i], r = o + "MatchesSelector";
                    if (t[r])return r
                }
            }();
            if (s) {
                var a = document.createElement("div"), u = e(a, "div");
                r = u ? e : o
            } else r = n;
            "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
                return r
            }) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
        }(Element.prototype), function (t, e) {
            "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function (i, n) {
                return e(t, i, n)
            }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
        }(window, function (t, e, i) {
            var n = {};
            n.extend = function (t, e) {
                for (var i in e)t[i] = e[i];
                return t
            }, n.modulo = function (t, e) {
                return (t % e + e) % e
            };
            var o = Object.prototype.toString;
            n.isArray = function (t) {
                return "[object Array]" == o.call(t)
            }, n.makeArray = function (t) {
                var e = [];
                if (n.isArray(t))e = t; else if (t && "number" == typeof t.length)for (var i = 0, o = t.length; o > i; i++)e.push(t[i]); else e.push(t);
                return e
            }, n.indexOf = Array.prototype.indexOf ? function (t, e) {
                return t.indexOf(e)
            } : function (t, e) {
                for (var i = 0, n = t.length; n > i; i++)if (t[i] === e)return i;
                return -1
            }, n.removeFrom = function (t, e) {
                var i = n.indexOf(t, e);
                -1 != i && t.splice(i, 1)
            }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (t) {
                return t instanceof HTMLElement
            } : function (t) {
                return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
            }, n.setText = function () {
                function t(t, i) {
                    e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
                }

                var e;
                return t
            }(), n.getParent = function (t, e) {
                for (; t != document.body;)if (t = t.parentNode, i(t, e))return t
            }, n.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t
            }, n.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, n.filterFindElements = function (t, e) {
                t = n.makeArray(t);
                for (var o = [], r = 0, s = t.length; s > r; r++) {
                    var a = t[r];
                    if (n.isElement(a))if (e) {
                        i(a, e) && o.push(a);
                        for (var u = a.querySelectorAll(e), h = 0, p = u.length; p > h; h++)o.push(u[h])
                    } else o.push(a)
                }
                return o
            }, n.debounceMethod = function (t, e, i) {
                var n = t.prototype[e], o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    t && clearTimeout(t);
                    var e = arguments, r = this;
                    this[o] = setTimeout(function () {
                        n.apply(r, e), delete r[o]
                    }, i || 100)
                }
            }, n.toDashed = function (t) {
                return t.replace(/(.)([A-Z])/g, function (t, e, i) {
                    return e + "-" + i
                }).toLowerCase()
            };
            var r = t.console;
            return n.htmlInit = function (i, o) {
                e(function () {
                    for (var e = n.toDashed(o), s = document.querySelectorAll(".js-" + e), a = "data-" + e + "-options", u = 0, h = s.length; h > u; u++) {
                        var p, f = s[u], d = f.getAttribute(a);
                        try {
                            p = d && JSON.parse(d)
                        } catch (l) {
                            r && r.error("Error parsing " + a + " on " + f.nodeName.toLowerCase() + (f.id ? "#" + f.id : "") + ": " + l);
                            continue
                        }
                        var c = new i(f, p), m = t.jQuery;
                        m && m.data(f, o, c)
                    }
                })
            }, n
        }), function (t, e) {
            "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function (i, n, o, r) {
                return e(t, i, n, o, r)
            }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EventEmitter, t.getSize, t.getStyleProperty, t.fizzyUIUtils))
        }(window, function (t, e, i, n, o) {
            function r(t) {
                for (var e in t)return !1;
                return e = null, !0
            }

            function s(t, e) {
                t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
            }

            var a = t.getComputedStyle, u = a ? function (t) {
                return a(t, null)
            } : function (t) {
                return t.currentStyle
            }, h = n("transition"), p = n("transform"), f = h && p, d = !!n("perspective"), l = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[h], c = ["transform", "transition", "transitionDuration", "transitionProperty"], m = function () {
                for (var t = {}, e = 0, i = c.length; i > e; e++) {
                    var o = c[e], r = n(o);
                    r && r !== o && (t[o] = r)
                }
                return t
            }();
            o.extend(s.prototype, e.prototype), s.prototype._create = function () {
                this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
            }, s.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, s.prototype.getSize = function () {
                this.size = i(this.element)
            }, s.prototype.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var n = m[i] || i;
                    e[n] = t[i]
                }
            }, s.prototype.getPosition = function () {
                var t = u(this.element), e = this.layout.options, i = e.isOriginLeft, n = e.isOriginTop, o = parseInt(t[i ? "left" : "right"], 10), r = parseInt(t[n ? "top" : "bottom"], 10);
                o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r;
                var s = this.layout.size;
                o -= i ? s.paddingLeft : s.paddingRight, r -= n ? s.paddingTop : s.paddingBottom, this.position.x = o, this.position.y = r
            }, s.prototype.layoutPosition = function () {
                var t = this.layout.size, e = this.layout.options, i = {}, n = e.isOriginLeft ? "paddingLeft" : "paddingRight", o = e.isOriginLeft ? "left" : "right", r = e.isOriginLeft ? "right" : "left", s = this.position.x + t[n];
                s = e.percentPosition && !e.isHorizontal ? s / t.width * 100 + "%" : s + "px", i[o] = s, i[r] = "";
                var a = e.isOriginTop ? "paddingTop" : "paddingBottom", u = e.isOriginTop ? "top" : "bottom", h = e.isOriginTop ? "bottom" : "top", p = this.position.y + t[a];
                p = e.percentPosition && e.isHorizontal ? p / t.height * 100 + "%" : p + "px", i[u] = p, i[h] = "", this.css(i), this.emitEvent("layout", [this])
            };
            var y = d ? function (t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)"
            } : function (t, e) {
                return "translate(" + t + "px, " + e + "px)"
            };
            s.prototype._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y;
                if (this.setPosition(t, e), s && !this.isTransitioning)return void this.layoutPosition();
                var a = t - i, u = e - n, h = {}, p = this.layout.options;
                a = p.isOriginLeft ? a : -a, u = p.isOriginTop ? u : -u, h.transform = y(a, u), this.transition({
                    to: h,
                    onTransitionEnd: {transform: this.layoutPosition},
                    isCleaning: !0
                })
            }, s.prototype.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, s.prototype.moveTo = f ? s.prototype._transitionTo : s.prototype.goTo, s.prototype.setPosition = function (t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, s.prototype._nonTransition = function (t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
            }, s.prototype._transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);
                var e = this._transn;
                for (var i in t.onTransitionEnd)e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to)e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var n = this.element.offsetHeight;
                    n = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var g = p && o.toDashed(p) + ",opacity";
            s.prototype.enableTransition = function () {
                this.isTransitioning || (this.css({
                    transitionProperty: g,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(l, this, !1))
            }, s.prototype.transition = s.prototype[h ? "_transition" : "_nonTransition"], s.prototype.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t)
            }, s.prototype.onotransitionend = function (t) {
                this.ontransitionend(t)
            };
            var v = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
            s.prototype.ontransitionend = function (t) {
                if (t.target === this.element) {
                    var e = this._transn, i = v[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[i], r(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                        var n = e.onEnd[i];
                        n.call(this), delete e.onEnd[i]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, s.prototype.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
            }, s.prototype._removeStyles = function (t) {
                var e = {};
                for (var i in t)e[i] = "";
                this.css(e)
            };
            var E = {transitionProperty: "", transitionDuration: ""};
            return s.prototype.removeTransitionStyles = function () {
                this.css(E)
            }, s.prototype.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
            }, s.prototype.remove = function () {
                if (!h || !parseFloat(this.layout.options.transitionDuration))return void this.removeElem();
                var t = this;
                this.once("transitionEnd", function () {
                    t.removeElem()
                }), this.hide()
            }, s.prototype.reveal = function () {
                delete this.isHidden, this.css({display: ""});
                var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
                e[i] = this.onRevealTransitionEnd, this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                })
            }, s.prototype.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal")
            }, s.prototype.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity)return "opacity";
                for (var i in e)return i
            }, s.prototype.hide = function () {
                this.isHidden = !0, this.css({display: ""});
                var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                e[i] = this.onHideTransitionEnd, this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                })
            }, s.prototype.onHideTransitionEnd = function () {
                this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
            }, s.prototype.destroy = function () {
                this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
            }, s
        }), function (t, e) {
            "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r, s) {
                return e(t, i, n, o, r, s)
            }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.eventie, t.EventEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
        }(window, function (t, e, i, n, o, r) {
            function s(t, e) {
                var i = o.getQueryElement(t);
                if (!i)return void(a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
                this.element = i, u && (this.$element = u(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
                var n = ++p;
                this.element.outlayerGUID = n, f[n] = this, this._create(), this.options.isInitLayout && this.layout()
            }

            var a = t.console, u = t.jQuery, h = function () {
            }, p = 0, f = {};
            return s.namespace = "outlayer", s.Item = r, s.defaults = {
                containerStyle: {position: "relative"},
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
                visibleStyle: {opacity: 1, transform: "scale(1)"}
            }, o.extend(s.prototype, i.prototype), s.prototype.option = function (t) {
                o.extend(this.options, t)
            }, s.prototype._create = function () {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, s.prototype.reloadItems = function () {
                this.items = this._itemize(this.element.children)
            }, s.prototype._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0, r = e.length; r > o; o++) {
                    var s = e[o], a = new i(s, this);
                    n.push(a)
                }
                return n
            }, s.prototype._filterFindItemElements = function (t) {
                return o.filterFindElements(t, this.options.itemSelector)
            }, s.prototype.getItemElements = function () {
                for (var t = [], e = 0, i = this.items.length; i > e; e++)t.push(this.items[e].element);
                return t
            }, s.prototype.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, s.prototype._init = s.prototype.layout, s.prototype._resetLayout = function () {
                this.getSize()
            }, s.prototype.getSize = function () {
                this.size = n(this.element)
            }, s.prototype._getMeasurement = function (t, e) {
                var i, r = this.options[t];
                r ? ("string" == typeof r ? i = this.element.querySelector(r) : o.isElement(r) && (i = r), this[t] = i ? n(i)[e] : r) : this[t] = 0
            }, s.prototype.layoutItems = function (t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, s.prototype._getItemsForLayout = function (t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var o = t[i];
                    o.isIgnored || e.push(o)
                }
                return e
            }, s.prototype._layoutItems = function (t, e) {
                if (this._emitCompleteOnItems("layout", t), t && t.length) {
                    for (var i = [], n = 0, o = t.length; o > n; n++) {
                        var r = t[n], s = this._getItemLayoutPosition(r);
                        s.item = r, s.isInstant = e || r.isLayoutInstant, i.push(s)
                    }
                    this._processLayoutQueue(i)
                }
            }, s.prototype._getItemLayoutPosition = function () {
                return {x: 0, y: 0}
            }, s.prototype._processLayoutQueue = function (t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this._positionItem(n.item, n.x, n.y, n.isInstant)
                }
            }, s.prototype._positionItem = function (t, e, i, n) {
                n ? t.goTo(e, i) : t.moveTo(e, i)
            }, s.prototype._postLayout = function () {
                this.resizeContainer()
            }, s.prototype.resizeContainer = function () {
                if (this.options.isResizingContainer) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
                }
            }, s.prototype._getContainerSize = h, s.prototype._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, s.prototype._emitCompleteOnItems = function (t, e) {
                function i() {
                    o.emitEvent(t + "Complete", [e])
                }

                function n() {
                    s++, s === r && i()
                }

                var o = this, r = e.length;
                if (!e || !r)return void i();
                for (var s = 0, a = 0, u = e.length; u > a; a++) {
                    var h = e[a];
                    h.once(t, n)
                }
            }, s.prototype.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, s.prototype.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, s.prototype.stamp = function (t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var n = t[e];
                        this.ignore(n)
                    }
                }
            }, s.prototype.unstamp = function (t) {
                if (t = this._find(t))for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    o.removeFrom(this.stamps, n), this.unignore(n)
                }
            }, s.prototype._find = function (t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)) : void 0
            }, s.prototype._manageStamps = function () {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, s.prototype._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(), e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, s.prototype._manageStamp = h, s.prototype._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(), i = this._boundingRect, o = n(t), r = {
                    left: e.left - i.left - o.marginLeft,
                    top: e.top - i.top - o.marginTop,
                    right: i.right - e.right - o.marginRight,
                    bottom: i.bottom - e.bottom - o.marginBottom
                };
                return r
            }, s.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, s.prototype.bindResize = function () {
                this.isResizeBound || (e.bind(t, "resize", this), this.isResizeBound = !0)
            }, s.prototype.unbindResize = function () {
                this.isResizeBound && e.unbind(t, "resize", this), this.isResizeBound = !1
            }, s.prototype.onresize = function () {
                function t() {
                    e.resize(), delete e.resizeTimeout
                }

                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100)
            }, s.prototype.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, s.prototype.needsResizeLayout = function () {
                var t = n(this.element), e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth
            }, s.prototype.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, s.prototype.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, s.prototype.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, s.prototype.reveal = function (t) {
                this._emitCompleteOnItems("reveal", t);
                for (var e = t && t.length, i = 0; e && e > i; i++) {
                    var n = t[i];
                    n.reveal()
                }
            }, s.prototype.hide = function (t) {
                this._emitCompleteOnItems("hide", t);
                for (var e = t && t.length, i = 0; e && e > i; i++) {
                    var n = t[i];
                    n.hide()
                }
            }, s.prototype.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e)
            }, s.prototype.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e)
            }, s.prototype.getItem = function (t) {
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var n = this.items[e];
                    if (n.element === t)return n
                }
            }, s.prototype.getItems = function (t) {
                t = o.makeArray(t);
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var r = t[i], s = this.getItem(r);
                    s && e.push(s)
                }
                return e
            }, s.prototype.remove = function (t) {
                var e = this.getItems(t);
                if (this._emitCompleteOnItems("remove", e), e && e.length)for (var i = 0, n = e.length; n > i; i++) {
                    var r = e[i];
                    r.remove(), o.removeFrom(this.items, r)
                }
            }, s.prototype.destroy = function () {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var n = this.items[e];
                    n.destroy()
                }
                this.unbindResize();
                var o = this.element.outlayerGUID;
                delete f[o], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
            }, s.data = function (t) {
                t = o.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && f[e]
            }, s.create = function (t, e) {
                function i() {
                    s.apply(this, arguments)
                }

                return Object.create ? i.prototype = Object.create(s.prototype) : o.extend(i.prototype, s.prototype), i.prototype.constructor = i, i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.prototype.settings = {}, i.namespace = t, i.data = s.data, i.Item = function () {
                    r.apply(this, arguments)
                }, i.Item.prototype = new r, o.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
            }, s.Item = r, s
        }), function (t, e) {
            "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils)
        }(window, function (t, e, i) {
            var n = t.create("masonry");
            return n.prototype._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;)this.colYs.push(0);
                this.maxY = 0
            }, n.prototype.measureColumns = function () {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0], i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n, a = s && 1 > s ? "round" : "floor";
                r = Math[a](r), this.cols = Math.max(r, 1)
            }, n.prototype.getContainerWidth = function () {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element, i = e(t);
                this.containerWidth = i && i.innerWidth
            }, n.prototype._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth, n = e && 1 > e ? "round" : "ceil", o = Math[n](t.size.outerWidth / this.columnWidth);
                o = Math.min(o, this.cols);
                for (var r = this._getColGroup(o), s = Math.min.apply(Math, r), a = i.indexOf(r, s), u = {
                    x: this.columnWidth * a,
                    y: s
                }, h = s + t.size.outerHeight, p = this.cols + 1 - r.length, f = 0; p > f; f++)this.colYs[a + f] = h;
                return u
            }, n.prototype._getColGroup = function (t) {
                if (2 > t)return this.colYs;
                for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                    var o = this.colYs.slice(n, n + t);
                    e[n] = Math.max.apply(Math, o)
                }
                return e
            }, n.prototype._manageStamp = function (t) {
                var i = e(t), n = this._getElementOffset(t), o = this.options.isOriginLeft ? n.left : n.right, r = o + i.outerWidth, s = Math.floor(o / this.columnWidth);
                s = Math.max(0, s);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var u = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, h = s; a >= h; h++)this.colYs[h] = Math.max(u, this.colYs[h])
            }, n.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {height: this.maxY};
                return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
            }, n.prototype._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, n.prototype.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t !== this.containerWidth
            }, n
        });

        //Masonry layout for images when more than 1
        function ctfAddTweetMediaMasonry($ctf) {
            var $ctfTweetMediaMasonry = $ctf.find('.ctf-tweet-media-masonry'),
                mediaSelector = '.ctf-tweet-media-masonry a',
                imageCols = $ctf.attr('data-ctfimagecols');
            // change the target elements and selector to all media if image columns not "auto"
            if (imageCols !== 'auto' && !$ctf.hasClass('ctf-narrow')) {
                $ctfTweetMediaMasonry = $ctf.find('.ctf-tweet-media');
                mediaSelector = '.ctf-tweet-media a';
            }


            // only run the code if there are images
            if ($ctfTweetMediaMasonry.length) {
                var mediaWidth = parseInt($ctfTweetMediaMasonry.innerWidth()),
                    maxMedia = $ctf.attr('data-ctfmaxmedia'),
                    columnWidth = 50,
                    autoColumnWidth = false;

                if (typeof imageCols === 'undefined' || imageCols === 'auto') {
                    autoColumnWidth = true;
                } else {
                    columnWidth = 100 / imageCols;
                }

                $ctfTweetMediaMasonry.each(function() {
                    var $this = $(this),
                        numMedia = $this.find('a').length,
                        visibleMedia = Math.min(numMedia,maxMedia);

                    $this.find('a').slice(maxMedia).hide();

                    // auto column width is calculated here
                    if (autoColumnWidth) {
                        if (mediaWidth/visibleMedia > 125) {
                            columnWidth = 100 / visibleMedia;
                        } else {
                            columnWidth = 50;
                        }
                    }

                    $this.find('a').css('max-width', columnWidth-1+'%').css('margin', '0 1% 0 0');
                    setTimeout(function() {
                        $this.masonry({itemSelector: mediaSelector});
                    },100);
                });
            }
        }

        function ctfLoadTweets(lastIDData, shortcodeData, $ctf, $ctfMore, numNeeded, persistentIndex, isInitial) {
            //Display loader
            $ctfMore.addClass('ctf-loading').append('<div class="ctf-loader"></div>');
            $ctfMore.find('.ctf-loader').css('background-color', $ctfMore.css('color'));

            var idsToRemove = [];

            if ($ctf.hasClass('ctf-no-duplicates')) {
                $ctf.find('.ctf-item').each(function () {
                    if ($(this).attr('data-ctfretweetid')) {
                        idsToRemove.push($(this).attr('data-ctfretweetid'));
                    } else {
                        var id = $(this).attr('id');
                        idsToRemove.push(id.replace('ctf_', ''));
                    }
                });
            }

            $.ajax({
                url: ctf.ajax_url,
                type: 'post',
                data: {
                    action: 'ctf_get_more_posts',
                    last_id_data: lastIDData,
                    shortcode_data: shortcodeData,
                    num_needed: numNeeded,
                    ids_to_remove: idsToRemove,
                    persistent_index: persistentIndex
                },
                success: function (data) {
                    if (lastIDData !== '') {

                        // destroys the carousel and removes extra elements, then reapplies carousel
                        if ($ctf.hasClass('ctf-carousel')) {
                            var carouselLoopType = $ctf.attr('data-ctf-loop'),
                                carouselCols = parseInt($ctf.attr('data-ctf-cols')),
                                carouselPos = 0 - carouselCols;


                            if (carouselLoopType === 'none'|| carouselLoopType === 'rewind' ) {
                                carouselPos = $ctf.find('.ctf-owl-item').index($ctf.find('.ctf-owl-item.active').last()) - carouselCols + 1;
                            } else if (carouselLoopType === 'infinite') {

                                carouselPos = ($ctf.find('.ctf-owl-item').index($ctf.find('.ctf-owl-item.cloned').last())-carouselCols + 1) / 2;
                                //If there's 2 cols then stay on the current Tweet, otherwise move to the next Tweet loaded
                                if( carouselCols === 1 ){
                                    carouselPos = carouselPos - 1;
                                } else if( carouselCols === 2 ) {
                                    carouselPos = carouselPos - 2;
                                }
                                carouselPos = Math.ceil(carouselPos);
                            }
                            $ctf.find('.ctf-tweets').ctfOwlCarousel('destroy');
                            $ctf.find('.ctf-carousel-more').remove();

                            if (isInitial) {
                                carouselPos = 0;
                            }
                        }
                        // appends the html echoed out in ctf_get_new_posts() to the last post element
                        if(data.indexOf('<meta charset') == -1) {
                            $ctf.find('.ctf-item').removeClass('ctf-new').last().after(data);
                        }

                        if ($ctf.find('.ctf-out-of-tweets').length) {
                            $ctfMore.hide();

                            //Fade in the no more tweets message
                            $ctf.find('.ctf-out-of-tweets p').eq(0).fadeIn().end().eq(1).delay(500).fadeIn();

                            $ctf.find('.ctf-tweets').after($ctf.find('.ctf-out-of-tweets'));

                            //If carousel then move out of tweets message into last item of carousel
                            if ($ctf.hasClass('ctf-carousel')) {
                                $ctf.find('.ctf-more').after( $ctf.find('.ctf-out-of-tweets') );
                            }
                        }
                    } else {
                        $ctf.find('.ctf-tweets').append(data);
                    }


                    //Remove loader
                    $ctfMore.removeClass('ctf-loading').find('.ctf-loader').remove();

                    //Re-run JS code
                    ctfScripts($ctf);

                    ctfTwitterCardGenerator();

                    if ($ctf.hasClass('ctf-carousel')) {

                        ctfInitCarousel($ctf, carouselPos);

                        // ctfNarrowClass($ctf);
                    } else if ($ctf.hasClass('ctf-autoscroll')) {
                        setTimeout(function () {
                            bindAutoScroll($ctf);
                            scrolled = 0;
                        }, 1500);
                    }
                    setTimeout(function() {
                        ctfAddTweetMediaMasonry($ctf);
                    }, 1000);
                    setTimeout(function() {
                        ctfAddTweetMediaMasonry($ctf);
                    }, 2000);
                }
            }); // ajax call
        }

        // set scrolled globally to avoid triggering load more more than once before
        // tweets are done loading on the page
        var scrolled = 0;

        function bindAutoScroll($ctf) {
            var scrollPosOffset = parseInt($ctf.attr('data-ctfscrolloffset'));

            //Scroll the container if it has a height
            if ($ctf.hasClass('ctf-fixed-height')) {
                $ctf.on('scroll', function () {

                    var yScrollPos = $ctf.scrollTop(),
                        windowSize = $ctf.innerHeight(),
                        bodyHeight = $ctf[0].scrollHeight,
                        triggerDistance = bodyHeight - scrollPosOffset - windowSize;

                    if (yScrollPos > triggerDistance) {
                        $ctf.unbind('scroll');
                        if (scrolled === 0) {
                            scrolled = 1;
                            // check to make sure there are still tweets available
                            if (!$ctf.find('.ctf-out-of-tweets').length) {
                                $ctf.find('.ctf-more').trigger('click');
                            }
                        }
                    }
                })
                //Scrolling the window
            } else {
                $(window).on('scroll', function () {
                    var yScrollPos = window.pageYOffset,
                        windowSize = window.innerHeight,
                        bodyHeight = document.body.offsetHeight,
                        triggerDistance = bodyHeight - scrollPosOffset - windowSize;

                    if (yScrollPos > triggerDistance) {
                        $(window).unbind('scroll');
                        if (scrolled === 0) {
                            scrolled = 1;
                            // check to make sure there are still tweets available
                            if (!$ctf.find('.ctf-out-of-tweets').length) {
                                $ctf.find('.ctf-more').trigger('click');
                            }
                        }
                    }
                });
            }

        }

        $('.ctf-autoscroll').each(function () {
            if(!$(this).hasClass('ctf-carousel')) {
                bindAutoScroll($(this));
            }
        }); // end .ctf each loop

        // Carousel
        !function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"ctf-owl-refresh",loadedClass:"ctf-owl-loaded",loadingClass:"ctf-owl-loading",rtlClass:"ctf-owl-rtl",responsiveClass:"ctf-owl-responsive",dragClass:"ctf-owl-drag",itemClass:"ctf-owl-item",stageClass:"ctf-owl-stage",stageOuterClass:"ctf-owl-stage-outer",grabClass:"ctf-owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.ctfOwlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.ctfOwlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("ctf-owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".ctf-owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"ctf-owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .ctf-owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".ctf-owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".ctf-owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="ctf-owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="ctf-owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="ctf-owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="ctf-owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="ctf-owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".ctf-owl-video-frame").remove(),this._playing.removeClass("ctf-owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="ctf-owl-video-frame">'+c+"</div>").insertAfter(e.find(".ctf-owl-video")),this._playing=e.addClass("ctf-owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("ctf-owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated ctf-owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated ctf-owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated ctf-owl-animated-out ctf-owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
            a.fn.ctfOwlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"ctf-owl-nav",navClass:["ctf-owl-prev","ctf-owl-next"],slideBy:1,dotClass:"ctf-owl-dot",dotsClass:"ctf-owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.ctfOwlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.ctfOwlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);


        // Wrapper function for carousel code
        function ctfInitCarousel($ctf, startPos) {
            var minHeight,
                autoplay = false,
                autoplayTimeout = 5000,
                autoplaySpeed = 1500,
                items = $ctf.attr('data-ctf-cols'),
                itemsMobile = $ctf.attr('data-ctf-mobilecols'),
                pagination = ($ctf.attr('data-ctf-pag') === 'true'),
                arrows = $ctf.attr('data-ctf-arrows'),
                height = $ctf.attr('data-ctf-height'),
                autoHeight = false,
                afterUpdate = false,
                afterInit = ctfShowCarousel,
                lastID = $ctf.find('.ctf-item').last().attr('id'),
                startPosition = startPos,
                minHeight = 100;

            $ctf.find('.ctf-more').attr('data-ctf-last', lastID);
            $ctf.hide();

            if (typeof $ctf.attr('data-ctf-interval') !== 'undefined') {
                autoplayTimeout = parseInt($ctf.attr('data-ctf-interval'));
                autoplay = autoplayTimeout !== '' ? true : false;
            } else {
                autoplay = false;
            }

            var loop = false,
                rewind = false;
            if ($ctf.attr('data-ctf-loop') !== 'none') {
                loop = true;
                if ($ctf.attr('data-ctf-loop') === 'rewind') {
                    rewind = true;
                    loop = false;
                }
            }
            // force single item for autoheight
            if (height === 'auto') {
                autoHeight = true;
                items = 1;
                itemsMobile = 1;
            } else if (height === 'clickexpand') {
                afterUpdate = function () {
                    // delay seems to be needed
                    ctfShowCarousel($ctf);
                    setTimeout(function () {
                        ctfUpdateSize($ctf);
                        ctfClickExpandInit($ctf);
                    }, 750);
                };
                afterInit = function () {
                    // delay seems to be needed
                    ctfShowCarousel($ctf);
                    setTimeout(function () {
                        ctfUpdateSize($ctf);
                        ctfClickExpandInit($ctf);
                    }, 750);
                };

            }

            function ctfShowCarousel() {
                $ctf.show();
                $ctf.find('.ctf-item').each(function () {

                    var $ctfItem = $(this),
                        maxMedia = $ctf.attr('data-ctfmaxmedia'),
                        numMedia = $(this).find('.ctf-tweet-media a').length,
                        visibleMedia = Math.min(numMedia, maxMedia),
                        feedWidth = $ctfItem.innerWidth(),
                        imageCols = $ctf.attr('data-ctfimagecols');

                    // code also used in ctf-scripts
                    if ($ctfItem.find('.ctf-image img').length && $ctfItem.find('.ctf-image img').attr('data-ctfsizes') !== 'full') {
                        $ctfItem.find('.ctf-image img').each(function () {
                            $(this).attr('src', getImageSource(imageCols, $(this).attr('src'), visibleMedia, feedWidth, $(this).attr('data-ctfsizes')));
                        });
                    }

                    // code also used in ctf-scripts
                    var $ctfIconFirst = $ctf.find('.ctf-tweet-actions a').first();
                    $ctf.find('.ctf-twitterlink').css('line-height', $ctfIconFirst.height() + 'px');

                    //Adjust icon number font size to be slightly smaller than the icon size
                    if ($ctfIconFirst.length) {
                        var ctfIconSize = parseInt($ctfIconFirst.css('font-size').replace('px', ''));
                        $ctf.find('.ctf-action-count').css({
                            'display': 'block',
                            'font-size': (ctfIconSize - 4) + 'px',
                            'line-height': $ctfIconFirst.height() + 'px'
                        });
                    }
                });
                setTimeout( function() {
                    var areaLeft = parseInt($ctf.find('.ctf-owl-stage-outer').eq(0).outerHeight()) - parseInt($ctf.find('.ctf-more span').eq(0).outerHeight());
                    //$ctf.find('.ctf-more span').css('padding-top',areaLeft/2 + 'px').css('padding-bottom',areaLeft/2 + 'px');
                    $ctf.find('.ctf-more').css('padding-top',areaLeft/2 + 'px').css('padding-bottom',areaLeft/2 + 'px');
                    if( $ctf.is(":hover")) {
                        $ctf.find('.ctf-owl-nav').show();
                        $ctf.trigger('mouseenter').trigger('mouseover');
                    }
                },1000);
            }

            // function used to set feed height to the smallest post, then user can expand
            function ctfUpdateSize($ctf) {
                minHeight = parseInt($ctf.find('.ctf-owl-item').eq(0).outerHeight());
                $ctf.find('.ctf-owl-item').each(function () {
                    if(!$(this).find('.ctf-more').length) {
                        var thisHeight = parseInt($(this).outerHeight());
                    minHeight = (minHeight <= thisHeight ? minHeight : thisHeight);
                    }
                });
                $ctf.find('.ctf-owl-stage-outer').css('height', minHeight + 'px');
            }

            // gets the click expand functionality going
            function ctfClickExpandInit($ctf) {
                var moreClass = 'ctf-carousel-more',
                    lessClass = 'ctf-carousel-less',
                    moreText = '<i class="fa fa-plus"></i>',
                    lessText = '<i class="fa fa-minus"></i>',
                    moreHtml = '<a href="#" class="' + moreClass + '"><span>' + moreText + '</span></a>',
                    $owlStageOuter = $ctf.find('.ctf-owl-stage-outer');

                $owlStageOuter.after(moreHtml);
                $ctf.find('.ctf-carousel-more').on('click', function (e) {
                    e.preventDefault();
                    var $thisMoreButton = $(this);
                    if ($thisMoreButton.hasClass(lessClass)) {
                        ctfFeedHeightToggle(minHeight, $owlStageOuter);
                        $thisMoreButton.removeClass(lessClass).find('span').html(moreText);

                    } else {
                        // record the heights of all of the loaded posts
                        var elementHeights = $ctf.find('.ctf-owl-item').map(function () {
                                return $(this).height();
                            }).get(),
                            // record the greatest height of the loaded posts
                            maxHeight = Math.max.apply(null, elementHeights);
                        ctfFeedHeightToggle(maxHeight, $owlStageOuter);
                        $thisMoreButton.addClass(lessClass).find('span').html(lessText);
                    }
                });
            }

            // used to resize the feed after certain click events
            function ctfFeedHeightToggle(newHeight, $owlStageOuter ) {
                $owlStageOuter.animate({
                    height: newHeight + 'px'
                }, 400);
            }
            /*
            $ctf.find('.ctf-tweets').append($ctf.find('#ctf-more')).ctfOwlCarousel({
                loop: true
            });
*/

            $ctf.find('.ctf-tweets').append($ctf.find('#ctf-more')).ctfOwlCarousel({
                loop: loop,
                rewind: rewind,
                autoplay: autoplay,
                autoplayTimeout: Math.max(autoplayTimeout,2000),
                autoplaySpeed: false,
                autoplayHoverPause: true,
                nav: true,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                dots: pagination,
                autoHeight: autoHeight,
                items: items,
                responsive: {
                    0: {
                        items: itemsMobile
                    },
                    480: {
                        items: itemsMobile
                    },
                    640: {
                        items: items
                    }
                },
                onUpdate: afterUpdate,
                onInitialize: afterInit,
                startPosition: startPosition
            });

            var $navElementsWrapper = $ctf.find('.ctf-owl-nav');
            if (arrows === 'onhover') {
                $navElementsWrapper.addClass('onhover').hide();
                $ctf.on({
                    mouseenter: function () {
                        $navElementsWrapper.fadeIn();
                    },
                    mouseleave: function () {
                        $navElementsWrapper.fadeOut();
                    }
                });
            } else if (arrows === 'below') {
                var $dots = $ctf.find('.ctf-owl-dots'),
                    $prev = $ctf.find('.ctf-owl-prev'),
                    $next = $ctf.find('.ctf-owl-next'),
                    $nav = $ctf.find('.ctf-owl-nav'),
                    $dot = $ctf.find('.ctf-owl-dot'),
                    widthDots = $dot.length * $dot.innerWidth(),
                    maxWidth = $ctf.innerWidth();

                $prev.after($dots);

                $nav.css('position', 'relative');
                $next.css('position', 'absolute').css('top', '-6px').css('right', Math.max((.5 * $nav.innerWidth() - .5 * (widthDots) - $next.innerWidth() - 6), 0));
                $prev.css('position', 'absolute').css('top', '-6px').css('left', Math.max((.5 * $nav.innerWidth() - .5 * (widthDots) - $prev.innerWidth() - 6), 0));
            } else if (arrows === 'hide') {
                $navElementsWrapper.addClass('hide').hide();
            }


            var ctfItemWidth = $ctf.find('.ctf-item').first().width();
            if (ctfItemWidth <= 480) $ctf.addClass('ctf-narrow');
            if (ctfItemWidth <= 320) $ctf.addClass('ctf-super-narrow');
            if (ctfItemWidth > 480) $ctf.removeClass('ctf-narrow ctf-super-narrow');

        }

        //Loop through each feed on the page
        $('.ctf').each(function () {

            var $ctf = $(this),
                numNeeded = parseInt($ctf.attr('data-ctfneeded'));

            /*
            if ($(this).hasClass('ctf-persistent')) {
                numNeeded = 0;
            }
            */
            ctfScripts($ctf);

            // delay added to prevent strange issue with ajax themes returning the entire page
            setTimeout(function(){
                if(numNeeded > 0){
                    var $ctfMore = $ctf.find('.ctf-more'),
                        lastIDAttr = $ctf.find('.ctf-item').last().attr('id'),
                        lastIDData = lastIDAttr.replace('ctf_', ''),
                        shortcodeData = $ctf.attr('data-ctfshortcode');

                    ctfLoadTweets(lastIDData, shortcodeData , $ctf, $ctfMore, numNeeded, '', true);
                }
                ctfTwitterCardGenerator();
            },500);

            // add carousel if needed
            if ($ctf.hasClass('ctf-carousel')) {
                ctfInitCarousel($ctf, 0);

                //Resize load more button displayed within carousel
                $ctf.find('.ctf-more').css({
                    'padding-top': ( $ctf.find('.ctf-owl-stage-outer').height() - $ctf.find('.ctf-more span').height() - 40 ) / 2,
                    'padding-bottom': ( $ctf.find('.ctf-owl-stage-outer').height() - $ctf.find('.ctf-more span').height() - 40 ) / 2
                });

                // $ctf.find('.ctf-owl-stage').animate();
            }
            // add the load more button and input to simulate a dynamic json file call
            $ctf.find('.ctf-more').on('click', function () {
                // read the json that is in the ctf-shortcode-data that contains all of the shortcode arguments
                var $ctfMore = $(this),
                    lastIDAttr = $ctf.find('.ctf-item').last().attr('id'),
                    lastIDData = lastIDAttr.replace('ctf_', ''),
                    persistentIndex = $ctf.find('.ctf-item').length,
                    shortcodeData = $ctf.attr('data-ctfshortcode');

                if($ctf.hasClass('ctf-carousel')) {
                    lastIDData = $ctf.find('.ctf-more').attr('data-ctf-last').replace('ctf_', '');
                }

                ctfLoadTweets(lastIDData, shortcodeData, $ctf, $ctfMore, 0, persistentIndex, false);
            });
            // try twitter card generator
            ctfTwitterCardGenerator();

            $ctf.find('.ctf-author-box-link p:empty').remove();
        });

        // Twitter Cards
        function ctfTweetLinkRetriever() {
            var urls = [];
            $('.ctf-check-link').each(function(){
                if (!$(this).hasClass('ctf-tc-checked') && !$(this).find('.ctf-quoted-tweet').length) {
                    urls.push($(this).attr('data-ctflinkurl'));
                }
                $(this).addClass('ctf-tc-checked');
            });
            return urls;
        }

        function ctfTwitterCardGenerator() {
            var twitterCardUrls = ctfTweetLinkRetriever();

            if(twitterCardUrls.length > 0){

                jQuery.ajax({
                    url: ctf.ajax_url,
                    type: 'post',
                    data: {
                        action: 'ctf_twitter_cards',
                        ctf_urls: twitterCardUrls
                    },
                    success: function (data){
                        if(data.substring(0,1) !== '<') {
                            var urlObject = jQuery.parseJSON(data);
                            if(urlObject && urlObject.hasOwnProperty('error')){
                                console.log(urlObject['error']);
                            } else {
                                ctfAddTwitterCards(urlObject);
                            }
                        }
                    }
                }); // ajax call

            }
        }

        function ctfAddTwitterCards( tcObj ){
            var $ctfCheckLink = $('.ctf-check-link');
            $ctfCheckLink.each(function(){
                var $self = $(this),
                    link = $self.attr('data-ctflinkurl');

                if(tcObj.hasOwnProperty(link) && !$self.find('.ctf-quoted-tweet').length){

                    //If it's an embedded video then don't show the Twitter card too
                    var youtube = (link.indexOf('youtube.com/watch') > -1) ? true : false,
                        youtu = (link.indexOf('youtu.be') > -1) ? true : false,
                        youtubeembed = (link.indexOf('youtube.com/embed') > -1) ? true : false,
                        vimeo = (link.indexOf('vimeo') > -1) ? true : false,
                        vine = (link.indexOf('vine.co') > -1) ? true : false,
                        soundcloud = (link.indexOf('soundcloud.com') > -1) ? true : false,
                        ctf_video_embed = false;
                    if(youtube || youtu || youtubeembed || vimeo || vine || soundcloud) ctf_video_embed = true;

                    if( (tcObj[link]['twitter:card'] === 'summary_large_image' || tcObj[link]['twitter:card'] === 'summary' || tcObj[link]['twitter:card'] === 'player') && !ctf_video_embed ) {

                        var imgHtml = '',
                            linkdomain = (typeof link !== 'undefined') ? link.replace(/^https?\:\/\//i, "").split('/')[0] : '';

                        if(tcObj[link].hasOwnProperty('twitter:image')) {
                            imgHtml = '<div class="ctf-tc-image"><img src="'+tcObj[link]['twitter:image']+'" alt="'+tcObj[link]['twitter:image:alt']+'"></div>'
                        }

                        $self.find('.ctf-tweet-content').append('<a class="ctf-twitter-card ctf-tc-type-'+tcObj[link]['twitter:card']+'" href="'+link+'" target="_blank" style="color:'+$self.closest('.ctf').find('.ctf-tweet-text').css('color')+'">' +
                            imgHtml +
                            '<div class="ctf-tc-summary-info">' +
                                '<p class="ctf-tc-heading">'+tcObj[link]['twitter:title']+'</p>' +
                                '<p class="ctf-tc-desc">'+tcObj[link]['twitter:description'].substring(0,150)+'</p>' +
                                '<p class="ctf-tc-url">'+linkdomain+'</p>' +
                            '</div>' +
                        '</a>');

                    } else if(tcObj[link]['twitter:card'] === 'amplify') {

                        var ctf_card_html = '',
                            ctfsrc = tcObj[link]['twitter:amplify:media:ctfsrc'],
                            ctfposter = tcObj[link]['twitter:image:src'],
                            ctfTitle = tcObj[link]['twitter:title'];

                        //HTML5 video
                        if( typeof ctfsrc !== 'undefined' ){

                            ctf_card_html += '<div class="ctf-tweet-media">';

                            if( $self.find('.ctf-tweet-content').hasClass('ctf-disable-lightbox') ){
                                ctf_card_html += '<a href="https://twitter.com/statuses/' + $self.attr('id').replace('ctf_','') + '" target="_blank">';
                            } else {
                                ctf_card_html += '<a href="'+ctfposter+'" data-ctf-lightbox="1" data-title="'+$self.find('.ctf-tweet-text').text()+'" data-user="'+$self.find('.ctf-author-box .ctf-author-screenname').text().substr(1)+'" data-name="'+$self.find('.ctf-author-box .ctf-author-name').text()+'" data-id="'+$self.attr('id')+'" data-url="'+$self.find('.ctf-tweet-actions .ctf-twitterlink').attr('href')+'" data-avatar="'+$self.find('.ctf-author-box .ctf-author-avatar img').attr('src')+'" data-date="'+$self.find('.ctf-tweet-meta .ctf-tweet-date').text()+'" data-video="" data-iframe="'+link+'" data-amplify="true" class="ctf-video">' +
                                    '<div class="ctf-photo-hover"></div>';
                            }
                                
                            ctf_card_html += '<img src="'+ctfposter+'" alt="'+ctfTitle+'"></a></div>';
                        }

                        $self.find('.ctf-tweet-content').append(ctf_card_html);

                        //Fade in links on hover for Amplify cards loaded via Ajax
                        $self.find('.ctf-tweet-content:not(.ctf-disable-lightbox) .ctf-tweet-media a').on({
                            mouseenter: function () {
                                $(this).find('.ctf-photo-hover').fadeIn(200);
                            },
                            mouseleave: function () {
                                $(this).find('.ctf-photo-hover').stop().fadeOut(600);
                            }
                        });

                    }

                    //Crop the Twitter card images
                    ctfCropImages('.ctf-tc-image');

                }
                // remove the url from the link if it now has a twitter card or embedded video
                //console.log($self.find('.ctf-tweet-text').text());
                if ($self.find('.ctf-iframe').length || $self.find('.ctf-video').length || $self.find('.ctf-twitter-card').length) {
                    $self.find('.ctf-tweet-text').find('a[href*="https://t.co/"], a[href*="http://t.co/"]').last().remove();
                }
                $self.removeClass('ctf-check-link');
            });
        }


        function ctfCropImages( selector ){
            // https://github.com/karacas/imgLiquid
            var imgLiquid = imgLiquid || {VER: '0.9.944'};
            imgLiquid.bgs_Available = false;
            imgLiquid.bgs_CheckRunned = false;
            imgLiquid.injectCss = selector + ' img {visibility:hidden}';

            !function(i){function t(){if(!imgLiquid.bgs_CheckRunned){imgLiquid.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(imgLiquid.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({imgLiquid:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(h.attr("src")))&&u.css({"background-image":'url("'+encodeURI(h.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,h),u.addClass("imgLiquid_bgSize"),u.addClass("imgLiquid_ready"),l()}function o(){function e(){h.data("imgLiquid_error")||h.data("imgLiquid_loaded")||h.data("imgLiquid_oldProcessed")||(u.is(":visible")&&h[0].complete&&h[0].width>0&&h[0].height>0?(h.data("imgLiquid_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(h.data("oldSrc")&&h.data("oldSrc")!==h.attr("src")){var a=h.clone().removeAttr("style");return a.data("imgLiquid_settings",h.data("imgLiquid_settings")),h.parent().prepend(a),h.remove(),h=a,h[0].width=0,void setTimeout(o,10)}return h.data("imgLiquid_oldProcessed")?void r():(h.data("imgLiquid_oldProcessed",!1),h.data("oldSrc",h.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),h.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),h.on("error",n),h[0].onerror=n,e(),void d())}function d(){(g.responsive||h.data("imgLiquid_oldProcessed"))&&h.data("imgLiquid_settings")&&(g=h.data("imgLiquid_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(d,g.responsiveCheckTime))}function n(){h.data("imgLiquid_error",!0),u.addClass("imgLiquid_error"),g.onItemError&&g.onItemError(t,u,h),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-imgLiquid-fill"),e=u.attr("data-imgLiquid-horizontalAlign"),o=u.attr("data-imgLiquid-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===o||"top"!==o&&"bottom"!==o&&"center"!==o&&-1===o.indexOf("%")||(i.verticalAlign=o)}return imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,o,d,n,s,r,c=0,m=0,f=u.width(),v=u.height();void 0===h.data("owidth")&&h.data("owidth",h[0].width),void 0===h.data("oheight")&&h.data("oheight",h[0].height),g.fill===f/v>=h.data("owidth")/h.data("oheight")?(i="100%",e="auto",a=Math.floor(f),o=Math.floor(f*(h.data("oheight")/h.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(h.data("owidth")/h.data("oheight"))),o=Math.floor(v)),d=g.horizontalAlign.toLowerCase(),s=f-a,"left"===d&&(m=0),"center"===d&&(m=.5*s),"right"===d&&(m=s),-1!==d.indexOf("%")&&(d=parseInt(d.replace("%",""),10),d>0&&(m=s*d*.01)),n=g.verticalAlign.toLowerCase(),r=v-o,"left"===n&&(c=0),"center"===n&&(c=.5*r),"bottom"===n&&(c=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(c=r*n*.01)),g.hardPixels&&(i=a,e=o),h.css({width:i,height:e,"margin-left":Math.floor(m),"margin-top":Math.floor(c)}),h.data("imgLiquid_oldProcessed")||(h.fadeTo(g.fadeInTime,1),h.data("imgLiquid_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("imgLiquid_nobgSize"),u.addClass("imgLiquid_ready")),g.onItemFinish&&g.onItemFinish(t,u,h),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),h=i("img:first",u);return h.length?(h.data("imgLiquid_settings")?(u.removeClass("imgLiquid_error").removeClass("imgLiquid_ready"),g=i.extend({},h.data("imgLiquid_settings"),a.options)):g=i.extend({},a.settings,s()),h.data("imgLiquid_settings",g),g.onItemStart&&g.onItemStart(t,u,h),void(imgLiquid.bgs_Available&&g.useBackgroundSize?e():o())):void n()})}})}(jQuery);

            // Inject css styles ______________________________________________________
            !function () {
                var css = imgLiquid.injectCss,
                head = document.getElementsByTagName('head')[0],
                style = document.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                head.appendChild(style);
            }();
            jQuery( selector ).imgLiquid({fill:true});


            setTimeout(function(){
                $( selector ).each(function(){
                    var $selector = $(this),
                        $container = $selector.closest('.ctf');

                    //If narrow set it to the height of the container
                    $selector.css({'display':'block', 'height': $selector.parent().innerHeight()});

                    //If narrow then set it to the height of the text section as it's used to set the height of the image for the full-width card layout
                    if( $container.hasClass( 'ctf-narrow' ) ) $selector.css({'display':'block', 'height': $selector.siblings('.ctf-tc-summary-info').innerHeight()});

                    //Adjust the masonry layout after Twitter cards are loaded
                    if( $container.hasClass( 'ctf-masonry' ) ) $container.find('.ctf-tweets').masonry({itemSelector: '.ctf-item'});
                });

            }, 200);

        }

        //switch( this.getAttribute('data-res') ) {
        function getImageSource(imageCols, rawImageUrl, numMedia, feedWidth, rawImageSizes ) {

            var newImgUrl = rawImageUrl,
                sizesArr = '',
                imageWidth = feedWidth;
            if (typeof rawImageSizes !== 'undefined') {
                sizesArr = rawImageSizes.split(',');
            } else {
                sizesArr = 'default';
            }
            if (imageCols !== 'auto' && typeof imageCols !== 'undefined') {
                imageWidth = feedWidth / imageCols;
            } else {
                if (feedWidth / numMedia > 125) {
                    imageWidth = (1 / numMedia) * feedWidth;
                } else {
                    imageWidth = .5 * feedWidth;
                }
            }

            if (sizesArr !== 'default') {
                var i = 0;
                while (sizesArr[i] < imageWidth && i < 3) {
                    i++;
                }
                switch (i) {
                    case 1:
                        newImgUrl = rawImageUrl.replace( ':thumb', ':small' );
                        break;
                    case 2:
                        newImgUrl = rawImageUrl.replace( ':thumb', '' );
                        break;
                    case 3:
                        newImgUrl = rawImageUrl.replace( ':thumb', ':large' );
                        break;
                }
            } else {
                newImgUrl = rawImageUrl.replace( ':thumb', '' );
            }

            //console.log(newImgUrl, sizesArr[i], i, imageWidth );

            return newImgUrl;
        }


        /* Lightbox v2.7.1 by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/ - Heavily modified specifically for this plugin */
        (function() {
        var a = jQuery,
            b = function() {
                function a() {
                    this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
                }
                return a.prototype.albumLabel = function(a, b) {
                    return a + " / " + b
                }, a
            }(),
            c = function() {
                function b(a) {
                    this.options = a, this.album = [], this.currentImageIndex = void 0, this.init()
                }
                return b.prototype.init = function() {
                    this.enable(), this.build()
                }, b.prototype.enable = function() {
                    var b = this;
                    a("body").on("click", "a[data-ctf-lightbox]", function(c) {
                        return b.start(a(c.currentTarget)), !1
                    })
                }, b.prototype.build = function() {
                    var b = this;
                    a(""+
                    "<div id='ctf_lightboxOverlay' class='ctf_lightboxOverlay'></div>"+
                    "<div id='ctf_lightbox' class='ctf_lightbox'>"+
                        "<div class='ctf_lb-outerContainer'>"+
                            "<div class='ctf_lb-container'>"+
                                "<video class='ctf_video' src='' poster='' controls autoplay></video>"+
                                "<iframe type='text/html' src='' allowfullscreen frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen scrolling='no'></iframe>"+
                                "<img class='ctf_lb-image' src='' />"+
                                "<div class='ctf_lb-nav'><a class='ctf_lb-prev' href='#' ></a><a class='ctf_lb-next' href='#' ></a></div>"+
                                "<div class='ctf_lb-loader'><a class='ctf_lb-cancel'></a></div>"+
                            "</div>"+
                        "</div>"+
                        "<div class='ctf_lb-dataContainer'>"+
                            "<div class='ctf_lb-data'>"+
                                "<div class='ctf_lb-details'>"+
                                    "<div class='ctf_lb-caption'></div>"+
                                    "<div class='ctf_lb-info'>"+
                                        "<div class='ctf_lb-number'></div>"+
                                        "<div class='ctf_lightbox_action ctf_share'>"+
                                            "<a href='JavaScript:void(0);'><i class='fa fa-share'></i>Share</a>"+
                                            "<p class='ctf_lightbox_tooltip ctf_tooltip_social'>"+
                                                "<a href='' target='_blank' id='ctf_facebook_icon'><i class='fa fa-facebook-square'></i></a><a href='' target='_blank' id='ctf_twitter_icon'><i class='fa fa-twitter'></i></a><a href='' target='_blank' id='ctf_google_icon'><i class='fa fa-google-plus'></i></a><a href='' target='_blank' id='ctf_linkedin_icon'><i class='fa fa-linkedin'></i></a><a href='' id='ctf_pinterest_icon' target='_blank'><i class='fa fa-pinterest'></i></a><a href='' id='ctf_email_icon' target='_blank'><i class='fa fa-envelope'></i></a><i class='fa fa-play fa-rotate-90'></i>"+
                                            "</p>"+
                                        "</div>"+
                                        "<div class='ctf_lightbox_action ctf_instagram'><a href='http://instagram.com/' target='_blank'><i class='fa fa-twitter'></i>Twitter</a></div>"+
                                        "<div id='ctf_mod_link' class='ctf_lightbox_action'>"+
                                            "<a href='JavaScript:void(0);'><i class='fa fa-times'></i>Hide Tweet (admin)</a>"+
                                            "<p id='ctf_mod_box' class='ctf_lightbox_tooltip'>Add this ID to the plugin's <strong>Hide Specific Tweets</strong> setting: <span id='ctf_photo_id'></span><i class='fa fa-play fa-rotate-90'></i></p>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='ctf_lb-closeContainer'><a class='ctf_lb-close'></a></div>"+
                            "</div>"+
                        "</div>"+
                    "</div>").appendTo(a("body")), this.$lightbox = a("#ctf_lightbox"), this.$overlay = a("#ctf_lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".ctf_lb-outerContainer"), this.$container = this.$lightbox.find(".ctf_lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                        return b.end(), !1
                    }), jQuery(document).on('click', function(event, b, c) {
                    //Fade out the lightbox if click anywhere outside of the two elements defined below
                      if (!jQuery(event.target).closest('.ctf_lb-outerContainer').length) {
                        if (!jQuery(event.target).closest('.ctf_lb-dataContainer').length) {
                            //Fade out lightbox
                            jQuery('#ctf_lightboxOverlay, #ctf_lightbox').fadeOut();
                            //Pause video
                            if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                            jQuery('#ctf_lightbox iframe').attr('src', '');
                        }
                      }
                    }), this.$lightbox.hide(),
                    jQuery('#ctf_lightboxOverlay').on("click", function(c) {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return "ctf_lightbox" === a(c.target).attr("id") && b.end(), !1
                    }), this.$lightbox.find(".ctf_lb-prev").on("click", function() {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".ctf_lb-container").on("swiperight", function() {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".ctf_lb-next").on("click", function() {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".ctf_lb-container").on("swipeleft", function() {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".ctf_lb-loader, .ctf_lb-close").on("click", function() {
                        if( ctf_supports_video() ) jQuery('#ctf_lightbox video.ctf_video')[0].pause();
                        jQuery('#ctf_lightbox iframe').attr('src', '');
                        return b.end(), !1
                    })
                }, b.prototype.start = function(b) {
                    function c(a) {
                        d.album.push({
                            link: a.attr("href"),
                            title: a.attr("data-title") || a.attr("title"),
                            video: a.attr("data-video"),
                            iframe: a.attr('data-iframe'),
                            amplify: a.attr('data-amplify'),
                            id: a.attr("data-id"),
                            url: a.attr("data-url"),
                            user: a.attr("data-user"),
                            avatar: a.attr("data-avatar"),
                            name: a.attr("data-name"),
                            date: a.attr("data-date")
                        })
                    }
                    var d = this,
                        e = a(window);
                    e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
                        visibility: "hidden"
                    }), this.sizeOverlay(), this.album = [];
                    var f, g = 0,
                        h = b.attr("data-ctf-lightbox");
                    if (h) {
                        f = a(b.prop("tagName") + '[data-ctf-lightbox="' + h + '"]');
                        for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
                    } else if ("lightbox" === b.attr("rel")) c(b);
                    else {
                        f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
                        for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
                    }
                    var k = e.scrollTop() + this.options.positionFromTop,
                        l = e.scrollLeft();
                    this.$lightbox.css({
                        top: k + "px",
                        left: l + "px"
                    }).fadeIn(this.options.fadeDuration), this.changeImage(g)
                }, b.prototype.changeImage = function(b) {
                    var c = this;
                    this.disableKeyboardNav();
                    var d = this.$lightbox.find(".ctf_lb-image");
                    // console.log(c);
                    // console.log(d);
                    // return;
                    this.$overlay.fadeIn(this.options.fadeDuration), a(".ctf_lb-loader").fadeIn("slow"), this.$lightbox.find(".ctf_lb-image, .ctf_lb-nav, .ctf_lb-prev, .ctf_lb-next, .ctf_lb-dataContainer, .ctf_lb-numbers, .ctf_lb-caption").hide(), this.$outerContainer.addClass("animating");
                    var e = new Image;
                    e.onload = function() {
                        var f, g, h, i, j, k, l;
                        d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20, i = k - c.containerTopPadding - c.containerBottomPadding - 150, (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
                    }, e.src = this.album[b].link, this.currentImageIndex = b
                }, b.prototype.sizeOverlay = function() {
                    this.$overlay.width(a(window).width()).height(a(document).height())
                }, b.prototype.sizeContainer = function(a, b) {
                    function c() {
                        d.$lightbox.find(".ctf_lb-dataContainer").width(g), d.$lightbox.find(".ctf_lb-prevLink").height(h), d.$lightbox.find(".ctf_lb-nextLink").height(h), d.showImage()
                    }
                    var d = this,
                        e = this.$outerContainer.outerWidth(),
                        f = this.$outerContainer.outerHeight(),
                        g = a + this.containerLeftPadding + this.containerRightPadding,
                        h = b + this.containerTopPadding + this.containerBottomPadding;
                    e !== g || f !== h ? this.$outerContainer.animate({
                        width: g,
                        height: h
                    }, this.options.resizeDuration, "swing", function() {
                        c()
                    }) : c()
                }, b.prototype.showImage = function() {
                    this.$lightbox.find(".ctf_lb-loader").hide(), this.$lightbox.find(".ctf_lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                }, b.prototype.updateNav = function() {
                    var a = !1;
                    try {
                        document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                    } catch (b) {}
                    this.$lightbox.find(".ctf_lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".ctf_lb-prev, .ctf_lb-next").css("opacity", "1"), this.$lightbox.find(".ctf_lb-prev, .ctf_lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".ctf_lb-prev").show(), a && this.$lightbox.find(".ctf_lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".ctf_lb-next").show(), a && this.$lightbox.find(".ctf_lb-next").css("opacity", "1"))))
                }, b.prototype.updateDetails = function() {
                    var b = this;

                    /** NEW PHOTO ACTION **/
                    //Switch video when either a new popup or navigating to new one
                    if( ctf_supports_video() ){
                        jQuery('#ctf_lightbox').removeClass('ctf_video_lightbox');
                        if( this.album[this.currentImageIndex].video.length ){
                            jQuery('#ctf_lightbox').addClass('ctf_video_lightbox');
                            jQuery('video.ctf_video').attr({
                                'src' : this.album[this.currentImageIndex].video,
                                'poster' : this.album[this.currentImageIndex].link,
                                'autoplay' : 'true'
                            });
                        }
                    }

                    //If it's an Amplify card then add a class so we can reposition it
                    if( typeof this.album[this.currentImageIndex].amplify !== 'undefined' ) $('#ctf_lightbox').addClass('ctf-amplify');

                    $('#ctf_lightbox').removeClass('ctf-has-iframe');
                    if( this.album[this.currentImageIndex].iframe.length ){
                        var videoURL = this.album[this.currentImageIndex].iframe;
                        $('#ctf_lightbox').removeClass('ctf_video_lightbox').addClass('ctf-has-iframe');

                        //If it's a swf then don't add the autoplay parameter. This is only for embedded videos like YouTube or Vimeo.
                        if( videoURL.indexOf(".swf") > -1 ){
                            var autoplayParam = '';
                        } else {
                            var autoplayParam = '?autoplay=1';
                        }

                        //Add a slight delay before adding the URL else it doesn't autoplay on Firefox
                        var vInt = setTimeout(function() {
                            $('#ctf_lightbox iframe').attr({
                                'src' : videoURL + autoplayParam
                            });
                        }, 500);
                    }

                    jQuery('#ctf_lightbox .ctf_instagram a').attr('href', this.album[this.currentImageIndex].url);
                    jQuery('#ctf_lightbox .ctf_lightbox_tooltip').hide();
                    jQuery('#ctf_lightbox #ctf_mod_box').find('#ctf_photo_id').text( this.album[this.currentImageIndex].id );
                    //Change social media sharing links on the fly
                    jQuery('#ctf_lightbox #ctf_facebook_icon').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + this.album[this.currentImageIndex].url+'&t=Text');
                    jQuery('#ctf_lightbox #ctf_twitter_icon').attr('href', 'https://twitter.com/home?status='+this.album[this.currentImageIndex].url+' ' + this.album[this.currentImageIndex].title);
                    jQuery('#ctf_lightbox #ctf_google_icon').attr('href', 'https://plus.google.com/share?url='+this.album[this.currentImageIndex].url);
                    jQuery('#ctf_lightbox #ctf_linkedin_icon').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url='+this.album[this.currentImageIndex].url+'&title='+this.album[this.currentImageIndex].title);
                    jQuery('#ctf_lightbox #ctf_pinterest_icon').attr('href', 'https://pinterest.com/pin/create/button/?url='+this.album[this.currentImageIndex].url+'&media='+this.album[this.currentImageIndex].link+'&description='+this.album[this.currentImageIndex].title);
                    jQuery('#ctf_lightbox #ctf_email_icon').attr('href', 'mailto:?subject=Instagram&body='+this.album[this.currentImageIndex].title+' '+this.album[this.currentImageIndex].url);

                    //Add links to the caption
                    var ctfLightboxCaption = this.album[this.currentImageIndex].title,
                        hashRegex = /(^|\s)#(\w[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC+0-9]+\w)/gi,
                        tagRegex = /[@]+[A-Za-z0-9-_]+/g;

                    (ctfLightboxCaption) ? ctfLightboxCaption = ctfLinkify(ctfLightboxCaption) : ctfLightboxCaption = '';

                    //Link #hashtags
                    function ctfReplaceHashtags(hash){
                        //Remove white space at beginning of hash
                        var replacementString = jQuery.trim(hash);
                        //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
                        if ( /^#[0-9A-F]{6}$/i.test( replacementString ) ){
                            return replacementString;
                        } else {
                            return ' <a href="https://twitter.com/hashtag/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                        }
                    }
                    ctfLightboxCaption = ctfLightboxCaption.replace( hashRegex , ctfReplaceHashtags );

                    //Link @tags
                    function ctfReplaceTags(tag){
                        var replacementString = jQuery.trim(tag);
                        return ' <a href="https://twitter.com/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                    }
                    ctfLightboxCaption = ctfLightboxCaption.replace( tagRegex , ctfReplaceTags );

                    //Create author and add caption to bottom of lightbox
                    "undefined" != typeof ctfLightboxCaption && "" !== ctfLightboxCaption && this.$lightbox.find(".ctf_lb-caption")
                    .html('<div class="ctf-author-box">' +
                        '<div class="ctf-author-box-link" target="_blank">' +
                            '<a href="https://twitter.com/'+this.album[this.currentImageIndex].user+'" class="ctf-author-avatar" target="_blank" style="">' +
                                '<img src="'+this.album[this.currentImageIndex].avatar+'" width="48" height="48">' +
                            '</a>' +
                            '<a href="https://twitter.com/'+this.album[this.currentImageIndex].user+'" target="_blank" class="ctf-author-name">'+this.album[this.currentImageIndex].name+'</a>' +
                            '<a href="https://twitter.com/'+this.album[this.currentImageIndex].user+'" class="ctf-author-screenname" target="_blank">@'+this.album[this.currentImageIndex].user+'</a>' +
                            '<span class="ctf-screename-sep">·</span>' +
                            '<div class="ctf-tweet-meta">' +
                                '<a href="https://twitter.com/statuses/'+this.album[this.currentImageIndex].id+'" class="ctf-tweet-date" target="_blank">'+this.album[this.currentImageIndex].date+'</a>' +
                            '</div>' +
                        '</div> <!-- end .ctf-author-box-link -->' +
                    '</div><div class="ctf-caption-text">' + ctfLightboxCaption + '</div>')
                    .fadeIn("fast"), this.$lightbox.find(".ctf_lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast"), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".ctf_lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                        return b.sizeOverlay()
                    })

                }, b.prototype.preloadNeighboringImages = function() {
                    if (this.album.length > this.currentImageIndex + 1) {
                        var a = new Image;
                        a.src = this.album[this.currentImageIndex + 1].link
                    }
                    if (this.currentImageIndex > 0) {
                        var b = new Image;
                        b.src = this.album[this.currentImageIndex - 1].link
                    }
                }, b.prototype.enableKeyboardNav = function() {
                    a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
                }, b.prototype.disableKeyboardNav = function() {
                    a(document).off(".keyboard")
                }, b.prototype.keyboardAction = function(a) {
                    
                  var KEYCODE_ESC        = 27;
                  var KEYCODE_LEFTARROW  = 37;
                  var KEYCODE_RIGHTARROW = 39;

                  var keycode = event.keyCode;
                  var key     = String.fromCharCode(keycode).toLowerCase();
                  if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                    if( ctf_supports_video() ) $('#ctf_lightbox video.ctf_video')[0].pause();
                  $('#ctf_lightbox iframe').attr('src', '');
                    this.end();
                  } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                    if (this.currentImageIndex !== 0) {
                      this.changeImage(this.currentImageIndex - 1);
                    } else if (this.options.wrapAround && this.album.length > 1) {
                      this.changeImage(this.album.length - 1);
                    }

                    if( ctf_supports_video() ) $('#ctf_lightbox video.ctf_video')[0].pause();
                    $('#ctf_lightbox iframe').attr('src', '');

                  } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                    if (this.currentImageIndex !== this.album.length - 1) {
                      this.changeImage(this.currentImageIndex + 1);
                    } else if (this.options.wrapAround && this.album.length > 1) {
                      this.changeImage(0);
                    }

                    if( ctf_supports_video() ) $('#ctf_lightbox video.ctf_video')[0].pause();
                    jQuery('#ctf_lightbox iframe').attr('src', '');

                  }

                }, b.prototype.end = function() {
                    this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
                        visibility: "visible"
                    })
                }, b
            }();
        a(function() {
            {
                var a = new b;
                new c(a)

                //Lightbox hide photo function
            $('.ctf_lightbox_action a').unbind().bind('click', function(){
                $(this).parent().find('.ctf_lightbox_tooltip').toggle();
            });
            }
        })
        }).call(this);
        //Checks whether browser support HTML5 video element
        function ctf_supports_video() {
          return !!document.createElement('video').canPlayType;
        }

    })(jQuery);

} //End ctf_js_exists check