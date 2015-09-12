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
       // viewDetails:JQuery
        detailsContent:JQuery;
        constructor(){
            this.view = $('#list-main');
            this.R=Registry.getInstance();
            this.model= Registry.getInstance().model;
            this.list=$('<ul>').addClass('nano-content');
            this.addListeners();
            this.cache={};
            this.mainport = $('#mainport');
           // this.viewDetails = $('#DetailsLarge').click((evt)=>this.onCoverClick(evt))
          //  this.detailsContent = this.viewDetails.find('.content:first');

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


        private onListClick(evt:JQueryEventObject):void{
           // console.log(evt.currentTarget);
            var id:number = $(evt.currentTarget).data('id');

            if(isNaN(Number(id)) || !this.dataInd[id]) return;
            this.dataInd[id].togleDetails();
            this.R.connector.Stat('sr',id.toString());

        }

        private isDetails:boolean;
        private hideDetails():void{
            if(this.isDetails){
               // this.viewDetails.hide();
               // this.detailsContent.empty();
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

            //this.viewDetails.show();
          //  this.detailsContent.append(det);
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
            this.list.empty();
           // console.log(this.data.length);
          //  var list:JQuery = this.list.remove().html('');
         for(var i=0,n=ar.length;i<n;i++) this.list.append(ar[i].getView(reset));
           // this.list.appendTo(this.view);
           // this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
        }

        private dataInd:DestModel[];
        private onDataReady():void{
            var ar = this.model.getData();
            var list= this.list, out:DestModel[] =[];
            var ind:DestModel[]=[];
            for(var i=0,n=ar.length;i<n;i++) {
                var dest:DestModel  = new DestModel(ar[i])
                out.push(dest);
                ind[dest.id] = dest;
            }
            this.dataInd=ind;
            this.data=out;
            this.result=out;
            this.render(false);
            this.list.appendTo(this.view);
            this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
           // this.searchController = new SearchController());
        }

    }



}