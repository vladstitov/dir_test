/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var VOAL = (function () {
        function VOAL(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAL;
    })();
    uplight.VOAL = VOAL;
    var AttractLoop = (function () {
        function AttractLoop(view, prop) {
            this.view = view;
            this.al = prop;
            this.body = $('[data-id=Body]:first');
            this.loadAL();
        }
        AttractLoop.prototype.hide = function () {
            if (this.isActive) {
                this.view.addClass(HIDDEN);
                this.isActive = false;
                this.stop();
                return true;
            }
            return false;
        };
        AttractLoop.prototype.start = function () {
        };
        AttractLoop.prototype.show = function () {
            if (!this.isActive) {
                this.view.removeClass(HIDDEN);
                this.isActive = true;
                this.start();
            }
        };
        AttractLoop.prototype.stop = function () {
        };
        AttractLoop.prototype.loadAL = function () {
            var _this = this;
            var vo = this.al;
            if (vo.type == 'gallery' || vo.type == 'gallery2') {
                $.getScript('js/kiosk/als/Gallery.js', function () {
                    var gal = new uplight.Gallery(vo);
                    _this.body.append(gal.view);
                });
            }
            if (vo.TC)
                $.getScript('js/kiosk/als/TouchClip.js', function () {
                    var tc = new uplight.TouchClip();
                    _this.body.append(tc.view);
                    tc.start();
                });
            //console.log(vo);
        };
        return AttractLoop;
    })();
    uplight.AttractLoop = AttractLoop;
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoop.js.map