﻿/// <reference path="Connector.ts" />
/// <reference path="KeyboardSimple.ts" />
/// <reference path="SearchResult.ts" />
/// <reference path="SearchController.ts" />
/// <reference path="models.ts" />
/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />


var LISTVIEW: string = 'ListView';
var DETAILSVIEV: string = 'DetailsView';
var MENUVIEW: string = 'MenuView';
var VPCONTENT: string = 'VpContent';
var SHOW_LISTVIEW: string = 'Show_ListView';
var SHOW_DETAILSVIEW: string = 'Show_DetailsView';
var SHOW_PAGE: string = 'Show_Page';
var SHOW_KEYBOARD: string = 'Show_Keyboard';
var HIDE_KEYBOARD: string = 'Hide_Keyboard';
var TYPING: string = 'typing';

var SELECTED: string = 'selected';
var DISABLED: string = 'disabled';

var CLOSE: string = 'CLOSE';
var SCREENSAVER_START: string = 'SCREENSAVER_START';
var SCREENSAVER_END: string = 'SCREENSAVER_END';

var MENU_CLICKED: string = 'MENU_CLICKED';
var MENU_PAGE_CLICKED: string = 'MENU_PAGE_CLICKED';
var CATEGORY_SELECTED: string = 'CATEGORY_SELECTED';


var SHOW_DATA_VIEW: string = 'SHOW_DATA_VIEW';
var SHOW_DATA_VIEW_BACK: string = 'SHOW_DATA_VIEW_BACK';

var CLICK: string = 'click';
var SHOW: string = 'show';
var HIDE: string = 'hide';
//var trace = function (data) { console.log(data); }
module uplight {



    export class Registry {
        KEY_PRESSED:string='KEY_PRESSED';
        KEYWORD_PRESSED:string='KEYWORD_PRESSED';
        ON_SETTINGS:string='ON_SETTINGS';
        ON_DATA:string='ON_DATA';
        CATEGORIES_CHANGE:string='CATEGORIES_CHANGE';
        SEARCH_CHANGED:string='SEARCH_CHANGED';
        modelDests: Model;
       // connector: kiosk.Connector;
        settings: any;
        isServer: boolean;
        all:any=[];
        data:any[];
       // mainView: ViewPort;
        dispatcher: JQuery;
        connector:Connector;
        model:Model;
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
        }

        public add(obj:any):void{
                this.all.push(obj)

        }
        private static _instance: Registry = new Registry();

        public static getInstance(): Registry {
            return Registry._instance;
        }


    }
    export class VOCategory {
        constructor(obj:any){
            for(var str in obj) this[str]=obj[str];
            if(!this.dests) this.dests=[];
        }

        id: number;
        sort: number;
        label: string;
        icon: string;
        enable: number;
        type:number;
        dests:number[];
    }
    export  class VOResult{
        result:string;
        success:string;
        error:string;
    }

    export class VODestination {
        constructor(obj:any){
            for(var str in obj) this[str]=obj[str];
            if(obj.cats=='0') this.cats=[];
            else  if(typeof obj.cats === 'string' && obj.cats.length) this.cats=obj.cats.split(',').map(Number);
            if(typeof obj.imgs === 'string' && obj.imgs.length) this.imgs =obj.imgs.split(',');
        }
        uid:string;
        unit: string;
        id: number;
        destid:string;
        info:string;
        imgs:string[];
        imgsD:string[];
        name: string;
        cats: number[];
        categories:string[];
        pgs: string;
        more: any;
        meta:string;
        kws:string;
        icon:string;

    }



}