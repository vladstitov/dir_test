/// <reference path="details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="screensaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="keyboardview.ts" />
/// <reference path="keyboard.ts" />
/// <reference path="searchresult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="models.ts" />
/// <reference path="Menu.ts" />
/// <reference path="Connector.ts" />
var uplight;
(function (uplight) {
    var Kiosk = (function () {
        function Kiosk() {
            this.home = '#category=2';
            var kb = new uplight.Keyboard($('#Keyboard'));
            var si = new uplight.SearchInput($('#searchinput'));
            var kw = new uplight.Keywords($('#kw-container'));
            var model = new uplight.Model();
            var conn = new uplight.Connector();
            conn.getSettings().done(function (data) {
                uplight.Registry.getInstance().setSettings(data);
                var p1 = conn.getDestinations();
                $.when(p1).then(function (v1) {
                    //console.log('v1',v1);
                    uplight.Registry.getInstance().setData(v1);
                });
            });
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
                    this.keyboardView.hideKeyboard();
                    var cat = this.menu.getCategoryById(Number(hash[1]));
                    this.maiView.showView(this.searchResult.getListByCategory(cat));
                    break;
                case '#destid':
                    this.keyboardView.hideKeyboard();
                    this.maiView.showView(this.details.getDetailsById(Number(hash[1])));
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
                    var page = this.menu.getPageById(Number(hash[1]));
                    this.maiView.showView(this.infoPage.getPage(page));
                    break;
                case '#back':
                    this.maiView.showHistory();
                    break;
            }
        };
        Kiosk.prototype.resetScreen = function () {
            console.log('reset Screen');
            this.keyboardView.hideKeyboard();
            this.keyboard.reset();
            this.menu.reset();
            this.maiView.reset();
        };
        Kiosk.prototype.onKeyboardTyping = function (patt) {
            var el = this.searchResult.getListByPattern(patt);
            this.maiView.showView(el);
        };
        return Kiosk;
    })();
    uplight.Kiosk = Kiosk;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var k = new uplight.Kiosk();
});
//# sourceMappingURL=Kiosk.js.map