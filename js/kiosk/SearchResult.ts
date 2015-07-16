/// <reference path="Registry.ts" />


module uplight {
    export class SearchResult { 

        private searchController:SearchController
        private data:DestModel[];
        model:Model
        result:DestModel[];
        list:JQuery
        currentCats:number[];
        currentPattern:string;
        R:Registry

        constructor(private view:JQuery){
            this.R=Registry.getInstance();
            this.model= Registry.getInstance().model;
            this.list=$('<ul>');
            this.addListeners();
        }

        addListeners():void{
            this.R.dispatcher.on(this.R.CATEGORIES_CHANGE,(evt,cats:number[])=>this.onCategoriesChange(cats))
            this.R.dispatcher.on(this.R.SEARCH_CHANGED,(evt,pattern:string)=>this.onSearchChange(pattern))

            this.model.dispatcher.on(this.model.READY,()=>this.onDataReady());

            console.log('listeners');
        }

        private onListClick(evt:JQueryEventObject):void{
            var id:number = $(evt.currentTarget).data('id');
console.log(id);
            this.R.connector.Stat('sr',id.toString());
        }
        private onSearchChange(pattern:string):void{
            this.currentPattern = pattern.toLowerCase();
          //  console.log(pattern);
            if(pattern.length) this.result = this.filterSearch();
            else this.result = this.data;
            this.render();
        }

        private filterSearch():DestModel[]{
            var out1:DestModel[]=[];
            var out2:DestModel[]=[];
            var out3:DestModel[]=[];
           var ar = this.data
            var str= this.currentPattern;
           for(var i=0,n=ar.length;i<n;i++){
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


        private render():void{
            var ar:DestModel[] = this.result;
           // console.log(this.data.length);
            var list:JQuery = this.list.remove().html('');
            for(var i=0,n=ar.length;i<n;i++) list.append(ar[i].getView());
            this.list.appendTo(this.view);
            this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
        }

        private onDataReady():void{
            var ar = this.model.getData();
            var list= this.list, out:DestModel[] =[];
            for(var i=0,n=ar.length;i<n;i++)  out.push(new DestModel(ar[i]));
            this.data=out;
            this.result=out;
            this.render();
           // this.searchController = new SearchController());
        }

    }


    export class DestModel{
        view:JQuery

        private cats:number[];
        byCat:boolean=true;
        byPat:boolean=true;
        name:string;
        unit:string;
        kws:string;
        iskw:number;
        kw:JQuery;
        cache={};
        ind:number
        constructor(private vo:VODestination){
            this.view=  this.renderVo(vo);
            this.name=' '+vo.name.toLowerCase();
            this.unit=' '+vo.unit.toLowerCase();
            this.kws=','+vo.kws;
            this.kw=this.view.find('.kws:first');
        }


       private tryName(pat:string):number{
           var out:number=0;
           var ind= this.name.indexOf(pat);
           if(ind===0) out= 1;
           else  if(ind!==-1) out= 2;
           return out;
       }
        private tryUnit(pat:string):number{
            var out:number=0;
           var ind= this.unit.indexOf(pat);
            if(ind==0) out= 1;
            else  if(ind!==-1) out= 2;
            return out;
        }

        private tryKw(pat:string):string{
            var out:string;
            var kws = this.kws;
            if(this.kws.indexOf(pat)!==-1) {
                var ind = kws.indexOf(pat);
                var end = kws.indexOf(',', ind+1);
                if(end===-1) out = kws.substr(ind+1);
                else  out = this.kws.substring(ind + 1, end);
               // console.log(this.kws +'   '+ind +'   '+end);
            }
            return out;
        }

        filterStr(pat:string):number{
            if(this.iskw) this.clearKeyword();
            var out:number=0;
            if(isNaN(Number(pat))){
                out = this.tryName(' '+pat);
                if(out===0)out= this.tryUnit(' '+pat);
            }else{
                out = this.tryUnit(' '+pat);
                if(out===0)out=this.tryName(' '+pat);
            }

            if(out===0){
                var kw=this.tryKw(','+pat);
                if(kw){
                    this.showKeyword(kw);
                    out=3;
                }
            }
            this.ind=out;
           return out;
        }
        showKeyword(str:string):void{
            console.log('showKeyword  '   + str);
            this.kw.text(str);
            this.iskw = 1;
        }
        clearKeyword():void{
            this.kw.text('');
            this.iskw = 0;
        }

        setCats(cats:number[]):DestModel{
            this.cats=ar;
            var ar:number[] = this.vo.cats;
            if(!ar){
                this.byCat = false;
                return this;
            }
           var dif =  ar.filter(function(n) {
                return cats.indexOf(n) != -1;
            });

            if(dif.length===0) this.byCat=false;
            else this.byCat = true;
            return this;

        }
        render():void{
            if(this.byCat && this.byPat) this.view.show();
            else this.view.hide();
        }
        getView():JQuery{
            return this.view
        }


        private renderVo(vo:VODestination):JQuery{
            var more ='<div class="more"><span class="fa fa-plus"></span></div>';
            var icon ='<div class="icon"><span class="'+vo.icon+'"></span></div>';
            var name='<div class="name">'+vo.name+'</div>';
            var unit='<div class="unit">'+vo.unit+'</div>';
            var utype='<div class="unittype">unit</div>';
            var kws = '<div class="kws">'+vo.kws+'</div>';
            var info = '<div class="info">'+vo.cats+'</div>';
            return $('<li>').data('id',vo.id).addClass('Plastic031').html(icon+more+name+unit+utype+kws+info);
        }
    }
}