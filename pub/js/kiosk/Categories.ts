/**
 * Created by VladHome on 7/9/2015.
 */
    /// <reference path="Registry.ts" />
module uplight{
    export class Categories{

        private list:JQuery
        R:Registry

        view:JQuery
        private data:VOCategory[];

        private selected:number[];
        constructor(){
            this.view =$('#Categories');
            this.R=Registry.getInstance();
            this.list=$('<ul>').appendTo(this.view);
            this.R.model.dispatcher.on(this.R.model.READY,()=>this.onDataReady());

            this.addListeners();

        }
        private addListeners():void{
            this.list.on(CLICK,'input',(evt)=>this.onListChanged($(evt.currentTarget)));
            this.R.dispatcher.on(this.R.RESET_ALL,()=>this.reset());
        }

        reset():void{
            this.render();
        }
        private addCategory(id:number):void{
            var ind= this.selected.indexOf(id);
            if(ind==-1){
                this.selected.push(id);
                this.R.connector.Stat('cp',id.toString());
                this.R.dispatcher.triggerHandler(this.R.CATEGORIES_CHANGE,[this.selected]);
            }
        }
        private removeCategory(id:number):void{
            var ind= this.selected.indexOf(id);
            if(ind!==-1){
                this.selected.splice(ind,1);
                //console.log(this.selected);
                this.R.connector.Stat('cm',id.toString());
                this.R.dispatcher.triggerHandler(this.R.CATEGORIES_CHANGE,[this.selected]);
            }
        }
        private onListChanged(evt:JQuery):void{
                var id:number = Number(evt.data('id'));
            if(isNaN(id)) return;

            if(evt.prop('checked')) this.addCategory(id);
            else this.removeCategory(id);


        }
        private onDataReady():void{
            this.data = this.R.model.getCategories();
            this.render();
        }
        renderItem(vo:VOCategory,i):string{
            return '<li><div><input type="checkbox" data-id="'+vo.id+'" checked="true" /></div><div class="icon '+vo.icon+'"></div> <div class="name">'+vo.label+'</div></li>';

        }
        private render():void{
            console.log('render');
            var ar = this.data;
            var out=''
            var idis:number[]=[];
            for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
                idis.push(ar[i].id)
            }
            this.selected=idis;
            this.list.html(out);
        }


    }
}