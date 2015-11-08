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
            // onMenuClick(item:any):void{
            // this.showPages();
            // }
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
            r.events = $({});
            this.setControllers();
            this.R = r;
            //this.keyboard = new Keyboard();
            var si = new uplight.SearchInput($('#searchinput'));
            var kw = new uplight.Keywords($('#kw-container'));
            //  var cats= new Categories();
            ///var btnSearch:ButtonSearch = new ButtonSearch($('[data-ctr=ButtonSearch]:first'));
            //  var kbv:KeyboardView = new KeyboardView($('[data-ctr=KeyboardView]:first'));
            // var pm = new PagesMenu($('[data-ctr=PagesMenu]:first'));
            // pm.onSelect = (item)=>this.onMenuClick(item);
            // var mm:MainMenu = new MainMenu($('[data-ctr=MainMenu]:first'));
            //this.infoPage = new InfoPagesModel($('[data-id=Pages]:first'));
            this.R.events.on(this.R.KIOSK_SHOW_MENU, function () { return _this.showMenu(); });
            this.R.events.on(this.R.KIOSK_SHOW_SEARCH, function () { return _this.showSearch(); });
            this.R.events.on(uplight.Keyboard.KEYBOARD_SHOW, function () { return _this.showSearchResult(); });
            this.R.events.on(uplight.InfoPagesModel.PAGE_SELECED, function (evt, page) {
                _this.R.events.triggerHandler(uplight.Keyboard.KEYBOARD_HIDE);
                _this.showPages();
            });
            this.R.events.on(uplight.Categories.CATEGORY_SELECTED, function (evt, cat) {
                _this.showSearchResult();
            });
            var timeout = new uplight.Timeout(u_settings.ss_timeout);
            timeout.onTimeout = function (num) {
                console.log('timeout ' + num);
                window.location.href = '#timeout';
            };
            r.events.on(uplight.DetailsLarge.DETAILS_LARGE_CLOSE_CLICK, function (evt) {
                r.events.triggerHandler(uplight.DetailsLarge.DETAILS_LARGE_HIDE);
            });
            // $('#btnSearch').click(()=>this.showSearch());
            // $('#SearchView [data-id=btnClose]').click(()=>this.showMenu())
            // $('#SearchView [data-id=btnShowMenu]').click(()=>this.showMenu())
            // this.searchResult = new SearchResult($('#SearchResult'));
            r.events.on(uplight.SearchResult.SEARCH_RESULT_SELECT, function (evt, id) {
                var dest = _this.R.model.getDestById(id);
                if (dest.imgs)
                    r.events.triggerHandler(uplight.DetailsLarge.DETAILS_LARGE_SHOW, id); // this.details.setDestination(dest).render().show();
                else
                    r.events.triggerHandler(uplight.SearchResult.SEARCH_RESULT_SHOW_DESTINATION, id); //this.searchResult.showDestination(dest);
                console.log(dest);
            });
            /*
            
                       this.searchResult.onSelect = (id)=>{
            
                       }
            */
            if (!u_settings.hasOwnProperty('norelay'))
                var relay = new uplight.Relay(u_settings.timer);
            r.events.on(r.SS_START, function () {
                r.events.triggerHandler(r.RESET_ALL);
            });
            this.attractLoop = new uplight.AttractLoop($('#AttractLoop'), u_settings.attract_loop);
            this.attractLoop.show();
            // setTimeout(()=>{ DestModel.events.triggerHandler(DestModel.DETAILS_LARGE,document.location.hash.split('/')[1]),2000});
            // Registry.getInstance().connector.Log('kiosk started succesguly');
            // Registry.getInstance().connector.Error('kiosk started succesguly');
        }
        //keywords:Keywords;
        //  private infoPage:InfoPagesModel;
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
        Kiosk.prototype.showPages = function () {
            $('#mainport').animate({ scrollLeft: 725 });
        };
        Kiosk.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Kiosk.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Kiosk.prototype.setControllers = function () {
            var stringToFunction = function (str) {
                var arr = str.split(".");
                var fn = (window || this);
                for (var i = 0, len = arr.length; i < len; i++)
                    fn = fn[arr[i]];
                if (typeof fn !== "function")
                    fn = null;
                return fn;
            };
            var r = uplight.Registry.getInstance();
            $('[data-ctr]').each(function (ind, el) {
                var str = $(el).data('ctr');
                var MyClass = stringToFunction(str);
                if (MyClass) {
                    r.register(str, MyClass);
                    var cl = new MyClass(el);
                }
                else
                    console.warn(' class ' + str + ' not loaded');
                //console.log(el);
            });
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