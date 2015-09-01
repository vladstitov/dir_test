/**
 * Created by VladHome on 7/11/2015.
 */
/// <reference path="../Registry.ts" />
module uplight{
    export class Keywords{
        view:JQuery;
        list:JQuery;
        data:VOKw[];
        R:Registry;

        constructor(view:JQuery){
            this.R = Registry.getInstance();

            this.view=view.empty();
            this.list =$('<ul>').appendTo(view);
            this.list.on(CLICK,'li',(evt)=>{this.onClick(evt.currentTarget)});
            this.R.model.dispatcher.on(this.R.model.READY,()=>this.onDataReady());
        }
        private onDataReady():void{
           var obj  =  this.R.model.getKeywords();
            var out:VOKw[]=[];
            for(var str in obj) out.push(new VOKw(str,obj[str]));
            this.data=out;
            this.render();

        }
        private render():void{
            var ar = this.data;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
            }
           // console.log(out);
            this.list.html(out);
        }
        private onClick(e:HTMLElement):void{
            var el=$(e);
            var i:number = el.data('i');
            var val = this.data[i].label;
            if(val.length>1)this.R.dispatcher.triggerHandler(this.R.KEYWORD_PRESSED,val);

        }

        renderItem(item:VOKw,i):string{
            return '<li data-i="'+i+'">'+item.label+'</li>';
        }

    }



    export  class VOKw{
        constructor(public label:string,private dests:number[]){

    }
    }

}