/**
 */

(function($) {
	
	$.extend($.ui.autocomplete.prototype.options, {
	    minLength: 1,
        delay: 500,
        autoFocus:false
	});
	
	$.extend($.ui.autocomplete.prototype, {
        _init: function() {
            var self = this.element;
            var inited=$(self).attr("inited");
            if(inited){
                return $(self);
            }else{
                $(self).attr("inited","autocomplete");
            }

            $(self).data("autocomplete")._renderItem = function( ul, item ) {
                return $( "<li></li>" )
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + "</a>" )
                    .appendTo( ul );
            };
        }
    });
    
	
})(jQuery);