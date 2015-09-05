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
        constructor(){
            this.R=Registry.getInstance();
            this.view=$('[data-ctr=MainMenu]:first');
            this.R.connector.getData('pages.json').done((data)=>this.onData(data))
            this.list = this.view.find('[data-id=list]');

        }
        onData(data):void{
            this.data = JSON.parse(data);
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