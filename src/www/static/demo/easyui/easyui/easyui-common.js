(function ($) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function CreateIndentityWindowId() {
        return "UUID-" + (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    function destroy(target) {
        $(target).dialog("destroy");
    }
    function getWindow(target) {
        if (typeof target == "string") {
            return document.getElementById(target);
        } else {
            return $(target).closest(".window-body");
        }
    }
    $.createWin = function (options) {
        if (!options.url && !options.contents) {
            $.messager.alert("��ʾ", "ȱ�ٱ�Ҫ����!(url or contents)");
            return false;
        }
        var windowId = CreateIndentityWindowId();
        if (options.winId) {
            windowId = options.winId;
        } else {
            options.winId = windowId;
        }
        var defaultBtn = [{
            text: '�ر�',
            iconCls: 'icon-cancel',
            handler: function () {
                $("#" + windowId).dialog("close");
            }
        }];
        
        if (options.buttons == null){
        	options.buttons = [];
        }
        
        $.each(options.buttons,function(i,btn){
        	btn.handler=function(){
        		btn.btnClick.call(this,dialog,$);
        	};
        });
        
        $.merge(options.buttons || [], defaultBtn);
        
        
        options = $.extend({}, $.createWin.defaults, options || {});
        if (options.isMax) {
            options.draggable = false;
            options.closed = true;
        }
        var dialog = $('<div/>');
        if (options.target != 'body') {
            options.inline = true;
        }
        dialog.appendTo($(options.target));
        dialog.dialog($.extend({}, options, {
            onClose: function () {
                if (typeof options.onClose == "function") {
                    options.onClose.call(dialog, $);
                }
                destroy(this);
            },
            onMove: function (left, top) {
                if (typeof options.onMove == "function") {
                    options.onMove.call(dialog, $);
                }
                var o = $.data(this, 'panel').options;
                if (top < 0) {
                    $(this).dialog("move", {
                        "left": left,
                        "top": 0
                    });
                } else if (o.maximized) {
                    $(this).dialog("restore");
                    $(this).dialog("move", {
                        "left": left + 100,
                        "top": top
                    });
                }
                if (top > ($(o.target).height() - 20)) {
                    $(this).dialog("move", {
                        "left": left,
                        "top": ($(o.target).height() - 25)
                    });
                }
            }
        }));
        if (options.align) {
            var w = dialog.closest(".window");
            switch (options.align) {
                case "right":
                    dialog.dialog("move", {
                        left: w.parent().width() - w.width() - 10
                    });
                    break;
                case "tright":
                    dialog.dialog("move", {
                        left: w.parent().width() - w.width() - 10,
                        top: 0
                    });
                    break;
                case "bright":
                    dialog.dialog("move", {
                        left: w.parent().width() - w.width() - 10,
                        top: w.parent().height() - w.height() - 10
                    });
                    break;
                case "left":
                    dialog.dialog("move", {
                        left: 0
                    });
                    break;
                case "tleft":
                    dialog.dialog("move", {
                        left: 0,
                        top: 0
                    });
                    break;
                case "bleft":
                    dialog.dialog("move", {
                        left: 0,
                        top: w.parent().height() - w.height() - 10
                    });
                    break;
                case "top":
                    dialog.dialog("move", {
                        top: 0
                    });
                    break;
                case "bottom":
                    dialog.dialog("move", {
                        top: w.parent().height() - w.height() - 10
                    });
                    break;
            }
        }
        if (options.isMax) {
            dialog.dialog("maximize");
            dialog.dialog("open");
        }
        if ($.fn.mask && options.mask)
            dialog.mask();
        if (options.contents) {
            ajaxSuccess(options.contents);
        } else {
            if (!options.isIframe) {
                $.ajax({
                    url: options.url,
                    type: options.ajaxType || "POST",
                    data: options.data == null ? "" : options.data,
                    success: function (date) {
                        ajaxSuccess(date);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                		var obj =  $.parseJSON(jqXHR.responseText);
                		var code = obj.code;
                    	$.dlg.alertError(obj.code);
                        
                        if ($.fn.mask && options.mask)
                            dialog.mask("hide");
                    }
                });
            } else {
                ajaxSuccess();
            }
        }
        dialog.attr("id", windowId);
        return dialog;
        function ajaxSuccess(date) {
            if (options.isIframe && !date) {
            	$('#'+windowId).html('<iframe width="100%" height="100%" frameborder="0" src="' + options.url + '" ></iframe>');
            } else {
            	$('#'+windowId).html(date);
            }
            $.parser.parse(dialog);
            options.onComplete.call(this, dialog, $);
            if ($.fn.mask && options.mask)
                dialog.mask("hide");
        }
    };
    $.fn.destroy = function () {
        destroy(this);
    };
    window.GETWIN = getWindow;
    $.createWin.defaults = $.extend({}, $.fn.dialog.defaults, {
        url: '',
        data: '',
        ajaxType: "POST",
        target: 'body',
        height: 200,
        width: 400,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: true,
        modal: true,
        shadow: false,
        mask: true,
        onComplete: function (dialog, jq) { }
    });
})(jQuery);
 
function parseParam(param,key){
	var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
        paramStr+="&"+key+"="+encodeURIComponent(param);
    }else{
        $.each(param,function(i){
            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
            paramStr+='&'+parseParam(this, k);
        });
    }
    return paramStr.substr(1);
}


