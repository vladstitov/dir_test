/// <reference path="detailspage.ts" />
/// <reference path="infopage.ts" />
/// <reference path="../kiosk/search/models.ts" />
/// <reference path="../kiosk/search/SearchResult.ts" />
/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />

/// <reference path="menu.ts" />
/// <reference path="../kiosk/registry.ts" />


var CLICK: string = 'mousedown';
var TAP: string = 'tap';
var TAPHOLD: string = 'taphold';
var SWIPE: string = 'swipe';
var SWIPELEFT: string = 'swipeleft';
var SWIPERIGTH: string = 'swiperight';
declare var settings: any;

module mobile {

    export class Main {

        errors:string='';
        error(str:string):void{
            this.errors+=str+"\n";
        }
        warns:string='';
        warn(str:string):void{
            this.warns+=str+"\n";
        }

        private infoPage: InfoPage;
        private detailsPage: DetailsPage;
        private filterPage: FilterPage;

        private R: uplight.Registry;
        private menu: Menu;

       // private mainView: MainView;
        constructor() {            
            this.R = uplight.Registry.getInstance();          
           var conn:uplight.Connector = new uplight.Connector();
           // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.modelDests = new uplight.Model(conn,(w)=>this.warn(w));
            console.log('Main');
                                
            this.menu = new Menu($('[data-ctr=Menu]:first'),conn,this.R.modelDests);
          //  this.searchResult = new SearchResult('#Results');
            this.filterPage = new FilterPage($('[data-ctr=FilterPage]'),this.R.modelDests);

            this.infoPage = new InfoPage($('[data-ctr=InfoPages]:first'),conn);
            this.detailsPage = new DetailsPage($('[data-ctr=DetailsPage]:first'),conn,this.R.modelDests);
            $(window).on('hashchange', (evt) => this.onHachChange());
            //document.location.hash = '#Menu';
        }


        private onHachChange(): void { 
            var hash: string[] = document.location.hash.split('/');
               
            switch (hash[0]) {
                case '#details':
                    this.detailsPage.showDestination(Number(hash[1]));
                    this.infoPage.hide();
                    this.filterPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(hash[1]));
                    this.infoPage.hide();
                    this.detailsPage.hide();
                    break;
                case '#page':
                    var num:number = Number(hash[1]);
                    if(isNaN(num)) break
                    this.infoPage.showInfo(num);
                    this.filterPage.hide();
                    this.detailsPage.hide();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsPage.hide();
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
    var kiosk: mobile.Main = new mobile.Main();

     });


