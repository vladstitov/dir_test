/// <reference path="Connector.ts" />
/// <reference path="search/KeyboardSimple.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="search/SearchModel.ts" />
/// <reference path="als/TouchClip.ts" />
/// <reference path="als/AttractLoop.ts" />
/// <reference path="als/Gallery.ts" />'
/// <reference path="Kiosk.ts" />
/// <reference path="search/models.ts" />
/// <reference path="../typing/greensock.d.ts" />
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
var uplight;
(function (uplight) {
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
    var VOResult = (function () {
        function VOResult() {
        }
        return VOResult;
    })();
    uplight.VOResult = VOResult;
    var VOAL = (function () {
        function VOAL(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAL;
    })();
    uplight.VOAL = VOAL;
})(uplight || (uplight = {}));
//# sourceMappingURL=Registry.js.map