/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/models.ts" />
/// <reference path="InfoPage.ts" />
var CLICK = 'click';
var SHOW = 'show';
var HIDE = 'hide';
var HIDDEN = 'hidden';
var SELECTED = 'selected';
var DISABLED = 'disabled';
var uplight;
(function (uplight) {
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
    var SCREENSAVER_START = 'SCREENSAVER_START';
    var SCREENSAVER_END = 'SCREENSAVER_END';
    //var MENU_CLICKED: string = 'MENU_CLICKED';
    //var MENU_PAGE_CLICKED: string = 'MENU_PAGE_CLICKED';
    // var CATEGORY_SELECTED: string = 'CATEGORY_SELECTED';
    //var SHOW_DATA_VIEW: string = 'SHOW_DATA_VIEW';
    // var SHOW_DATA_VIEW_BACK: string = 'SHOW_DATA_VIEW_BACK';
    var Registry = (function () {
        function Registry() {
            this.KEY_PRESSED = 'KEY_PRESSED';
            this.KEYWORD_PRESSED = 'KEYWORD_PRESSED';
            this.ON_SETTINGS = 'ON_SETTINGS';
            this.ON_DATA = 'ON_DATA';
            this.CATEGORIES_CHANGE = 'CATEGORIES_CHANGE';
            this.SEARCH_CHANGED = 'SEARCH_CHANGED';
            this.RESET_ALL = 'RESET_ALL';
            this.SS_START = 'SS_START';
            this.SS_STOP = 'SS_STOP';
            this.PAGE_SELECED = 'PAGE_SELECED';
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.SHOW_KEYBOARD = 'SHOW_KEYBOARD';
            this.RESET_VIEWS = 'RESET_VIEWS';
            this.HIDE_VIEWS = 'HIDE_VIEWS';
            this.all = [];
            // onSearchResultClick2: Function;
            this.errors = '';
            this.warns = '';
            this.device = { device: 'kiosk1', ln: 'en' };
            this.dispatcher = $('<div>');
            this.settings = u_settings;
        }
        Registry.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Registry.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
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
})(uplight || (uplight = {}));
//# sourceMappingURL=Registry.js.map