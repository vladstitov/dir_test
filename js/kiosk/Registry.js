/// <reference path="Connector.ts" />
/// <reference path="KeyboardSimple.ts" />
/// <reference path="models.ts" />
/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />
var LISTVIEW = 'ListView';
var DETAILSVIEV = 'DetailsView';
var MENUVIEW = 'MenuView';
var VPCONTENT = 'VpContent';
var SHOW_LISTVIEW = 'Show_ListView';
var SHOW_DETAILSVIEW = 'Show_DetailsView';
var SHOW_PAGE = 'Show_Page';
var SHOW_KEYBOARD = 'Show_Keyboard';
var HIDE_KEYBOARD = 'Hide_Keyboard';
var TYPING = 'typing';
var SELECTED = 'selected';
var DISABLED = 'disabled';
var CLOSE = 'CLOSE';
var SCREENSAVER_START = 'SCREENSAVER_START';
var SCREENSAVER_END = 'SCREENSAVER_END';
var MENU_CLICKED = 'MENU_CLICKED';
var MENU_PAGE_CLICKED = 'MENU_PAGE_CLICKED';
var CATEGORY_SELECTED = 'CATEGORY_SELECTED';
var SHOW_DATA_VIEW = 'SHOW_DATA_VIEW';
var SHOW_DATA_VIEW_BACK = 'SHOW_DATA_VIEW_BACK';
var CLICK = 'click';
var SHOW = 'show';
var HIDE = 'hide';
//var trace = function (data) { console.log(data); }
var uplight;
(function (uplight) {
    var Registry = (function () {
        function Registry() {
            this.KEY_PRESSED = 'KEY_PRESSED';
            this.KEYWORD_PRESSED = 'KEYWORD_PRESSED';
            this.SEARCH_CANGED = 'SEARCH_CANGED';
            this.ON_SETTINGS = 'ON_SETTINGS';
            this.ON_DATA = 'ON_DATA';
            this.all = [];
            // onSearchResultClick2: Function;
            this.device = { device: 'kiosk1', ln: 'en' };
            this.dispatcher = $('<div>');
        }
        Registry.prototype.setSettings = function (data) {
            this.settings = data;
            this.dispatcher.triggerHandler(this.ON_SETTINGS, data);
        };
        Registry.prototype.setData = function (data) {
            this.data = data;
            this.dispatcher.triggerHandler(this.ON_DATA, data);
        };
        Registry.prototype.add = function (obj) {
            this.all.push(obj);
        };
        Registry.getInstance = function () {
            return Registry._instance;
        };
        Registry._instance = new Registry();
        return Registry;
    })();
    uplight.Registry = Registry;
    var VOItem = (function () {
        function VOItem() {
        }
        return VOItem;
    })();
    uplight.VOItem = VOItem;
    var VODestination = (function () {
        function VODestination() {
        }
        return VODestination;
    })();
    uplight.VODestination = VODestination;
})(uplight || (uplight = {}));
//# sourceMappingURL=Registry.js.map