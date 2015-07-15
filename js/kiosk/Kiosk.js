/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="screensaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="arch/KeyboardView.ts" />
/// <reference path="keyboard.ts" />
/// <reference path="searchresult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="models.ts" />
/// <reference path="Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="keywords.ts" />
var uplight;
(function (uplight) {
    var Kiosk = (function () {
        function Kiosk() {
            var _this = this;
            this.home = '#category=2';
            this.stamp = 0;
            this.let = 0;
            this.timer = (new Date()).getTime();
            uplight.Registry.getInstance().connector = new uplight.Connector();
            uplight.Registry.getInstance().model = new uplight.Model();
            uplight.Registry.getInstance().settings = u_settings;
            uplight.Registry.getInstance().dispatcher = $({});
            var kb = new uplight.Keyboard($('#Keyboard'));
            var si = new uplight.SearchInput($('#searchinput'));
            var kw = new uplight.Keywords($('#kw-container'));
            var cats = new uplight.Categories($('#Categories'));
            var sr = new uplight.SearchResult($('#the-list'));
            var delay = u_settings.timer;
            if (isNaN(delay) || delay < 2000)
                delay = 2000;
            setInterval(function () { return _this.relay(); }, delay);
            /*
            this.R = uplight.Registry.getInstance();
            var conn: Connector = new uplight.Connector();
            //this.R.connector = conn;
            
            this.R.settings=settings
           
            var w: number = 700;
            var h: number = 700;
            this.menu = new Menu($('#Menu'), 500, 350,conn);
            this.maiView = new MainView('#MainView', w, h);
 
 
            var mod: DestinantionsModel = new DestinantionsModel(conn);
            mod.onReady = () => {
                $(window).on('hashchange', (evt) => this.onHachChange());
                document.location.hash=this.home;
            };
            this.R.modelDests = mod
                   
            this.searchResult = new SearchResult(mod);
            this.details = new Details(mod, conn);
            this.infoPage = new InfoPage(conn);
 
            var banner: Banner = new Banner();
           
            this.keyboard = new Keyboard();
            this.keyboard.onKeyboardTyping = (patt: string) => this.onKeyboardTyping(patt);
 
            this.keyboardView = new kiosk.KeyboardView('#KeyboardView');
            this.screenSaver = new ScreenSaver(conn);
 
          */
        }
        Kiosk.prototype.relay = function () {
            var that = this;
            var now = (new Date()).getTime();
            var timer = now - this.timer;
            this.timer = now;
            uplight.Registry.getInstance().connector.relay(kiosk_id, this.stamp, Math.round(now / 1000), this.let, timer).done(function (res) {
                that.let = (new Date()).getTime() - now;
                switch (res.success) {
                    case 'reload':
                        window.location.reload();
                        break;
                    case 'stamp':
                        that.stamp = Number(res.result);
                        break;
                }
            });
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
                case '#screensaver':
                    if (hash[1] == 'start')
                        setTimeout(function () {
                            _this.resetScreen();
                            // document.location.hash = this.home;
                        }, 1000);
                    break;
                case '#page':
                    this.keyboardView.hideKeyboard();
                    break;
                case '#back':
                    this.maiView.showHistory();
                    break;
            }
        };
        Kiosk.prototype.resetScreen = function () {
            console.log('reset Screen');
            // this.keyboardView.hideKeyboard();
            //this.keyboard.reset();
            //  this.menu.reset();
            //this.maiView.reset();
        };
        Kiosk.prototype.onKeyboardTyping = function (patt) {
            //var el: JQuery = this.searchResult.getListByPattern(patt);
            //this.maiView.showView(el);
        };
        return Kiosk;
    })();
    uplight.Kiosk = Kiosk;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var k = new uplight.Kiosk();
});
//# sourceMappingURL=Kiosk.js.map