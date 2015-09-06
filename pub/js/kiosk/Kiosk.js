/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="als/ScreenSaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="arch/KeyboardView.ts" />
/// <reference path="search/Keyboard.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/models.ts" />
/// <reference path="search/Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/Keywords.ts" />
/// <reference path="MainMenu.ts" />
var uplight;
(function (uplight) {
    var Kiosk = (function () {
        function Kiosk() {
            var _this = this;
            document.addEventListener('mousedown', function (evt) { return _this.onMouseDown(evt); }, true);
            var r = uplight.Registry.getInstance();
            r.connector = new uplight.Connector();
            r.connector.id = kiosk_id;
            r.connector.who = 'kiosk';
            r.model = new uplight.Model();
            r.settings = u_settings;
            r.dispatcher = $({});
            this.R = r;
            this.keyboard = new uplight.Keyboard();
            var si = new uplight.SearchInput($('#searchinput'));
            var kw = new uplight.Keywords($('#kw-container'));
            var cats = new uplight.Categories();
            var mm = new uplight.MainMenu();
            mm.onClick = function (item) { return _this.onMenuClick(item); };
            $('#btnSearch').click(function () { return _this.shoeSearch(); });
            $('#SearchView [data-id=btnClose]').click(function () { return _this.showMenu(); });
            $('#SearchView [data-id=btnShowMenu]').click(function () { return _this.showMenu(); });
            this.searchResult = new uplight.SearchResult();
            var relay = new Relay(u_settings.timer);
            r.dispatcher.on(r.SS_START, function () {
                r.dispatcher.triggerHandler(r.RESET_ALL);
            });
            // Registry.getInstance().connector.Log('kiosk started succesguly');
            // Registry.getInstance().connector.Error('kiosk started succesguly');
        }
        Kiosk.prototype.onMouseDown = function (evt) {
            var _this = this;
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
        Kiosk.prototype.shoeSearch = function () {
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
            console.log('show pages');
            $('#mainport').animate({ scrollLeft: 725 });
        };
        Kiosk.prototype.onMenuClick = function (item) {
            this.showPages(item);
        };
        Kiosk.prototype.unblock = function () {
            this.isBlocked = false;
        };
        Kiosk.prototype.onHachChange = function () {
            var _this = this;
            if (this.isBlocked) {
                document.location.hash = this.prevHash;
                return;
            }
            this.prevHash = document.location.hash;
            this.isBlocked = true;
            setTimeout(function () { return _this.unblock(); }, 500);
            var hash = this.prevHash.split('=');
            switch (hash[0]) {
                case '#category':
                    break;
                case '#destid':
                    break;
            }
        };
        return Kiosk;
    })();
    uplight.Kiosk = Kiosk;
    var Relay = (function () {
        function Relay(delay) {
            var _this = this;
            this.stamp = 0;
            this.ping = 0;
            if (isNaN(delay) || delay < 2)
                delay = 2;
            this.timer = (new Date()).getTime();
            setInterval(function () { return _this.relay(); }, delay * 1000);
        }
        Relay.prototype.relay = function () {
            var that = this;
            var now = (new Date()).getTime();
            var timer = now - this.timer;
            this.timer = now;
            uplight.Registry.getInstance().connector.relay(kiosk_id, this.stamp, Math.round(now / 1000), this.ping, timer, uplight.Registry.status).done(function (res) {
                that.ping = (new Date()).getTime() - now;
                var vo;
                try {
                    vo = JSON.parse(res);
                }
                catch (e) {
                    console.warn('relay doesnt work ' + res);
                    return;
                }
                switch (vo.success) {
                    case 'reload':
                        window.location.reload();
                        break;
                    case 'load':
                        window.location.href = vo.result;
                        break;
                    case 'stamp':
                        that.stamp = Number(vo.result);
                        break;
                }
            });
        };
        return Relay;
    })();
    uplight.Relay = Relay;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var k = new uplight.Kiosk();
});
//# sourceMappingURL=Kiosk.js.map