(function($) {

    $.extend($.fn, {
        splitor : function(options) {

            var west = jQuery.extend({
                size : 200,
                spacing_closed : 21 // wider space when closed
                ,
                togglerLength_closed : 21 // make toggler 'square' -
                // 21x21
                ,
                togglerAlign_closed : "top" // align to top of resizer
                ,
                togglerLength_open : 0 // NONE - using custom togglers
                // INSIDE west-pane
                ,
                togglerTip_open : "Close West Pane",
                togglerTip_closed : "Open West Pane",
                resizerTip_open : "Resize West Pane",
                slideTrigger_open : "mouseover" // default
                ,
                initClosed : false
            }, options.west);

            var settings = {
                name : "outerLayout" // NO FUNCTIONAL USE, but could be used
                // by custom code to 'identify' a layout
                // options.defaults apply to ALL PANES - but overridden by
                // pane-specific settings
                ,
                defaults : {
                    size : "auto",
                    minSize : 50,
                    paneClass : "pane" // default = 'ui-layout-pane'
                    ,
                    resizerClass : "resizer" // default =
                    // 'ui-layout-resizer'
                    ,
                    togglerClass : "toggler" // default =
                    // 'ui-layout-toggler'
                    ,
                    buttonClass : "button" // default = 'ui-layout-button'
                    ,
                    contentSelector : ".content" // inner div to
                    // auto-size so
                    // only it scrolls, not the
                    // entire pane!
                    ,
                    contentIgnoreSelector : "span" // 'paneSelector' for
                    // content to 'ignore' when
                    // measuring room for
                    // content
                    ,
                    togglerLength_open : 35 // WIDTH of toggler on
                    // north/south
                    // edges - HEIGHT on east/west edges
                    ,
                    togglerLength_closed : 35 // "100%" OR -1 = full
                    // height
                    ,
                    hideTogglerOnSlide : true // hide the toggler when
                    // pane is
                    // 'slid open'
                    ,
                    togglerTip_open : "Close This Pane",
                    togglerTip_closed : "Open This Pane",
                    resizerTip : "Resize This Pane",
                    fxName : "slide" // none, slide, drop, scale
                    ,
                    fxSpeed : "slow" // slow, normal, fast, 1000, nnn
                },
                west : west,
                center : {
                    onresize_end : function() {
                        $.resetCalculateGridWidth();
                    }
                }
            };

            var outerLayout = $(this).layout(settings);

            // save selector strings to vars so we don't have to repeat it
            // must prefix paneClass with "body > " to target ONLY the
            // outerLayout panes
            var westSelector = "body > .ui-layout-west"; // outer-west pane

            // CREATE SPANs for pin-buttons - using a generic class as
            // identifiers
            $("<span></span>").addClass("pin-button").prependTo(westSelector);
            // BIND events to pin-buttons to make them functional
            outerLayout.addPinBtn(westSelector + " .pin-button", "west");

            // CREATE SPANs for close-buttons - using unique IDs as identifiers
            $("<span></span>").attr("id", "west-closer").prependTo(westSelector);
            // BIND layout events to close-buttons to make them functional
            outerLayout.addCloseBtn("#west-closer", "west");

            return this;
        }
    });

})(jQuery);
