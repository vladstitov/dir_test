/**
 * Created by VladHome on 7/18/2015.
 */
    /// <reference path="../Registry.ts" />
    /// <reference path="DetailsLarge.ts" />

module uplight{

    export class ButtonView{
        private $view:JQuery;
        private viewStr:string;
        private $kw
        private details:JQuery

        private $btnMore:JQuery
        show():void{
            this.$view.show();
        }

        hide():void{
            this.$view.hide();
        }

        getView(reset:boolean):JQuery{
            return this.$view;
        }
       // getViewStr(reset:boolean):string{
         //   return this.viewStr;
        //}

        constructor(private model:DestModel){
            //this.viewStr = '<li class="item Plastic031" data-id="'+model.id+'" data-more="'+model.haveMore+'">'+this.renderVoStr(model.vo,model.haveMore)+'</li>';
            this.$view = $('<li>').addClass('item Plastic031').data('id',model.id).append(this.renderVo(model.vo,model.haveMore));
            this.$kw=this.$view.find('.kws:first');
        }

        showDetails():void{
            if(!this.$btnMore){
                this.$btnMore= this.$view.find('.more:first');
                this.details = this.createDetails(this.model.vo)
                this.$view.append(this.details);
            }
            this.details.show('fast');
            this.$btnMore.text('Less...');
        }
        hideDetails():void{
                this.details.hide('fast');
                this.$btnMore.text('More...');

        }


        showKW(str:string){

            this.$kw.text(str);
        }
        resetKW():void{
                this.$kw.text('');
        }

        createDetails(vo:VODestination):JQuery{

            var ar = vo.more.split("\n");
            var out:string='<div class="more" ><table class="table">';

            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i].split('\t');
                out+='<tr><td>'+(item[0]||'&nbsp;')+'</td><td>'+(item[1]||'&nbsp;')+'</td></tr>';
            }

            out+='</table></div>';

            if(vo.tmb)out+='<div class="tmb"><img src="'+vo.tmb+'" /></div>';


            return $('<div>').addClass('details').html(out);
        }


        private renderVoStr(vo:VODestination,ismore:boolean):string{
            var more =ismore?'<a class="btn"><span class="fa fa-plus"></span><span class="more"> More... </span></a>':'';
            var icon ='<span class="icon '+vo.icon+'"></span>';
            var name='<span class="name">'+vo.name+'</span>';
            var unit='<span class="unit">'+vo.unit+'</span>';
            var utype='<span class="unittype">unit</span>';
            var kws = '<span class="kws">'+'</span>';
            var info = '<span class="info">'+vo.info+'</span>';
            var row1='<div class="urow">'+kws+utype+'</div>';
            var row2='<div class="urow">'+icon+name+unit+'</div>';
            var row3='<div class="urow">'+more+info+'</div>';
            return '<div class="main" >'+row1+row2+row3+'</div>';
        }


        private renderVo(vo:VODestination,ismore:boolean):JQuery{
            return $('<div>').addClass('main').html( this.renderVoStr(vo,ismore));
        }

    }


    export class DestModel{
        view:ButtonView;
        private cats:number[];
        byCat:boolean=true;
      //  byPat:boolean=true;
        name:string;
        unit:string;
        kws:string;
        iskw:number;
       // kw:JQuery;
        cache={};
        id:number;
        ind:number;
       // details:SearchDetails;
        haveMore:boolean
        btnMore:JQuery;
      //  detailsLarge:DetailsLarge;
        table:string;
        thumb:HTMLImageElement;
        static  dispatcher:JQuery=$({});
        static DETAILS_LARGE:string='DETAILS_LARGE';


        constructor(public vo:VODestination){
            this.id=vo.id;
           if(vo.more || vo.tmb || vo.imgs || vo.pgs)this.haveMore = true;
            this.view = new ButtonView(this);

            this.name=' '+vo.name.toLowerCase();
            this.unit=' '+vo.unit.toLowerCase();
            this.kws=','+vo.kws;

        }

        addDetails(el:JQuery){
            if(el.children('.details').length===0) {
                el.append(this.view.createDetails(this.vo));
                el.children('.details').show('fast');
            }
        }


        getView(reset:boolean):JQuery{
            return this.view.getView(reset);
        }

       // getViewStr(reset:boolean):string{
           // return this.view.getViewStr(reset);
        //}
        private isHiiden:boolean;

        show():void{
            if(this.isHiiden){
                this.isHiiden=false;
                this.view.show();

            }
        }

        hide():void{
            if(!this.isHiiden){
                this.isHiiden=true;
                this.view.hide();

            }
        }

       reset():void{
           this.hideDetails();
           this.clearKeyword();
           //this.show();
       }

        private isDetails;

        togleDetails():boolean{
            if(this.haveMore){
                if(this.isDetails)this.hideDetails();
                else this.showDetails();
                return this.isDetails;
            }
            return false;
        }


        showDetails():void{
            if(!this.isDetails){
                this.view.showDetails();
                this.isDetails = true;
            }
        }

        hideDetails():void{
            if(this.isDetails) {
                this.isDetails = false;
                this.view.hideDetails();
            }
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
           console.log(this.vo.name+'  showKeyword  '   + str);
            this.view.showKW(str)
            this.iskw = 1;
        }

        clearKeyword():void{
            if(this.iskw){
                this.view.resetKW();
                this.iskw = 0;
            }

        }
        hasCategory(num:number):boolean{
            return this.vo.cats.indexOf(num)!==-1;
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
          if(this.byCat) this.show();
           else this.hide();
      }




    }
}