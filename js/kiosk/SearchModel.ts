/**
 * Created by VladHome on 7/18/2015.
 */
    /// <reference path="Registry.ts" />
    /// <reference path="SearchDetailsLarge.ts" />

module uplight{
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
        id:number;
        ind:number;
        details:SearchDetails;
        haveMore:number=0;
        btnMore:JQuery;
        detailsLarge:SearchDetailsLarge;
        constructor(private vo:VODestination){
            var more =  vo.more.split('\n');
            var img=''


            if(more.length!==1 || (vo.tmb && vo.tmb.length)){
                var det:SearchDetails = new SearchDetails( $('<div>').addClass('details'));
                if(more.length!==1) det.createTable(more);
                if(vo.tmb && vo.tmb.length) img= det.createImage(vo.tmb);
                this.details = det;
                this.haveMore=1;
            }

            var det2:SearchDetailsLarge = new SearchDetailsLarge(vo);
            if(det2.haveData) this.detailsLarge = det2.setDetailsSmall(det);
            this.id=vo.id;
            this.view = $('<li>').addClass(img+' item Plastic031').attr('data-id',vo.id).append(this.renderVo(vo,this.haveMore));
            this.name=' '+vo.name.toLowerCase();
            this.unit=' '+vo.unit.toLowerCase();
            this.kws=','+vo.kws;
            this.kw=this.view.find('.kws:first');

            if(this.detailsLarge){}
            else if(this.haveMore==1){
                this.view.append(det.view);

            }

           // console.log(vo.more);



           // this.view.on(CLICK,()=>this.onClick())

        }

        private isHiiden:boolean
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
           this.show();
       }

        private isDetails;

        togleDetails():JQuery{
            if(this.detailsLarge){
                return this.detailsLarge.getView()
            }
            if(!this.details) return null;
            if(this.isDetails) {
                this.isDetails = false;
                this.details.view.hide('fast');
                this.btnMore.html('<span class="fa fa-plus"></span> More...');
            }
            else {
                if(!this.btnMore){
                    this.btnMore= this.view.find('.more:first');
                }
                this.isDetails = true;
                this.details.view.show('fast');
                this.btnMore.html('<span class="fa fa-minus"></span> Less...');
            }
            return null;
        }
        hideDetails():void{
            if(this.isDetails) {
                this.isDetails = false;
                this.details.view.hide();
                this.btnMore.html('<span class="fa fa-plus"></span> More...');

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
           // console.log('showKeyword  '   + str);
            this.kw.text(str);
            this.iskw = 1;
        }
        clearKeyword():void{
            if(this.iskw){
                this.kw.text('');
                this.iskw = 0;
            }

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
            if(this.byCat && this.byPat) this.show();
            else this.hide();
        }
        getView(reset:boolean):JQuery{
            if(reset) this.reset();
            return this.view;
        }


        private renderVo(vo:VODestination,ismore:number):JQuery{
            var more =ismore?'<div class="more"><span class="fa fa-plus"> More...</span></div>':'';
            var icon ='<div class="icon"><span class="'+vo.icon+'"></span></div>';
            var name='<div class="name">'+vo.name+'</div>';
            var unit='<div class="unit">'+vo.unit+'</div>';
            var utype='<div class="unittype">unit</div>';
            var kws = '<div class="kws">'+'</div>';
            var info = '<div class="info">'+vo.info+'</div>';
            var row1='<div class="row">'+kws+utype+'</div>';
            var row2='<div class="row">'+icon+name+unit+'</div>';
            var row3='<div class="row">'+more+info+'</div>';
            return $('<div>').addClass('main').html(row1+row2+row3);
        }
    }
}