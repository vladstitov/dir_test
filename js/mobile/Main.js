/// <reference path="detailspage.ts" />
/// <reference path="infopage.ts" />
/// <reference path="../kiosk/models.ts" />
/// <reference path="../kiosk/searchresult.ts" />
/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />
/// <reference path="searchresult.ts" />
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
            this.R = uplight.Registry.getInstance();
            var conn = new uplight.Connector();

            // this.R.connector.getSettings((data) => this.onSettings(data));
            this.R.modelDests = new uplight.DestinantionsModel(conn);
            console.log('Main');

            this.menu = new mobile.Menu('#Menu', conn);
            this.searchResult = new mobile.SearchResult('#Results');
            this.filterPage = new mobile.FilterPage('#Filter', this.R.modelDests);

            this.infoPage = new mobile.InfoPage('#Info', conn);
            this.detailsPage = new mobile.DetailsPage('#Details', conn);
            $(window).on('hashchange', function (evt) {
                return _this.onHachChange();
            });
            document.location.hash = '#Menu';
        }
        Main.prototype.onHachChange = function () {
            var hash = document.location.hash.split('/');
            $('.page').hide();

            switch (hash[0]) {
                case '#Details':
                    this.prev = true;
                    var dest = this.searchResult.getDestinationById(hash[1]);
                    this.detailsPage.getDetails(dest).show('fast');
                    break;
                case '#category':
                    if (!this.prev) {
                        var cat = this.menu.getCategoryById(Number(hash[1]));
                        var view = this.searchResult.showCategory(cat);
                    }
                    this.prev = false;
                    this.searchResult.view.show('fast');
                    break;
                case '#page':
                    this.prev = false;
                    var page = this.menu.getPageById(Number(hash[1]));
                    this.infoPage.getPage(page);
                    this.infoPage.view.show('fast');

                    break;
                case '#Search':
                    if (!this.prev)
                        this.filterPage.resetView();
                    this.prev = false;
                    this.filterPage.view.show('fast');
                    this.filterPage.input.focus();
                    break;
                case '#Menu':
                    this.prev = false;
                    this.menu.view.show('fast');
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
