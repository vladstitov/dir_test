/**
 * Created by VladHome on 8/12/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="../../typing/svgjs.d.ts" />
var uplight;
(function (uplight) {
    var TouchClip = (function () {
        function TouchClip() {
            var _this = this;
            var el = document.createElement('div');
            el.id = 'Touchclip';
            var draw = SVG(el);
            var rect = draw.rect(1920, 80).fill({ color: '#000', opacity: 0.5 }).y(20);
            ;
            this.rec1 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 }).y(105);
            this.rec2 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 });
            this.text = draw.text('TOUCH TO BEGIN').fill('#fff').y(0);
            this.text.font({
                family: 'Arial',
                size: 60
            });
            this.view = $(el);
            uplight.Registry.getInstance().events.on(uplight.Registry.getInstance().SS_START, function () { return _this.start(); });
            uplight.Registry.getInstance().events.on(uplight.Registry.getInstance().SS_STOP, function () { return _this.stop(); });
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
            this.text.animate(500, '>', 1000).x(280);
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
//# sourceMappingURL=TouchClip.js.map