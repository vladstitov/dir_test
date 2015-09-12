/// <reference path="net.ts" />
/// <reference path="models.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="com/GalleryAdmin.ts" />
///<reference path="info/InfoPagesEditor.ts" />
/// <reference path="Menu.ts" />
///<reference path="details/DetailsEditor.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="impexp/ImportExport.ts" />
///<reference path="impexp/Statistics.ts" />
///<reference path="screen/LabelsManager.ts" />
///<reference path="screen/RestartKiosk.ts" />
///<reference path="screen/SettingsEdit.ts" />
///<reference path="screen/AttractLoopEdit.ts" />




declare class nicEditor {
    setPanel(id: string);
    addInstance(id: string);
    setContent(htm: string);
    getContent(): string;
    instanceById(str:string): nicEditor;
    constructor(options?: {});
}


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

var HASH_CHANGE:string='hash_change';
var CHANGE: string = 'change';
var CHECKED: string = 'checked';
var DISABLED: string = 'disabled';
var SELECTED: string = 'selected';
var CONTENTEDITABLE:string='contenteditable';

var IMG: string = 'img';
var SRC: string = 'src';
var ALERT: string = 'myAlert';

var ALERT_YES: string = 'alert_yes';
var ALERT_NO: string = 'alert_no';

var CLICK: string = 'click';
var MOUSE_OVER:string='mouseover';
var MOUSE_OUT:string='mouseout';

var REMOVE: string = 'remove';
var SHOW: string = 'show';
var HIDE: string = 'hide';
var CLOSE:string='close';
var CREATE:string='create';

//var trace = function (data) { console.log(data); }

var onAlertYes: Function;
var myAlert: JQuery;
var myAlertTitle: JQuery;
var myAlertMsg: JQuery;



module uplight{

    export class RegA {
        static SHOW_PREVIEW:string='SHOW_PREVIEW';
        static HIDE_PREVIEW:string='HIDE_PREVIEW';
        static RESTART_KIOSKS:string='RESTART_KIOSKS';
        static VIEW_LISTING:string='VIEW_LISTING';
        static HASH_CHANGED:string='HASH_CHANGED';
        static SHOW_MENU:string='SHOW_MENU';
        static ITEM_SELECTED:string='ITEM_SELECTED';


        CATEGORY_SELECTED:string='CATEGORY_SELECTED';
        CATEGORY_NOTINLIS_CLOSE='CATEGORY_NOTINLIS_CLOSE';
        CATEGORY_ADD_SELECTED:string ='CATEGORY_ADD_SELECTED';
        CATEGORY_REMOVE_SELECTED:string='CATEGORY_REMOVE_SELECTED';
        CATEGORY_REST:string='CATEGORY_REST';

        router = {
            'menu preview kiosk':RegA.SHOW_PREVIEW,
            'menu restart kiosks':RegA.RESTART_KIOSKS,
            'preview close':RegA.HIDE_PREVIEW,
            'view listing':RegA.VIEW_LISTING,
            'show-menu':RegA.SHOW_MENU
        }

        register(obj: any): void {
            this[obj.id]=obj
        }

        getObject(id: string): any {
            return this[id];
        }

        msg(message:string,container:JQuery){

       }
        message(msg:string):void{

        }
        isSuper:boolean = false;
        model: DestinantionsModel;
        connector: Connector;
        dispatcher:JQuery
        settings: any;
        settingsURL:string = 'settings.json';
        device: {} = { device: 'admin', ln: 'en' };
        private static _instance: RegA = new RegA();
        public static getInstance(): RegA {
            return RegA._instance;
        }
    }
    export class VOPage {
        label: string='';
        enable: number;
        sort: number;
        id: number;
        content:string;
        old_id:number;

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
        color:string;
    }
    export  class VOResult{
        result:string;
        success:string;
        error:string;
    }
    export class VOItem {
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
        id: string;
        value: string;
        label: string;
        type:string;
    }

    export class VOAL {
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
        id: number;
        name: string;
        src: string;
        data_url:string;
        delay:number;
        size:number;
        type:string;
        TC:boolean
    }

    export class VOStat{
        type:string;
        val:string;
    }



}
