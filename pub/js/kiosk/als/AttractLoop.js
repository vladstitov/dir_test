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
            this.R = uplight.Registry.getInstance();
            this.view = $(el);
            this.width = this.view.width();
            var tt = this.R.getProp('ss_timeout');
            var timeout = 60;
            if (tt)
                timeout = Number(tt.value);
            if (isNaN(timeout) || timeout < 10)
                timeout = 60;
            this.timeout = timeout * 1000;
            console.log(this.timeout);
            this.al = new ALoop(this.R.getSettings('attract_loop'));
            // console.log(this.al);
            this.body = $(document);
            this.body.click(function () {
                _this.stop();
                _this.resetTimer();
            });
            this.cover = this.view.find('[data-id=cover]:first');
            this.initAL();
            this.start();
        }
        AttractLoop.prototype.resetTimer = function () {
            var _this = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () { return _this.start(); }, this.timeout);
        };
        AttractLoop.prototype.hide = function () {
            this.view.addClass(HIDDEN);
        };
        AttractLoop.prototype.start = function () {
            if (!this.isActive) {
                this.isActive = true;
                this.show();
                this.R.events.triggerHandler(uplight.Registry.getInstance().AL_START);
            }
        };
        AttractLoop.prototype.show = function () {
            console.log('show ');
            this.isActive = true;
            this.view.removeClass(HIDDEN);
        };
        AttractLoop.prototype.stop = function () {
            if (this.isActive) {
                this.R.events.triggerHandler(this.R.AL_STOP);
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
                    var gal = new uplight.GalleryDisplay(item, i);
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