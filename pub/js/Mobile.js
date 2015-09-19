/// <reference path="mobile/DetailsPage.ts" />
/// <reference path="mobile/infopage.ts" />
/// <reference path="kiosk/search/models.ts" />
/// <reference path="kiosk/search/SearchResult.ts" />
/// <reference path="mobile/filterpage.ts" />
/// <reference path="mobile/mainview.ts" />
/// <reference path="mobile/menu.ts" />
/// <reference path="kiosk/registry.ts" />
/// <reference path="kiosk/search/DetailsLarge.ts" />
var CLICK = 'mousedown';
var TAP = 'tap';
var TAPHOLD = 'taphold';
var SWIPE = 'swipe';
var SWIPELEFT = 'swipeleft';
var SWIPERIGTH = 'swiperight';
var HIDE = 'hidden';
var uplight;
(function (uplight) {
    var Mobile = (function () {
        // private mainView: MainView;
        function Mobile() {
            var _this = this;
            this.errors = '';
            this.warns = '';
            this.R = uplight.Registry.getInstance();
            var conn = new uplight.Connector();
            // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.model = new uplight.Model(conn, function (w) { return _this.warn(w); });
            console.log('Mobile controller');
            this.menu = new uplight.Menu($('[data-ctr=Menu]:first'), conn, this.R.model);
            //  this.searchResult = new SearchResult('#Results');
            this.filterPage = new uplight.FilterPage($('[data-ctr=FilterPage]'), this.R.model);
            this.infoPage = new uplight.InfoPageMobile($('[data-ctr=InfoPages]:first'), conn);
            this.detailsLarge = new uplight.DetailsLarge($('[data-ctr=DetailsLarge]:first'));
            this.detailsLarge.hide();
            this.detailsLarge.onClose = function () {
                window.history.back();
            };
            $(window).on('hashchange', function (evt) { return _this.onHachChange(); });
            //document.location.hash = '#Menu';
            setTimeout(function () { return _this.onHachChange(); }, 1000);
        }
        Mobile.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Mobile.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Mobile.prototype.showDestination = function (id) {
            var vo = this.R.model.getDestById(id);
            if (vo.imgs || vo.more) {
                this.detailsLarge.setDestination(vo).render().show();
                this.filterPage.hide();
            }
            else {
                this.detailsLarge.hide();
                var table = '';
                if (vo.more && vo.more.length)
                    table = this.detailsLarge.createTable(vo.more);
                this.filterPage.showDestination(vo, table);
                this.filterPage.show();
                this.detailsLarge.hide();
            }
            console.log(vo);
            //
            // this.filterPage.hide();
        };
        Mobile.prototype.showPage = function (id) {
            this.infoPage.showInfo(id);
        };
        Mobile.prototype.onHachChange = function () {
            var hash = document.location.hash.split('/');
            switch (hash[0]) {
                case '#details':
                    this.showDestination(Number(hash[1]));
                    this.infoPage.hide();
                    break;
                case '#category':
                    this.filterPage.showCategory(Number(hash[1]));
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#page':
                    var num = Number(hash[1]);
                    if (isNaN(num))
                        break;
                    this.showPage(num);
                    this.filterPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.infoPage.hide();
                    this.detailsLarge.hide();
                    break;
                case '#Menu':
                    break;
                default:
                    document.location.hash = '#Menu';
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