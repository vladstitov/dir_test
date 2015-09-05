/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Connector = (function () {
        function Connector() {
            this.service = 'rem/kiosk.php?a=';
            this.serv = 'rem/kiosk.php';
            this.who = 'kiosk';
        }
        Connector.prototype.getData = function (filename) {
            return $.get(this.service + 'get_data&device=' + this.device + '&data=' + filename);
        };
        Connector.prototype.getUpdates = function (stamp, callBack, onError) {
            $.get(this.service + 'get_updates&stamp=' + stamp).done(callBack).fail(onError);
        };
        Connector.prototype.Log = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_log', msg);
        };
        Connector.prototype.relay = function (kiosk_id, stamp, now, ping, timer, status) {
            return $.get(this.service + 'get_stamp&id=' + kiosk_id + '&stamp=' + stamp + '&now=' + now + '&ping=' + ping + '&timer=' + timer + '&status=' + status);
        };
        Connector.prototype.Error = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_error', msg);
        };
        Connector.prototype.Stat = function (type, val) {
            var who = this.who;
            var stamp = Date.now();
            $.get(this.service + 'log_stat' + '&type=' + type + '&val=' + val + '&who=' + who + '&id=' + this.id + '&stamp=' + stamp);
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
            return $.get(this.service + 'get_dests');
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
//# sourceMappingURL=Connector.js.map