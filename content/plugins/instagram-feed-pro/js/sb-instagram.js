var sbi_js_exists = (typeof sbi_js_exists !== 'undefined') ? true : false;
if(!sbi_js_exists){

    "function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
    (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.sbi_owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.sbi_owl)a.sbi_owl.hasOwnProperty(d)&&(e+=a.sbi_owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
        (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("sbi_owl-originalStyles",this.$elem.attr("style"));this.$elem.data("sbi_owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
        this.wrapItems();this.$sbi_owlItems=this.$elem.find(".sbi_owl-item");this.$sbi_owlWrapper=this.$elem.find(".sbi_owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.sbi_owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
    (this.options.autoPlay=5E3);this.play();this.$elem.find(".sbi_owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
        [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
        g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="sbi_owl-wrapper">').wrap('<div class="sbi_owl-item"></div>');this.$elem.find(".sbi_owl-wrapper").wrap('<div class="sbi_owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".sbi_owl-wrapper-outer");this.$elem.css("display","block")},
        baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
            !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
        a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
        !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
            this,b=0,e=a.itemsAmount-a.options.items;a.$sbi_owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("sbi_owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("sbi_owl-roundPages",b)})},appendWrapperSizes:function(){this.$sbi_owlWrapper.css({width:this.$sbi_owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
            this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$sbi_owlItems[e]),
            c=c.data("sbi_owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.sbi_owlControls=f('<div class="sbi_owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="sbi_owl-buttons"/>');a.sbi_owlControls.append(b);a.buttonPrev=
            f("<div/>",{"class":"sbi_owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"sbi_owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.sbi_owlControls mousedown.sbi_owlControls",'div[class^="sbi_owl"]',function(a){a.preventDefault()});b.on("touchend.sbi_owlControls mouseup.sbi_owlControls",'div[class^="sbi_owl"]',function(b){b.preventDefault();f(this).hasClass("sbi_owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
            f('<div class="sbi_owl-pagination"/>');a.sbi_owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.sbi_owlControls mouseup.sbi_owlControls",".sbi_owl-page",function(b){b.preventDefault();Number(f(this).data("sbi_owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("sbi_owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
        (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"sbi_owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"sbi_owl-numbers":""}),d.append(g),d.data("sbi_owl-page",b===c?e:c),d.data("sbi_owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".sbi_owl-page").each(function(){f(this).data("sbi_owl-roundPages")===
        f(a.$sbi_owlItems[a.currentItem]).data("sbi_owl-roundPages")&&(a.paginationWrapper.find(".sbi_owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
        this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.sbi_owlControls&&(this.options.items>=this.itemsAmount?this.sbi_owlControls.hide():this.sbi_owlControls.show())},destroyControls:function(){this.sbi_owlControls&&this.sbi_owlControls.remove()},next:function(a){if(this.isTransition)return!1;
            this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
            this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.sbi_owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
            !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
            c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
            this.sbi_owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.sbi_owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
        checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$sbi_owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$sbi_owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$sbi_owlWrapper.css(this.addCssSpeed(a))},
        addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
        a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$sbi_owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$sbi_owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$sbi_owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.sbi_owl mousedown.sbi_owl","touchmove.sbi_owl mousemove.sbi_owl","touchend.sbi_owl touchcancel.sbi_owl mouseup.sbi_owl"]:
            !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.sbi_owl","touchmove.sbi_owl","touchend.sbi_owl touchcancel.sbi_owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.sbi_owl","mousemove.sbi_owl","mouseup.sbi_owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.sbi_owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
        gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
            "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.sbi_owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
            function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$sbi_owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.sbi_owl.dragDirection="left":d.sbi_owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
                a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".sbi_owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
                !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$sbi_owlWrapper.hasClass("grabbing")||d.$sbi_owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
            a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
            (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("sbi_owl.next",function(){a.next()});a.$elem.on("sbi_owl.prev",function(){a.prev()});a.$elem.on("sbi_owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("sbi_owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("sbi_owl.goTo",function(b,e){a.goTo(e)});
            a.$elem.on("sbi_owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$sbi_owlItems[a]),"loaded"!==b.data("sbi_owl-loaded")&&(e=b.data("sbi_owl-item"),c=b.find(".lazysbi_owl"),"string"!==typeof c.data("src")?
            b.data("sbi_owl-loaded","loaded"):(void 0===b.data("sbi_owl-loaded")&&(c.hide(),b.addClass("loading").data("sbi_owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("sbi_owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
            [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$sbi_owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
            100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$sbi_owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$sbi_owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$sbi_owlItems[a]).addClass("active");
            this.sbi_owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="sbi_owl-"+a+"-out";this.inClass="sbi_owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$sbi_owlItems.eq(a.currentItem),d=a.$sbi_owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$sbi_owlWrapper.addClass("sbi_owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
        "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$sbi_owlWrapper.removeClass("sbi_owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},sbi_owlStatus:function(){this.sbi_owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,sbi_owlItems:this.$sbi_owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".sbi_owl sbi_owl mousedown.disableTextSelect");
            f(k).off(".sbi_owl sbi_owl"); f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$sbi_owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.sbi_owlControls&&this.sbi_owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("sbi_owl-originalStyles")||"").attr("class",this.$elem.data("sbi_owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
            a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.sbi_owlCarousel=function(a){return this.each(function(){if(!0===
        f(this).data("sbi_owl-init"))return!1;f(this).data("sbi_owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"sbi_owlCarousel",b)})};f.fn.sbi_owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
        responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"sbi_owl-carousel",theme:"sbi_owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

    /* JavaScript Linkify - v0.3 - 6/27/2009 - http://benalman.com/projects/javascript-linkify/ */
    window.sbiLinkify=(function(){var k="[a-z\\d.-]+://",h="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",c="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",n="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",f="(?:"+c+n+"|"+h+")",o="(?:[;/][^#?<>\\s]*)?",e="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",d="\\b"+k+"[^<>\\s]+",a="\\b"+f+o+e+"(?!\\w)",m="mailto:",j=f,l=new RegExp("(?:"+d+"|"+a+"|"+j+")","ig"),g=new RegExp("^"+k,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},i={callback:function(q,p){return p?'<a href="'+p+'" title="'+p+'" target="_blank">'+q+"</a>":q},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(u,z){z=z||{};var w,v,A,p,x="",t=[],s,E,C,y,q,D,B,r;for(v in i){if(z[v]===undefined){z[v]=i[v]}}while(w=l.exec(u)){A=w[0];E=l.lastIndex;C=E-A.length;if(/[\/:]/.test(u.charAt(C-1))){continue}do{y=A;r=A.substr(-1);B=b[r];if(B){q=A.match(new RegExp("\\"+B+"(?!$)","g"));D=A.match(new RegExp("\\"+r,"g"));if((q?q.length:0)<(D?D.length:0)){A=A.substr(0,A.length-1);E--}}if(z.punct_regexp){A=A.replace(z.punct_regexp,function(F){E-=F.length;return""})}}while(A.length&&A!==y);p=A;if(!g.test(p)){p=(p.indexOf("@")!==-1?(!p.indexOf(m)?"":m):!p.indexOf("irc.")?"irc://":!p.indexOf("ftp.")?"ftp://":"http://")+p}if(s!=C){t.push([u.slice(s,C)]);s=E}t.push([A,p])}t.push([u.substr(s)]);for(v=0;v<t.length;v++){x+=z.callback.apply(window,t[v])}return x||u}})();

    //Shim for "fixing" IE's lack of support (IE < 9) for applying slice on host objects like NamedNodeMap, NodeList, and HTMLCollection) https://github.com/stevenschobert/instafeed.js/issues/84
    (function(){"use strict";var e=Array.prototype.slice;try{e.call(document.documentElement)}catch(t){Array.prototype.slice=function(t,n){n=typeof n!=="undefined"?n:this.length;if(Object.prototype.toString.call(this)==="[object Array]"){return e.call(this,t,n)}var r,i=[],s,o=this.length;var u=t||0;u=u>=0?u:o+u;var a=n?n:o;if(n<0){a=o+n}s=a-u;if(s>0){i=new Array(s);if(this.charAt){for(r=0;r<s;r++){i[r]=this.charAt(u+r)}}else{for(r=0;r<s;r++){i[r]=this[u+r]}}}return i}}})()

    //IE8 also doesn't offer the .bind() method triggered by the 'sortBy' property. Copy and paste the polyfill offered here:
    if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i}}

    /*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
    (function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[];
        if (typeof e.event.props !== 'undefined') {
            var f=e.event.props.concat(a);
        }
        var l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;
        e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this)});

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
                    a("body").on("click", "a[data-lightbox-sbi]", function(c) {
                        return b.start(a(c.currentTarget)), !1
                    })
                }, b.prototype.build = function() {
                    var b = this,
                        sbLbCarouselDestroy = function() {
                            jQuery('#sbi_lightbox .sbi_lb_lightbox-image').remove();
                            if (jQuery('#sbi_lightbox .sbi_owl-carousel').length)  {
                                if( jQuery('#sbi_lightbox .sbi_owl-carousel').data('sbi_owlCarousel') ) jQuery('#sbi_lightbox .sbi_owl-carousel').data('sbi_owlCarousel').destroy();
                                jQuery('#sbi_lightbox .sbi_owl-item').remove();
                            }
                            jQuery('#sbi_lightbox').find('video').remove();
                            jQuery('.sbi_lb-container').prepend("<video class='sbi_video' src='' poster='' controls></video>");
                        };
                    a("<div id='sbi_lightboxOverlay' class='sbi_lightboxOverlay'></div>" +
                        "<div id='sbi_lightbox' class='sbi_lightbox'>" +
                        "<div class='sbi_lb-outerContainer'>" +
                        "<div class='sbi_lb-nav'><a class='sbi_lb-prev' href='#' ><span></span></a><a class='sbi_lb-next' href='#' ><span></span></a></div>" +
                        "<div class='sbi_lb-container-wrapper'>" +
                        "<div class='sbi_lb-container'><video class='sbi_video' src='' poster='' controls></video>" +
                        "<div class='sbi_lb-image-wrap-outer'>" +
                        "<div class='sbi_lb-image-wrap'>" +
                        "<img class='sbi_lb-image' src='' />" +
                        "</div>" +
                        "</div>" +
                        "<div class='sbi_lb-loader'><span class='fa-spin'></span></div>" +
                        "</div>" +
                        "<div class='sbi_lb-dataContainer'>" +
                        "<div class='sbi_lb-data'>" +
                        "<div class='sbi_lb-details'>" +
                        "<span class='sbi_lb-caption'></span>" +
                        "<span class='sbi_lb-number'></span>" +
                        "<div class='sbi_lightbox_action sbi_share'><a href='JavaScript:void(0);'><i class='fa fa-share'></i>Share</a><p class='sbi_lightbox_tooltip sbi_tooltip_social'><a href='' target='_blank' id='sbi_facebook_icon'><i class='fa fa-facebook-square'></i></a><a href='' target='_blank' id='sbi_twitter_icon'><i class='fa fa-twitter'></i></a><a href='' target='_blank' id='sbi_google_icon'><i class='fa fa-google-plus'></i></a><a href='' target='_blank' id='sbi_linkedin_icon'><i class='fa fa-linkedin'></i></a><a href='' id='sbi_pinterest_icon' target='_blank'><i class='fa fa-pinterest'></i></a><a href='' id='sbi_email_icon' target='_blank'><i class='fa fa-envelope'></i></a><i class='fa fa-play fa-rotate-90'></i></p></div><div class='sbi_lightbox_action sbi_instagram'><a href='https://instagram.com/' target='_blank'><i class='fa fa-instagram'></i>Instagram</a></div>" +
                        "<div id='sbi_mod_link' class='sbi_lightbox_action'><a href='JavaScript:void(0);'><i class='fa fa-times'></i>Hide photo (admin)</a><p id='sbi_mod_box' class='sbi_lightbox_tooltip'>Add this ID to the plugin's <strong>Hide Photos</strong> setting: <span id='sbi_photo_id'></span><i class='fa fa-play fa-rotate-90'></i></p></div></div><div class='sbi_lb-closeContainer'><a class='sbi_lb-close'><i class='fa fa-times'></i></a></div></div></div></div>").appendTo(a("body")), this.$lightbox = a("#sbi_lightbox"), this.$overlay = a("#sbi_lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".sbi_lb-outerContainer"), this.$container = this.$lightbox.find(".sbi_lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                        return b.end(), !1
                    }), jQuery(document).on('click', function(event, b, c) {
                        //Fade out the lightbox if click anywhere outside of the two elements defined below
                        if (!jQuery(event.target).closest('.sbi_lb-outerContainer').length) {
                            if (!jQuery(event.target).closest('.sbi_lb-dataContainer').length) {
                                //Fade out lightbox
                                jQuery('#sbi_lightboxOverlay, #sbi_lightbox').fadeOut();
                                //Pause video
                                if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                                sbLbCarouselDestroy();
                            }
                        }
                    }), this.$lightbox.hide(),
                        jQuery('#sbi_lightboxOverlay').on("click", function(c) {
                            sbLbCarouselDestroy();
                            if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                            return "sbi_lightbox" === a(c.target).attr("id") && b.end(), !1
                        }), this.$lightbox.find(".sbi_lb-prev").on("click", function() {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".sbi_lb-container").on("swiperight", function() {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".sbi_lb-next").on("click", function() {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".sbi_lb-container").on("swipeleft", function() {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".sbi_lb-loader, .sbi_lb-close").on("click", function() {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        return b.end(), !1
                    })
                }, b.prototype.start = function(b) {
                    function c(a) {

                        //Get the options for this feed
                        var sbiFeedOptions = a.closest('.sbi').attr('data-options');
                        sbiFeedOptions = jQuery.parseJSON(sbiFeedOptions);
                        
                        var carouselData = -1;
                        if(a.attr("data-carousel").length > 1) carouselData = jQuery.parseJSON(a.attr("data-carousel"));
                        if (!carouselData) {
                            carouselData = {};
                        }

                        d.album.push({
                            link: a.attr("href"),
                            title: a.attr("data-title") || a.attr("title"),
                            video: a.attr("data-video"),
                            id: a.attr("data-id"),
                            url: a.attr("data-url"),
                            user: a.attr("data-user"),
                            avatar: a.attr("data-avatar"),
                            lightboxcomments: sbiFeedOptions.lightboxcomments,
                            numcomments: sbiFeedOptions.numcomments,
                            carousel: carouselData
                        });

                    }
                    var d = this,
                        e = a(window);
                    e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
                        visibility: "hidden"
                    }), this.sizeOverlay(), this.album = [];
                    var f, g = 0,
                        h = b.attr("data-lightbox-sbi");
                    if (h) {
                        f = a(b.prop("tagName") + '[data-lightbox-sbi="' + h + '"]');
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
                    var d = this.$lightbox.find(".sbi_lb-image");
                    this.$overlay.fadeIn(this.options.fadeDuration), a(".sbi_lb-loader").fadeIn("slow"), this.$lightbox.find(".sbi_lb-image, .sbi_lb-nav, .sbi_lb-prev, .sbi_lb-next, .sbi_lb-dataContainer, .sbi_lb-numbers, .sbi_lb-caption").hide(), this.$outerContainer.addClass("animating");
                    var e = new Image;
                    e.onload = function() {

                        //If this feed has lightbox comments enabled then add room for the sidebar
                        var sbi_lb_comments_width = 0,
                            sbiNavArrowsWidth = 0;
                        if((jQuery('.sbi').attr('data-sbi-lb-comments') === 'true') && window.innerWidth > 640) {
                            sbi_lb_comments_width = 300;
                        }
                        if(window.innerWidth < (740 + sbi_lb_comments_width) && window.innerWidth > 640) {
                            sbiNavArrowsWidth = 100;
                        }

                            var f, g, h, i, j, k, l;
                        d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20 - sbi_lb_comments_width - sbiNavArrowsWidth, i = k - c.containerTopPadding - c.containerBottomPadding - 150, (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
                    }, e.src = this.album[b].link, this.currentImageIndex = b
                }, b.prototype.sizeOverlay = function() {
                    this.$overlay.width(a(window).width()).height(a(document).height())
                }, b.prototype.sizeContainer = function(a, b) {
                    function c() {
                        d.$lightbox.find(".sbi_lb-dataContainer").width(g), d.$lightbox.find(".sbi_lb-prevLink").height(h), d.$lightbox.find(".sbi_lb-nextLink").height(h), d.showImage()
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
                    this.$lightbox.find(".sbi_lb-loader").hide(), this.$lightbox.find(".sbi_lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                }, b.prototype.updateNav = function() {
                    var a = !1;
                    try {
                        document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                    } catch (b) {}
                    this.$lightbox.find(".sbi_lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".sbi_lb-prev, .sbi_lb-next").css("opacity", "1"), this.$lightbox.find(".sbi_lb-prev, .sbi_lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".sbi_lb-prev").show(), a && this.$lightbox.find(".sbi_lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".sbi_lb-next").show(), a && this.$lightbox.find(".sbi_lb-next").css("opacity", "1"))))
                }, b.prototype.updateDetails = function() {
                    var b = this;
                    /** NEW PHOTO ACTION **/
                        //Switch video when either a new popup or navigating to new one

                    if( sbi_supports_video() ){
                        jQuery('#sbi_lightbox').removeClass('sbi_video_lightbox');
                        if( this.album[this.currentImageIndex].video.length ){

                            jQuery('#sbi_lightbox').addClass('sbi_video_lightbox');
                            jQuery('.sbi_video').attr({
                                'src' : this.album[this.currentImageIndex].video,
                                'poster' : this.album[this.currentImageIndex].link,
                                'autoplay' : 'true'
                            });
                        }
                    }

                    jQuery('.sbi_video').css('opacity','0');
                    jQuery('#sbi_lightbox .sbi_instagram a').attr('href', this.album[this.currentImageIndex].url);
                    jQuery('#sbi_lightbox .sbi_lightbox_tooltip').hide();
                    jQuery('#sbi_lightbox #sbi_mod_box').find('#sbi_photo_id').text( this.album[this.currentImageIndex].id );
                    //Change social media sharing links on the fly
                    jQuery('#sbi_lightbox #sbi_facebook_icon').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + this.album[this.currentImageIndex].url+'&t=Text');
                    jQuery('#sbi_lightbox #sbi_twitter_icon').attr('href', 'https://twitter.com/home?status='+this.album[this.currentImageIndex].url+' ' + this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_google_icon').attr('href', 'https://plus.google.com/share?url='+this.album[this.currentImageIndex].url);
                    jQuery('#sbi_lightbox #sbi_linkedin_icon').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url='+this.album[this.currentImageIndex].url+'&title='+this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_pinterest_icon').attr('href', 'https://pinterest.com/pin/create/button/?url='+this.album[this.currentImageIndex].url+'&media='+this.album[this.currentImageIndex].link+'&description='+this.album[this.currentImageIndex].title);
                    jQuery('#sbi_lightbox #sbi_email_icon').attr('href', 'mailto:?subject=Instagram&body='+this.album[this.currentImageIndex].title+' '+this.album[this.currentImageIndex].url);
                    jQuery('.sbi_lb-container-wrapper').find('.fa-clone').remove();

                    // carousel in lightbox
                    if( this.album[this.currentImageIndex].carousel !== '' && typeof this.album[this.currentImageIndex].carousel[0] !== 'undefined' ) {
                        var wrapEl = jQuery('.sbi_lb-image-wrap'),
                            styles = jQuery('.sbi_lb-image').attr('style') + 'opacity: 1 !important',
                            thisPoster = this.album[this.currentImageIndex].link,
                            thisStartsWithVideo = (this.album[this.currentImageIndex].carousel[0].type == 'video'),
                            thisVideoUrl = '';

                        jQuery.each(this.album[this.currentImageIndex].carousel,function(index,value) {
                            if (index > 0) {
                                if (value.type === 'image') {
                                    wrapEl.append('<img class="sbi_lb-image sbi_lb_lightbox-image" src="'+value.media+'" style="'+styles+'" />');
                                } else if (sbi_supports_video() && value.type === 'video') {
                                    wrapEl.append( '<video class="sbi_video sbi_lb_lightbox-image sbi_lb_lightbox-carousel-video added" src="'+value.media+'" style="'+styles+'" poster="'+thisPoster+'" controls="" autoplay="autoplay"></video>');
                                }
                            }
                        });
                        jQuery('.sbi_lb-image-wrap-outer').prepend('<i class="fa fa-clone sbi_lightbox_carousel_icon" aria-hidden="true"></i>');

                        wrapEl.sbi_owlCarousel({
                            items: 1,
                            navigation: true,
                            navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
                            pagination: true,
                            autoPlay: false,
                            stopOnHover: true,
                            itemsDesktop: 1,
                            itemsDesktopSmall: 1,
                            itemsTablet: 1,
                            itemsTabletSmall: 1,
                            itemsMobile: 1,
                            afterInit:function(el) {
                                if(thisStartsWithVideo) {
                                    jQuery('.sbi_lb-image-wrap').find('.sbi_owl-item').first().find('img').before( jQuery('#sbi_lightbox .sbi_video').first() );
                                    jQuery('#sbi_lightbox .sbi_video').first().get(0).play();
                                }

                            },
                            afterAction:function(el) {

                                var $owlCarousel = jQuery(el).closest('.sbi_owl-carousel'),
                                $listItem = $owlCarousel.find('.sbi_owl-page.active'),
                                currentActiveIndex = $owlCarousel.find('.sbi_owl-page').index($listItem),
                                $maybeVideo = $owlCarousel.find('.sbi_owl-item:eq('+currentActiveIndex+')').find('video');

                                if($owlCarousel.find('video').length) {
                                    $owlCarousel.find('video').each(function() {
                                        jQuery(this).get(0).pause();
                                    });
                                }

                                if ($maybeVideo.length) {
                                    $maybeVideo.get(0).play();
                                }

                            }
                        });

                        var $navElementsWrapper = wrapEl.find('.sbi_owl-buttons');
                        if (window.width > 640) {
                            $navElementsWrapper.addClass('onhover').hide();
                            wrapEl.on({
                                mouseenter: function () {
                                    $navElementsWrapper.fadeIn();
                                },
                                mouseleave: function () {
                                    $navElementsWrapper.fadeOut();
                                }
                            });
                        }

                    }
                    setTimeout(function(){
                        jQuery('.sbi_video').css('opacity','1');
                    },500);
                    //start by removing any existing comments
                    jQuery('.sbi_lb-commentBox').remove();
                    // check to see if comments are enabled for this feed
                    if((this.album[this.currentImageIndex].lightboxcomments === 'true' || this.album[this.currentImageIndex].lightboxcomments === true) && this.album[this.currentImageIndex].numcomments > 0) {
                        var sbiComments = {
                            postID: '',
                            maxNumComments: this.album[this.currentImageIndex].numcomments,
                            disableCache: (this.album[this.currentImageIndex].disablecache || this.album[this.currentImageIndex].disablecache === 'true'),
                            numCommentsOnPage: parseInt(jQuery('#'+this.album[this.currentImageIndex].id).find('.sbi_comments').text().replace(',', '')), // number of comments for this specific post, grabbed from feed html
                            commentObj: [],

                            getRemoteComments: function (missing) {
                                var cleanId = this.postID.replace('sbi_',''),
                                    at = sb_instagram_js_options.sb_instagram_at,
                                    url = 'https://api.instagram.com/v1/media/' + cleanId + '/comments?access_token=' + at;
                                jQuery.ajax({
                                    method: "GET",
                                    url: url,
                                    dataType: "jsonp",
                                    success: function(data) {
                                        sbiComments.commentObj = data.data;
                                        var toBeCached = [];
                                        jQuery.each(sbiComments.commentObj, function() {
                                            var comment = {
                                                created_time: this.created_time,
                                                id: this.id,
                                                text: this.text,
                                                user_name: this.from.username
                                            };
                                            toBeCached.push(comment);
                                        });
                                        if ( typeof sb_instagram_js_options.sbiPageCommentCache === 'undefined' ) {
                                            sb_instagram_js_options.sbiPageCommentCache = [];
                                        }
                                        sb_instagram_js_options.sbiPageCommentCache[cleanId] = [toBeCached, new Date().getTime() / 1000 + 100*60,sbiComments.numCommentsOnPage];

                                        if(missing !== 'all') {
                                            sbiComments.replaceWithNewComments(sb_instagram_js_options.sbiPageCommentCache[cleanId][0]);
                                        } else {
                                            sbiComments.appendExistingComments();
                                        }
                                        if (!sbiComments.disableCache && window.sbiStandalone.noDB !== true) {
                                            sbiComments.cacheComments(toBeCached, sbiComments.numCommentsOnPage);
                                        }
                                    }
                                });
                            },
                            getCommentHtml: function (comment) {
                                var comHtml = '';
                                comHtml += '<p class="sbi_lb-comment" id="sbi_com_'+comment.id+'" data-sbi-created="'+comment.created_time+'">';
                                comHtml += '<a class="sbi_lb-commenter" href="https://www.instagram.com/'+comment.user_name+'/" target="_blank">'+comment.user_name+'</a>';
                                comHtml += '<span class="sbi_lb-comment-text">'+comment.text.replace(/(\\')/g,"'").replace(/(\\")/g,'"')+'</span>';
                                comHtml += '</p>';

                                return comHtml;
                            },
                            appendExistingComments: function () {
                                var cleanId = this.postID.replace('sbi_',''),
                                    comments = sb_instagram_js_options.sbiPageCommentCache[cleanId][0],
                                    fifteenMinutesFromLastCache = sb_instagram_js_options.sbiPageCommentCache[cleanId][1],
                                    nowInSeconds = new Date().getTime() / 1000,
                                    maxNumComments = parseInt(this.maxNumComments),
                                    commentsNeeded = sbiComments.numCommentsOnPage - parseInt(sb_instagram_js_options.sbiPageCommentCache[cleanId][2]);

                                var loadingHTML = '';
                                // every time the comment cache is updated, a time 15 minutes in the future is also included in the saved data
                                // this checks to see if it's been at least 15 minutes since new comments were cached
                                if (fifteenMinutesFromLastCache > nowInSeconds) {
                                    commentsNeeded = 0;
                                } else {
                                    if (commentsNeeded > 0) {
                                        loadingHTML = '<p class="sbi_loading_comments"><span class="fa fa-spinner fa-pulse"></span></p>';
                                        sbiComments.getRemoteComments();
                                    }
                                }
                                var comsHtml = '';
                                //check to see if there is at least one comment to use
                                if (typeof comments[0] !== 'undefined') {
                                    comsHtml += '<div class="sbi_lb-commentBox">';
                                    var lastIndex = -1;
                                    // grab the maximum number of latest tweets available without going over the max
                                    if ((comments.length + commentsNeeded) < maxNumComments) {
                                        lastIndex = 0 - comments.length;
                                    } else if ((maxNumComments - commentsNeeded) > 0) {
                                        lastIndex = 0 - (maxNumComments - commentsNeeded);
                                    }
                                    // only append existing comments if there are less new comments than the max
                                    if (commentsNeeded < maxNumComments) {
                                        comments = comments.slice(lastIndex);
                                        jQuery.each(comments, function() {
                                            comsHtml += sbiComments.getCommentHtml(this);
                                        });
                                    }
                                    // let the visitor know that more comments are coming
                                    comsHtml += loadingHTML;
                                    comsHtml += '</div>';
                                    jQuery('.sbi_lb-dataContainer').append(comsHtml);
                                }
                            },
                            replaceWithNewComments: function (comments) {
                                var comsHtml = '',
                                    lastIndex = Math.max((0 - parseInt(this.maxNumComments)), (0 - comments.length)),
                                    newComments = comments.slice(lastIndex);

                                jQuery.each(newComments, function() {
                                    comsHtml += sbiComments.getCommentHtml(this);
                                });
                                jQuery('.sbi_lb-commentBox').html(comsHtml);
                            },
                            cacheComments: function (comments, totalComments) {
                                var submittedData = {
                                    'action': 'sbi_update_comment_cache',
                                    'post_id': this.postID,
                                    'comments': comments,
                                    'total_comments': totalComments
                                };

                                jQuery.ajax({
                                    url: sbiajaxurl,
                                    type: 'post',
                                    data: submittedData,
                                    success: function(data) {
                                    }
                                }); // ajax*/
                            }
                        };

                        function sbiCommentsInit(id) {
                            // set the id of the current post in the lightbox   console.log(jQuery('.sbi_lb-comment').length);
                            sbiComments.postID = id;
                            // append comments localized for this feed that apply to this post, otherwise retrieve new comments and use those
                            if (sb_instagram_js_options.sbiPageCommentCache && sb_instagram_js_options.sbiPageCommentCache.hasOwnProperty(sbiComments.postID.replace('sbi_',''))) {
                                sbiComments.appendExistingComments();
                            } else {
                                sbiComments.getRemoteComments('all');
                            }
                        }

                        // wait until the comments object is done being retrieved before displaying comments
                        if (typeof this.album[this.currentImageIndex].id !== 'undefined') {
                            sbiCommentsInit(this.album[this.currentImageIndex].id);
                        } else {
                            setTimeout(function() {
                                if (typeof this.album[this.currentImageIndex].id !== 'undefined') {
                                    sbiCommentsInit(this.album[this.currentImageIndex].id);
                                }
                            },500);
                        }
                    }

                    //Add links to the caption
                    var sbiLightboxCaption = this.album[this.currentImageIndex].title,
                        hashRegex = /(^|\s)#(\w[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC+0-9]+\w)/gi,
                        tagRegex = /[@]+[A-Za-z0-9-_]+/g;
                    if (typeof sbiLightboxCaption !== 'undefined' && sbiLightboxCaption !== '') {
                        sbiLightboxCaption = sbiLightboxCaption.replace(/(>#)/g,'> #');
                    }
                    (sbiLightboxCaption) ? sbiLightboxCaption = sbiLinkify(sbiLightboxCaption) : sbiLightboxCaption = '';

                    //Link #hashtags
                    function sbiReplaceHashtags(hash){
                        //Remove white space at beginning of hash
                        var replacementString = jQuery.trim(hash);
                        //If the hash is a hex code then don't replace it with a link as it's likely in the style attr, eg: "color: #ff0000"
                        if ( /^#[0-9A-F]{6}$/i.test( replacementString ) ){
                            return replacementString;
                        } else {
                            return ' <a href="https://instagram.com/explore/tags/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                        }
                    }
                    sbiLightboxCaption = sbiLightboxCaption.replace( hashRegex , sbiReplaceHashtags );

                    //Link @tags
                    function sbiReplaceTags(tag){
                        var replacementString = jQuery.trim(tag);
                        return ' <a href="https://instagram.com/'+ replacementString.substring(1) +'" target="_blank" rel="nofollow">' + replacementString + '</a>';
                    }
                    sbiLightboxCaption = sbiLightboxCaption.replace( tagRegex , sbiReplaceTags );

                    "undefined" != typeof sbiLightboxCaption && "" !== sbiLightboxCaption && this.$lightbox.find(".sbi_lb-caption").html('<a class="sbi_lightbox_username" href="https://instagram.com/'+this.album[this.currentImageIndex].user+'" target="_blank"><img src="'+this.album[this.currentImageIndex].avatar+'" /><p>@'+this.album[this.currentImageIndex].user + '</p></a> ' + sbiLightboxCaption).fadeIn("fast"), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".sbi_lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".sbi_lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".sbi_lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
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
                    var sbLbCarouselDestroy = function() {
                        jQuery('.sbi_lightbox_carousel_icon').remove();
                        jQuery('#sbi_lightbox .sbi_lb_lightbox-image, .sbi_lb-image-wrap video').remove();
                        if (jQuery('#sbi_lightbox .sbi_owl-carousel').length)  {
                            if( jQuery('#sbi_lightbox .sbi_owl-carousel').data('sbi_owlCarousel') ) jQuery('#sbi_lightbox .sbi_owl-carousel').data('sbi_owlCarousel').destroy();
                            jQuery('#sbi_lightbox .sbi_owl-item').remove();
                        }
                    };
                    var KEYCODE_ESC        = 27;
                    var KEYCODE_LEFTARROW  = 37;
                    var KEYCODE_RIGHTARROW = 39;

                    var keycode = event.keyCode;
                    var key     = String.fromCharCode(keycode).toLowerCase();
                    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');
                        this.end();
                    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                        if (this.currentImageIndex !== 0) {
                            this.changeImage(this.currentImageIndex - 1);
                                                    } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(this.album.length - 1);
                        }
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');

                    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                        if (this.currentImageIndex !== this.album.length - 1) {
                            this.changeImage(this.currentImageIndex + 1);
                        } else if (this.options.wrapAround && this.album.length > 1) {
                            this.changeImage(0);
                        }
                        sbLbCarouselDestroy();
                        if( sbi_supports_video() ) jQuery('#sbi_lightbox video.sbi_video')[0].pause();
                        jQuery('#sbi_lightbox iframe').attr('src', '');

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
            }
        })
    }).call(this);
    //Checks whether browser support HTML5 video element
    function sbi_supports_video() {
        return !!document.createElement('video').canPlayType;
    }

    var modMode = {
        status: false,
        usingDB: true,
        $self: jQuery('.sbi_moderation_mode'), // gets reassigned to current feed
        originalParent: jQuery('.sbi_moderation_mode').parent(),
        hideOrShow: 'hide',
        dbHidePhotos: sb_instagram_js_options.sb_instagram_hide_photos.replace(/ /g,'').split(','),
        dbBlockUsers: sb_instagram_js_options.sb_instagram_block_users.replace(/ /g,'').split(','),
        dbWhiteList: [],
        whiteListIndex: '',
        selectedHide: [], // image ids that are selected
        selectedShow: [],
        selectedUsers: [],

        setStatus: function (status) {
            this.status = status;
        },
        setUsingDB: function (usingDB) {
            this.usingDB = usingDB;
        },
        setSelf: function ($self) {
            if ($self.hasClass('sbi')) {
                this.$self = $self;
            } else {
                this.$self = $self.closest('.sbi');
            }
        },
        setOriginalPosition: function () {
            this.originalParent= this.$self.parent();
        },
        updateHideOrShow: function (hideOrShow) {
            this.hideOrShow = hideOrShow;
        },
        mergeDBAndSelected: function () {
            if(!this.$self.hasClass('sbi_mod_merged')) {
                // remove any empty array elements
                for (var i = 0; i < modMode.dbHidePhotos.length; i++) {
                    if (modMode.dbHidePhotos[i] == '') {
                        modMode.dbHidePhotos.splice(i, 1);
                    }
                }
                // add id to array if unique
                for (var i = 0; i < modMode.dbHidePhotos.length; i++) {
                    if (modMode.selectedHide.indexOf(modMode.dbHidePhotos[i].replace('sbi_', '')) == -1) {
                        modMode.selectedHide.push(modMode.dbHidePhotos[i].replace('sbi_', ''));
                    }
                }
                // remove any empty array elements for show
                for (var i = 0; i < modMode.dbWhiteList.length; i++) {
                    if (modMode.dbWhiteList[i] == '') {
                        modMode.dbWhiteList.splice(i, 1);
                    }
                }
                // add id to array if unique
                for (var i = 0; i < modMode.dbWhiteList.length; i++) {
                    if (modMode.selectedShow.indexOf(modMode.dbWhiteList[i].replace('sbi_', '')) == -1) {
                        modMode.selectedShow.push(modMode.dbWhiteList[i].replace('sbi_', ''));
                    }
                }
                // remove any empty array elements
                for (var i = 0; i < modMode.dbBlockUsers.length; i++) {
                    if (modMode.dbBlockUsers[i] == '') {
                        modMode.dbBlockUsers.splice(i, 1)
                    }
                }
                // add blocked user to array if unique
                for (var i = 0; i < modMode.dbBlockUsers.length; i++) {
                    if (modMode.selectedUsers.indexOf(modMode.dbBlockUsers[i]) == -1) {
                        modMode.selectedUsers.push(modMode.dbBlockUsers[i]);
                    }
                }
            }

        },
        setWhiteListData: function(listNum, ids) {
            this.whiteListIndex = listNum;
            this.dbWhiteList = ids.replace(/ /g,'').split(',');
        },
        updateBlockUser: function(checkbox) { //sbi_mod_block_user
            var user = checkbox.val();
            if (checkbox.is(':checked')) {
                if (modMode.selectedUsers.indexOf(user) < 0) {
                    modMode.selectedUsers.push(user);
                }
            } else {
                modMode.selectedUsers.splice(modMode.selectedUsers.indexOf(user), 1);
            }
        },
        addModSettingsHtml: function () {
            if(!this.$self.find('.sbi_mod_mode_wrapper').length) {
                var sbi_submit_mod_settings_btn = '<a href="javascript:void(0);" class="sbi_mod_submit_mod"><i class="fa fa-check-circle"></i> Save Settings</a>';
                modMode.$self.append(
                    '<div class="sbi_mod_mode_wrapper sbi_mod_mode_wrapper_bottom">'+sbi_submit_mod_settings_btn+'</div>'
                ).find('.sb_instagram_header').before(
                    '<div class="sbi_mod_mode_wrapper">' +
                    '<a href="javascript:void(0);" class="sbi_close_mod" style="display: block;"><i class="fa fa-close"></i> Exit moderation mode</a>' +
                    '<p class="sbi_mod_type_header">Moderation Type</p>' +
                    '<div class="sbi_mod_row"><input id="sbi_hide_show" name="sbi_hide_show" type="radio" value="hide" class="sbi_hide_show_radio" checked> <label for="sbi_hide_show">Hide selected posts</label></div>' +
                    '<div class="sbi_mod_row"><input id="sbi_hs_show" name="sbi_hide_show" type="radio" value="show" class="sbi_hide_show_radio"> <label for="sbi_hs_show">Only show selected posts (create a "White List")</label></div>' +
                    sbi_submit_mod_settings_btn +
                    '<div class="sbi_mod_row" style="margin-top: 15px; font-size: 12px;"><input id="sbi_mod_id_toggle" name="sbi_mod_id_toggle" type="checkbox" value="show" class="sbi_hide_show_radio"> <label for="sbi_mod_id_toggle">Show post ID under image</label></div>' +
                    '</div>'
                );
                if(this.whiteListIndex !== '') {
                    modMode.$self.find('#sbi_hs_show').prop("checked", true);
                    modMode.hideOrShow = 'show';
                }
            }
            //Add the save notice to the body and fade it in/out when settings saved in Ajax callback
            jQuery('body').append('<p class="sbi_mod_saved"><i class="fa fa-check"></i> Saved</p>');
        },
        addModHtml: function (user,id) {
            var html =
                '<div class="sbi_mod">' +
                '<span class="sbi_mod_user">' + user + '</span>' +
                '<div class="sbi_mod_block"><label for="sbi_mod_block_user' + user + '"><input type="checkbox" class="sbi_mod_block_user" id="sbi_mod_block_user' + user + '" value="' + user + '"/> Block user <i class="fa fa-ban"></i></label></div>' +
                '<span class="sbi_mod_user sbi_mod_id"><input type="text" value="' + id + '" readonly></span>' +
                '</div>';

            return html;
        },
        toggleID: function(clicked) {
            if (clicked.is(':checked')) {
                jQuery('.sbi_mod_id_toggle').attr('checked','checked');
                jQuery('.sbi_mod_id').show();
            } else {
                jQuery('.sbi_mod_id_toggle').removeAttr('checked');
                jQuery('.sbi_mod_id').hide();
            }
        },
        initClickCopy: function () {
            jQuery('.sbi_mod_user input').click(function() {
                jQuery(this).select();
            });
            jQuery('#sbi_mod_id_toggle').click(function() {
               modMode.toggleID(jQuery(this));
            });
            modMode.toggleID(jQuery('#sbi_mod_id_toggle').first());
        },
        closeMod: function() {
            var url = window.location.href;
            if (url.indexOf('sbi_moderation_mode=true') > -1) {
                url = url.replace('?sbi_moderation_mode=true', '');
                url = url.replace('&sbi_moderation_mode=true', '');
            }
            if (url.indexOf('sbi_moderation_index=') > -1) {
                url = url.split('&sbi_moderation_index=')[0];
            }
            window.location.href = url;
        },
        resizeFeed: function () {
            modMode.$self.closest('body').css('position','relative').prepend(modMode.$self);
        },
        replaceInfoHtml: function () {
            var mod = modMode.$self.find('.sbi_mod');
            mod.each(function() {
                jQuery(this).closest('.sbi_item').find('.sbi_info').html(jQuery(this));
                jQuery(this).children().css('font-size','14px');
            });
        },
        styleImage: function (image, hideOrShow) {
            if (hideOrShow == 'hide') {
                image.append('<span class="sbi_mod_post_status sbi_mod_exclude"><i class="fa fa-close"></i></span>').css('outline','3px solid #e5593d');
            } else {
                image.append('<span class="sbi_mod_post_status sbi_mod_include"><i class="fa fa-check"></i></span>').css('outline','3px solid #4e9c2b');
            }
        },
        changeClickEvent: function (item, e) {
            e.preventDefault();
            var id = item.closest('.sbi_item').attr('id').replace('sbi_', ''),
                user =  item.closest('.sbi_item').find('.sbi_mod_user').text();
            if (modMode.hideOrShow === 'hide') {
                if (modMode.selectedUsers.indexOf(user) === -1) {
                    if (modMode.selectedHide.indexOf(id) > -1) {
                        modMode.selectedHide.splice(modMode.selectedHide.indexOf(id), 1);
                    } else {
                        modMode.selectedHide.push(id);
                    }
                }
            } else {
                if (modMode.selectedShow.indexOf(id) > -1) {
                    modMode.selectedShow.splice(modMode.selectedShow.indexOf(id), 1);
                } else {
                    modMode.selectedShow.push(id);
                }
            }

            modMode.updateDisplay(modMode.$self);

        },
        updateDisplay: function () {
            // clear off all hide/show styling
            modMode.$self.find('.sbi_photo').css('outline','').find('.sbi_mod_post_status').remove();
            // get the blocked users and start looping through items to compare
            var blockedUsers = modMode.selectedUsers;
            modMode.$self.find('.sbi_item').each( function() {
                var user =  jQuery(this).find('.sbi_mod_user').text(),
                    image = jQuery(this).find('.sbi_photo');
                // if the user who posted this image is blocked
                if (blockedUsers.indexOf(user) > -1) {
                    // add the hide styling
                    modMode.styleImage(image, 'hide');
                    // check the block user box
                    image.closest('.sbi_item').find('.sbi_mod_block_user').prop('checked', true);
                } else {
                    // user is not blocked, uncheck box
                    image.closest('.sbi_item').find('.sbi_mod_block_user').prop('checked', false);
                    // compare id to ids in relevant array
                    var id = jQuery(this).attr('id').replace('sbi_', ''),
                        idPlusSbi = 'sbi_'+id;
                    if (modMode.hideOrShow === 'hide') {
                        if (modMode.selectedHide.indexOf(id) > -1 || modMode.selectedHide.indexOf(idPlusSbi) > -1) {
                            modMode.styleImage(image, 'hide');
                        }
                    } else {
                        if (modMode.selectedShow.indexOf(id) > -1 || modMode.selectedShow.indexOf(idPlusSbi) > -1) {
                            modMode.styleImage(image, 'show');
                        }
                    }
                }
            });
        },
        ajaxSubmit: function () {
            modMode.$self.find('.sbi_mod_submit_mod').next('span').remove();
            modMode.$self.fadeTo( "fast", 0.3 ).find('.sbi_mod_submit_mod').attr('disabled','true');
            if (modMode.hideOrShow === 'hide') {
                modMode.$self.find('.sbi_mod_new_white_list').hide();
                var submittedData = {
                    ids: modMode.selectedHide,
                    blocked_users: modMode.selectedUsers,
                    action: 'sbi_update_mod_mode_settings'
                };
                jQuery.ajax({
                    url: sbiajaxurl,
                    type: 'post',
                    data: submittedData,
                    success: function (data) {
                        setTimeout(function() {
                            modMode.$self.fadeTo(500, 1);
                            modMode.$self.find('.sbi_mod_submit_mod').removeAttr('disabled');
                        }, 500);
                        jQuery('.sbi_mod_saved').fadeIn();
                        setTimeout(function() { jQuery('.sbi_mod_saved').fadeOut(); }, 3000);
                    }
                }); // ajax
            } else {
                var submittedData = {
                    ids: modMode.selectedShow,
                    db_index: modMode.whiteListIndex,
                    blocked_users: modMode.selectedUsers,
                    action: 'sbi_update_mod_mode_white_list'
                };
                jQuery.ajax({
                    url: sbiajaxurl,
                    type: 'post',
                    data: submittedData,
                    success: function (data) {
                        if (data.length) {
                            modMode.$self.find('.sbi_mod_new_white_list').remove();
                            modMode.$self.find('.sbi_mod_submit_mod').after(
                                '<div class="sbi_mod_new_white_list" style="display: block;">' +
                                '<p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this shortcode to apply your white list:</p>' +
                                '<code>[instagram-feed <span style="font-weight: bold;">whitelist="'+data+'"</span>]</code>' +
                                '</div>'
                            );
                            modMode.whiteListIndex = data;
                        }
                        setTimeout(function() {
                            modMode.$self.find('.sbi_mod_new_white_list').show();
                            modMode.$self.css( 'opacity', 1 );
                            modMode.$self.find('.sbi_mod_submit_mod').removeAttr('disabled');
                        }, 500);
                        jQuery('.sbi_mod_saved').fadeIn();
                        setTimeout(function() { jQuery('.sbi_mod_saved').fadeOut(); }, 3000);
                    }
                }); // ajax
            }
        },
        showOnPageSubmit: function () {
            modMode.$self.find('.sbi_mod_submit_mod').next('span').remove();
            modMode.$self.find('.sbi_mod_submit_mod').attr('disabled','true');
            if (modMode.hideOrShow === 'hide') {
                modMode.$self.find('.sbi_mod_new_white_list').hide();
                var submittedData = {
                    ids: modMode.selectedHide,
                    blocked_users: modMode.selectedUsers,
                    action: 'sbi_update_mod_mode_settings'
                };
                if (submittedData.ids.length || submittedData.blocked_users.length) {
                    var idsString = submittedData.ids.join(', '),
                        blockedUsersString = submittedData.blocked_users.join(', ');
                    modMode.$self.find('.sbi_mod_new_white_list').remove();
                    modMode.$self.find('.sbi_mod_submit_mod').after(
                        '<div class="sbi_mod_new_white_list" style="display: block;">' +
                        '<p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_hide_photos</strong> setting</p>' +
                        '<code><strong>'+idsString+'</strong></code>' +
                        '</div>' +
                        '<div class="sbi_mod_new_white_list" style="display: block;">' +
                        '<p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_block_users</strong> setting</p>' +
                        '<code><strong>'+blockedUsersString+'</strong></code>' +
                        '</div>'
                    );
                }
                modMode.$self.find('.sbi_mod_new_white_list').show();
                modMode.$self.find('.sbi_mod_submit_mod').removeAttr('disabled');
            } else {
                var submittedData = {
                    ids: modMode.selectedShow,
                    db_index: modMode.whiteListIndex,
                    blocked_users: modMode.selectedUsers,
                    action: 'sbi_update_mod_mode_white_list'
                };
                if (submittedData.ids.length || submittedData.blocked_users.length) {
                    var idsString = submittedData.ids.join(', '),
                        blockedUsersString = submittedData.blocked_users.join(', ');
                    modMode.$self.find('.sbi_mod_new_white_list').remove();
                    modMode.$self.find('.sbi_mod_submit_mod').after(
                        '<div class="sbi_mod_new_white_list" style="display: block;">' +
                        '<p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sbiWhiteListIds</strong> setting</p>' +
                        '<code><strong>'+idsString+'</strong></code>' +
                        '</div>' +
                        '<div class="sbi_mod_new_white_list" style="display: block;">' +
                        '<p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Important.</span> Please use this in your <strong>sb_instagram_block_users</strong> setting</p>' +
                        '<code><strong>'+blockedUsersString+'</strong></code>' +
                        '</div>'
                    );
                }
                modMode.$self.find('.sbi_mod_new_white_list').show();
                modMode.$self.find('.sbi_mod_submit_mod').removeAttr('disabled');
            }
        },
        submitSelected: function () {
            if (modMode.usingDB) {
                modMode.ajaxSubmit();
            } else {
                modMode.showOnPageSubmit();
            }
        }
    };

    //Start plugin code
    function sbi_init(_cache){
        window.sbiStandalone = {
            'noDB' : false,
            'forceModMode' : false
        };
        var sbiTouchDevice = false;
        if (sbiIsTouchDevice() === true) sbiTouchDevice = true;

        function sbiIsTouchDevice() {
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }

        // used in case user name is used instead of id
        function sbiSetUserApiUrl(user_id, at, before, extra, handleData) {
            var url = 'https://api.instagram.com/v1/users/search?q=' + user_id + '&access_token=' + at;
            jQuery.ajax({
                method: "GET",
                url: url,
                dataType: "jsonp",
                success: function(data) {
                    var matchingID = data.data[0].id;
                    jQuery.each(data.data, function() {
                        if(this.username === user_id){
                            matchingID = this.id;
                        }
                    });

                    var apiCall = "https://api.instagram.com/v1/users/"+ matchingID + before + "?access_token=" + at + extra;
                    handleData(apiCall,matchingID);
                }
            });
        }

        var $i = 0, //Used for iterating lightbox
            sbi_time = 0, //might be added to if includewords is used on the page
            numIncludewords = 0; //keep track of includewords feeds on page

        sbiCreatePage( function() {
            // using this code as the callback to make sure we know if includewords is being used
            // and we need to stagger the loading of the feeds
            jQuery('#sb_instagram.sbi').each(function () {
                var feedOptions = JSON.parse( this.getAttribute('data-options') );
                if (feedOptions.includewords.length > 0) {
                    numIncludewords++;
                }
                if (feedOptions.lightboxcomments == 'true' && window.sbiCommentCacheStatus !== 1 && feedOptions.numcomments > 0) {
                    window.sbiCommentCacheStatus = 1;
                }
            });

        });

        //Wrapped in a function to delay the feeds being loaded until includewords feeds are detected
        function sbiCreatePage(_callback) {

            // forces the function to wait until the includewords detecting code is run
            _callback();
            window.sbiCacheStatuses = {};
            window.sbiFeedMeta = {};

            jQuery('#sb_instagram.sbi').each(function(){ //Ends on line 1676

                var var_this = this,
                    feedOptions = JSON.parse( var_this.getAttribute('data-options') );

                //Add feed index attr (for lightbox iteration)
                $i++;
                jQuery(this).attr('data-sbi-index', $i);
                // setting up some global objects to keep track of various statuses used for the caching system
                feedOptions.feedIndex = $i;
                window.sbiCacheStatuses[$i] = {
                    'header'    : ( feedOptions.sbiHeaderCache == 'true' ),
                    'feed'      : ( feedOptions.sbiCacheExists == 'true' )
                };
                window.sbiFeedMeta[$i] = {
                    'error'    : {},
                    'idsInFeed' : []
                };
                setTimeout(function() {
                    sbiCreateFeed(var_this,feedOptions);
                },sbi_time);

                // stagger the loading of each feed by two seconds to help with includewords issue
                if( numIncludewords > 0 ){
                    sbi_time += 2000;
                }

                function sbiCreateFeed(var_this,feedOptions) {

                    var imagesArrCount = 0;

                    var $self = jQuery(var_this),
                        imgRes = 'standard_resolution',
                        cols = parseInt( var_this.getAttribute('data-cols') ),
                        colsmobile = feedOptions.colsmobile,
                        nummobile = feedOptions.nummobile,
                        //Convert styles JSON string to an object
                        showcaption = '',
                        showlikes = '',
                        getType = feedOptions.type,
                        sortby = 'none',
                        hovercolorstyles = '',
                        num = var_this.getAttribute('data-num'),
                        user_id = var_this.getAttribute('data-id'),
                        $header = '',
                        disablelightbox = feedOptions.disablelightbox,
                        captionlinks = feedOptions.captionlinks,
                        morePosts = [], //Used to determine whether to show the Load More button when displaying posts from more than one id/hashtag. If one of the ids/hashtags has more posts then still show button.
                        hidePhotos = sb_instagram_js_options.sb_instagram_hide_photos.replace(/ /g,'').split(","),
                        blockUsers = sb_instagram_js_options.sb_instagram_block_users.replace(/ /g,'').split(","),
                        showUsers = feedOptions.showusers.replace(/ /g,'').split(","), //Explode into an array
                        includeWords = feedOptions.includewords.replace(/ /g,'').split(","), //Explode into an array
                        excludeWords = feedOptions.excludewords.replace(/ /g,'').split(","), //Explode into an array
                        whiteList = feedOptions.sbiWhiteList.replace(/ /g,''),
                        whiteListIds = feedOptions.sbiWhiteListIds.replace(/ /g,'').split(","), //Explode into an array
                        sbiHeaderCache = feedOptions.sbiHeaderCache,
                        media = feedOptions.media;

                    //If they're not defined because they're not included in the page source code for some reason then set them to be empty
                    if(typeof hidePhotos === 'undefined' || ( whiteList.length > 0 && whiteList != '' && !modMode.status == true ) ) hidePhotos = []; //If the hidePhotos array is empty then set it to be an empty array, otherwise .push throws an error
                    if(typeof blockUsers === 'undefined' || ( whiteList.length > 0 && whiteList != '' && !modMode.status == true ) ) blockUsers = [];
                    if(typeof showUsers === 'undefined') showUsers = [];

                    //Remove the sbi_ prefix from the start of each ID
                    for(var i=0; i < hidePhotos.length; i++) {
                        hidePhotos[i] = hidePhotos[i].replace(/sbi_/g, '');
                    }

                    feedOptions.disablecache = (feedOptions.disablecache == 'true' || jQuery('.sbi_moderation_mode').length > 0);

                    // add a class to the lightbox if comments are enabled
                    if(feedOptions.lightboxcomments == 'true' ) {
                        if(!jQuery('.sbi_lightbox').hasClass('sbi_lb-comments-enabled')) {
                            jQuery('.sbi_lightbox').addClass('sbi_lb-comments-enabled');
                        }
                    }

                    if( feedOptions.showcaption == 'false' || feedOptions.showcaption == '' ) showcaption = 'style="display: none;"';
                    if( feedOptions.showlikes == 'false' || feedOptions.showlikes == '' ) showlikes = 'display: none;';
                    if( feedOptions.sortby !== '' ) sortby = feedOptions.sortby;
                    if( feedOptions.hovercolor !== '0,0,0' ) hovercolorstyles = 'style="background: rgba('+feedOptions.hovercolor+',0.85)"';

                    imgRes = sbiGetResolutionSettings( $self, var_this.getAttribute('data-res'), cols, colsmobile, $i );
                    //Split comma separated hashtags into array
                    var looparray = [''];
                    if(getType == 'hashtag'){
                        var hashtags_arr = feedOptions.hashtag.replace(/ /g,'').split(",");
                            looparray = hashtags_arr;
                    } else if(getType == 'user'){
                        var ids_arr = user_id.replace(/ /g,'').split(",");
                            looparray = ids_arr;
                    } else if(getType == 'location'){
                        var locations_arr = feedOptions.location.replace(/ /g,'').split(",");
                            looparray = locations_arr;
                    } else if(getType == 'coordinates'){
                        var coords_arr = feedOptions.coordinates.replace(/ /g,'').split("),(");
                            looparray = coords_arr;
                    } else if(getType == 'single') {
                        var single_arr = feedOptions.single.replace(/sbi_/g, '');
                            single_arr = single_arr.replace(/ /g,'').split(",");
                            looparray = single_arr;
                    }

                    //START FEED
                    var apiURLs = [],
                        apiCall = '';

                    //Loop through ids or hashtags
                    jQuery.each( looparray, function( index, entry ) {

                        //Create an array of API URLs to pass to the fetchData function
                        if(getType == 'user'){
                            apiCall = "https://api.instagram.com/v1/users/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count=33";
                            window.sbiFeedMeta[$i].idsInFeed.push(entry);
                        } else if(getType == 'coordinates') {

                            //If the entry is coords
                            //Split the lat and long into pieces and place in the URL
                            entry = entry.replace(/[()]/g, '');
                            var entryArr = entry.split(","),
                                lat = entryArr[0],
                                lng = entryArr[1],
                                dis = '1000';
                            if( typeof entryArr[2] !== 'undefined' ){
                                dis = entryArr[2];
                            }
                            apiCall = "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+lng+"&distance="+dis+"&access_token=" + sb_instagram_js_options.sb_instagram_at+"&count=33&max_timestamp=";

                        } else if(getType == 'location') {
                            apiCall = "https://api.instagram.com/v1/locations/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count=33";
                        } else if(getType == 'liked') {
                            apiCall = "https://api.instagram.com/v1/users/self/media/liked?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count=33";
                        } else if(getType == 'single') {
                            apiCall = "https://api.instagram.com/v1/media/"+ entry +"?access_token=" + sb_instagram_js_options.sb_instagram_at;
                            window.sbiFeedMeta[$i].idsInFeed.push(entry);
                        } else {
                            apiCall = "https://api.instagram.com/v1/tags/"+ entry +"/media/recent?access_token=" + sb_instagram_js_options.sb_instagram_at+"&count=33";
                        }
                        apiURLs.push( apiCall );

                    }); //End hashtag array loop

                    //Create an object of the settings so that they can be passed to the buildFeed function
                    var sbiSettings = {num:num, getType:getType, user_id:user_id, cols:cols, colsmobile:colsmobile, nummobile:nummobile, imgRes:imgRes, sortby:sortby, showcaption:showcaption, showlikes:showlikes, disablelightbox:disablelightbox, captionlinks:captionlinks, feedOptions:feedOptions, hidePhotos:hidePhotos, blockUsers:blockUsers, showUsers:showUsers, excludeWords:excludeWords, includeWords:includeWords, whiteList:whiteList, whiteListIds:whiteListIds, looparray: looparray};

                    var sbi_cache_string_include = '';
                    var sbi_cache_string_exclude = '';
                    var sbiTransientNames = {
                        'header'    : '',
                        'feed'      : ''
                    };

                    if( includeWords.length > 0 ){
                        jQuery.each( includeWords, function( index, word ) {
                            var sbi_include_word = word.replace(/ /g,"").replace(/#/g,"");
                            sbi_cache_string_include += sbi_include_word.substring(0, 3);
                        });
                    }

                    if( excludeWords.length > 0 ){
                        jQuery.each( excludeWords, function( index, word ) {
                            var sbi_exclude_word = word.replace(/ /g,"").replace(/#/g,"");
                            sbi_cache_string_exclude += sbi_exclude_word.substring(0, 3);
                        });
                    }

                    //Figure out how long the first part of the caching string should be
                    var sbi_cache_string_include_length = sbi_cache_string_include.length;
                    var sbi_cache_string_exclude_length = sbi_cache_string_exclude.length;
                    var sbi_cache_string_length = 40 - Math.min(sbi_cache_string_include_length + sbi_cache_string_exclude_length, 20);

                    var transientName = 'sbi_';
                    if (getType === 'liked') {
                        transientName += 'liked';
                    }
                    looparray = looparray.join().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    // include the white list name in the transient name
                    var transientWhiteList = feedOptions.sbiWhiteList.substring(0, 3),
                        transientShowUser = feedOptions.showusers.substring(0, 3);
                    transientName += transientWhiteList + transientShowUser;
                    if (feedOptions.media !== 'all') transientName += feedOptions.media.substring(0, 1);
                    transientName += looparray.substring(0, sbi_cache_string_length);

                    //Find the length of the string so far, and then however many chars are left we can use this for filters
                    sbi_cache_string_length = transientName.length;
                    sbi_cache_string_length = 44 - sbi_cache_string_length;


                    //Set the length of each filter string
                    if( sbi_cache_string_exclude_length < sbi_cache_string_length/2 ){
                        sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length - sbi_cache_string_exclude_length);
                    } else {
                        //Exclude string
                        if( sbi_cache_string_exclude.length == 0 ){
                            sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length);
                        } else {
                            sbi_cache_string_include = sbi_cache_string_include.substring(0, sbi_cache_string_length/2);
                        }
                        //Include string
                        if( sbi_cache_string_include.length == 0 ){
                            sbi_cache_string_exclude = sbi_cache_string_exclude.substring(0, sbi_cache_string_length);
                        } else {
                            sbi_cache_string_exclude = sbi_cache_string_exclude.substring(0, sbi_cache_string_length/2);
                        }
                    }

                    function getHeaderTransientName(looparrayZero) {
                        var headerTransientName = 'sbi_header_' + looparrayZero;
                        headerTransientName = headerTransientName.substring(0, 45);

                        return headerTransientName;
                    }

                    //Add both parts of the caching string together and make sure it doesn't exceed 45
                    transientName += sbi_cache_string_include + sbi_cache_string_exclude;
                    sbiTransientNames.feed = transientName.substring(0, 45);
                    sbiTransientNames.header = getHeaderTransientName(sbiSettings.looparray[0]);

                    // check to see if comments need to be retrieved
                    if (!sb_instagram_js_options.sbiPageCommentCache && window.sbiCommentCacheStatus === 1  && window.sbiStandalone.noDB !== true) {
                        sbiTransientNames.comments = 'need';
                    } else {
                        sbiTransientNames.comments = 'no';
                    }
                    //1. Does the transient/cache exist in the db?
                    if( ( window.sbiCacheStatuses[feedOptions.feedIndex].feed === true || window.sbiCacheStatuses[feedOptions.feedIndex].header === true || sbiTransientNames.comments === 'need' ) && !feedOptions.disablecache && typeof feedOptions.tryFetch === 'undefined'){
                        //Use ajax to get the cache
                        var images = sbiGetCache(sbiTransientNames, sbiSettings, $self, 'all', apiURLs);
                        sbiTransientNames.comments = 'no';
                    }

                    // if the user didn't use the account id, this attempts to use the user name
                    if(getType == 'user' && isNaN(ids_arr[0])){
                        sbiSetUserApiUrl(ids_arr[0], sb_instagram_js_options.sb_instagram_at, '/media/recent', '&count=33', function(apiURL,newFeedID){
                            sbiSettings.user_id = newFeedID;
                            sbiFetchData([apiURL], sbiTransientNames.feed, sbiSettings, $self);
                        });
                    } else {
                        // if the process of retrieving remote posts hasn't started yet, do so here
                        if ( window.sbiCacheStatuses[feedOptions.feedIndex].feed === false && window.sbiCacheStatuses[feedOptions.feedIndex].feed !== 'fetched') {
                            window.sbiCacheStatuses[feedOptions.feedIndex].feed = 'fetched';
                            window.sbiCacheStatuses[feedOptions.feedIndex].tryFetch = 'done';
                            sbiFetchData(apiURLs, sbiTransientNames.feed, sbiSettings, $self);
                        }
                        if ( !window.sbiCacheStatuses[feedOptions.feedIndex].header && window.sbiCacheStatuses[feedOptions.feedIndex].header !== 'fetched' && sbiSettings.getType === 'user') {
                            window.sbiCacheStatuses[feedOptions.feedIndex].header = 'fetched';
                            sbiFetchData(apiURLs, sbiTransientNames.header, sbiSettings, $self);
                        }
                    }


                    //This is the arr that we'll keep adding the new images to
                    var imagesArr = '',
                        sbiNewData = false,
                        noMoreData = false,
                        photoIds = [],
                        imagesHTML = '',
                        photosAvailable = 0, //How many photos are available to be displayed
                        apiRequests = 1;

                    //Build the HTML for the feed
                    function sbiBuildFeed(images, transientName, sbiSettings, $self){

                        //VARS:
                        var $loadBtn = $self.find("#sbi_load .sbi_load_btn"),
                            num = parseInt(sbiSettings.num),
                            cols = parseInt(sbiSettings.cols),
                            colsmobile = sbiSettings.colsmobile,
                            nummobile = parseInt(sbiSettings.nummobile),
                            hovercolorstyles = '',
                            hovertextstyles = '',
                            feedOptions = sbiSettings.feedOptions,
                            disablelightbox = sbiSettings.disablelightbox,
                            captionlinks = sbiSettings.captionlinks,
                            itemCount = 0,
                            imgRes = sbiSettings.imgRes,
                            getType = feedOptions.type,
                            hidePhotos = sbiSettings.hidePhotos, //Contains the IDs of the photos which need to be hidden
                            blockUsers = sbiSettings.blockUsers,
                            excludeWords = sbiSettings.excludeWords,
                            showUsers = sbiSettings.showUsers,
                            includeWords = sbiSettings.includeWords,
                            whiteListIds = sbiSettings.whiteListIds,
                            whiteList = sbiSettings.whiteList,
                            maxRequests = parseInt(feedOptions.maxrequests),
                            removedPhotosCount = 0, //How many photos are being hidden so far
                            carousel = JSON.parse(feedOptions.carousel)[0],
                            carouselarrows = JSON.parse(feedOptions.carousel)[1],
                            carouselpag = JSON.parse(feedOptions.carousel)[2],
                            carouselautoplay = JSON.parse(feedOptions.carousel)[3],
                            carouseltime = JSON.parse(feedOptions.carousel)[4],
                            imagepadding = feedOptions.imagepadding,
                            imagepaddingunit = feedOptions.imagepaddingunit,
                            looparray = sbiSettings.looparray,
                            headerstyle = feedOptions.headerstyle,
                            headerstyle = feedOptions.headerstyle,
                            headerprimarycolor = feedOptions.headerprimarycolor,
                            headersecondarycolor = feedOptions.headersecondarycolor,
                            media = feedOptions.media;

                        // Assist with carousel feeds when cols is less than or equal to num posts
                        if (carousel && num <= cols) num = cols * 2;

                        // determine moderation mode
                        var sbiModIndex = 'b';
                        if (typeof $self.parent().attr('class') !== 'undefined') {
                            sbiModIndex = $self.index()+$self.parent().attr('class').toString();
                        } else {
                            sbiModIndex = 'noclass';
                        }
                        var forceModMode = false,
                            usingDB = true;
                        if (typeof window.sbiStandalone !== 'undefined') {
                            forceModMode = window.sbiStandalone.forceModMode;
                            usingDB = (window.sbiStandalone.noDB === false);
                        }
                        if (feedOptions.sbiModIndex === sbiModIndex.substring(0,10) || $self.hasClass('sbi_mod_merged') || forceModMode) {
                            modMode.setStatus($self.hasClass('sbi_moderation_mode'));
                            modMode.setUsingDB(usingDB);
                        } else {
                            modMode.setStatus(false);
                        }

                        //Set some feed options that help with mod mode
                        if (modMode.status === true) {
                            modMode.setSelf($self);
                            if(!modMode.$self.hasClass('sbi_mod_merged')) {
                                if (sbiSettings.feedOptions.sbiWhiteList.length) {
                                    modMode.setWhiteListData(sbiSettings.feedOptions.sbiWhiteList, sbiSettings.feedOptions.sbiWhiteListIds);
                                }
                            }
                            modMode.mergeDBAndSelected();
                            disablelightbox = 'true';
                            hidePhotos = [];
                            blockUsers = [];
                            showUsers[0] = '';
                            feedOptions.showlikes = 'false';
                            feedOptions.showcaption = 'false';
                            sbiSettings.showlikes = '';
                            sbiSettings.showcaption = '';
                            carousel = false;
                            imagepadding = 5;
                            imagepaddingunit = "px";
                        }

                        //check feed width to apply mobile columns
                        if (jQuery(window).width() < 480 && modMode.status === false) {
                            num = nummobile;
                        }

                        //Add a query parameter to the url and refresh the page to enable mod mode
                        jQuery('.sbi_moderation_link').click(function() {
                            var modIndex = 'b';
                            if (typeof jQuery(this).closest('.sbi').parent().attr('class') !== 'undefined') {
                                modIndex = jQuery(this).closest('.sbi').index()+jQuery(this).closest('.sbi').parent().attr('class');
                            } else {
                                modIndex = 'noclass';
                            }

                            var url = window.location.href;
                            modIndex = modIndex.substring(0,10);
                            if (url.indexOf('sbi_moderation_mode=true') == -1) {
                                if (url.indexOf('?') > -1) {
                                    url += '&sbi_moderation_mode=true&sbi_moderation_index='+modIndex;
                                } else {
                                    url += '?sbi_moderation_mode=true&sbi_moderation_index='+modIndex;
                                }
                            }
                            window.location.href = url;
                        });

                        //On first load imagesArr is empty so set it to be the images
                        if(imagesArr == ''){
                            imagesArr = images;

                            //On all subsequent loads add the new images to the imagesArr
                        } else if( sbiNewData == true ) {
                            jQuery.each( images.data, function( index, entry ) {
                                //Add the images to the imagesArr
                                imagesArr.data.push( entry );
                            });
                            sbiNewData = false;
                        }
                        var imagesNextUrl = images.pagination.next_url;

                        if( typeof imagesNextUrl === 'undefined' || imagesNextUrl.length == 0 ){
                            noMoreData = true;
                        } else {
                            $loadBtn.show();
                        }

                        //If the next url exists then update the pagination object in the imagesArr with the next pagination info
                        if( typeof images.pagination !== 'undefined' ) imagesArr["pagination"] = images.pagination;

                        if( feedOptions.showcaption == 'false' || feedOptions.showcaption == '' ) showcaption = 'style="display: none;"';
                        if( feedOptions.showlikes == 'false' || feedOptions.showlikes == '' ) showlikes = 'display: none;';
                        if( feedOptions.sortby !== '' ) sortby = feedOptions.sortby;
                        if( feedOptions.hovercolor !== '0,0,0' ) hovercolorstyles = 'style="background: rgba('+feedOptions.hovercolor+',0.85)"';
                        if( feedOptions.hovertextcolor !== '0,0,0' ) hovertextstyles = 'style="color: rgba('+feedOptions.hovertextcolor+',1)"';

                        var imagesArrCountOrig = imagesArrCount,
                            removePhotoIndexes = []; //This is used to keep track of the indexes of the photos which should be removed so that they can be removed from imagesArr after the loop below has finished and then resultantly not cached.

                        //BUILD HEADER
                        if( $self.find('.sbi_header_link').length == 0 ){

                            //Get page info for first User ID
                            if(getType == 'user'){

                                var sbi_page_url = 'https://api.instagram.com/v1/users/' + looparray[0] + '?access_token=' + sb_instagram_js_options.sb_instagram_at;

                                if(isNaN(looparray[0])){
                                    sbiSetUserApiUrl(looparray[0], sb_instagram_js_options.sb_instagram_at, '', '', function(apiURL){
                                        sbi_page_url = apiURL;

                                        if(sbiHeaderCache == 'true' && !feedOptions.disablecache){
                                            //Use ajax to get the cache
                                            //sbiGetCache(headerTransientName, sbiSettings, $self, 'header');
                                        } else {
                                            // Make the ajax request here
                                            jQuery.ajax({
                                                method: "GET",
                                                url: sbi_page_url,
                                                dataType: "jsonp",
                                                success: function(data) {
                                                    sbiBuildHeader(data, sbiSettings);
                                                    if(!feedOptions.disablecache && window.sbiCacheStatuses[feedOptions.feedIndex].header !== 'cached' && typeof data.data.username !== 'undefined' && typeof data.data.pagination === 'undefined')  {
                                                        window.sbiCacheStatuses[feedOptions.feedIndex].header = 'cached';
                                                        sbiCachePhotos(data, headerTransientName);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    //Create header transient name
                                    var headerTransientName = 'sbi_header_' + looparray[0];
                                    headerTransientName = headerTransientName.substring(0, 45);

                                    //Check whether header cache exists
                                    if(sbiHeaderCache == 'true' && !feedOptions.disablecache){
                                        //Use ajax to get the cache
                                        //sbiGetCache(headerTransientName, sbiSettings, $self, 'header');
                                    } else {
                                        // Make the ajax request here
                                        jQuery.ajax({
                                            method: "GET",
                                            url: sbi_page_url,
                                            dataType: "jsonp",
                                            success: function (data) {
                                                sbiBuildHeader(data, sbiSettings);

                                                if(!feedOptions.disablecache && window.sbiCacheStatuses[feedOptions.feedIndex].header !== 'cached' && typeof data.data !== 'undefined' && typeof data.data.username !== 'undefined' && typeof data.data.pagination === 'undefined')  {
                                                    window.sbiCacheStatuses[feedOptions.feedIndex].header = 'cached';
                                                    sbiCachePhotos(data, headerTransientName);
                                                }
                                            }
                                        });
                                    }
                                }

                            } else {

                                var headerStyles = '';
                                if(feedOptions.headercolor.length) headerStyles = 'style="color: #'+feedOptions.headercolor+'"';

                                if(getType == 'hashtag'){
                                    $header = '<a href="https://instagram.com/explore/tags/'+looparray[0]+'" target="_blank" class="sbi_header_link" '+headerStyles+'>';
                                } else {
                                    $header = '<div class="sbi_header_link" '+headerStyles+'>';
                                }

                                $header += '<div class="sbi_header_text">';
                                $header += '<h3 class="sbi_no_bio" '+headerStyles+'>';
                                if(getType == 'hashtag'){

                                    if( looparray.length > 1 ){
                                        jQuery.each( looparray, function( index, hashtag ) { // itemNumber = index, item = value
                                            $header += '<a href="https://instagram.com/explore/tags/'+hashtag+'" target="_blank">#' + hashtag + '&nbsp;</a>';
                                        });
                                    } else {
                                        $header += '#'+looparray[0];
                                    }

                                } else {
                                    $header += 'Instagram';
                                }
                                $header += '</h3>';
                                $header += '</div>';

                                $header += '<div class="sbi_header_img"';
                                if(headerstyle == 'boxed') $header += ' style="background: #'+headersecondarycolor+';"';
                                $header += '>';


                                $header += '<div class="sbi_header_hashtag_icon"';
                                if(headerstyle == 'boxed') $header += ' style="color: #'+headerprimarycolor+';"';
                                $header += '><i class="sbi_new_logo" '+hovertextstyles+'></i></div>';
                                $header += '</div>';
                                if(getType == 'hashtag'){
                                    $header += '</a>';
                                } else {
                                    $header += '</div>';
                                }
                                //Add the header
                                if( $self.find('.sbi_header_link').length == 0 ) $self.find('.sb_instagram_header').prepend( $header );


                                //Header profile pic hover
                                $self.find('.sb_instagram_header .sbi_header_link').hover(function(){
                                    //Change the color of the hashtag circle for hashtag headers to match the color of the header text. This is then faded in in the CSS file.
                                    $self.find('.sbi_feed_type_user .sbi_header_hashtag_icon, .sbi_feed_type_hashtag .sbi_header_hashtag_icon').attr('style', 'background: ' +$self.find('h3').css('color') );

                                    $self.find('.sbi_feed_type_hashtag.sbi_header_style_boxed .sbi_header_hashtag_icon').css({
                                        'background' : '#000',
                                        'color' : '#fff'
                                    });

                                }, function(){
                                    $self.find('.sbi_feed_type_user .sbi_header_hashtag_icon, .sbi_feed_type_hashtag .sbi_header_hashtag_icon').removeAttr('style');

                                    $self.find('.sbi_feed_type_hashtag.sbi_header_style_boxed .sbi_header_hashtag_icon').css({
                                        'background' : '#'+feedOptions.headersecondarycolor,
                                        'color' : '#'+feedOptions.headerprimarycolor
                                    });

                                });

                            } // End get page info
                        } // End header

                        //LOOP THROUGH ITEMS:
                        jQuery.each( imagesArr.data, function( itemNumber, item ) { // itemNumber = index, item = value

                            //Remove photos
                            var removePhoto = false;

                            if(showUsers[0] !== '') {
                                //Check usernames to see whether this user is blocked
                                var hits = 0;
                                jQuery.each(showUsers, function (index, username) {
                                    if (item.user.username == jQuery.trim(username)) {
                                        //This photo was posted by one of the users
                                        hits++;
                                    }
                                });
                                if (hits < 1) {
                                    hidePhotos.push(item.id);
                                }
                            } else {
                                jQuery.each( blockUsers, function( index, username ) {
                                    //If they are then add the photo ID to the hidePhotos array so that we can keep track of how many photos are being hidden, which is needed when clicking the Load More btn
                                    if( item.user.username == jQuery.trim(username) ) {
                                        hidePhotos.push(item.id);
                                    }
                                });
                            }

                            //Exclude words - check captions (if they exist) to see whether it contains any excluded words
                            if( (excludeWords.length > 0 && excludeWords[0] !== '') && item.caption != null && item.caption != ''){

                                jQuery.each( excludeWords, function( index, word ) {
                                    word = jQuery.trim(word).toLowerCase();
                                    if( item.caption.text.toLowerCase().indexOf(word) > -1 && word !== '' ){
                                    }
                                });

                                var workingCaptionEx = ' ' + item.caption.text + ' ';

                                jQuery.each( excludeWords, function( index, word ) {
                                    if(word !== '') {
                                        var needle = encodeURI(jQuery.trim(word).toLowerCase()),
                                            haystack = encodeURI(workingCaptionEx.toLowerCase().replace('#', ' #')),
                                            regex = new RegExp("%20"+needle + "\\b");
                                        haystack = haystack.replace(/#/g, '%20#');

                                        if(regex.test(haystack)) {
                                            //This photo caption contains one of the words so show it
                                            hidePhotos.push(item.id);
                                        }
                                    }
                                });
                            }

                            //Include words - check captions to see whether it contains any included words
                            if(includeWords.length > 0 && includeWords != ''){

                                //If there's no caption then hide the photo
                                if( item.caption == null ){
                                    hidePhotos.push(item.id);
                                } else {

                                    var containsWord = false,
                                        workingCaption = ' ' + item.caption.text + ' ';

                                    jQuery.each( includeWords, function( index, word ) {
                                        var needle = encodeURI(jQuery.trim(word).toLowerCase()),
                                            haystack = encodeURI(workingCaption.toLowerCase().replace('#', ' #')),
                                            regex = new RegExp("%20"+needle + "\\b");

                                        haystack = haystack.replace(/#/g, '%20#');
                                        // if( item.caption.text.toLowerCase().indexOf(word) > -1 ){
                                        //if(haystack.indexOf(needle) != -1 ){
                                        if(regex.test(haystack)) {
                                            //This photo caption contains one of the words so show it
                                            containsWord = true;
                                        }
                                    });

                                    if( containsWord == false && (jQuery.inArray(item.id, hidePhotos) < 1) ){
                                        hidePhotos.push(item.id);
                                    }
                                }

                            }


                            //If it's a video post but has no videos then switch it to be an image post (eg: slideshow posts)
                            if( item.type == 'video' && typeof item.videos == 'undefined' ) item.type = 'image';


                            //Hide photos or videos
                            if( media == 'videos' && item.type !== 'video' ) removePhoto = true;
                            if( media == 'photos' && item.type !== 'image' && item.type !== 'carousel' ) removePhoto = true;


                            //White List
                            if (whiteList.length > 0 && whiteList != '' && !modMode.status == true){
                                if (whiteListIds.indexOf(item.id) === -1) {
                                    hidePhotos.push(item.id);
                                }
                            }

                            //Check the ID of the item to see if it matches any ID in the hidephotos array then skip it and don't iterate the imagesArrCount var
                            jQuery.each( hidePhotos, function( index, id ) {
                                if( item.id == jQuery.trim(id) ) removePhoto = true;
                            });
                            if(removePhoto){
                                removedPhotosCount++;
                                //Remove photo from imagesArr here so that it isn't cached
                                removePhotoIndexes.push(itemNumber);
                                return;
                            }

                            //Used to make sure we display the right amount of photos
                            itemCount++;

                            //This makes sure that only the correct number of photos is shown. So if num is set to 10 then it only shows the next 10 in the array. photosAvailable is subtracted from imagesArrCountOrig as imagesArrCountOrig is updated every time and we need to calculate how many photos are currently displayed in the feed in order to calculate how many to show.
                            if( itemCount > ( (imagesArrCountOrig-photosAvailable )+num) || itemCount <= imagesArrCountOrig ) return;

                            imagesArrCount++; //Keeps track of where we are in the images array


                            //FILTER:
                            //Video
                            var data_video = 'data-video=""';
                            if( item.type == 'video' ){
                                data_video = 'data-video="'+item.videos.standard_resolution.url + '"';
                            }

                            var data_carousel = 'data-carousel=""',
                                videoIsFirstCarouselItem = false;
                            if ( item.type === 'carousel' && typeof item.carousel_media !== 'undefined') {
                                var data_carousel_object = {};
                                jQuery.each(item.carousel_media,function(index,value) {
                                    if (typeof value.images !== 'undefined') {
                                        data_carousel_object[index] = {
                                            'type' : 'image',
                                            'media' : value.images.standard_resolution.url
                                        };
                                    } else if (typeof value.videos !== 'undefined') {
                                        data_carousel_object[index] = {
                                            'type' : 'video',
                                            'media' : value.videos.standard_resolution.url
                                        };

                                        if (index === 0) {
                                            videoIsFirstCarouselItem = true;
                                        }
                                    }
                                });
                                data_carousel = "data-carousel='"+JSON.stringify(data_carousel_object).replace(/'/g, "\\'")+"'";
                                if (typeof item.carousel_media[0].videos !== 'undefined') {
                                    data_video = 'data-video="'+item.carousel_media[0].videos.standard_resolution.url + '"';
                                }
                            }

                            //Image res
                            var data_image = item.images.standard_resolution.url;
                            switch( imgRes.type ){
                                case 'thumbnail':
                                    data_image = item.images.thumbnail.url;
                                    break;
                                case 'low_resolution':
                                    data_image = item.images.low_resolution.url;
                                    break;
                                case 'custom':
                                    data_image = item.images.standard_resolution.url.replace('640x640/',imgRes.width+'x'+imgRes.width+'/');
                                    break;
                                case 'autocustom':
                                    var thisImageReplace = sbiGetBestResolutionForCustom(imgRes.width,item.images.standard_resolution.width,item.images.standard_resolution.height)
                                    data_image = item.images.standard_resolution.url.replace('640x640/',thisImageReplace+'x'+thisImageReplace+'/');
                                    break;
                            }
                            data_image = data_image.split("?ig_cache_key")[0];

                            //Date
                            var date = new Date(item.created_time*1000);
                            //Create time for sorting
                            var created_time_raw = item.created_time;
                            //Create pretty date for display
                            var m = date.getMonth();
                            var d = date.getDate();
                            var month_names = new Array ( );
                            month_names[month_names.length] = "Jan";
                            month_names[month_names.length] = "Feb";
                            month_names[month_names.length] = "Mar";
                            month_names[month_names.length] = "Apr";
                            month_names[month_names.length] = "May";
                            month_names[month_names.length] = "Jun";
                            month_names[month_names.length] = "Jul";
                            month_names[month_names.length] = "Aug";
                            month_names[month_names.length] = "Sep";
                            month_names[month_names.length] = "Oct";
                            month_names[month_names.length] = "Nov";
                            month_names[month_names.length] = "Dec";
                            var itemDate = d + ' ' + month_names[m];

                            //Caption
                            var captionText = '';
                            if(item.caption != null && item.caption != ''){
                                //Replace double quotes in the captions with the HTML symbol
                                var captionText = item.caption.text.replace(/"/g, "&quot;");
                                captionText = captionText.replace(/\n/g, "<br/>");
                            }

                            //Hover display info
                            if( feedOptions.hoverdisplay.indexOf('location') > -1 ){ var showHoverLocation = true; } else { var showHoverLocation = false; }
                            if( feedOptions.hoverdisplay.indexOf('caption') > -1 ){ var showHoverCaption = true; } else { var showHoverCaption = false; }
                            if( feedOptions.hoverdisplay.indexOf('likes') > -1 ){ var showHoverLikes = true; } else { var showHoverLikes = false; }
                            if( feedOptions.hoverdisplay.indexOf('username') > -1 ){ var showHoverUsername = true; } else { var showHoverUsername = false; }
                            if( feedOptions.hoverdisplay.indexOf('icon') > -1 ){ var showHoverIcon = true; } else { var showHoverIcon = false; }
                            if( feedOptions.hoverdisplay.indexOf('date') > -1 ){ var showHoverDate = true; } else { var showHoverDate = false; }
                            if( feedOptions.hoverdisplay.indexOf('instagram') > -1 ){ var showHoverInstagram = true; } else { var showHoverInstagram = false; }


                            //Location
                            if(item.location != null && item.caption != '' && showHoverLocation){
                                if(item.location.name == 'undefined' || item.location.name == null){
                                    var locationName = '';
                                } else {
                                    var sbi_lat = (item.location.hasOwnProperty("latitude")) ? 'data-lat="'+item.location.latitude+'"' : '',
                                        sbi_long = (item.location.hasOwnProperty("longitude")) ? 'data-long="'+item.location.longitude+'"' : '',
                                        locationName = '<a href="https://instagram.com/explore/locations/'+item.location.id+'" class="sbi_location" target="_blank" '+sbi_lat+' '+sbi_long+'><i class="fa fa-map-marker"></i>'+item.location.name+'</a>';
                                }
                            } else {
                                var locationName = '';
                            }

                            var sbiCaptionHTML = '';
                            if(showHoverCaption){
                                sbiCaptionHTML = '<p class="sbi_caption" '+hovertextstyles+'>'+ captionText.substring(0, feedOptions.captionlength);
                                if( captionText.length > parseInt(feedOptions.captionlength) ) sbiCaptionHTML += '...';
                                sbiCaptionHTML += '</p>';
                            }

                            var sbiMetaHTML = '';
                            if(showHoverLikes){
                                sbiMetaHTML = '<div class="sbi_meta" style="color: #'+feedOptions.likescolor+';"><span class="sbi_likes" '+hovertextstyles+'><i class="fa fa-heart" '+hovertextstyles+'></i>'+commaSeparateNumber(item.likes.count)+'</span><span class="sbi_comments" '+hovertextstyles+'><i class="fa fa-comment" '+hovertextstyles+'></i>'+commaSeparateNumber(item.comments.count)+'</span></div>';
                            }

                            var sbiUsernameHTML = '';
                            if(showHoverUsername){
                                sbiUsernameHTML = '<p class="sbi_username"><a href="https://instagram.com/'+item.user.username+'" target="_blank" '+hovertextstyles+'>'+item.user.username+'</a></p>';
                            }

                            var sbiIconHTML = '';
                            if(showHoverIcon){
                                sbiIconHTML = '<i class="fa fa-arrows-alt"></i>';
                            }

                            var sbiDateHTML = '';
                            if(showHoverDate){
                                sbiDateHTML = '<span class="sbi_date"><i class="fa fa-clock-o"></i>'+itemDate + '</span>';
                            }

                            var sbiInstagramHTML = '';
                            if(showHoverInstagram){
                                sbiInstagramHTML = '<a class="sbi_instagram_link" href="'+item.link+'" target="_blank" title="Instagram" '+hovertextstyles+'><i class="fa fa-instagram"></i></a>';
                            }

                            // var sbiHoverEffect = 'sbi_' + feedOptions.hovereffect;
                            var sbiHoverEffect = 'sbi_fade';

                            //If it's a carousel feed then set the image padding directly on the sbi_item as the inherit in the CSS file doesn't work
                            var carouselPadding = (carousel == true) ? ' style="padding: '+imagepadding+imagepaddingunit+' !important;"' : '';

                            var videoIsFirstCarouselItemClass = videoIsFirstCarouselItem ? ' sbi_carousel_vid_first' : '',
                                carouselTypeIcon = item.type === 'carousel' ? '<i class="fa fa-clone sbi_carousel_icon" aria-hidden="true"></i>': '';
                            //TEMPLATE:
                            imagesHTML += '<div class="sbi_item sbi_type_'+item.type+videoIsFirstCarouselItemClass+' sbi_new '+sbiHoverEffect+'" id="sbi_'+item.id+'" data-date="'+created_time_raw+'"'+carouselPadding+'><div class="sbi_photo_wrap">'+carouselTypeIcon+'<i class="fa fa-play sbi_playbtn"></i><div class="sbi_link" '+hovercolorstyles+'><div class="sbi_hover_top">'+sbiUsernameHTML+sbiCaptionHTML+'</div>'+sbiInstagramHTML+'<div class="sbi_hover_bottom" '+hovertextstyles+'><p>'+sbiDateHTML+locationName+'</p>'+sbiMetaHTML+'</div><a class="sbi_link_area" href="'+item.images.standard_resolution.url+'" data-lightbox-sbi="'+$self.attr('data-sbi-index')+'" data-title="'+captionText+'" '+data_video+data_carousel+' data-id="sbi_'+item.id+'" data-user="'+item.user.username+'" data-url="'+item.link+'" data-avatar="'+item.user.profile_picture+'"><i class="fa fa-play sbi_playbtn" '+hovertextstyles+'></i><span class="sbi_lightbox_link" '+hovertextstyles+'>'+sbiIconHTML+'</span></a></div><a class="sbi_photo" href="'+item.link+'" target="_blank"><img src="'+data_image+'" alt="'+captionText+'" width="200" height="200" /></a></div><div class="sbi_info"><p class="sbi_caption_wrap" '+sbiSettings.showcaption+'><span class="sbi_caption" style="color: #'+feedOptions.captioncolor+'; font-size: '+feedOptions.captionsize+'px;">'+captionText+'</span><span class="sbi_expand"> <a href="#"><span class="sbi_more">...</span></a></span></p><div class="sbi_meta" style="color: #'+feedOptions.likescolor+'; '+sbiSettings.showlikes+'"><span class="sbi_likes" style="font-size: '+feedOptions.likessize+'px;"><i class="fa fa-heart" style="font-size: '+feedOptions.likessize+'px;"></i>'+commaSeparateNumber(item.likes.count)+'</span><span class="sbi_comments" style="font-size: '+feedOptions.likessize+'px;"><i class="fa fa-comment" style="font-size: '+feedOptions.likessize+'px;"></i>'+commaSeparateNumber(item.comments.count)+'</span></div></div>';

                            if(modMode.status === true) {
                                imagesHTML += modMode.addModHtml(item.user.username,item.id);
                            }

                            imagesHTML += '</div>';
                        }); //End images.data forEach loop

                        //Loop through and remove any photos from imagesArr which are hidden so that they're not cached
                        removePhotoIndexes.reverse(); //Reverse the indexes in the array so that it takes out the last items first and doesn't affect the order
                        jQuery.each( removePhotoIndexes, function( index, itemNumber ) {
                            imagesArr.data.splice(itemNumber, 1);
                        });

                        if( (imagesArrCount - imagesArrCountOrig) < num ) photosAvailable += imagesArrCount - imagesArrCountOrig;

                        //CACHE all of the photos in the imagesArr using ajax call to db after the photos have been displayed
                        //if(!feedOptions.disablecache && !sbiCacheStatuses.feed) sbiCachePhotos(imagesArr, transientName);
                        var numWhiteListIds = feedOptions.sbiWhiteListIds.replace(/ /g,'').split(",").length;
                        if( ((imagesArrCount - imagesArrCountOrig) < num) && (photosAvailable < num) /*&& (numberOfPhotosDisplayed < num)*/ && (apiRequests < maxRequests) && !noMoreData && (imagesArrCount < numWhiteListIds || feedOptions.sbiWhiteList === '') ){ //Also check here whether next_url is available. If it's not then don't try to get more photos.
                            //Get more photos
                            var sbiFetchURL = imagesArr.pagination.next_url;

                            window.sbiCacheStatuses[feedOptions.feedIndex].feed = 'fetched';

                            sbiFetchData(sbiFetchURL, sbiTransientNames.feed, sbiSettings, $self);
                            //Set the flag so that we know to add the new photos to the imagesArr
                            sbiNewData = true;

                        } else {

                            //If there are enough photos
                            //Add the images to the feed
                            $self.find('#sbi_images').append(imagesHTML);
                            sbiAfterImagesLoaded(imagesArr,sbiTransientNames.feed);

                            imagesHTML = '';

                            //Remove the initial loader
                            $self.find('.sbi_loader').remove();

                            //Hide the spinner in the load more button
                            $loadBtn.find('.fa-spinner').hide();
                            $loadBtn.find('.sbi_btn_text').css('opacity', 1);
                        }


                        //AFTER:
                        //Things to add after the photos have been added
                        function sbiAfterImagesLoaded(imagesArr,transientName){

                            /* Scripts for each feed */
                            $self.find('.sbi_item').each(function(){

                                var $self = jQuery(this),
                                    $sbi_link_area = $self.find('.sbi_link_area');

                                //Change lightbox image to be full size
                                var $sbi_lightbox = jQuery('#sbi_lightbox');
                                $self.find('.sbi_lightbox_link').click(function(){
                                    $sbi_lightbox.removeClass('sbi_video_lightbox');
                                    if( $self.hasClass('sbi_type_video') ){
                                        $sbi_lightbox.addClass('sbi_video_lightbox');
                                        //Add the image as the poster so doesn't show an empty video element when clicking the first video link
                                        jQuery('.sbi_video').attr({
                                            'poster' : jQuery(this).attr('href')
                                        });

                                    }
                                });

                                //Expand post
                                var $post_text = $self.find('.sbi_info .sbi_caption'),
                                    text_limit = feedOptions.captionlength;
                                if (typeof text_limit === 'undefined' || text_limit == '') text_limit = 99999;

                                //Set the full text to be the caption (used in the image alt)
                                var full_text = $self.find('.sbi_photo img').attr('alt');
                                if(full_text == undefined) full_text = '';
                                var short_text = full_text.substring(0,text_limit);

                                //Cut the text based on limits set
                                $post_text.html( short_text );
                                //Show the 'See More' link if needed
                                if (full_text.length > text_limit) $self.find('.sbi_expand').show();
                                //Click function
                                $self.find('.sbi_expand a').unbind('click').bind('click', function(e){
                                    e.preventDefault();
                                    var $expand = jQuery(this);
                                    if ( $self.hasClass('sbi_caption_full') ){
                                        $post_text.html( short_text );
                                        $self.removeClass('sbi_caption_full');
                                    } else {
                                        $post_text.html( full_text );
                                        $self.addClass('sbi_caption_full');
                                    }
                                });

                                //Photo links
                                //If lightbox is disabled
                                if( disablelightbox == 'true' || captionlinks == 'true' ){
                                    if( !sbiTouchDevice ){ //Only apply hover effect if not touch screen device
                                        $self.find('.sbi_photo').hover(function(){
                                            jQuery(this).fadeTo(200, 0.85);
                                        }, function(){
                                            jQuery(this).stop().fadeTo(500, 1);
                                        });
                                    }
                                    if ( captionlinks == 'true' ) {
                                        function sbiUrlDetect(text) {
                                            var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                                            return text.match(urlRegex);
                                        }
                                        var cap = $self.find('img').attr('alt'),
                                            url = sbiUrlDetect(cap);
                                        if(url) {
                                            $self.find('a').attr('href', url);
                                        }
                                    }
                                    //If lightbox is enabled add lightbox links
                                } else {

                                    var $sbi_photo_wrap = $self.find('.sbi_photo_wrap'),
                                        $sbi_link = $sbi_photo_wrap.find('.sbi_link');

                                    if(sbiTouchDevice || feedOptions.hovereffect == 'none'){
                                        //launch lightbox on click
                                        $sbi_link.css('background', 'none').show();
                                        $sbi_link.find('*').hide().end().find('.sbi_link_area').show();
                                    } else {
                                        //Fade in links on hover
                                        $sbi_photo_wrap.hover(function(){
                                            $sbi_link.fadeIn(200);

                                            //Zoom effect
                                            $self.addClass('sbi_animate');
                                        }, function(){
                                            $sbi_link.stop().fadeOut(600);

                                            //Zoom effect
                                            $self.removeClass('sbi_animate');
                                        });

                                    }

                                }

                            }); //End .sbi_item each



                            //Lightbox hide photo function
                            jQuery('.sbi_lightbox_action a').unbind().bind('click', function(){
                                jQuery(this).parent().find('.sbi_lightbox_tooltip').toggle();
                            });


                            //Sort posts by date
                            //only sort the new posts that are loaded in, not the whole feed, otherwise some photos will switch positions due to dates
                            $self.find('#sbi_images .sbi_item.sbi_new').sort(function (a, b) {
                                var aComp = jQuery(a).attr("data-date"),
                                    bComp = jQuery(b).attr("data-date");

                                if(sortby == 'none'){
                                    //Order by date
                                    return bComp - aComp;
                                } else {
                                    //Randomize
                                    return (Math.round(Math.random())-0.5);
                                }

                            }).appendTo( $self.find("#sbi_images") );

                            //Remove the new class after 500ms, once the sorting is done
                            setTimeout(function(){
                                jQuery('#sbi_images .sbi_item.sbi_new').removeClass('sbi_new');
                                //Reset the morePosts variable so we can check whether there are more posts every time the Load More button is clicked
                                morePosts = [];
                            }, 500);


                            var imagesArrLength = imagesArr.data.length;

                            //Adjust the imagesArr length to account for the hidden photos
                            // imagesArrLength = parseInt(imagesArrLength) - parseInt(removedPhotosCount); //June 13 2016 - the imagesArr length is already adjusted earlier and so don't need to adjust it again here
                            //Check initially whether we should show the Load More button. If it's coordinates then if the last API request returns no photos then there are no more to show.
                            if( ( (imagesArrCount >= imagesArrLength) && noMoreData ) || (getType == 'coordinates' && images.data.length == 0) ){
                                $loadBtn.hide();
                            }

                            //If all of the posts in the white list are visible, hide the load button
                            if(sbiSettings.whiteList.length && ($self.find('.sbi_item').length === sbiSettings.whiteListIds.length)){
                                $loadBtn.hide();
                            }

                            //Load More button
                            $self.find('#sbi_load .sbi_load_btn').off().on('click', function(){

                                $loadBtn.find('.fa-spinner').show();
                                $loadBtn.find('.sbi_btn_text').css('opacity', 0);
                                //Reset the photosAvailable var so it can be used again
                                photosAvailable = 0;

                                //Check the global var to see where we are in the array
                                imagesArrCount = parseInt(imagesArrCount);

                                //Adjust the imagesArr length to account for the hidden photos
                                imagesArrLength = imagesArr.data.length;
                                // imagesArrLength = parseInt(imagesArrLength) - parseInt(removedPhotosCount); //June 13 2016 - the imagesArr length is already adjusted earlier and so don't need to adjust it again here
                                var numWhiteListIds = feedOptions.sbiWhiteListIds.replace(/ /g,'').split(",").length;

                                //If there are enough photos left in the array then display them
                                if( (imagesArrCount + num) < imagesArrLength || noMoreData || (imagesArrCount >= numWhiteListIds && feedOptions.sbiWhiteList !== '' &&  modMode.status !== true) ){

                                    if(photosAvailable !== 'finished') sbiBuildFeed(images, transientName, sbiSettings, $self);
                                    //Unset the flag so that we know not to add these photos to the imagesArr again
                                    sbiNewData = false;

                                    //If there are no photos left in the array and there's no more data to load then hide the load more button
                                    if( ( (imagesArrCount >= imagesArrLength) && noMoreData ) || (getType == 'coordinates' && images.data.length == 0) ){
                                        $loadBtn.hide();
                                    }

                                    //If all of the posts in the white list are visible, hide the load button
                                    if(sbiSettings.whiteList.length && ($self.find('.sbi_item').length === sbiSettings.whiteListIds.length)){
                                        $loadBtn.hide();
                                    }

                                    //Else if there aren't enough photos left then hit the api again
                                } else {

                                    sbiFetchURL = imagesArr.pagination.next_url;
                                    window.sbiCacheStatuses[feedOptions.feedIndex].feed = 'fetched';
                                    sbiFetchData(sbiFetchURL, transientName, sbiSettings, $self);
                                    //Set the flag so that we know to add the new photos to the imagesArr
                                    sbiNewData = true;
                                    //Reset this to zero so that we can limit requests to 3 per button click
                                    apiRequests = 0;
                                }


                            }); //End click event
                            if(modMode.status === true) {
                                if(!modMode.$self.hasClass('sbi_mod_merged')) {
                                    modMode.setOriginalPosition();
                                    modMode.resizeFeed();
                                }
                                setTimeout(function () {
                                    modMode.$self.find('.sbi_item .sbi_photo').each(function () {
                                        if (!jQuery(this).hasClass('sbi_mod_changed')) {
                                            jQuery(this).click(function (e) {
                                                modMode.changeClickEvent(jQuery(this), e);
                                            });
                                            jQuery(this).addClass('sbi_mod_changed');
                                        }
                                    });
                                    setTimeout(function () {
                                        modMode.addModSettingsHtml();
                                        modMode.$self.find('.sbi_mod_submit_mod').click(function () {
                                            modMode.submitSelected();
                                        });
                                        modMode.$self.find('.sbi_hide_show_radio').click(function () {
                                            modMode.updateHideOrShow(jQuery(this).val());
                                            modMode.updateDisplay();
                                        });
                                        modMode.$self.find('.sbi_mod_block_user').each(function() {
                                            if(!jQuery(this).hasClass('sbi_mod_changed')) {
                                                jQuery(this).click(function () {
                                                    modMode.updateBlockUser(jQuery(this));
                                                    modMode.updateDisplay();
                                                });
                                                jQuery(this).addClass('sbi_mod_changed');
                                            }
                                        });
                                        modMode.$self.find('.sbi_close_mod').click(function () {
                                            modMode.closeMod();
                                        });
                                        modMode.replaceInfoHtml();
                                        // needed for random bug
                                        jQuery('.sbi_item').each(function() {
                                            jQuery(this).css('height',jQuery('.sbi_photo_wrap').innerHeight()+jQuery('.sbi_info').innerHeight());
                                        });
                                        modMode.updateDisplay();
                                        modMode.$self.addClass('sbi_mod_merged');
                                        modMode.$self.find('.sbi_info').removeClass('sbi_info');
                                        modMode.initClickCopy();
                                    }, 600);

                                }, 350);
                            }

                            if(!$self.hasClass('sbi_carousel') && $self.hasClass('sbi_autoscroll')) {
                                sbiBindAutoScroll($self);
                            }


                            // Call Custom JS if it exists
                            if (typeof sbi_custom_js == 'function') setTimeout(function(){ sbi_custom_js(); }, 100);

                            if( imgRes !== 'thumbnail' ){
                                //This needs to be here otherwise it results in the following error for some sites: $self.find(...).sbi_imgLiquid() is not a function.
                                /*! imgLiquid v0.9.944 / 03-05-2013 https://github.com/karacas/imgLiquid */
                                var sbi_imgLiquid=sbi_imgLiquid||{VER:"0.9.944"};sbi_imgLiquid.bgs_Available=!1,sbi_imgLiquid.bgs_CheckRunned=!1,function(i){function t(){if(!sbi_imgLiquid.bgs_CheckRunned){sbi_imgLiquid.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(sbi_imgLiquid.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({sbi_imgLiquid:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(c.attr("src")))&&u.css({"background-image":'url("'+encodeURI(c.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,c),u.addClass("sbi_imgLiquid_bgSize"),u.addClass("sbi_imgLiquid_ready"),l()}function o(){function e(){c.data("sbi_imgLiquid_error")||c.data("sbi_imgLiquid_loaded")||c.data("sbi_imgLiquid_oldProcessed")||(u.is(":visible")&&c[0].complete&&c[0].width>0&&c[0].height>0?(c.data("sbi_imgLiquid_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(c.data("oldSrc")&&c.data("oldSrc")!==c.attr("src")){var a=c.clone().removeAttr("style");return a.data("sbi_imgLiquid_settings",c.data("sbi_imgLiquid_settings")),c.parent().prepend(a),c.remove(),c=a,c[0].width=0,void setTimeout(o,10)}return c.data("sbi_imgLiquid_oldProcessed")?void r():(c.data("sbi_imgLiquid_oldProcessed",!1),c.data("oldSrc",c.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),c.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),c.on("error",n),c[0].onerror=n,e(),void d())}function d(){(g.responsive||c.data("sbi_imgLiquid_oldProcessed"))&&c.data("sbi_imgLiquid_settings")&&(g=c.data("sbi_imgLiquid_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(d,g.responsiveCheckTime))}function n(){c.data("sbi_imgLiquid_error",!0),u.addClass("sbi_imgLiquid_error"),g.onItemError&&g.onItemError(t,u,c),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-sbi_imgLiquid-fill"),e=u.attr("data-sbi_imgLiquid-horizontalAlign"),o=u.attr("data-sbi_imgLiquid-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===o||"top"!==o&&"bottom"!==o&&"center"!==o&&-1===o.indexOf("%")||(i.verticalAlign=o)}return sbi_imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,o,d,n,s,r,m=0,h=0,f=u.width(),v=u.height();void 0===c.data("owidth")&&c.data("owidth",c[0].width),void 0===c.data("oheight")&&c.data("oheight",c[0].height),g.fill===f/v>=c.data("owidth")/c.data("oheight")?(i="100%",e="auto",a=Math.floor(f),o=Math.floor(f*(c.data("oheight")/c.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(c.data("owidth")/c.data("oheight"))),o=Math.floor(v)),d=g.horizontalAlign.toLowerCase(),s=f-a,"left"===d&&(h=0),"center"===d&&(h=.5*s),"right"===d&&(h=s),-1!==d.indexOf("%")&&(d=parseInt(d.replace("%",""),10),d>0&&(h=s*d*.01)),n=g.verticalAlign.toLowerCase(),r=v-o,"left"===n&&(m=0),"center"===n&&(m=.5*r),"bottom"===n&&(m=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(m=r*n*.01)),g.hardPixels&&(i=a,e=o),c.css({width:i,height:e,"margin-left":Math.floor(h),"margin-top":Math.floor(m)}),c.data("sbi_imgLiquid_oldProcessed")||(c.fadeTo(g.fadeInTime,1),c.data("sbi_imgLiquid_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("sbi_imgLiquid_nobgSize"),u.addClass("sbi_imgLiquid_ready")),g.onItemFinish&&g.onItemFinish(t,u,c),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),c=i("img:first",u);return c.length?(c.data("sbi_imgLiquid_settings")?(u.removeClass("sbi_imgLiquid_error").removeClass("sbi_imgLiquid_ready"),g=i.extend({},c.data("sbi_imgLiquid_settings"),a.options)):g=i.extend({},a.settings,s()),c.data("sbi_imgLiquid_settings",g),g.onItemStart&&g.onItemStart(t,u,c),void(sbi_imgLiquid.bgs_Available&&g.useBackgroundSize?e():o())):void n()})}})}(jQuery);

                                // Use imagefill to set the images as backgrounds so they can be square
                                !function () {
                                    var css = sbi_imgLiquid.injectCss,
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
                                $self.find(".sbi_photo").sbi_imgLiquid({fill:true});
                            }

                            //Only check the width once the resize event is over
                            var sbi_delay = (function(){
                                var sbi_timer = 0;
                                return function(sbi_callback, sbi_ms){
                                    clearTimeout (sbi_timer);
                                    sbi_timer = setTimeout(sbi_callback, sbi_ms);
                                };
                            })();

                            jQuery(window).resize(function(){
                                sbi_delay(function(){
                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();

                                    jQuery('.sbi').each(function() {
                                        var $sbiSelf = jQuery(this),
                                            $i = jQuery(this).attr('data-sbi-index');
                                        if ($sbiSelf.attr('data-res') ==='autocustom') {
                                            var oldRes = window.sbiFeedMeta[$i].minRes;
                                            var imageSize = sbiGetResolutionSettings($sbiSelf, 'autocustom', cols, colsmobile, $i),
                                                width = imageSize.width !== '' ? imageSize.width : sbiGetWidthForResType(imageSize.type);

                                            if (sbiNeedToRaiseRes(width,oldRes)) {
                                                window.sbiFeedMeta[$i].minRes = 640;
                                                $sbiSelf.find('.sbi_item').each(function() {
                                                    var newUrl = jQuery(this).find('.sbi_link_area').length ? jQuery(this).find('.sbi_link_area').attr('href') : '';
                                                    var oldUrl = jQuery(this).find('.sbi_photo img').attr('src'),
                                                        newRes = 640,
                                                        $photo = jQuery(this);
                                                    if (newUrl === '') {
                                                        if (oldUrl.indexOf('p'+oldRes+'x'+oldRes) > -1) {
                                                            newUrl = oldUrl.replace('p'+oldRes+'x'+oldRes,'p'+newRes+'x'+newRes);
                                                        } else if(oldUrl.indexOf('s'+oldRes+'x'+oldRes) > -1) {
                                                            newUrl = oldUrl.replace('s'+oldRes+'x'+oldRes,'s'+newRes+'x'+newRes);
                                                        }
                                                    }

                                                    $photo.find('.sbi_photo img').attr('src',newUrl);
                                                    $photo.find('.sbi_photo').css('background-image','url("'+newUrl+'")');
                                                });
                                            }
                                        }
                                    });

                                }, 500);
                            });

                            //Resize image height
                            function sbiSetPhotoHeight(){

                                if( imgRes !== 'thumbnail' ){
                                    var sbi_photo_width = $self.find('.sbi_photo').eq(0).innerWidth();

                                    //Figure out number of columns for either desktop or mobile
                                    var sbi_num_cols = sbiGetColumnCount($self, parseInt(cols), parseInt(colsmobile));

                                    //Figure out what the width should be using the number of cols
                                    var sbi_photo_width_manual = ( $self.find('#sbi_images').width() / sbi_num_cols ) - (imagepadding*2);

                                    //If the width is less than it should be then set it manually
                                    if( sbi_photo_width <= (sbi_photo_width_manual) ) sbi_photo_width = sbi_photo_width_manual;

                                    $self.find('.sbi_photo').css('height', sbi_photo_width);
                                }

                            }
                            if(carousel == false) sbiSetPhotoHeight();

                            /* Detect when element becomes visible. Used for when the feed is initially hidden, in a tab for example. https://github.com/shaunbowe/jquery.visibilityChanged */
                            !function(i){var n={callback:function(){},runOnLoad:!0,frequency:100,sbiPreviousVisibility:null},c={};c.sbiCheckVisibility=function(i,n){if(jQuery.contains(document,i[0])){var e=n.sbiPreviousVisibility,t=i.is(":visible");n.sbiPreviousVisibility=t,null==e?n.runOnLoad&&n.callback(i,t):e!==t&&n.callback(i,t),setTimeout(function(){c.sbiCheckVisibility(i,n)},n.frequency)}},i.fn.sbiVisibilityChanged=function(e){var t=i.extend({},n,e);return this.each(function(){c.sbiCheckVisibility(i(this),t)})}}(jQuery);

                            //If the feed is initially hidden (in a tab for example) then check for when it becomes visible and set then set the height
                            jQuery(".sbi").filter(':hidden').sbiVisibilityChanged({
                                callback: function(element, visible) {
                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();
                                },
                                runOnLoad: false
                            });

                            if(carousel == true){
                                setTimeout(function(){
                                    //Initiate carousel
                                    if( !carouselautoplay ) carouseltime = false;

                                    //Set defaults for responsive breakpoints
                                    var itemsDesktop = false,
                                        itemsDesktopSmall = false,
                                        itemsTablet = false,
                                        itemsTabletSmall = false,
                                        itemsMobile = false,
                                        sbiWindowWidth = jQuery(window).width();

                                    //Disable mobile layout
                                    if( $self.hasClass('sbi_mob_col_auto') ) {
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7 ) ) itemsTabletSmall = [639,2];
                                        if( sbiWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11 ) ) itemsTabletSmall = [639,4];
                                        if( sbiWindowWidth <= 480 && parseInt(cols) != 2 ) itemsMobile = [480,1];
                                        if( sbiWindowWidth <= 480 && parseInt(cols) == 2 ) itemsMobile = [480,2]; //If the cols are set to 2 then don't change to 1 col on mobile
                                    } else if (sbiWindowWidth <= 480) {
                                        itemsMobile = [480,colsmobile];
                                    }

                                    $self.find(".sbi_carousel").sbi_owlCarousel({
                                        items: cols,
                                        navigation: carouselarrows,
                                        navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
                                        pagination: carouselpag,
                                        autoPlay: carouseltime,
                                        stopOnHover: true,
                                        itemsDesktop: itemsDesktop,
                                        itemsDesktopSmall: itemsDesktopSmall,
                                        itemsTablet: itemsTablet,
                                        itemsTabletSmall: itemsTabletSmall,
                                        itemsMobile: itemsMobile
                                    });

                                    //Fade in the carousel items
                                    jQuery('#sb_instagram #sbi_images.sbi_carousel .sbi_item').fadeIn();

                                    sbiSetPhotoHeight();
                                    sbiGetItemSize();

                                    //Set the position of the arrows
                                    var sbi_arrows_top = ($self.find('.sbi_photo').eq(0).innerWidth()/2);
                                    if(imagepaddingunit == 'px') sbi_arrows_top += parseInt(imagepadding)*2;
                                    $self.find('.sbi_owl-buttons div').css('top', sbi_arrows_top);

                                }, 500);
                            } // End carousel

                            function sbiGetItemSize(){
                                $self.removeClass('sbi_small sbi_medium');
                                var sbiItemWidth = $self.find('.sbi_item').innerWidth();
                                if( sbiItemWidth > 120 && sbiItemWidth < 240 ){
                                    $self.addClass('sbi_medium');
                                } else if( sbiItemWidth <= 120 ){
                                    $self.addClass('sbi_small');
                                }
                            }
                            if(carousel !== true) sbiGetItemSize();
                            // caching done at the end of all posts in the images Array
                            if(!feedOptions.disablecache && typeof _cache !== 'undefined' && window.sbiCacheStatuses[feedOptions.feedIndex].feed === 'fetched') {
                                _cache(imagesArr,transientName); // cache_all_posts
                                window.sbiCacheStatuses[feedOptions.feedIndex].feed = 'cached';
                            }

                            if (!$self.find('.sbi_item').length) {
                                $self.prepend('<div id="sbi_mod_error">No posts to display. You may be filtering out too many posts. See <a href="https://smashballoon.com/post-filtering-not-working/" target="_blank">this post</a> for some possible solutions</div>');
                            }

                            // prevent sbiImagesReady from running code to get and display more posts
                            photosAvailable = 'finished';

                            var $i = $self.attr('data-sbi-index');
                            if (typeof window.sbiFeedMeta[$i].error.errorMsg === 'undefined' && $self.find('.sbi_item').first().find('.sbi_photo img').length && ($self.attr('data-res') === 'autocustom') || !isNaN($self.attr('data-res'))) {
                                var imgCheckUrl = $self.find('.sbi_item').first().find('.sbi_photo img').attr('src');
                                sbiImageExists(imgCheckUrl,function(exists) {
                                    if (!exists) {
                                        var submittedData = {
                                            action: 'sbi_cancel_custom_image_sizing'
                                        };
                                        jQuery.ajax({
                                            url: sbiajaxurl,
                                            type: 'post',
                                            data: submittedData,
                                            success: function (data) {
                                                console.log(data);
                                            }
                                        }); // ajax
                                        console.log(imgCheckUrl + ' does not exist');
                                    }
                                });
                            }

                        } // End sbiAfterImagesLoaded() function


                    } //End buildFeed function

                    function commaSeparateNumber(val){
                        while (/(\d+)(\d{3})/.test(val.toString())){
                            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                        }
                        return val;
                    }

                    function sbiBuildHeader(data, sbiSettings){

                        if(typeof data.meta.error_message !== 'undefined') return;

                        var feedOptions = sbiSettings.feedOptions,
                            headerStyles = '';
                        if(feedOptions.headercolor.length) headerStyles = 'style="color: #'+feedOptions.headercolor+'"';

                        $header = '<a href="https://instagram.com/'+data.data.username+'" target="_blank" title="@'+data.data.username+'" class="sbi_header_link" '+headerStyles+'>';
                        $header += '<div class="sbi_header_text';
                        if( ( typeof data.data.bio !== 'undefined' && data.data.bio.length < 1 ) || feedOptions.showbio != 'true' ) $header += ' sbi_no_bio';
                        if( ( ( typeof data.data.bio !== 'undefined' && data.data.bio.length == 0 ) || feedOptions.showbio != 'true' ) && feedOptions.showfollowers != 'true' ) $header += ' sbi_no_info';
                        $header += '">';
                        $header += '<h3 '+headerStyles+'>'+data.data.username+'</h3>';

                        //Compile and add the header info
                        var $headerInfo = '<p class="sbi_bio_info" ';
                        if(feedOptions.headerstyle == 'boxed'){
                            $headerInfo += 'style="color: #' + feedOptions.headerprimarycolor + ';"';
                        } else {
                            $headerInfo += headerStyles;
                        }
                        if ( typeof data.data.counts !== 'undefined') $headerInfo += '><span class="sbi_posts_count"><i class="fa fa-photo"></i>'+commaSeparateNumber(data.data.counts.media)+'</span><span class="sbi_followers"><i class="fa fa-user" style="margin-right: 3px;"></i>'+commaSeparateNumber(data.data.counts.followed_by)+'</span></p>';

                        if(feedOptions.showfollowers != '' && feedOptions.showfollowers != 'false' && feedOptions.headerstyle !== 'boxed') $header += $headerInfo;

                        //Add the bio
                        if( typeof data.data.bio !== 'undefined' && data.data.bio.length > 1 && feedOptions.showbio != '' && feedOptions.showbio != 'false' ) $header += '<p class="sbi_bio" '+headerStyles+'>'+data.data.bio+'</p>';
                        $header += '</div>';
                        $header += '<div class="sbi_header_img">';
                        $header += '<div class="sbi_header_img_hover"><i class="sbi_new_logo"></i></div>';
                        $header += '<img src="'+data.data.profile_picture+'" alt="'+data.data.full_name+'" width="50" height="50">';
                        $header += '</div>';
                        $header += '</a>';
                        if(feedOptions.headerstyle == 'boxed') {
                            $header += '<div class="sbi_header_bar" style="background: #'+feedOptions.headersecondarycolor+'">';
                            if(feedOptions.showbio != 'false') $header += $headerInfo;
                            $header += '<a class="sbi_header_follow_btn" href="https://instagram.com/'+data.data.username+'" target="_blank" style="color: #'+feedOptions.headercolor+'; background: #'+feedOptions.headerprimarycolor+';"><i class="sbi_new_logo"></i><span></span></div></div>';
                        }

                        //Add the header to the feed
                        if( $self.find('.sbi_header_link').length == 0 ) $self.find('.sb_instagram_header').prepend( $header );

                        //Change the URL of the follow button
                        if( $self.find('.sbi_follow_btn').length ) $self.find('.sbi_follow_btn a').attr('href', 'https://instagram.com/' + data.data.username );
                        //Change the text of the header follow button
                        if( feedOptions.headerstyle == 'boxed' && $self.find('.sbi_header_follow_btn').length ) $self.find('.sbi_header_follow_btn span').text( $self.find('.sb_instagram_header').attr('data-follow-text').replace(/\\/g, "") );


                        //Header profile pic hover
                        $self.find('.sb_instagram_header .sbi_header_link').hover(function(){
                            $self.find('.sb_instagram_header .sbi_header_img_hover').fadeIn(200);
                        }, function(){
                            $self.find('.sb_instagram_header .sbi_header_img_hover').stop().fadeOut(600);
                        });

                    } // End sbiBuildHeader()


                    function sbiFetchData(next_url, transientName, sbiSettings, $self) {
                        apiURLs = next_url;
                        var urlCount = apiURLs.length,
                            getType = sbiSettings.getType;

                        //If the apiURLs array is empty then this means that there's no more next_urls and so hide the load more button
                        if( urlCount == 0 ){

                            //Don't hit the API any more
                            //If there's no more photos to retrieve then hide the load more button
                            if( imagesArrCount + parseInt(sbiSettings.num) >= imagesArr.data.length ){
                                //Hide the Load More button
                                jQuery('#sbi_load .sbi_load_btn').hide();
                            }

                        } else {

                            var returnedImages = [],
                                numberOfRequests = urlCount;
                            jQuery.each(apiURLs, function(index, entry){

                                jQuery.ajax({
                                    method: "GET",
                                    url: entry,
                                    dataType: "jsonp",
                                    success: function(data) {
                                        //Pretty error messages
                                        var sbiErrorResponse = data.meta.error_message,
                                            sbiErrorMsg = '',
                                            sbiErrorDir = '';

                                        if(typeof sbiErrorResponse !== 'undefined'){

                                            if( sbiErrorResponse.indexOf('access_token') > -1 ){
                                                sbiErrorMsg += '<p><b>Error: Access Token is not valid or has expired</b><br /><span>This error message is only visible to WordPress admins</span>';
                                                sbiErrorDir = "<p>There's an issue with the Instagram Access Token that you are using. Please obtain a new Access Token on the plugin's Settings page.<br />If you continue to have an issue with your Access Token then please see <a href='https://smashballoon.com/my-instagram-access-token-keep-expiring/' target='_blank'>this FAQ</a> for more information.";
                                                jQuery('#sb_instagram').empty().append( '<p style="text-align: center;">Unable to show Instagram photos</p><div id="sbi_mod_error">' + sbiErrorMsg + sbiErrorDir + '</div>');
                                                return;
                                            } else if( sbiErrorResponse.indexOf('user does not exist') > -1 || sbiErrorResponse.indexOf('you cannot view this resource') > -1 ){
                                                window.sbiFeedMeta[$i].error = {
                                                    errorMsg    : '<p><b>Error: User ID <span class="sbiErrorIds">'+window.sbiFeedMeta[$i].idsInFeed[index]+'</span> does not exist, is invalid, or is private</b><br /><span>This error is only visible to WordPress admins</span>',
                                                    errorDir    : "<p>Please double check that the Instagram User ID you are using is valid and not from a private account. To find your User ID simply enter your Instagram user name into this <a href='https://smashballoon.com/instagram-feed/find-instagram-user-id/' target='_blank'>tool</a>.</p>"
                                                };
                                                if (!$self.find('#sbi_mod_error').length) {
                                                    $self.prepend('<div id="sbi_mod_error">'+window.sbiFeedMeta[$i].error.errorMsg+window.sbiFeedMeta[$i].error.errorDir+'</div>');
                                                } else if ($self.find('.sbiErrorIds').text().indexOf(window.sbiFeedMeta[$i].idsInFeed[index]) == -1) {
                                                    $self.find('.sbiErrorIds').append(','+window.sbiFeedMeta[$i].idsInFeed[index]);
                                                }
                                                data = 'error';
                                            } else if( sbiErrorResponse.indexOf('invalid media id') > -1 ){
                                                window.sbiFeedMeta[$i].error = {
                                                    errorMsg    : '<p><b>Error: Post Id <span class="sbiErrorIds">'+window.sbiFeedMeta[$i].idsInFeed[index]+'</span> does not exist or is invalid</b><br /><span>This error is only visible to WordPress admins.</span>',
                                                    errorDir    : "<p>Please double check the media (post) id is correct.</p>"
                                                };
                                                if (!$self.find('#sbi_mod_error').length) {
                                                    $self.prepend('<div id="sbi_mod_error">'+window.sbiFeedMeta[$i].error.errorMsg+window.sbiFeedMeta[$i].error.errorDir+'</div>');
                                                } else if ($self.find('.sbiErrorIds').text().indexOf(window.sbiFeedMeta[$i].idsInFeed[index]) == -1) {
                                                    $self.find('.sbiErrorIds').append(','+window.sbiFeedMeta[$i].idsInFeed[index]);
                                                }
                                                data = 'error';
                                            }

                                        }

                                        //If it's a coordinates type then add the existing URL to the object so that we can use it to create the next URL for pagination
                                        if( getType == 'coordinates' ) data.pagination = {'previous_url':entry};

                                        if (data !== 'error') returnedImages.push(data);

                                        numberOfRequests--;
                                        if(numberOfRequests == 0 && photosAvailable !== 'finished') sbiImagesReady(getType);

                                    }

                                })

                            });

                            //When all of the images have been returned then pass them to the buildFeed function
                            function sbiImagesReady(getType){

                                var paginationArr = [],
                                    returnedImagesArr = [];

                                //Loop through the array of returned sets of data from the Instagram API
                                jQuery.each( returnedImages, function( index, object ) {

                                    if(getType == 'single') {
                                        object.data = [ object.data ] ;
                                    }

                                    if( typeof object.data !== 'undefined' ){ //Check whether the returned object has data in it as error may be returned it
                                        //Loop through each image object in the array and add it to the returnedImagesArr for sorting
                                        jQuery.each( object.data, function( index, image ) {

                                            //Filter out duplicate images here. This is after the items have been counted (used below for coordinates pagination) but before being cached as duplicate images don't need to be cached.
                                            if( jQuery.inArray(image.id, photoIds) > -1 ){
                                                //Duplicate image
                                            } else {
                                                photoIds.push(image.id);
                                                returnedImagesArr.push( image );
                                            }
                                        });


                                        if(getType == 'coordinates'){
                                            //If it's a coordinates then need to create the next_url string manually by using max_timestamp and then push it onto the array

                                            //Get the created_date of the last object so we can use it to create the next_url
                                            var lastCreatedTime = object.data[ object.data.length - 1 ].created_time,
                                                existing_url = object.pagination.previous_url,
                                                existing_url_parts = existing_url.split('max_timestamp='),
                                                new_url = existing_url_parts[0] + 'max_timestamp=' + lastCreatedTime;

                                            //If the number of photos returned (eg: 10) is less than the number the user wants to display (eg: 20) then there are no more photos to load for this coordinates
                                            paginationArr.push( new_url );

                                        } else {
                                            //If there's a next_url then add it to the pagination array
                                            if( typeof object.pagination !== 'undefined' && typeof object.pagination.next_url !== 'undefined' ) paginationArr.push( object.pagination.next_url );
                                        }

                                    }

                                });

                                //Sort the images by date if not set to random
                                if(sortby !== 'random') {
                                    returnedImagesArr.sort(function(x, y){
                                        return y.created_time - x.created_time;
                                    });
                                } else {
                                    returnedImagesArr.sort(function (a, b) {
                                        //Randomize
                                        return (Math.round(Math.random())-0.5);
                                    });
                                    transientName += '!';
                                }

                                //Add the data and pagination objects to the first object in the array so that we can create a super object to send back
                                if (typeof returnedImages !== 'undefined') returnedImages[0].data = returnedImagesArr;

                                //Replace the next_url string with an array of URLs
                                //If it's a coordinates type then we need to create the pagination object here as it doesn't exist yet
                                if(typeof returnedImages[0].pagination !== 'undefined') {
                                    //if( typeof returnedImages[0].pagination.next_url !== 'undefined' ) {
                                    returnedImages[0].pagination.next_url = paginationArr;
                                    //}
                                } else {
                                    returnedImages[0].pagination = {
                                        "next_url" : ""
                                    };
                                }
                                var allImages = returnedImages[0];
                                //Pass the returned images to the buildFeed function

                                if(photosAvailable !== 'finished') sbiBuildFeed(allImages, transientName, sbiSettings, $self);

                                //Iterate the API request variable so that we can limit of the number of subsequent API requests when the Load More button is clicked
                                apiRequests++;

                            } // End sbiImagesReady()

                        }

                    } //End sbiFetchData()

                    //Cache the likes and comments counts by sending an array via ajax to the main plugin file which then stores it in a transient
                    function sbiGetCache(transientName, sbiSettings, $self, cacheWhat, apiURLs){
                        var transientData = transientName;
                        window.sbiCommentCacheStatus = 0;

                        // our initial request now sends all transient names at once
                        if (typeof transientName === 'object') {
                            transientData = JSON.stringify(transientName);
                        }
                        var getCacheOpts = {
                            url: sbiajaxurl,
                            type: 'POST',
                            async: true,
                            cache: false,
                            data:{
                                action: 'get_cache',
                                transientName: transientData
                            },
                            success: function(data) {

                                //Decode the JSON to that it can be used again
                                data = decodeURI(data);
                                data = data.replace(/\\'/g, "'");

                                //Replace any escaped single quotes as it results in invalid JSON

                                data = data.replace(/\\'/g, "'");
                                //Convert the cached JSON string back to a JSON object
                                var jsonobj = JSON.parse( data );

                                if ( cacheWhat == 'all' ) {
                                    if (typeof jsonobj.header.error === 'undefined') {
                                        sbiBuildHeader(jsonobj.header, sbiSettings);
                                    }
                                    if (typeof jsonobj.feed.error === 'undefined') {
                                        if(photosAvailable !== 'finished') sbiBuildFeed(jsonobj.feed, transientName, sbiSettings, $self);
                                    } else {
                                        // get the index of the feed to check what processes have been done already
                                        feedOptions = JSON.parse($self[0].getAttribute('data-options'));
                                        var thisIndex = $self[0].getAttribute('data-sbi-index');
                                        feedOptions.feedIndex = thisIndex;
                                        // if the cache is unavailable and the user has enabled an attempt at the api, "tryfetch" is returned as the error
                                        if (window.sbiCacheStatuses[thisIndex].feed !== false && jsonobj.feed.error === 'tryfetch') {
                                            // on the second try, indicate that the cache isn't available to prevent this endless loop
                                            window.sbiCacheStatuses[thisIndex].feed = false;
                                            // comments do not need to be retrieved
                                            window.sbiCacheStatuses[thisIndex].comments = 'no';
                                            // prevents multiple attempts
                                            feedOptions.tryFetch = true;
                                            // start from scratch with updated feed options and statuses
                                            if (typeof window.sbiCacheStatuses[feedOptions.feedIndex].tryFetch === 'undefined') sbiCreateFeed($self[0], feedOptions);
                                        } else if (window.sbiCacheStatuses[thisIndex].feed === true) {
                                            var sbiErrorMsg = '<p><b>Cache Error: Looking for cache that doesn\'t exist</b><br /><span>This error is only visible to WordPress admins.</span>';
                                            var sbiErrorDir = "<p>If you are using a caching plugin, try enabling the option on the Customize tab 'Cache error API recheck' or 'Force cache to clear on interval'</p>";
                                            jQuery('#sb_instagram').empty().append( '<p style="text-align: center;">Unable to show Instagram photos</p><div id="sbi_mod_error">' + sbiErrorMsg + sbiErrorDir + '</div>');
                                        }

                                    }
                                    if (typeof jsonobj.comments.error === 'undefined') {
                                        sb_instagram_js_options.sbiPageCommentCache = jsonobj.comments;
                                    }

                                } else {
                                    if( cacheWhat == 'header' ){
                                        sbiBuildHeader(jsonobj, sbiSettings);
                                    } else {
                                        if(photosAvailable !== 'finished') sbiBuildFeed(jsonobj, transientName, sbiSettings, $self);
                                    }
                                }
                                //Pass the returned images to the buildFeed function

                            },
                            error: function(xhr,textStatus,e) {
                                console.log(e);
                                return;
                            }
                        };

                        jQuery.ajax(getCacheOpts);

                    }

                } // sbiCreateFeed

            }); // End jQuery('#sb_instagram.sbi').each

            function sbiBindAutoScroll($sbi) {
                //var scrollPosOffset = parseInt($sbi.attr('data-scroll-offset'));
                var scrollPosOffset = parseInt($sbi.attr('data-scrolldistance')),
                    sbiScrolled = 0;

                //Scroll the container if it has a height
                if ($sbi.hasClass('sbi_fixed_height')) {
                    $sbi.on('scroll', function () {

                        var yScrollPos = $sbi.scrollTop(),
                            windowSize = $sbi.innerHeight(),
                            bodyHeight = $sbi[0].scrollHeight,
                            triggerDistance = bodyHeight - scrollPosOffset - windowSize;

                        if (yScrollPos > triggerDistance) {
                            $sbi.unbind('scroll');
                            if (sbiScrolled === 0) {
                                sbiScrolled = 1;
                                $sbi.find('.sbi_load_btn').trigger('click');
                            }
                        }
                    });
                    //Scrolling the window
                } else {
                    jQuery(window).scroll(function () {
                        var yScrollPos = window.pageYOffset,
                            windowSize = window.innerHeight,
                            bodyHeight = document.body.offsetHeight,
                            triggerDistance = bodyHeight - scrollPosOffset - windowSize;

                        if (yScrollPos > triggerDistance) {
                            jQuery(window).unbind('scroll');
                            if (sbiScrolled === 0) {
                                sbiScrolled = 1;
                                // check to make sure there are still tweets available
                                if (!$sbi.find('.ctf-out-of-tweets').length) {
                                    $sbi.find('.sbi_load_btn').trigger('click');
                                }
                            }
                        }
                    });
                }

            }

        }


    } // sb_init

    function sbiCachePhotos(images, transientName){
        //Convert the JSON object to a string
        var jsonstring = JSON.stringify( images );

        //Encode the JSON string so that it can be stored in the database
        jsonstring = encodeURI(jsonstring);

        if (jsonstring.indexOf('%7B%22') === 0) {
            var setCacheOpts = {
                url: sbiajaxurl,
                type: 'POST',
                async: true,
                cache: false,
                data:{
                    action: 'cache_photos',
                    photos: jsonstring,
                    transientName: transientName
                },
                success: function(response) {
                    return;
                },
                error: function(xhr,textStatus,e) {
                    console.log(e);
                    return;
                }
            };
            jQuery.ajax(setCacheOpts);
        }

    }

    //function function sbiSetPhotoHeight(){
    function sbiGetColumnCount($self, cols, colsmobile) {
        var sbi_num_cols = cols,
            sbiWindowWidth = jQuery(window).width();

        if( $self.hasClass('sbi_mob_col_auto') ){
            if( sbiWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7 ) ) sbi_num_cols = 2;
            if( sbiWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11 ) ) sbi_num_cols = 4;
            if( sbiWindowWidth <= 480 && parseInt(cols) > 2 ) sbi_num_cols = 1;
        } else if (sbiWindowWidth <= 480){
            sbi_num_cols = colsmobile;
        }

        return sbi_num_cols;
    }

    function sbiGetWidthForResType(type) {
        switch (type) {
            case 'thumbnail':
                return 150;
            case 'low_resolution':
                return 320;
            default:
                return 640;
        }
    }

    function sbiGetBestResolutionForCustom(colWidth,imageWidth,imageHeight) {
        var aspectRatio = Math.max(1,imageWidth/imageHeight),
            bestWidth = colWidth*aspectRatio,
            bestWidthRounded = Math.ceil(bestWidth / 10) * 10,
            customSizes = [30,40,50,60,80,90,100,120,130,150,160,180,190,200,240,270,280,320,350,360,390,480,540,600,640,720,750,800,810,960,1280];;

        if (customSizes.indexOf(parseInt(bestWidthRounded)) === -1) {
            var done = false;
            jQuery.each(customSizes, function (index, item) {
                if (item > parseInt(bestWidthRounded) && !done) {
                    bestWidthRounded = item;

                    done = true;
                }
            });
        }

        return bestWidthRounded;
    }

    function sbiImageExists(url, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

// Sample usage


    function sbiNeedToRaiseRes(width,oldRes) {
        return (width > oldRes);
    }

    function sbiGetResolutionSettings($self, imgRes, cols, colsmobile, $i) {
        var feedWidth = $self.innerWidth(),
            //colWidth = $self.innerWidth() / cols,
            photoPadding = parseInt($self.find('#sbi_images').css('padding')) * 2,
            cols = sbiGetColumnCount($self, parseInt(cols), parseInt(colsmobile)),
            colWidth = ($self.innerWidth() / cols) - photoPadding,
            imgResReturn = {
                'type'  : 'low_resolution',
                'width' : ''
            },
            customSizes = [30,40,50,60,80,90,100,120,130,150,160,180,190,200,240,270,280,320,350,360,390,480,540,600,640,720,750,800,810,960,1280];
        if (!isNaN(imgRes)) {
            imgResReturn.type = 'custom';
            if (customSizes.indexOf(parseInt(imgRes)) > -1) {
                imgResReturn.width = imgRes;
            } else {
                var done = false;
                jQuery.each(customSizes,function(index,item) {
                    if (item > parseInt(imgRes) && !done) {
                        imgResReturn.width = item;
                        done = true;
                    }
                });
            }
        } else {
            switch(imgRes) {
                case 'auto':
                    colWidth = feedWidth/cols;
                    //Check if page width is less than 640. If it is then use the script above
                    var sbiWindowWidth = jQuery(window).width();
                    if( sbiWindowWidth < 640 && $self.is('.sbi_mob_col_auto') ){
                        //Need this for mobile so that image res is right on mobile, as the number of cols isn't always accurate on mobile as they are changed using CSS
                        if( feedWidth < 640 && $self.is('.sbi_col_1') ) colWidth = 480; //Use full size images - this is for carousel as it's always set to sbi_col_1
                        if( feedWidth < 640 && $self.is('.sbi_col_3, .sbi_col_4, .sbi_col_5, .sbi_col_6') ) colWidth = 300; //Use medium images
                        if( feedWidth < 640 && $self.is('.sbi_col_7, .sbi_col_8, .sbi_col_9, .sbi_col_10') ) colWidth = 100; //Use thumbnail images
                        if( (feedWidth > 320 && feedWidth < 480) && sbiWindowWidth < 480 ) colWidth = 480; //Use full size images
                        if( feedWidth < 320 && sbiWindowWidth < 480 ) colWidth = 300; //Use medium size images
                    }

                    if( colWidth < 150 ){
                        imgResReturn.type = 'thumbnail';
                    } else if( colWidth < 320 ){
                        imgResReturn.type = 'low_resolution';
                    } else {
                        imgResReturn.type = 'standard_resolution';
                    }

                    break;
                case 'autocustom':
                    //var imageSize = Math.ceil(colWidth / 10) * 10;

                    if (colWidth > 960) {
                        imgResReturn.type = 'custom';
                        imgResReturn.width = 1280;
                    } else if((colWidth > 130 && colWidth <= 150)
                        || (colWidth > 280 && colWidth <= 320)
                        || (colWidth > 600 && colWidth <= 640) ) {

                        if( colWidth < 150 ){
                            imgResReturn.type = 'thumbnail';
                            imgResReturn.width = 150;
                        } else if( colWidth <= 320 ){
                            imgResReturn.type = 'low_resolution';
                            imgResReturn.width = 320;
                        } else {
                            imgResReturn.type = 'standard_resolution';
                            imgResReturn.width = 640;
                        }

                    } else {
                        imgResReturn.type = 'autocustom';
                        imgResReturn.width = colWidth;
                    }

                    break;
                case 'thumb':
                    imgResReturn.type = 'thumbnail';
                    break;
                case 'medium':
                    imgResReturn.type = 'low_resolution';
                    break;
                default:
                    // do custom sizes if set
                    imgResReturn.type = 'standard_resolution';
            }
        }

        if ( typeof window.sbiFeedMeta[$i].minRes === 'undefined' ) {
            window.sbiFeedMeta[$i].minRes = imgResReturn.type === 'autocustom' ? sbiGetBestResolutionForCustom(colWidth,imgResReturn.width,imgResReturn.width): sbiGetWidthForResType(imgResReturn.type);
        }

        return imgResReturn;
    }
    // Called at the very end of the feed creation process
    // Takes all of the data retrieved from the API during the feed creation process and caches it
    function sbi_cache_all(imagesArr,transientName) {
        if (transientName.indexOf('header') && typeof imagesArr.data.pagination === 'undefined') {
            sbiCachePhotos(imagesArr,transientName);
        } else if (!transientName.indexOf('header') && typeof imagesArr.data.pagination !== 'undefined') {
            sbiCachePhotos(imagesArr,transientName);
        }
    }

    jQuery( document ).ready(function() {
        window.sbiCommentCacheStatus = 0;
        sbi_init(function(imagesArr,transientName) {
            sbi_cache_all(imagesArr,transientName);
        });
    });


} // end sbi_js_exists check