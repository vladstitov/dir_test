///<reference path="DirsAdmin.ts" />
/*
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

var CONTENTEDITABLE:string='contenteditable';

var IMG: string = 'img';
var SRC: string = 'src';
var ALERT: string = 'myAlert';

var ALERT_YES: string = 'alert_yes';
var ALERT_NO: string = 'alert_no';




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
*/
var CHANGE = 'change';
var CHECKED = 'checked';
var DISABLED = 'disabled';
var SELECTED = 'selected';
var MOUSE_OVER = 'mouseover';
var MOUSE_OUT = 'mouseout';
var CLICK = 'click';
var HIDDEN = 'hidden';
var uplight;
(function (uplight) {
    var RegA = (function () {
        function RegA() {
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.CATEGORY_NOTINLIS_CLOSE = 'CATEGORY_NOTINLIS_CLOSE';
            this.CATEGORY_ADD_SELECTED = 'CATEGORY_ADD_SELECTED';
            this.CATEGORY_REMOVE_SELECTED = 'CATEGORY_REMOVE_SELECTED';
            this.CATEGORY_REST = 'CATEGORY_REST';
            this.router = {
                'menu preview kiosk': RegA.SHOW_PREVIEW,
                'menu restart kiosks': RegA.RESTART_KIOSKS,
                'preview close': RegA.HIDE_PREVIEW,
                'view listing': RegA.VIEW_LISTING,
                'show-menu': RegA.SHOW_MENU
            };
            this.isSuper = false;
            this.device = { device: 'admin', ln: 'en' };
        }
        RegA.prototype.register = function (obj) {
            this[obj.id] = obj;
        };
        RegA.prototype.getObject = function (id) {
            return this[id];
        };
        RegA.prototype.msg = function (message, container) {
        };
        RegA.prototype.message = function (msg) {
        };
        RegA.prototype.getSettings = function (index) {
            return this.settings[index];
        };
        RegA.prototype.saveSettings = function (index, obj) {
            this.settings[index] = obj;
            return this.connector.saveSettings(JSON.stringify(this.settings));
        };
        RegA.getInstance = function () {
            return RegA._instance;
        };
        RegA.SHOW_PREVIEW = 'SHOW_PREVIEW';
        RegA.HIDE_PREVIEW = 'HIDE_PREVIEW';
        RegA.RESTART_KIOSKS = 'RESTART_KIOSKS';
        RegA.VIEW_LISTING = 'VIEW_LISTING';
        RegA.HASH_CHANGED = 'HASH_CHANGED';
        RegA.SHOW_MENU = 'SHOW_MENU';
        RegA.ITEM_SELECTED = 'ITEM_SELECTED';
        RegA._instance = new RegA();
        return RegA;
    })();
    uplight.RegA = RegA;
    var VOTrack = (function () {
        function VOTrack(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOTrack;
    })();
    uplight.VOTrack = VOTrack;
    var VODevice = (function () {
        function VODevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    })();
    uplight.VODevice = VODevice;
    var VOPage = (function () {
        function VOPage() {
            this.label = '';
        }
        return VOPage;
    })();
    uplight.VOPage = VOPage;
    var VOCategory = (function () {
        function VOCategory(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOCategory;
    })();
    uplight.VOCategory = VOCategory;
    var VOResult = (function () {
        function VOResult() {
        }
        return VOResult;
    })();
    uplight.VOResult = VOResult;
    var VOItem = (function () {
        function VOItem(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOItem;
    })();
    uplight.VOItem = VOItem;
    var VOAL = (function () {
        function VOAL(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAL;
    })();
    uplight.VOAL = VOAL;
    var VOStat = (function () {
        function VOStat() {
        }
        return VOStat;
    })();
    uplight.VOStat = VOStat;
})(uplight || (uplight = {}));
//# sourceMappingURL=RegA.js.map