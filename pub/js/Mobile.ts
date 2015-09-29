/// <reference path="mobile/DetailsPage.ts" />
/// <reference path="mobile/infopage.ts" />
/// <reference path="kiosk/search/models.ts" />
/// <reference path="kiosk/search/SearchResult.ts" />
/// <reference path="mobile/filterpage.ts" />
/// <reference path="mobile/mainview.ts" />
/// <reference path="mobile/FrontPage.ts" />
/// <reference path="mobile/Utils.ts" />
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
var OPEN:string='open';
var DETAILS:string='details'

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
        private frontPage:JQuery

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
            this.menu.onMenuON =()=>{
                this.menu.hideSearch();
            };
            this.menu.onSearchFocus=()=>{
                window.location.href='#SearchDirectories';
            };
            this.menu.onSearchON=()=>{
                this.menu.hideMenu();
            };

            this.menu.onSearchType=(str:string)=>{
                this.filterPage.showPattern(str);
            };
            this.menu.onSearchClose=(str:string)=>{
                this.filterPage.showDefault();
            };


          //  this.searchResult = new SearchResult('#Results');


            this.frontPage = $('#FrontPage').hide();
            this.infoPage = new InfoPageMobile($('[data-ctr=InfoPages]:first'),conn);
            this.detailsLarge = new DetailsLarge($('[data-ctr=DetailsLarge]:first'));
            this.detailsLarge.hide();
            this.detailsLarge.onClose=()=>{ window.history.back();}
            $(window).on('hashchange', (evt) => this.onHachChange());
            //document.location.hash = '#Menu';
            this.filterPage = new FilterPage($('[data-ctr=FilterPage]'),this.R.model,this.detailsLarge.createTable);
            this.filterPage.onSelect=(vo)=>this.onListSelect(vo);
            setTimeout(()=>this.onHachChange(),1000);
        }


        private onListSelect(vo:VODestination):void{
            console.log(vo);

            if(vo.imgs) window.location.hash='#destination/'+vo.id;
            else{
                //var table='';
               // if(vo.more && vo.more.length)table=this.detailsLarge.createTable(vo.more);
               // this.filterPage.addDetails(vo,table);
            }
        }
        private showDestination(id:number):void{




           //
           // this.filterPage.hide();
        }

        private showPage(id:number):void{
            this.infoPage.showInfo(id);
        }


        private showDetails(str):void{

        }

        private onHachChange(): void { 
            var ar: string[] = document.location.hash.split('/');
            var hash:string = document.location.hash;
            if(hash.indexOf('detailsshow')==0){

            }


            switch (ar[0]) {
                case '#destination':
                    var vo:VODestination =  this.R.model.getDestById(Number(ar[1]));
                    if(!vo) break;
                    this.detailsLarge.setDestination(vo).setDestination(vo);
                    this.detailsLarge.render().show();
                    this.infoPage.hide();
                    this.filterPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(ar[1]));
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideAll();
                    break;
                case '#page':
                    var num:number = Number(ar[1]);
                    if(isNaN(num)) break
                    this.showPage(num);
                    this.filterPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideAll();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideMenu();
                    this.menu.showSearch();
                    break;
                case '#Menu':

                   // this.menu.view.show('fast');
                    break;
                default:
                   // document.location.hash = '#Menu';
                    break;
            }

            return;

        }
       
    }
}



$(document).ready(function () {
    var app: uplight.Mobile= new uplight.Mobile();

     });


