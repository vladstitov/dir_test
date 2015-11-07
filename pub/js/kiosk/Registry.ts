/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/models.ts" />
/// <reference path="InfoPage.ts" />



declare  var u_settings:any;
var CLICK: string = 'click';
var SHOW: string = 'show';
var HIDE: string = 'hide';
var HIDDEN:string = 'hidden';
var SELECTED: string = 'selected';
var DISABLED: string = 'disabled';
module uplight {

   // var LISTVIEW: string = 'ListView';
    //var DETAILSVIEV: string = 'DetailsView';
   // var MENUVIEW: string = 'MenuView';
   // var VPCONTENT: string = 'VpContent';
   // var SHOW_LISTVIEW: string = 'Show_ListView';
 //   var SHOW_DETAILSVIEW: string = 'Show_DetailsView';
   // var SHOW_PAGE: string = 'Show_Page';
  //  var SHOW_KEYBOARD: string = 'Show_Keyboard';
   // var HIDE_KEYBOARD: string = 'Hide_Keyboard';
   // var TYPING: string = 'typing';



   // var CLOSE: string = 'CLOSE';
    var SCREENSAVER_START: string = 'SCREENSAVER_START';
    var SCREENSAVER_END: string = 'SCREENSAVER_END';

    //var MENU_CLICKED: string = 'MENU_CLICKED';
    //var MENU_PAGE_CLICKED: string = 'MENU_PAGE_CLICKED';
   // var CATEGORY_SELECTED: string = 'CATEGORY_SELECTED';


    //var SHOW_DATA_VIEW: string = 'SHOW_DATA_VIEW';
   // var SHOW_DATA_VIEW_BACK: string = 'SHOW_DATA_VIEW_BACK';





    export class Registry {
        KEY_PRESSED:string='KEY_PRESSED';
        KEYWORD_PRESSED:string='KEYWORD_PRESSED';
        ON_SETTINGS:string='ON_SETTINGS';
        ON_DATA:string='ON_DATA';
        CATEGORIES_CHANGE:string='CATEGORIES_CHANGE';
        SEARCH_CHANGED:string='SEARCH_CHANGED';
        RESET_ALL:string='RESET_ALL';
        SS_START:string='SS_START';
        SS_STOP:string='SS_STOP';
        PAGE_SELECED:string='PAGE_SELECED';
        CATEGORY_SELECTED:string='CATEGORY_SELECTED';
        SHOW_KEYBOARD:string='SHOW_KEYBOARD';
        RESET_VIEWS:string='RESET_VIEWS';
        HIDE_VIEWS:string='HIDE_VIEWS';

        //modelDests: Model;
       // connector: kiosk.Connector;
        settings: any;
        static status:string;
        isServer: boolean;
        all:any=[];
        data:any[];
       // mainView: ViewPort;
        dispatcher: JQuery;
        connector:Connector;
        model:Model;
        pages:InfoPagesModel;
        onKeyboardTyping: Function;
        onMenuPageClicked: Function;

       // onSearchResultClick2: Function;

        errors:string='';
        error(str:string):void{
            this.errors+=str+"\n";
        }
        warns:string='';
        warn(str:string):void{
            this.warns+=str+"\n";
        }
        public device: {} = { device: 'kiosk1', ln: 'en' };

        setSettings(data:any):void{
            this.settings=data;
            this.dispatcher.triggerHandler(this.ON_SETTINGS,data);
        }
        setData(data:any){
            this.data=data;
            this.dispatcher.triggerHandler(this.ON_DATA,data);
        }
        constructor(){
            this.dispatcher=$('<div>');
            this.settings = u_settings;
        }

        public add(obj:any):void{
                this.all.push(obj)

        }
        private static _instance: Registry = new Registry();

        public static getInstance(): Registry {
            return Registry._instance;
        }


    }





}