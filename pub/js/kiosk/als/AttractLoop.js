/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="TouchClip.ts" />
/// <reference path="GalleryDisplay.ts" />
var uplight;
(function (uplight) {
    var ALProps = (function () {
        function ALProps() {
        }
        return ALProps;
    })();
    uplight.ALProps = ALProps;
    var ALoop = (function () {
        function ALoop(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return ALoop;
    })();
    uplight.ALoop = ALoop;
    var AttractLoop = (function () {
        function AttractLoop(el) {
            var _this = this;
            this.timeout = 60000;
            this.isActive = true;
            console.log(el);
            this.R = uplight.Registry.getInstance();
            this.view = $(el);
            this.width = this.view.width();
            var tt = this.R.getProp('ss_timeout');
            var timeout = 60;
            if (tt)
                timeout = Number(tt.value);
            if (isNaN(timeout) || timeout < 10)
                timeout = 60;
            this.timeout = tt * 1000;
            this.al = new ALoop(this.R.getSettings('attract_loop'));
            console.log(this.al);
            this.body = $(document);
            this.body.click(function () {
                _this.onStop();
                _this.resetTimer();
            });
            this.cover = this.view.find('[data-id=cover]:first');
            this.initAL();
            this.R.events.on(uplight.Registry.getInstance().AL_START, function () { return _this.onStart(); });
            this.R.events.on(uplight.Registry.getInstance().AL_STOP, function () { return _this.onStop(); });
            this.R.events.triggerHandler(this.R.AL_START);
        }
        AttractLoop.prototype.resetTimer = function () {
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                uplight.Registry.getInstance().events.triggerHandler(uplight.Registry.getInstance().AL_START);
            }, this.timeout);
        };
        AttractLoop.prototype.hide = function () {
            this.view.addClass(HIDDEN);
        };
        AttractLoop.prototype.onStart = function () {
            this.show();
        };
        AttractLoop.prototype.show = function () {
            this.isActive = true;
            this.view.removeClass(HIDDEN);
        };
        AttractLoop.prototype.onStop = function () {
            if (this.isActive) {
                this.isActive = false;
                this.hide();
            }
        };
        AttractLoop.prototype.initAL = function () {
            var vo = this.al;
            var ar = vo.props;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.url.substr(0, 3) === 'gal') {
                    var gal = new uplight.GalleryDisplay(item);
                    gal.appendTo(this.cover);
                }
            }
            if (vo.TC) {
                var tc = new uplight.TouchClip(this.width);
                this.cover.append(tc.view);
            }
        };
        return AttractLoop;
    })();
    uplight.AttractLoop = AttractLoop;
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoop.js.map