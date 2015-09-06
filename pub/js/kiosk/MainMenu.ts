/**
 * Created by VladHome on 9/5/2015.
 */
    /// <reference path="Kiosk.ts" />
module uplight{
    export class MainMenu{
        view:JQuery
        R:Registry
        data:any[];
        list:JQuery
       onClick:Function
        pages:InfoPage;
        constructor(){

            this.R=Registry.getInstance();

            this.view=$('[data-ctr=MainMenu]:first');
            this.R.connector.getData('pages.json').done((data)=>this.onData(data))
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onMenuClick(evt))

        }

        onMenuClick(evt:JQueryEventObject):void{
            console.log(evt);
            evt.preventDefault();
            var i = $(evt.currentTarget).data('i');
            console.log(i);
            if(isNaN(i)) return
            var item= this.data[i];
            if(!item) return;
            this.pages.showPage(i);
            if(this.onClick)this.onClick(item);
        }

        onData(res):void{
           // console.log(res);
            this.data = JSON.parse(res);
            this.pages = new InfoPage()
           this.pages.setData(this.data);
            this.render();
        }

        render():void{
            var ar = this.data
            var out='<ul class="nano-content">';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                out+='<li class="item Plastic031"><a data-i="'+i+'">'+item.name+'</a></li>';
            }
            out+='</ul>'
            this.list.html(out);
        }


    }
}