/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var ScreenSaver2 = (function () {
        function ScreenSaver2() {
            this.init();
        }
        ScreenSaver2.prototype.init = function () {
            this.view = $('#AttractLoop').appendTo('body');
            if (!this.view.get(0))
                return;
            this.R = uplight.Registry.getInstance();
            this.timeout = Number(this.R.settings.ss_timeout) * 1000;
            if (isNaN(this.timeout) || this.timeout < 10000)
                this.timeout = 10000;
            this.attratLoop = new uplight.AttractLoop($('#AttractLoop'), this.R.settings.attract_loop);
            this.isActive = true;
        };
        ScreenSaver2.prototype.startTimer = function () {
            var _this = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () { return _this.startScreenSaver(); }, this.timeout);
        };
        ScreenSaver2.prototype.onViewClick = function () {
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver2.prototype.onClick = function (evt) {
            this.startTimer();
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver2.prototype.startScreenSaver = function () {
            if (this.isActive)
                return;
            this.isActive = true;
            console.log('start ss');
            this.view.appendTo('body');
            this.R.events.triggerHandler(this.R.SS_START);
        };
        ScreenSaver2.prototype.stopScreenSaver = function () {
            this.isActive = false;
            this.view.remove();
            console.log('stop ss');
            this.R.events.triggerHandler(this.R.SS_STOP);
        };
        return ScreenSaver2;
    })();
    uplight.ScreenSaver2 = ScreenSaver2;
})(uplight || (uplight = {}));
//# sourceMappingURL=ScreenSaver.js.map