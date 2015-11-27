/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="TouchClip.ts" />
/// <reference path="Gallery.ts" />
var uplight;
(function (uplight) {
    var VOAttractLoop = (function () {
        function VOAttractLoop(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAttractLoop;
    })();
    uplight.VOAttractLoop = VOAttractLoop;
    var AttractLoop = (function () {
        function AttractLoop(el) {
            var _this = this;
            this.timeout = 60000;
            this.isActive = true;
            this.R = uplight.Registry.getInstance();
            this.view = $(el);
            this.width = this.view.width();
            var tt = Number(this.R.settings.ss_timeout);
            if (isNaN(tt) || tt < 10)
                tt = 10;
            this.timeout = tt * 1000;
            this.al = this.R.settings.attract_loop;
            this.body = $(document);
            this.body.click(function () {
                _this.hide();
                _this.resetTimer();
            });
            this.cover = this.view.find('[data-id=cover]:first');
            this.loadAL();
            this.R.events.on(uplight.Registry.getInstance().AL_START, function () { return _this.start(); });
            this.R.events.on(uplight.Registry.getInstance().AL_STOP, function () { return _this.stop(); });
        }
        AttractLoop.prototype.resetTimer = function () {
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                uplight.Registry.getInstance().events.triggerHandler(uplight.Registry.getInstance().AL_START);
            }, this.timeout);
        };
        AttractLoop.prototype.hide = function () {
            if (this.isActive) {
                this.R.events.triggerHandler(this.R.AL_STOPED);
                this.view.addClass(HIDDEN);
                this.isActive = false;
                this.tc.stop();
                this.gallery.stop();
            }
        };
        AttractLoop.prototype.start = function () {
            this.show();
            this.tc.start();
            this.gallery.start();
        };
        AttractLoop.prototype.show = function () {
            if (!this.isActive) {
                this.view.removeClass(HIDDEN);
                this.isActive = true;
                this.start();
            }
        };
        AttractLoop.prototype.stop = function () {
            this.hide();
        };
        AttractLoop.prototype.loadAL = function () {
            var vo = this.al;
            if (vo.type == 'gallery' || vo.type == 'gallery2') {
                var gal = new uplight.Gallery(vo);
                this.cover.append(gal.getView());
                this.gallery = gal;
            }
            if (vo.TC)
                var tc = new uplight.TouchClip(this.width);
            this.cover.append(tc.view);
            tc.start();
            this.tc = tc;
            //console.log(vo);
        };
        return AttractLoop;
    })();
    uplight.AttractLoop = AttractLoop;
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoop.js.map