/// <reference path="Registry.ts" />
/// <reference path="../../libs/typing/svgjs.d.ts" />
var uplight;
(function (uplight) {
    var ScreenSaver = (function () {
        function ScreenSaver() {
            this.init();
        }
        ScreenSaver.prototype.init = function () {
            this.view = $('#AttractLoop').appendTo('body');
            if (!this.view.get(0))
                return;
            this.R = uplight.Registry.getInstance();
            this.timeout = Number(this.R.settings.ss_timeout) * 1000;
            if (isNaN(this.timeout) || this.timeout < 10000)
                this.timeout = 10000;
            this.attratLoop = new uplight.AttractLoop();
            if (typeof uplight.Kiosk !== 'undefined')
                this.addListeners();
            this.isActive = true;
        };
        ScreenSaver.prototype.startTimer = function () {
            var _this = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () { return _this.startScreenSaver(); }, this.timeout);
        };
        ScreenSaver.prototype.onViewClick = function () {
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver.prototype.addListeners = function () {
            var _this = this;
            document.addEventListener(CLICK, function (evt) { return _this.onClick(evt); });
            this.view.click(function () { return _this.onViewClick(); });
        };
        ScreenSaver.prototype.onClick = function (evt) {
            this.startTimer();
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver.prototype.startScreenSaver = function () {
            if (this.isActive)
                return;
            this.isActive = true;
            console.log('start ss');
            this.view.appendTo('body');
            this.R.dispatcher.triggerHandler(this.R.SS_START);
        };
        ScreenSaver.prototype.stopScreenSaver = function () {
            this.isActive = false;
            this.view.remove();
            console.log('stop ss');
            this.R.dispatcher.triggerHandler(this.R.SS_STOP);
        };
        return ScreenSaver;
    })();
    uplight.ScreenSaver = ScreenSaver;
    $(document).on('DOCUMENT_READY', function () {
        var ss = new ScreenSaver();
        ss.startScreenSaver();
    });
})(uplight || (uplight = {}));
//# sourceMappingURL=screensaver.js.map