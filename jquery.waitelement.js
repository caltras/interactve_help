/*
    Created By Claudio Traspadini Oliveira (caltras)
    url: https://github.com/caltras/JQuery.waitElement
*/
$.fn.waitElement = function(fn,fnFail,time){
    var self = this;
    self.interval = null;
    self.cont = 0;
    self.maxTime = eval(time) || 30;
    self.exists = function(){
        if($(self.selector).length > 0 
           || $(self.selector).is(":visible")){
            return true;
        }else{
            return false;
        }
    }
    self.interval = setInterval(function(){
            self.cont++;
        if(self.exists()){
            clearInterval(self.interval);
            if(fn){
                    (fn)();
            }else{
                    $(self.selector).trigger("ELEMENT_READY");
            }
        }
        if(self.cont > self.maxTime){
                clearInterval(self.interval);
                if(fnFail){
                        (fnFail)();
                }else{
                        throw "Time out"
                }
        }
        console.log(self.selector+": time("+self.cont+")");
    },1000);
};