function validateForm(form){
	return form.length > 0 && form.form('validate');
}

/** ����tree���� ʹ��֧��ƽ�����ݸ�ʽ */
function treeDataFilter(opt, data, parent) {
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]]
					&& data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
}

Date.prototype.format = function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	};

	if(/(y+)/.test(format)) {
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}; 


/**
 * easyui Ĭ������
 */
$.fn.datagrid.defaults.loadMsg = '������....'; //���صȴ���ʾ
$.fn.datagrid.defaults.pagination = true; //��ҳ
$.fn.datagrid.defaults.border = true; //���߿�
$.fn.datagrid.defaults.striped = true; //��Ԫ��߿�
$.fn.datagrid.defaults.fit = true;//�������Ӧ
$.fn.datagrid.defaults.pageSize = 20;//ÿҳ��ʾ����
$.fn.datagrid.defaults.fitColumns = true; //����Ӧ�п�
$.fn.datagrid.defaults.rownumbers = false; //���
$.fn.datagrid.defaults.pageList = [5, 10, 20, 30, 50, 80, 100,200];//��ҳ����
$.fn.datagrid.defaults.singleSelect = true; //��ѡ
$.fn.datagrid.defaults.pageNumber = 1; //Ĭ����ʾ��һҳ
$.messager.defaults.width=600;


/**
 * jQuery ��form��Ԫ�ص�ֵ���л��ɶ���
 */
$.extend($.fn.form.methods, {
	serialize : function(jq) {
		var arrayValue = $(jq[0]).serializeArray();
		var json = {};
		$.each(arrayValue, function() {
			var item = this;
			var value = "";

			if (item["value"] != null) {
				value = item["value"].replace(/(^\s*)|(\s*$)/g, "");
			}
			
			if(value == '---��ѡ��---'){
				value = '';
			}

			if (json[item["name"]]) {
				json[item["name"]] = json[item["name"]] + "," + value;
			} else {
				json[item["name"]] = value;
			}
		});
		return json;
	},
	getValue : function(jq, name) {
		var jsonValue = $(jq[0]).form("serialize");
		return jsonValue[name];
	},
	setValue : function(jq, data) {
		return jq.each(function() {
			$(this).form("load", data);
		});
	}
});

/*
 * jquery easyui ��֤��չ����rule 
 * vnull �ı���ǿ� vdefault ���ܵ�Ĭ��ֵ'---��ѡ��---' 
 * vint ������+0
 * vpint ������ 
 * vthan ����(������+0)�Ƚ� param
 * ǰ��Ϊ0ʱ�����߲�����0ʱ����false��ǰ�߲�Ϊ0ʱ�������ߴ���0С�ڵ���ǰ��ʱ����false vv ������,����������֤,param.�ɹ�����<0ʱ������,����0ʱ���жϿɹ�������
 * vread ������+0,param ��֤�������������α����С���ϴα��������false vrcharge ����ʽ,�����շ���֤ param
 * 2,�˻���Ӧ�ս�� ��ʽ:ʵ�ս��-����ֵ(�˻����-Ӧ�ս��)<0 ����false vthanm �����Ƚ�(����ʽ),param ,����
 * �����0��С��ǰ�� vthanmy �����Ƚ�(����ʽ),param,��������ڵ���ǰ���Ҵ���0 vthanmz
 * �����Ƚ�(����ʽ),param,��������ڵ���ǰ�� vryear ���������֤ vrmonth �����·���֤ vmoney ����ʽ vmy ����ʽ
 * �����0 vdate ��֤���ڸ�ʽ ��ʽyyyy-MM-dd vdatehm ��֤���ڸ�ʽ ��ʽyyyy-MM-dd HH:mm eqPwd ��֤��������
 * vdecimal ��֤���ָ�ʽ��С�����0λ��1λ��2λ��3λ��4λ���� gteqnumber ��֤���ڵ���ĳ���� gtnumber ��֤����ĳ����
 * alpha ֻ��������ĸ alphanum ֻ��������ĸ������ chinese ֻ����������
 */

