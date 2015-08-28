/// <reference path="detailspage.ts" />
/// <reference path="infopage.ts" />
/// <reference path="../kiosk/models.ts" />
/// <reference path="../kiosk/searchresult.ts" />
/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />


/// <reference path="searchresult.ts" />

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
  
        private searchResult: SearchResult;
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
            this.R.modelDests = new uplight.DestinantionsModel(conn);
            console.log('Main');           
                                
            this.menu = new Menu('#Menu',conn);
            this.searchResult = new SearchResult('#Results');
            this.filterPage = new FilterPage('#Filter',this.R.modelDests);

            this.infoPage = new InfoPage('#Info',conn);
            this.detailsPage = new DetailsPage('#Details',conn);
            $(window).on('hashchange', (evt) => this.onHachChange());
            document.location.hash = '#Menu';
        }

        private prev: boolean;
        private onHachChange(): void { 
            var hash: string[] = document.location.hash.split('/');  
            $('.page').hide(); 
               
            switch (hash[0]) {
                case '#Details':
                    this.prev = true;
                    var dest: uplight.VODestination = this.searchResult.getDestinationById(hash[1]);
                    this.detailsPage.getDetails(dest).show('fast');                
                    break;
                case '#category':
                    if (!this.prev) {
                        var cat: uplight.VOItem = this.menu.getCategoryById(Number(hash[1]));
                        var view: JQuery = this.searchResult.showCategory(cat);
                    }  
                    this.prev = false;                 
                    this.searchResult.view.show('fast');                                  
                    break;
                case '#page': 
                    this.prev = false;
                    var page: uplight.VOItem = this.menu.getPageById(Number(hash[1]));
                    this.infoPage.getPage(page)
                    this.infoPage.view.show('fast');   
                                    
                    break;
                case '#Search':
                    if (!this.prev) this.filterPage.resetView();
                    this.prev = false;
                    this.filterPage.view.show('fast');
                    this.filterPage.input.focus();                                 
                    break;
                case '#Menu':
                    this.prev = false;
                    this.menu.view.show('fast');
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


