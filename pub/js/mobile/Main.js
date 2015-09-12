/// <reference path="detailspage.ts" />
/// <reference path="infopage.ts" />
/// <reference path="../kiosk/search/models.ts" />
/// <reference path="../kiosk/search/SearchResult.ts" />
/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />
/// <reference path="menu.ts" />
/// <reference path="../kiosk/registry.ts" />
var CLICK = 'mousedown';
var TAP = 'tap';
var TAPHOLD = 'taphold';
var SWIPE = 'swipe';
var SWIPELEFT = 'swipeleft';
var SWIPERIGTH = 'swiperight';
var mobile;
(function (mobile) {
    var Main = (function () {
        // private mainView: MainView;
        function Main() {
            var _this = this;
            this.errors = '';
            this.warns = '';
            this.R = uplight.Registry.getInstance();
            var conn = new uplight.Connector();
            // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.modelDests = new uplight.Model(conn, function (w) { return _this.warn(w); });
            console.log('Main');
            this.menu = new mobile.Menu($('[data-ctr=Menu]:first'), conn, this.R.modelDests);
            //  this.searchResult = new SearchResult('#Results');
            this.filterPage = new mobile.FilterPage($('[data-ctr=FilterPage]'), this.R.modelDests);
            this.infoPage = new mobile.InfoPage($('[data-ctr=InfoPages]:first'), conn);
            this.detailsPage = new mobile.DetailsPage($('[data-ctr=DetailsPage]:first'), conn, this.R.modelDests);
            $(window).on('hashchange', function (evt) { return _this.onHachChange(); });
            //document.location.hash = '#Menu';
        }
        Main.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Main.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Main.prototype.onHachChange = function () {
            var hash = document.location.hash.split('/');
            switch (hash[0]) {
                case '#details':
                    this.detailsPage.showDestination(Number(hash[1]));
                    this.infoPage.hide();
                    this.filterPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(hash[1]));
                    this.infoPage.hide();
                    this.detailsPage.hide();
                    break;
                case '#page':
                    var num = Number(hash[1]);
                    if (isNaN(num))
                        break;
                    this.infoPage.showInfo(num);
                    this.filterPage.hide();
                    this.detailsPage.hide();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsPage.hide();
                    break;
                case '#Menu':
                    break;
                default:
                    document.location.hash = '#Menu';
                    break;
            }
            return;
        };
        return Main;
    })();
    mobile.Main = Main;
})(mobile || (mobile = {}));
$(document).ready(function () {
    var kiosk = new mobile.Main();
});
//# sourceMappingURL=Main.js.map