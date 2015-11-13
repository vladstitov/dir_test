/**
 * Created by VladHome on 9/5/2015.
 */
    /// <reference path="Kiosk.ts" />
module uplight{

    export  class MainMenu{
        onSelect:Function;
        private list:JQuery;
        private data:any[];
        private R:Registry;
        private view:JQuery;
        constructor(el:HTMLElement){
            this.view = $(el);
            this.R=Registry.getInstance();
            var d2 = $.Deferred();
            var d1 = Registry.getInstance().connector.getData('pages.json');
            var cats:VOCategory[]= Registry.getInstance().model.getCategories();
            if(cats)d2.resolve(cats);
            else this.R.model.dispatcher.on(this.R.model.READY,()=>{d2.resolve(this.R.model.getCategories());});
            $.when(d1,d2).then(()=>{
                var pages:VOPage[] = JSON.parse(arguments[0][0]);
                var cats:VOCategory[] = arguments[1];
                this.onData(pages,cats);
            });
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onMenuClick(evt))
        }

        private onData(pages:VOPage[],categories:VOCategory[]):void{
            var ar:any[]=[]
            this.data =ar.concat(pages).concat(categories);
            this.render();
        }

        render():void{
            var ar = this.data
            var out='<ul class="nano-content">';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                out+='<li class="item Plastic031"><a data-i="'+i+'"><span class="'+item.icon+'"></span> <span> '+(item.name || item.label)+'</span></a></li>';
            }
            out+='</ul>'
            this.list.html(out);
        }

        private onMenuClick(evt:JQueryEventObject):void {
          //  console.log(evt);
            evt.preventDefault();
            var i:number  = Number($(evt.currentTarget).data('i'));
          //  console.log(i);
            if (isNaN(i)) return
            var item = this.data[i];
            if (!item) return;
            if(item.url)this.R.events.triggerHandler(InfoPagesModel.PAGE_SELECED,item.id);
            else this.R.events.triggerHandler(this.R.CATEGORY_SELECTED,item.id);
            if (this.onSelect)this.onSelect(item);

        }

    }

    export class PagesMenu{
        R:Registry
        data:any[];
        list:JQuery;
        private view:JQuery
        onSelect:Function;

        pages:InfoPagesModel;
        constructor(el:HTMLElement){
            this.view = $(el);
            this.R=Registry.getInstance();
            this.R.connector.getData('pages.json').done((data)=>this.onData(data))
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onMenuClick(evt))

        }

        private onMenuClick(evt:JQueryEventObject):void{
           // console.log(evt);
            evt.preventDefault();
            var i = $(evt.currentTarget).data('i');
          //  console.log(i);
            if(isNaN(i)) return
            var item= this.data[i];
            if(!item) return;
           // this.pages.showPage(i);
            if(this.onSelect)this.onSelect(item);
            this.R.events.triggerHandler(InfoPagesModel.PAGE_SELECED,item.id);
        }

        onData(res):void{
           // console.log(res);
            this.data = JSON.parse(res);
          // this.pages = new InfoPagesModel($('[data-id=Pages]:first'));
         // this.pages.setData(this.data);
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