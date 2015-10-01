/// <reference path="mobile/DetailsPage.ts" />
/// <reference path="mobile/infopage.ts" />
/// <reference path="kiosk/search/models.ts" />
/// <reference path="kiosk/search/SearchResult.ts" />
/// <reference path="mobile/filterpage.ts" />
/// <reference path="mobile/mainview.ts" />
/// <reference path="mobile/FrontPage.ts" />
/// <reference path="mobile/Utils.ts" />
/// <reference path="mobile/menu.ts" />
/// <reference path="kiosk/registry.ts" />
/// <reference path="kiosk/search/DetailsLarge.ts" />
var CLICK = 'mousedown';
var TAP = 'tap';
var TAPHOLD = 'taphold';
var SWIPE = 'swipe';
var SWIPELEFT = 'swipeleft';
var SWIPERIGTH = 'swiperight';
var HIDE = 'hide';
var SHOW = 'show';
var OPEN = 'open';
var DETAILS = 'details';
var uplight;
(function (uplight) {
    var Mobile = (function () {
        // private mainView: MainView;
        function Mobile() {
            var _this = this;
            this.errors = '';
            this.warns = '';
            var settings = u_settings;
            this.R = uplight.Registry.getInstance();
            var conn = new uplight.Connector();
            // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.model = new uplight.Model(conn, function (w) { return _this.warn(w); });
            console.log('Mobile controller');
            this.menu = new uplight.Menu($('[data-ctr=Menu]:first'), conn, this.R.model);
            this.menu.onMenuON = function () {
                _this.menu.hideSearch();
            };
            this.menu.onSearchFocus = function () {
                window.location.href = '#SearchDirectories';
            };
            this.menu.onSearchON = function () {
                _this.menu.hideMenu();
            };
            this.menu.onSearchType = function (str) {
                _this.filterPage.showPattern(str);
            };
            this.menu.onSearchClose = function (str) {
                _this.filterPage.showDefault();
            };
            //  this.searchResult = new SearchResult('#Results');
            this.frontPage = new uplight.FrontPage($('#FrontPage'));
            this.infoPage = new uplight.InfoPageMobile($('[data-ctr=InfoPages]:first'), conn);
            this.detailsLarge = new uplight.DetailsLarge($('[data-ctr=DetailsLarge]:first'));
            this.detailsLarge.hide();
            this.detailsLarge.onClose = function () {
                window.history.back();
            };
            $(window).on('hashchange', function (evt) { return _this.onHachChange(); });
            //document.location.hash = '#Menu';
            this.filterPage = new uplight.FilterPage($('[data-ctr=FilterPage]'), this.R.model);
            this.filterPage.onSelect = function (vo) { return _this.onListSelect(vo); };
            setTimeout(function () { return _this.onHachChange(); }, 1000);
        }
        Mobile.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Mobile.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Mobile.prototype.onListSelect = function (vo) {
            console.log(vo);
            if (vo.imgs)
                window.location.hash = '#destination/' + vo.id;
            else {
            }
        };
        Mobile.prototype.showDestination = function (id) {
            //
            // this.filterPage.hide();
        };
        Mobile.prototype.showPage = function (id) {
            this.infoPage.showInfo(id);
        };
        Mobile.prototype.showDetails = function (str) {
        };
        Mobile.prototype.onHachChange = function () {
            var ar = document.location.hash.split('/');
            var hash = document.location.hash;
            if (hash.indexOf('detailsshow') == 0) {
            }
            switch (ar[0]) {
                case '#destination':
                    var vo = this.R.model.getDestById(Number(ar[1]));
                    if (!vo)
                        break;
                    this.detailsLarge.setDestination(vo).setDestination(vo);
                    this.detailsLarge.render().show();
                    this.infoPage.hide();
                    this.filterPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(ar[1]));
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideAll();
                    break;
                case '#page':
                    var num = Number(ar[1]);
                    if (isNaN(num))
                        break;
                    this.showPage(num);
                    this.filterPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideAll();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    this.menu.hideMenu();
                    this.menu.showSearch();
                    break;
                case '#Menu':
                    break;
                default:
                    break;
            }
            return;
        };
        return Mobile;
    })();
    uplight.Mobile = Mobile;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var app = new uplight.Mobile();
});
//# sourceMappingURL=Mobile.js.map