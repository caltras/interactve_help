/*
    Created By Claudio Traspadini Oliveira (caltras)
    url: https://github.com/caltras/interactve_help
*/
var Manual = function(){
	var self = this;
	self.KEY_M = 77;
	self.ESC = 27;
	self.idElement = "manual_overlay";
	self.options = [];
	self.loaded = false;
	self.lastStep = 0;
	self.init = function(){
		self.createOverlay();
		self.addEventListener();
	}
	self.addEventListener = function(){
		$(document).on("keydown",function(e){
			if(e.ctrlKey && e.which==self.KEY_M){
				if(!$("#"+self.idElement).is(":visible")){
					if(self.options){
						self.show();
						if(!self.loaded){
							self.loadManual(self.getOptions(self.lastStep));
							self.loaded = true;
						}
					}else{
						console.log("Configuração de Manual não definida.");
					}
				}else{
					self.hide();
				}
			}else{
				if(e.which == self.ESC){
					self.exit();
				}
			}
		});
		$(window).on('resize',function(){
			if($("#"+self.idElement).is(":visible")){
				self.deleteCurrentStep();
				self.step(self.lastStep);
			}
		})
	}
	self.deleteCurrentStep = function(){
		$("#"+self.idElement).empty();
	}
	self.nextStep = function(){
		self.deleteCurrentStep();
		self.lastStep++;
		self.loadManual(self.getOptions(self.lastStep));
		self.loaded = true;
	}
	self.prevStep = function(){
		self.deleteCurrentStep();
		self.lastStep--;
		self.loadManual(self.getOptions(self.lastStep));
		self.loaded = true;
	}
	self.step = function(id){
		self.deleteCurrentStep();
		self.lastStep = self.getStep(id);
		self.loadManual(self.getOptions(self.lastStep));
		self.loaded = true;
	}
	self.createOverlay = function(){
		$(document).ready(function(){
			var div = "<div id='"+self.idElement+"' class='manual_overlay'></div>";
			$("body").prepend(div);
		});
	}
	self.show = function(){
		$("#"+self.idElement).css("display","block");
	}
	self.hide = function(){
		$("#"+self.idElement).css("display","none");
	}
	self.loadManual = function(options){
		var contElement = 0;
		var executeFnc = [];
		if(options){
			for(var i in options){
				var o = options[i];
				if(o.type == "object"){
					if($(o.selector).is(":visible") && $(o.selector).length > 0){
						contElement++;
						var widthObj = $(o.selector).width();
						var heightObj = $(o.selector).height();
						var position = $(o.selector).offset();
						self.createBoxText(o,contElement);
						var offset = 20;
						o.position = o.position || "left";
						if(o.position=="left"){
							var topM = heightObj/2 + position.top;
							var topBox = topM - $("#boxtext_"+contElement).height()/2;
							
							var positionboxLeftText=  position.left-$("#boxtext_"+contElement).width() - offset
							
							self.setPropertiesBoxText($("#boxtext_"+contElement),"arrow-right","left",positionboxLeftText,topBox);
							
						}else{
							if(o.position=="right"){
								var topM = heightObj/2 + position.top;
								var topBox = topM - $("#boxtext_"+contElement).height()/2;
								
								var positionboxLeftText=  position.left + widthObj + offset;
								
								self.setPropertiesBoxText($("#boxtext_"+contElement),"arrow-left","right",positionboxLeftText,topBox);
								
							}else{
								if(o.position=="bottom"){
									var positionboxBottomText=  position.top + heightObj + offset;
									
									var leftM = widthObj/2 + position.left;
									var leftBox = leftM - $("#boxtext_"+contElement).width()/2;
									
									self.setPropertiesBoxText($("#boxtext_"+contElement),"arrow-up","bottom",leftBox,positionboxBottomText);
									
								}else{
									if(o.position=="top"){
										var leftM = widthObj/2 + position.left;
										
										var leftBox = leftM - $("#boxtext_"+contElement).width()/2; 
										var positionboxBottomText=  position.top - $("#boxtext_"+contElement).height() - offset;
										
										self.setPropertiesBoxText($("#boxtext_"+contElement),"arrow-down","top",leftBox,positionboxBottomText);
									}
								}
							}
						}
					}
				}else{
					if(o.type == "text"){
						contElement++;
						self.createText(o,contElement);
					}else{
						if(o.type=="function"){
							executeFnc.push({func: o.fn,time:o.time});
						}else{
							if(o.type=="region"){
								contElement++;
								self.createRegion(o,contElement);
							}else{
								if(o.type=="waitText"){
									contElement++;
									self.createWaitText(contElement,o);
								}else{
									if(o.type=="waitElement"){
										self.waitElement(o.selector,o.fn,o.fail,o.timeOut);
									}
								}
							}
						}
					}
				}
			}
		}
		self.createExit();
		window.manual.stopExec = false;
		$.each(executeFnc,function(){
			self.runScript(this.func,this.time);
		});
	}
	self.createExit = function(){
		var div = $("<div class='manual_exit'>X</div>");
		$("#"+self.idElement).append(div);
		$(".manual_exit").click(function(){
			self.exit();
		});
	}
	self.exit = function(){
		self.hide();
		self.lastStep = 0;
		self.loaded = false;
		self.deleteCurrentStep();
	}
	self.setPropertiesBoxText = function(obj,arrow, orientation, left,top){
		$(obj).find(".arrow").addClass(arrow);
		$(obj).addClass("boxtext_"+orientation);
		$(obj).css("left",left);
		$(obj).css("top",top);
	}
	self.createText = function(o,id){
		if(!o.box){
			var span = $("<span id='text_"+id+"' class='text'></span>");
			var text = o.text;
			$(span).css("top",o.top);
			$(span).css("left",o.left);
			if(o.color){
				$(span).css("color",o.color);
			}
			if(o.size){
				$(span).css("fontSize",o.size);
			}
			$(span).html(text+self.createNavStep(o));
			
			$("#"+self.idElement).append($(span));
		}else{
			self.createBoxText(o,id);
			$("#boxtext_"+id).css("top",o.top || 0);
			$("#boxtext_"+id).css("left",o.left || 0);
			if(o.size){
				$("#boxtext_"+id).css("fontSize",o.size);
			}
		}
	}
	
	self.createBoxText = function(o,id){
		var div = $("<div id='boxtext_"+id+"' class='boxtext'></div>");
		var text = o.info || o.text;
		$(div).width(o.maxSizeBox || 250);
		$(div).html("<div class='inner'>"+text+self.createNavStep(o)+"</div><div class='arrow'></div>");
		$("#"+self.idElement).append($(div));
	}
	self.createRegion = function(o,id){
		var div = $("<div id='region_"+id+"' class='region'></div>");
		var offset = $(o.selector).offset();
		if($(o.selector).width() >= $(o.selector).height()){
			$(div).width($(o.selector).width()+5);
		}else{
			$(div).width($(o.selector).height()+5);
		}
		$(div).height($(o.selector).height()+5);
		$(div).css("top",offset.top-5);
		$(div).css("left",offset.left-5);
		if(o.clickable){
			$(div).click(function(){
				self.runScript(o.fn);
			});
		}else{
			$(div).css("cursor","default");
		}
		$("#"+self.idElement).append($(div));
	}
	self.createNavStep = function(o){
		var str = "<div class='navStep'>"
		if(o.prevStep || (typeof o.prevStep) =="number"){
			if((typeof o.prevStep) == "boolean"){
				str +="<a href='javascript:void(0)' class='prevStep' onclick='window.manual.prevStep();'>Voltar</a>";
			}else{
				str +="<a href='javascript:void(0)' class='prevStep' onclick='window.manual.step("+o.prevStep+");'>Voltar</a>";
			}
		}
		if(o.nextStep || (typeof o.nextStep) =="number"){
			if((typeof o.nextStep) == "boolean"){
				str +="<a href='javascript:void(0)' class='nextStep' onclick='window.manual.nextStep()'>Pr&oacute;ximo</a>";
			}else{
				str +="<a href='javascript:void(0)' class='nextStep' onclick='window.manual.step("+o.nextStep+");'>Pr&oacute;ximo</a>";
			}
		}
		str+="</div>";
		return str;
	}
	self.hasOptions = function(){
	    return (self.options && self.options.length>0);
	}
	self.isArrayOptions= function(){
		return (self.options.length>0 && self.options[0] instanceof Array)
	}
	self.getStep = function(id){
		if(self.isArrayOptions() || (typeof id=="number")){
			return id;
		}else{
			var cont = self.lastStep;
			var idAchado = null;
			$(self.options).filter(function(i,v){
				if(this.id == id && id!=null){
					idAchado = this.id;
					cont = i;
					return true; 
				}else{
					return false;
				}
			});
			return cont;
		}
	}
	self.getOptions = function(id){
	    if(self.hasOptions()){
    		if(self.isArrayOptions()){
    			return self.options[id];
    		}else{
    			if((typeof id == "number")){
    				return self.options[id].items;
    			}else{
    				var retorno = $(self.options).filter(function(){
    					return this.id == id; 
    				});
    				if(retorno.length>0){
    					return retorno[0].items;
    				}else{
    					return [];
    				}
    			}
    		}
	    }else{
	        return [];
	    }
	}
	self.createWaitText = function(id,o){
		$("#"+self.idElement).append($("<div id='waitText_"+id+"' class='wait "+(o.hAlign || "center")+" "+(o.vAlign || "top")+"'>Aguarde...</div>"));
	}
	self.runScript = function(func,time){
		setTimeout(func, time || 0);
	}
	self.waitElement = function(id,fn,fnFail,time){
		$(id).waitElement(fn,fnFail,time);
	}
}
window.manual = new Manual();
window.manual.init();
window.manual.options = window.options;
