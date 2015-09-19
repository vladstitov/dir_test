/**
 * Created by VladHome on 9/16/2015.
 */
/// <reference path="../Kiosk.ts" />
var uplight;
(function (uplight) {
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
            uplight.Registry.getInstance().connector.relay(this.stamp, Math.round(now / 1000), this.ping, timer, uplight.Registry.status).done(function (res) {
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
//# sourceMappingURL=Relay.js.map