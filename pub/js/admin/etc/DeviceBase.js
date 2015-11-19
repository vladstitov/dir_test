var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by VladHome on 11/9/2015.
 */
var uplight;
(function (uplight) {
    var VODevice = (function () {
        function VODevice(obj) {
            this.start = 0;
            this.s_time = 0;
            this.now = 0;
            this.ip = '';
            this.ping = 0;
            this.start_at = 0;
            this.timer = 15000;
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    })();
    uplight.VODevice = VODevice;
    var DeviceModel = (function (_super) {
        __extends(DeviceModel, _super);
        function DeviceModel(dev, s_time, timer) {
            _super.call(this, dev.track);
            for (var str in dev)
                this[str] = dev[str];
            var delta = (s_time - this.s_time);
            if (delta < timer)
                this.status = 1;
            else
                this.status = 0;
        }
        return DeviceModel;
    })(VODevice);
    uplight.DeviceModel = DeviceModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=DeviceBase.js.map