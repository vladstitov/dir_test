/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="als/ScreenSaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/KeyboardSimple.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="search/SearchModel.ts" />
/// <reference path="als/TouchClip.ts" />
/// <reference path="als/AttractLoop.ts" />
/// <reference path="als/Gallery.ts" />
/// <reference path="search/models.ts" />
/// <reference path="../typing/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="arch/KeyboardView.ts" />
/// <reference path="search/Keyboard.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/models.ts" />
/// <reference path="search/Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/Keywords.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="utils/Relay.ts" />
/// <reference path="utils/Timeout.ts" />
/// <reference path="views.ts" />
var uplight;
(function (uplight) {
    var Kiosk = (function () {
        function Kiosk() {
            var _this = this;
            this.errors = '';
            this.warns = '';
            console.log('kiodk');
            document.addEventListener('mousedown', function (evt) { return _this.onMouseDown(evt); }, true);
            var r = uplight.Registry.getInstance();
            r.connector = new uplight.Connector();
            r.connector.id = u_settings.kiosk;
            r.connector.who = 'kiosk';
            r.model = new uplight.Model(r.connector, function (w) { return _this.warn(w); });
            u_settings.props.forEach(function (val) {
                u_settings[val.id] = val.value;
            });
            r.settings = u_settings;
            r.dispatcher = $({});
            this.R = r;
            this.keyboard = new uplight.Keyboard();
            var si = new uplight.SearchInput($('#searchinput'));
            var kw = new uplight.Keywords($('#kw-container'));
            var cats = new uplight.Categories();
            var btnSearch = new uplight.ButtonSearch($('[data-ctr=ButtonSearch]:first'));
            var kbv = new uplight.KeyboardView($('[data-ctr=KeyboardView]:first'));
            var pm = new uplight.PagesMenu($('[data-ctr=PagesMenu]:first'));
            pm.onSelect = function (item) { return _this.onMenuClick(item); };
            var mm = new uplight.MainMenu($('[data-ctr=MainMenu]:first'));
            this.infoPage = new uplight.InfoPagesModel($('[data-id=Pages]:first'));
            this.R.dispatcher.on(this.R.PAGE_SELECED, function (evt, page) {
                _this.showPages(page);
            });
            this.R.dispatcher.on(this.R.CATEGORY_SELECTED, function (evt, cat) {
                _this.showSearchResult();
            });
            var timeout = new uplight.Timeout(u_settings.ss_timeout);
            timeout.onTimeout = function (num) {
                console.log('timeout ' + num);
                window.location.href = '#timeout';
            };
            this.details = new uplight.DetailsLarge($('#DetailsLarge'));
            this.details.onClose = function () {
                _this.details.hide();
            };
            $('#btnSearch').click(function () { return _this.showSearch(); });
            $('#SearchView [data-id=btnClose]').click(function () { return _this.showMenu(); });
            $('#SearchView [data-id=btnShowMenu]').click(function () { return _this.showMenu(); });
            this.searchResult = new uplight.SearchResult($('#SearchResult'));
            this.searchResult.onSelect = function (id) {
                var dest = _this.R.model.getDestById(id);
                if (dest.imgs)
                    _this.details.setDestination(dest).render().show();
                else
                    _this.searchResult.showDestination(dest);
                console.log(dest);
            };
            if (!u_settings.hasOwnProperty('norelay'))
                var relay = new uplight.Relay(u_settings.timer);
            r.dispatcher.on(r.SS_START, function () {
                r.dispatcher.triggerHandler(r.RESET_ALL);
            });
            this.attractLoop = new uplight.AttractLoop($('#AttractLoop'), u_settings.attract_loop);
            this.attractLoop.show();
            // setTimeout(()=>{ DestModel.dispatcher.triggerHandler(DestModel.DETAILS_LARGE,document.location.hash.split('/')[1]),2000});
            // Registry.getInstance().connector.Log('kiosk started succesguly');
            // Registry.getInstance().connector.Error('kiosk started succesguly');
        }
        Kiosk.prototype.onMouseDown = function (evt) {
            var _this = this;
            if (this.attractLoop.hide())
                window.location.href = '#kiosk';
            if (this.isBlocked) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.stopImmediatePropagation();
            }
            else {
                setTimeout(function () { return _this.unblock(); }, 500);
                this.isBlocked = true;
            }
        };
        Kiosk.prototype.showSearch = function () {
            $('#toolsview').animate({ scrollTop: '365' });
            this.showSearchResult();
        };
        Kiosk.prototype.showMenu = function () {
            $('#toolsview').animate({ scrollTop: '0' });
        };
        Kiosk.prototype.showSearchResult = function () {
            $('#mainport').animate({ scrollLeft: 0 });
        };
        Kiosk.prototype.showPages = function (item) {
            console.log('show pages', item);
            $('#mainport').animate({ scrollLeft: 725 });
        };
        Kiosk.prototype.onMenuClick = function (item) {
            this.showPages(item);
        };
        Kiosk.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Kiosk.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Kiosk.prototype.unblock = function () {
            this.isBlocked = false;
        };
        Kiosk.prototype.onHachChange = function () {
            var _this = this;
            var h = document.location.hash;
            if (this.isBlocked) {
                document.location.hash = h;
                return;
            }
            this.prevHash = h;
            this.isBlocked = true;
            setTimeout(function () { return _this.unblock(); }, 500);
            var hash = h.split('/');
            switch (hash[0]) {
                case '#category':
                    break;
                case '#dest':
                    break;
                case '#ScreenSaver':
                    window.location.reload();
                    break;
            }
        };
        return Kiosk;
    })();
    uplight.Kiosk = Kiosk;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var k = new uplight.Kiosk();
});
//# sourceMappingURL=Kiosk.js.map