/**
 * easyui ������ʾ��򵥷�װ
 */
(function($) {
	function alertDlg(title, msg, icon, fn) {
		top.jQuery.messager.alert(title, msg, icon, function() {
			if (fn) {
				fn();
			}
		});
	}

	$.dlg = {
		/**
		 * 
		 *  ȷ�Ͽ�
		 * @author wangct
		 * @param msg
		 * @param fn
		 * @param canFn
		 * @param opt
		 */	
		dialog:function(msg,fn,canFn,opt){
			var self = this;
			
			var defaults={
					id:'dialog_'+new Date().getTime(),
					modal:true,
					title:'ѯ��',
					height:235,
					width:600,
					buttons:[{iconCls:'icon-ok',text:'ȷ��',handler:function(){
						try{
							if(fn){
								if(typeof fn == 'function'){
									fn();
								}else if(typeof fn == 'string' && typeof window[fn] == 'function'){
									window[fn]();
								}
							}
							jq('#'+id).dialog('destroy');
						}catch(e){
							self.alertError("ȷ������ִ��ʧ��("+e.message+")��������õķ���");
						}
						
					}},{iconCls:'icon-close',text:'ȡ��',handler:function(){
						try{
							jq('#'+id).dialog('destroy');
							if(canFn){
								if(typeof canFn == 'function'){
									canFn();
								}else if(typeof canFn == 'string' && typeof window[canFn] == 'function'){
									window[canFn]();
								}
							}
						}catch(e){
							self.alertError("ȡ������ִ��ʧ��("+e.message+")��������õķ���");
						}
					}}]
				};
			if(opt && typeof opt == 'object'){
				for(var name in opt){
					defaults[name]=opt[name];
				}
			}
			var id=defaults.id;
			var jq=top.$;
		
			if(jq('#'+id).length != 0){
				jq('#'+id).remove();
			}
			jq('body').append('<div id="'+id+'"><div class="question-title"><span class="icon-question"></span><span class="startP-text">'+msg+'</span></div></div>');
			
			jq('#'+id).dialog(defaults).parent().addClass('messager-window');
		},
		alertError : function(msg, fn) {
			alertDlg('����', msg, 'error', fn);
		},
		alertInfo : function(msg, fn) {
			alertDlg('��ʾ', msg, 'info', fn);
		},
		alertQuestion : function(msg, fn) {
			alertDlg('ѯ��', msg, 'question', fn);
		},
		alertWarning : function(msg, fn) {
			alertDlg('����', msg, 'warning', fn);
		},
		confirm : function(msg, fn,cancleFn) {
			top.jQuery.messager.confirm('ѯ��', msg, function(isOk) {
				if (fn && isOk) {
					fn();
				}else{
					if(cancleFn){
						cancleFn();
					}
				}
			});
		},
		/**
		 * �������ڣ�ȷ����ť����ͨ�� 
		 * @param options:
		 * title: ����
		 * pageUrl:ҳ��url
		 * data : url����
		 * width :���ڿ��
		 * height:���ڸ߶�
		 * saveUrl:����url
		 * formId:form��id
		 * succClose:ִ�гɹ����Ƿ�رմ��� Ĭ��Ϊtrue
		 * @param successFn �ɹ���ִ�еĺ���
		 * @getDataFn ������װ������
		 */
		alertAddOrEditForm:function(options,successFn,getDataFn){
			if(options.succClose == null){
				options.succClose = true;
			}
			
			var urlParam='';
			if(options.data){
				urlParam = '?' + parseParam(options.data);
			}
			
			top.jQuery.createWin({
				title:options.title,
				url:options.pageUrl+urlParam,
				width:options.width,
				height:options.height,
				modal: true,
				buttons:[{
					text:'ȷ��',
					iconCls:'icon-ok',
					btnClick: function(dialog,target){
						if(target("[id="+options.formId+"]").form('validate')){
							var formData = null;
							if(getDataFn){
								formData = getDataFn(target);
							}else{
								formData = target("[id="+options.formId+"]").form('serialize');
							}
							
							$.ajax({
								url:options.saveUrl,
								data:formData,
								dataType:'json',
								success:function(data){
									if(data.code!='0000'){
										$.dlg.alertError(data.code);
										return;
									}
									
									//ִ�гɹ���رնԻ�����
									if(options.succClose){
										dialog.dialog('destroy');
									}
									
									//ִ�лص�����
									if(successFn){
										successFn();
									}
								}
							});
						}
					}
				}]
			});
		},
		/**
		 * ����ȷ�Ͽ�ִ�з���
		 * @param options:
		 * info: ��ʾ��Ϣ
		 * fnUrl: ִ��url
		 * data: ����
		 * @param successFn �ɹ���ִ�еķ���
		 * @param cancleFn �����ʾ��ȡ����ť���ִ�з���
		 */
		alertConfirmFn:function(options,successFn,cancleFn,errorFn){
			
			$.dlg.confirm(options.info,function(){
				$.ajax({
					url:options.fnUrl,
					dataType:'json',
					data:options.data,
					success:function(data){
						if(data.code!='0000'){
							$.dlg.alertError(data.code);
							
							if(errorFn){
								errorFn();
							}
							
							return;
						}
						
						if(successFn){
							successFn(data);
						}
					}
				});
			},cancleFn);
		}
	};
	
})(jQuery);

