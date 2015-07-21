/// <reference path="Registry.ts" />
/// <reference path="../typing/svgjs.d.ts" />
var uplight;
(function (uplight) {
    var ScreenSaver = (function () {
        function ScreenSaver(container) {
            var _this = this;
            this.container = container;
            this.tt = new TouchClip();
            this.R = uplight.Registry.getInstance();
            this.timeout = Number(this.R.settings.ss_timeout) * 1000;
            if (isNaN(this.timeout) || this.timeout < 20000)
                this.timeout = 20000;
            this.view = $('<div>').attr('id', 'Screensaver');
            document.addEventListener(CLICK, function (evt) { return _this.onClick(evt); });
            this.startTimer();
            this.startScreenSaver();
        }
        ScreenSaver.prototype.startTimer = function () {
            var _this = this;
            clearTimeout(this.timer);
            console.log(this.timeout);
            this.timer = setTimeout(function () { return _this.startScreenSaver(); }, this.timeout);
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
            this.view.appendTo(this.container);
            this.view.append(this.tt.start());
            this.R.dispatcher.triggerHandler(this.R.SS_START);
        };
        ScreenSaver.prototype.stopScreenSaver = function () {
            this.isActive = false;
            this.tt.stop();
            this.view.empty();
            this.view.remove();
            console.log('stop ss');
        };
        return ScreenSaver;
    })();
    uplight.ScreenSaver = ScreenSaver;
    var TouchClip = (function () {
        function TouchClip() {
            var el = document.createElement('div');
            el.id = 'Touchclip';
            var draw = SVG(el);
            var rect = draw.rect(1920, 100).fill({ color: '#000', opacity: 0.5 }).y(20);
            ;
            this.rec1 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 }).y(125);
            this.rec2 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 });
            this.text = draw.text('TOUCH TO BEGIN').fill('#fff').y(-25);
            this.text.font({
                family: 'Arial',
                size: 100
            });
            this.view = $(el);
        }
        TouchClip.prototype.start = function () {
            clearInterval(this.interval);
            this.runIn();
            return this.view;
        };
        TouchClip.prototype.stop = function () {
            clearInterval(this.interval);
            return this.view;
        };
        TouchClip.prototype.runOut = function () {
        };
        TouchClip.prototype.runIn = function () {
            var _this = this;
            this.text.x(2000);
            this.rec1.x(2000);
            this.rec2.x(-2000);
            this.rec1.animate().x(0);
            this.rec2.animate().x(0);
            this.text.animate(500, '>', 1000).x(100);
            this.interval = setTimeout(function () { return _this.removeText(); }, 5000);
        };
        TouchClip.prototype.removeText = function () {
            var _this = this;
            this.text.animate(500).x(-1000);
            setTimeout(function () { return _this.runIn(); }, 700);
        };
        return TouchClip;
    })();
    uplight.TouchClip = TouchClip;
})(uplight || (uplight = {}));
//# sourceMappingURL=ScreenSaver.js.map