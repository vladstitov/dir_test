/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/models.ts" />
/// <reference path="InfoPage.ts" />
var CLICK = 'click';
var CLOSE = 'close';
var SHOW = 'show';
var HIDE = 'hide';
var HIDDEN = 'hidden';
var SELECTED = 'selected';
var DISABLED = 'disabled';
var uplight;
(function (uplight) {
    var SCREENSAVER_START = 'SCREENSAVER_START';
    var SCREENSAVER_END = 'SCREENSAVER_END';
    var Registry = (function () {
        function Registry() {
            this.KIOSK_SHOW_MENU = ' KIOSK_SHOW_MENU';
            this.KIOSK_SHOW_SEARCH = 'KIOSK_SHOW_SEARCH';
            this.ON_SETTINGS = 'ON_SETTINGS';
            this.ON_DATA = 'ON_DATA';
            this.RESET_ALL = 'RESET_ALL';
            this.SS_START = 'SS_START';
            this.SS_STOP = 'SS_STOP';
            this.RESET_VIEWS = 'RESET_VIEWS';
            this.HIDE_VIEWS = 'HIDE_VIEWS';
            this._registr = {};
            this.errors = '';
            this.warns = '';
            this.device = { device: 'kiosk1', ln: 'en' };
            this.events = $('<div>');
            this.settings = u_settings;
        }
        Registry.prototype.register = function (name, cl) {
            this._registr[name] = cl;
        };
        Registry.prototype.getClass = function (name) {
            return this._registr[name];
        };
        Registry.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Registry.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Registry.prototype.setSettings = function (data) {
            this.settings = data;
            this.events.triggerHandler(this.ON_SETTINGS, data);
        };
        Registry.getInstance = function () {
            return Registry._instance;
        };
        Registry._instance = new Registry();
        return Registry;
    })();
    uplight.Registry = Registry;
})(uplight || (uplight = {}));
//# sourceMappingURL=Registry.js.map