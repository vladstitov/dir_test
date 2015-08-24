/// <reference path="net.ts" />
/// <reference path="models.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
/// <reference path="../../libs/typing/underscore.d.ts" />
/// <reference path="com/GalleryAdmin.ts" />
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
var HASH_CHANGE = 'hash_change';
var CHANGE = 'change';
var CHECKED = 'checked';
var DISABLED = 'disabled';
var SELECTED = 'selected';
var CONTENTEDITABLE = 'contenteditable';
var IMG = 'img';
var SRC = 'src';
var ALERT = 'myAlert';
var ALERT_YES = 'alert_yes';
var ALERT_NO = 'alert_no';
var CLICK = 'click';
var MOUSE_OVER = 'mouseover';
var MOUSE_OUT = 'mouseout';
var REMOVE = 'remove';
var SHOW = 'show';
var HIDE = 'hide';
var CLOSE = 'close';
var CREATE = 'create';
//var trace = function (data) { console.log(data); }
var onAlertYes;
var myAlert;
var myAlertTitle;
var myAlertMsg;
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
            if (!this.dests)
                this.dests = [];
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
    var VODestination = (function () {
        function VODestination(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (obj.cats == '0')
                this.cats = [];
            else if (typeof obj.cats === 'string' && obj.cats.length)
                this.cats = obj.cats.split(',').map(Number);
            if (typeof obj.imgs === 'string' && obj.imgs.length)
                this.imgs = obj.imgs.split(',');
        }
        return VODestination;
    })();
    uplight.VODestination = VODestination;
})(uplight || (uplight = {}));
//# sourceMappingURL=RegA.js.map