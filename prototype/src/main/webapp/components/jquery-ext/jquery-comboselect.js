(function($) {
	$.widget("ui.comboselect", {
		options: {
			delay: 60,
			title: '展开',
			minLength: 1,
			highlight: true,
			autoFocus:true
		},
		_create: function() {
			
			var self = this,
				select = self.element.hide(),
				el_selected = select.children(':selected').eq(0),
				select_text = el_selected[0] && el_selected.text()  || '',
				select_val = el_selected[0] && el_selected.val() || '';

			var selectRequired=select.attr("required");
			
			$.each(select.children("option"),function(){
				$(this).attr("pinyin",makePy(this.text));
			});
			
			var divContaner=$('<div class="input-append"/>');
			divContaner.insertBefore(select);
			
			var input = self.input = $("<input type='text' "+ (select.attr('required')?" required='true' ":"") +"/>");
			input.attr('name', 'combobox_' + (''+Math.random()).slice(-6))
				.val( select_text )
				.addClass(select.attr("class"))
				.appendTo(divContaner)
				.autocomplete({
					source: function(request, response) {
						// var matcher = new RegExp(request.term, "i");	// 当输入如c++的类正则字符时会抛出 invalid quantifier +
						// edit waiting: 使用not过滤掉被禁止项目，实现通过仅用项目来动态屏蔽搜索结果
						response(select.children("option").not(':disabled').map(function() {
							var showText=this.text;
							var showValue=this.value;
							
							var pinyin=$(this).attr("pinyin");
							// if (this.value && (!request.term || matcher.test(text)))
							if(this.value==''){
								return {
									label: "&nbsp;",
									value: this.value,
									option: this
								};
							}
							if (this.value && (!request.term || showText.toLowerCase().indexOf(request.term.toLowerCase()) >= 0
									|| pinyin.toLowerCase().indexOf(request.term.toLowerCase()) >= 0)) {
								if(self.options.highlight && request.term!=''){
									showText= showText.replace(
											new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													$.ui.autocomplete.escapeRegex(request.term) +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<strong><font color=red>$1</font></strong>" );
								}
								return {
									label: showText,
									value: this.text,
									option: this
								};
							}
						}));
					},
					// 修正 change事件的滞后性,用于表单当通过按钮选择项目后直接提交会导致select选项未更新从而提交的是错误值 !
					select: function(event, ui) {
						select.val( ui.item.option.text );	// 更新select值
						ui.item.option.selected = true;
						self._trigger("selected", event, {
							item: ui.item.option
						});
						select.closest("form").attr("_inputChanged",'true');
					},
					change: function(event, ui) {	// 用select事件来联动<select>,change只用来做输入不匹配时处理
						//alert("aa");
						select.closest("form").attr("_inputChanged",'true');
					//if (!ui.item) {	// 当选择提示条目后继续输入到不匹配状态然后失焦,IE为空,FF为真,故跳过此判断
						var input = $(this),
							inputVal = input.val(),
							valid = false;
						
						if($.isFunction(self.options.change)){
							self.options.change(select.val());
						}
						
						if(inputVal==''){
							//select.prop('selectedIndex', -1).val('');  // for jQuery 1.6+
							select.attr('selectedIndex', -1).val('');	// for jQuery pre 1.6
							input.attr('title','');
							input.data( "ui-autocomplete" ).term = '';
							return false;
						}
						
						select.children( "option" ).each(function() {
							if ( this.text === inputVal ) {	// 如果手动输入有匹配项目则不清空
								this.selected = valid = true;
								return false;
							}
						});
						//alert(select.val());
						if (!valid) {		
							//select.prop('selectedIndex', -1).val('');  // for jQuery 1.6+
							select.attr('selectedIndex', -1).val('');	// for jQuery pre 1.6
							input.data( "ui-autocomplete" ).term = '';
							// remove invalid value, as it didn't match anything
							input.val('');
							
							return false;
						}
						
						//}
					},
					delay: self.options.delay,
					minLength: self.options.minLength,
					autoFocus: self.options.autoFocus
				})
				.dblclick(function() {
					select.val('');
					input.val('');
					input.data( "ui-autocomplete" ).term = '';
					select.closest("form").attr("_inputChanged",'true');
				});
			
		
	         if(selectRequired){
	             input.attr("required",selectRequired);
	         }
			
			
			// 非IE下绑定input事件来兼容输入法中文输入
			if (!jQuery.browser.msie) {
				input[0].addEventListener(
						'input', 
						function() {
							var val = this.value;
							if (val) {
								$(this).autocomplete("search", val);
							}
						}, false
				);
			}
			
			input.focus(function(){
				$(this).select();
			});
			
			input.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
			};
			
			
			this.button = $('<span class="add-on"><i class="icon-arrow-down"></i></span>')
			.attr("tabIndex", -1)
			.attr('title', self.options.title)
			.appendTo(divContaner)
			.click(function() {
				// close if already visible
				if (input.autocomplete("widget").is(":visible")) {
					input.autocomplete("close");
					return false;		
				}
				// work around a bug (likely same cause as #5265)
				$( this ).blur();

				// pass empty string as value to search for, displaying all results
				input.autocomplete("option", "minLength" , 0);
				input.autocomplete("search", "").focus();
				input.autocomplete("option", "minLength" , self.options.minLength);
				//alert(input.autocomplete( "option", "source" ) )
				return false;	// false 和jQueryUI.dialog协作时FF下会提交表单
			});
			el_selected = select_text = select_val=null;
		},
			
		_setOption: function(key, value) {
			var self = this;
			var select = self.element,
				input = select.next();
			if (key == 'size') {
				value = parseInt(value, 10);
				input.attr('size', value);	
			}else if (key == 'disabled'||key=='minLength') {
				this.input.autocomplete("option", key , value);
			}else {
				this.options[key] = value;
			}
		},

		destroy: function() {
			 this.input.remove();
			 this.button.remove();
			 this.element.show();
			 $.Widget.prototype.destroy.call( this );
		}
	});
})(jQuery);
