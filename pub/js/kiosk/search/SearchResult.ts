/// <reference path="../Registry.ts" />


module uplight {
    export class SearchResult {

        private data:DestModel[];
        model:Model
        result:DestModel[];
        cache:{};
        list:JQuery
        currentCats:number[];
        currentPattern:string;
        //details:Details;
        R:Registry
        mainport:JQuery
      //  cover:JQuery
        view:JQuery
        viewDetails:JQuery
        detailsContent:JQuery;
        constructor(){
            this.view = $('#list-main');
            this.R=Registry.getInstance();
            this.model= Registry.getInstance().model;
            this.list=$('<ul>').addClass('nano-content');
            this.addListeners();
            this.cache={};
            this.mainport = $('#mainport');
            this.viewDetails = $('#DetailsLarge').click((evt)=>this.onCoverClick(evt))
            this.detailsContent = this.viewDetails.find('.content:first');

        }

        reset():void{
            this.result = this.data;
            this.render(true);
            this.hideDetails();
        }

        addListeners():void{
            this.R.dispatcher.on(this.R.CATEGORIES_CHANGE,(evt,cats:number[])=>this.onCategoriesChange(cats))
            this.R.dispatcher.on(this.R.SEARCH_CHANGED,(evt,pattern:string)=>this.onSearchChange(pattern))
            this.R.dispatcher.on(this.R.RESET_ALL,()=>this.reset());
            this.model.dispatcher.on(this.model.READY,()=>this.onDataReady());
            console.log('listeners');
        }

        private getModelById(id:number):DestModel{
            if(this.cache[id]) return this.cache[id];
            var ar:DestModel[] = this.data;
            for(var i=0,n=ar.length;i<n;i++){
               if(ar[i].id==id){
                   return this.cache[id]=ar[i];
                   return ar[i];
               }
            }
            return null;
        }

        private onListClick(evt:JQueryEventObject):void{
           // console.log(evt.currentTarget);
            var id:number = $(evt.currentTarget).data('id');
       // console.log(id);
            if(isNaN(Number(id))) return;

            var mod= this.getModelById(id);
               if(mod){
                   var det:JQuery =  mod.togleDetails();
                   if(det)this.showDetailsLarge(det);
               }

            this.R.connector.Stat('sr',id.toString());

        }

        private isDetails:boolean;
        private hideDetails():void{
            if(this.isDetails){
                this.viewDetails.hide();
                this.detailsContent.empty();
                this.isDetails = false;
            }
        }
        private onCoverClick(evt:JQueryEventObject):void{
           // console.log($(evt.target));
            if($(evt.target).data('id')=='btnClose'){
                this.hideDetails();
            }
        }

        private showDetailsLarge(det:JQuery):void{

            this.viewDetails.show();
            this.detailsContent.append(det);
            this.isDetails = true;

        }

        private onSearchChange(pattern:string):void{
            this.currentPattern = pattern.toLowerCase();
          //  console.log(pattern);
            if(pattern.length) this.result = this.filterSearch();
            else this.result = this.data;
            this.render(false);
        }

        private filterSearch():DestModel[]{
            var out1:DestModel[]=[];
            var out2:DestModel[]=[];
            var out3:DestModel[]=[];
           var ar = this.data
            var str= this.currentPattern;
           for(var i=0,n=ar.length;i<n;i++){
               ar[i].clearKeyword();
               var ind = ar[i].filterStr(str);
               if(ind===1)out1.push(ar[i]);
               else if(ind===2)out2.push(ar[i]);
               else if(ind===3)out3.push(ar[i]);
           }

            return out1.concat(out2,out3);
        }


        private onCategoriesChange(cats:number[]):void{
            this.currentCats=cats;
           // console.log(cats);
            this.filterCats(cats);
        }

        private filterCats(cats:number[]):void{
                var ar:DestModel[] = this.data
                for(var i=0,n=ar.length;i<n;i++) ar[i].setCats(cats).render();

        }


        private render(reset:boolean):void{
            var ar:DestModel[] = this.result;
           // console.log(this.data.length);
            var list:JQuery = this.list.remove().html('');
            for(var i=0,n=ar.length;i<n;i++) list.append(ar[i].getView(reset));
            this.list.appendTo(this.view);
            this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
        }

        private onDataReady():void{
            var ar = this.model.getData();
            var list= this.list, out:DestModel[] =[];
            for(var i=0,n=ar.length;i<n;i++)  out.push(new DestModel(ar[i]));
            this.data=out;
            this.result=out;
            this.render(false);
           // this.searchController = new SearchController());
        }

    }



}