/// <reference path="mobile/DetailsPage.ts" />
/// <reference path="mobile/infopage.ts" />
/// <reference path="kiosk/search/models.ts" />
/// <reference path="kiosk/search/SearchResult.ts" />
/// <reference path="mobile/filterpage.ts" />
/// <reference path="mobile/mainview.ts" />
/// <reference path="mobile/menu.ts" />
/// <reference path="kiosk/registry.ts" />
/// <reference path="kiosk/search/DetailsLarge.ts" />

var CLICK: string = 'mousedown';
var TAP: string = 'tap';
var TAPHOLD: string = 'taphold';
var SWIPE: string = 'swipe';
var SWIPELEFT: string = 'swipeleft';
var SWIPERIGTH: string = 'swiperight';
var HIDE:string='hidden';

declare var settings: any;

module uplight {

    export class Mobile {

        errors:string='';
        error(str:string):void{
            this.errors+=str+"\n";
        }
        warns:string='';
        warn(str:string):void{
            this.warns+=str+"\n";
        }

        private infoPage: InfoPageMobile;
        private detailsLarge: DetailsLarge;
        private filterPage: FilterPage;

        private R: uplight.Registry;
        private menu: Menu;

       // private mainView: MainView;
        constructor() {

            this.R = uplight.Registry.getInstance();          
           var conn:uplight.Connector = new uplight.Connector();
           // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.model = new Model(conn,(w)=>this.warn(w));
            console.log('Mobile controller');
                                
            this.menu = new Menu($('[data-ctr=Menu]:first'),conn,this.R.model);
          //  this.searchResult = new SearchResult('#Results');
            this.filterPage = new FilterPage($('[data-ctr=FilterPage]'),this.R.model);

            this.infoPage = new InfoPageMobile($('[data-ctr=InfoPages]:first'),conn);
            this.detailsLarge = new DetailsLarge($('[data-ctr=DetailsLarge]:first'));
            this.detailsLarge.hide();
            this.detailsLarge.onClose=()=>{ window.history.back();}
            $(window).on('hashchange', (evt) => this.onHachChange());
            //document.location.hash = '#Menu';
            setTimeout(()=>this.onHachChange(),1000);
        }


        private showDestination(id:number):void{
            var vo:VODestination =  this.R.model.getDestById(id);
            if(vo.imgs || vo.more) {
                this.detailsLarge.setDestination(vo).render().show();
                this.filterPage.hide();
            }else{
                this.detailsLarge.hide();
                var table='';
                if(vo.more && vo.more.length)table=this.detailsLarge.createTable(vo.more);
                this.filterPage.showDestination(vo,table);
                this.filterPage.show();
                this.detailsLarge.hide();
            }

           console.log(vo);
           //
           // this.filterPage.hide();
        }

        private showPage(id:number):void{
            this.infoPage.showInfo(id);
        }


        private onHachChange(): void { 
            var hash: string[] = document.location.hash.split('/');
               
            switch (hash[0]) {
                case '#details':
                        this.showDestination(Number(hash[1]));
                       this.infoPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(hash[1]));
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#page':
                    var num:number = Number(hash[1]);
                    if(isNaN(num)) break
                    this.showPage(num);
                    this.filterPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#Menu':

                   // this.menu.view.show('fast');
                    break;
                default:
                    document.location.hash = '#Menu';
                    break;
            }

            return;

        }
       
    }
}



$(document).ready(function () {
    var app: uplight.Mobile= new uplight.Mobile();

     });


