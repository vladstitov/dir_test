/**
 * Created by VladHome on 7/11/2015.
 */
/// <reference path="../Registry.ts" />
module uplight{
    export class Keywords{
        private view:JQuery;
        list:JQuery;
        data:VOKw[];
        R:Registry;

        constructor(el:HTMLElement){
            this.view = $(el);
            this.R = Registry.getInstance();
            this.list =$('<ul>').appendTo(this.view.find('[data-id=list]:first'));
            this.list.on(CLICK,'li',(evt)=>{this.onClick(evt.currentTarget)});
            this.R.model.dispatcher.on(this.R.model.READY,()=>this.onDataReady());
        }
        private onDataReady():void{

           var obj  =  this.R.model.getKeywords();
            console.log(obj);
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
            if(val.length>1)this.R.events.triggerHandler(this.R.KEYWORD_PRESSED,val);

        }

        renderItem(item:VOKw,i):string{
            return '<li data-i="'+i+'"><a class="btn">'+item.label+'</a></li>';
        }

    }



    export  class VOKw{
        constructor(public label:string,private dests:number[]){

    }
    }

}