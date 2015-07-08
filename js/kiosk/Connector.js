/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Connector = (function () {
        function Connector() {
            this.service = 'rem/kiosk.php?a=';
        }
        Connector.prototype.getMessages = function (callBack, onError) {
            $.get(this.service + 'get_messages&device=' + this.device).done(callBack).fail(onError);
        };
        Connector.prototype.getUpdates = function (stamp, callBack, onError) {
            $.get(this.service + 'get_updates&stamp=' + stamp).done(callBack).fail(onError);
        };
        Connector.prototype.Log = function (msg) {
            $.post(this.service + 'log_error', msg);
        };
        Connector.prototype.getCategories = function (callBack) {
            $.get(this.service + 'get_categories').done(callBack);
        };
        ////////////////////////////////////////
        Connector.prototype.getPagesList = function (callBack) {
            $.get(this.service + 'get_pages_list').done(callBack);
        };
        Connector.prototype.getPage = function (callBack, id) {
            $.get(this.service + 'get_page&id=' + id).done(callBack);
        };
        ///////////////////////////////////////////////
        Connector.prototype.getSettings = function () {
            return $.get(this.service + 'get_settings', null, 'application/json');
        };
        ///////////////////////////////
        Connector.prototype.getPersonal = function (callBack, destid) {
            $.ajax(this.service + 'get_personal&destid=' + destid).done(callBack);
        };
        Connector.prototype.getAdvanced = function (callBack, adv) {
            $.ajax(this.service + 'get_advanced&id=' + adv).done(callBack);
        };
        Connector.prototype.getDestinations = function () {
            return $.get(this.service + 'get_dests_list');
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
//# sourceMappingURL=Connector.js.map