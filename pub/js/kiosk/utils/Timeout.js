/**
 * Created by VladHome on 9/18/2015.
 */
/// <reference path="../Kiosk.ts" />
var uplight;
(function (uplight) {
    var Timeout = (function () {
        function Timeout(timeout) {
            var _this = this;
            this.timeout = timeout;
            document.addEventListener(CLICK, function (evt) { return _this.startTimer(); });
        }
        Timeout.prototype.startTimer = function () {
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                window.location.href = '#timeout';
            }, this.timeout);
        };
        return Timeout;
    })();
    uplight.Timeout = Timeout;
})(uplight || (uplight = {}));
//# sourceMappingURL=Timeout.js.map