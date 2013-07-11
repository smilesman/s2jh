/**
 */

(function($) {

    $.extend(Tab.prototype, {
        add : function(url,title,active) {
            $('<li class=""><a href="#profile" data-toggle="tab">添加-用户</a></li>')
            .appendTo(this.element);
        }
    })

})(jQuery);