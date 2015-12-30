/**
 * Created by VladHome on 12/15/2015.
 */
    ///<reference path='typing/jquery.d.ts' />
    ///<reference path='typing/underscore.d.ts' />

module uplight{
   export class Utils{
       static message(text:string,vis:JQuery,time?:number){
           if(!time) time=3;
           var msg =  $('<div>').addClass('message').css(vis.offset()).text(text).appendTo('body');
           msg.hide();
           msg.show('fast');
           setTimeout(function(){
               msg.hide('fast',function(){
                   msg.remove();
               })
           },time*1000);
       }

   }


    export class VOResult{
        success:string;
        error:string;
        result:string;
        message:string;
    }


    export class Connector{
        service:string = 'rem/index.php';
        logger:string = 'rem/logger.php';
        action:string;
        id:string;
        constructor(action?:string,id?:string,service?:string ){
            if(action)this.action= action;
            if(service)this.service = 'rem/'+service+'.php';
            if(id)this.id=id;

        }
        post(obj:any,url?:string):JQueryPromise<string>{
            if(typeof obj == 'object') obj = JSON.stringify(obj);
            return  $.post(this.service+this.makeUrl(url),obj);
        }
        private makeUrl(url:string):string{
            if(url)  url='?a='+url;
            else  url='?a='+this.action;
            if(this.id)url+='&id='+this.id;
            return url;
        }
        get(url:string):JQueryPromise<string>{
            return  $.get(this.service+this.makeUrl(url));
        }

        log(obj:any,url?:string):JQueryPromise<string>{
            if(typeof obj == 'object') obj = JSON.stringify(obj);
            if(!url) url='?a=LOG';
            return  $.post(this.logger+this.makeUrl(url),obj);
        }
        logError(obj):JQueryPromise<string>{
            var url='?a=ERROR';
            return this.log(obj,url);

        }

    }

   export class Registry{
       static connector:Connector;
       static data:any;
       static settings:any;
   }


    export class DisplayObject{
        constructor(public $view:JQuery,public name?:string){

        }
        data:any;
        onShow():void{ }
        onHide():void{}
        onAdded():void{}
        onRemoved():void{}
        destroy():void{
            this.$view.remove();
        }
        id:number;
        isVisuble:boolean;
        show():DisplayObject{
            this.isVisuble = true;
            this.onShow();
            this.$view.show();
            return this;
        }

        hide():DisplayObject{
            if(this.isVisuble){
                this.isVisuble = false;
                this.$view.hide();
                this.onHide();
            }
            return this;
        }

        appendTo(parent:JQuery):DisplayObject{
            parent.append(this.$view);
            this.onAdded();
            return this;
        }
        remove():DisplayObject{
            this.$view.detach();
            this.onRemoved();
            return this;
        }
        setData(data:any):DisplayObject{
            this.data= data;
            return this;
        }
        getData():any{
            return this.data;
        }


    }

    export class WindowView extends  DisplayObject{
        constructor($view:JQuery,opt:any,name?:string) {
            super($view, name);
            this.$view.find('[data-id=btnClose]').click(()=>this.onClose());
        }
        onClose():void{
            this.hide();
        }

    }
    export class ModuleView extends  WindowView{
        constructor($view:JQuery,opt:any,name?:string) {
            super($view, name);
        }

    }


}