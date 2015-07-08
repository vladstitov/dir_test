/**
 * Created by VladHome on 7/7/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var RestartKiosk = (function () {
        function RestartKiosk(container) {
            this.R = uplight.RegA.getInstance();
        }
        RestartKiosk.prototype.restart = function () {
            var _this = this;
            var yes = confirm('Tou want to restart kiosks?');
            if (yes)
                this.R.connector.restartKiosks().done(function (res) { return _this.onResult(res); });
        };
        RestartKiosk.prototype.onResult = function (res) {
            console.log(res);
        };
        return RestartKiosk;
    })();
    uplight.RestartKiosk = RestartKiosk;
})(uplight || (uplight = {}));
//# sourceMappingURL=RestartKiosk.js.map