(function($){
	$.extend($.fn.layout.methods, {   
        /**  
         * ����Ƿ���ںͿɼ�  
         * @param {Object} jq  
         * @param {Object} params  
         */  
        isVisible: function(jq, params) {   
            var panels = $.data(jq[0], 'layout').panels;   
            var pp = panels[params];   
            if(!pp) {   
                return false;   
            }   
            if(pp.length) {   
                return pp.panel('panel').is(':visible');   
            } else {   
                return false;   
            }   
        },   
        /**  
         * ���س�ĳ��region��center���⡣  
         * @param {Object} jq  
         * @param {Object} params  
         */  
        hidden: function(jq, params) {   
            return jq.each(function() {   
                var opts = $.data(this, 'layout').options;   
                var panels = $.data(this, 'layout').panels;   
                if(!opts.regionState){   
                    opts.regionState = {};   
                }   
                var region = params;   
                function hide(dom,region,doResize){   
                    var first = region.substring(0,1);   
                    var others = region.substring(1);   
                    var expand = 'expand' + first.toUpperCase() + others;   
                    if(panels[expand]) {   
                        if($(dom).layout('isVisible', expand)) {  
                            opts.regionState[region] = 1;   
                            panels[expand].panel('close');   
                        } else if($(dom).layout('isVisible', region)) {   
                            opts.regionState[region] = 0;   
                            panels[region].panel('close');   
                        }   
                    } else {   
                        panels[region].panel('close');   
                    }   
                    if(doResize){ 
                        $(dom).layout('resize');   
                    }   
                };   
                if(region.toLowerCase() == 'all'){   
                    hide(this,'east',false);   
                    hide(this,'north',false);   
                    hide(this,'west',false);   
                    hide(this,'south',true);   
                }else{   
                    hide(this,region,true);
                }   
            });   
        },   
        /**  
         * ��ʾĳ��region��center���⡣  
         * @param {Object} jq  
         * @param {Object} params  
         */  
        show: function(jq, params) {   
            return jq.each(function() {   
                var opts = $.data(this, 'layout').options;   
                var panels = $.data(this, 'layout').panels;   
                var region = params;   
      
                function show(dom,region,doResize){   
                    var first = region.substring(0,1);   
                    var others = region.substring(1);   
                    var expand = 'expand' + first.toUpperCase() + others;   
                    if(panels[expand]) {   
                        if(!$(dom).layout('isVisible', expand)) {   
                            if(!$(dom).layout('isVisible', region)) {   
                                if(opts.regionState[region] == 1) {   
                                    panels[expand].panel('open');   
                                } else {   
                                    panels[region].panel('open');   
                                }   
                            }   
                        }   
                    } else {   
                        panels[region].panel('open');   
                    }   
                    if(doResize){   
                        $(dom).layout('resize');   
                    }   
                };   
                
                if(region.toLowerCase() == 'all'){   
                    show(this,'east',false);   
                    show(this,'north',false);   
                    show(this,'west',false);   
                    show(this,'south',true);   
                }else{   
                    show(this,region,true);   
                }   
            });   
        }   
    }); 
	$.extend({
		bytesToSize : function (value){
			  if(null==value||value==''){
			    return "0 Bytes";
			  }
			  var unitArr = new Array("B","KB","MB","GB","TB","PB","EB","ZB","YB");
			  var index=0;
			  var srcsize = parseFloat(value);
			  var quotient = srcsize;
			  while(quotient>1024){
			    index +=1;
			   quotient=quotient/1024;
			  }
			  var roundFun = function(numberRound,roundDigit){
				   if(numberRound>=0) {   
				         var   tempNumber   =   parseInt((numberRound   *   Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);   
				         return   tempNumber;   
				    }else{   
				     numberRound1=-numberRound;   
				     var   tempNumber   =   parseInt((numberRound1   *   Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);  
				     return   -tempNumber;   
				    }   
			  };
			  return roundFun(quotient,2)+" "+unitArr[index];
		}
	});
})(jQuery);
