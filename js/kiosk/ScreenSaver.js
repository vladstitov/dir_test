/// <reference path="Registry.ts" />
/// <reference path="../typing/svgjs.d.ts" />
var uplight;
(function (uplight) {
    var ScreenSaver = (function () {
        function ScreenSaver(connector) {
            var _this = this;
            this.connector = connector;
            this.delay = 0.5;
            this.testinterval = 5000;
            this.clickdelay = 500;
            this.timestamp = 0;
            this.delay = Number(uplight.Registry.getInstance().settings.screensaver.delay);
            this.url = uplight.Registry.getInstance().settings.screensaver.url;
            this.view = $('<iframe class="fullscreen"></iframe>');
            ;
            //  this.view.css('background-color', 'rgba(0, 0, 0, 0.5)');//.css('width':'100%').css('height','100%');
            // this.lasttime = Date.now();        
            this.btn = $('<div class="fullscreen"></div>');
            ;
            document.addEventListener(CLICK, function (evt) { return _this.onClick(evt); }, true);
            this.startScreenSaver();
            this.lasttime = Date.now();
            // clearTimeout(this.timerRelay);
            this.timerRelay = setInterval(function () { return _this.runRelay(); }, this.testinterval);
            //  setTimeout(() => this.makescreenBalck(), 10000);        
        }
        ScreenSaver.prototype.onClick = function (evt) {
            var _this = this;
            var del = this.delay * 1000;
            // console.log('Click with delay: '+del+ '   '+ this.timer1);
            if (this.timer1)
                clearTimeout(this.timer1);
            // if(!this.isBlack)
            this.timer1 = setTimeout(function () { return _this.startScreenSaver(); }, del);
        };
        ScreenSaver.prototype.removeScreensaver = function (evt) {
            document.location.href = '#screensaver=end';
            this.isScreenSaver = false;
            this.sscontent = this.view.html();
            // console.log(this.sscontent);
            this.view.hide('fast', function () {
            });
            this.view.attr('SRC', ' ');
            this.view.html('');
            this.btn.off(CLICK);
            if (this.touchClip) {
                this.touchClip.stop();
                this.touchClip.view.remove();
            }
            this.btn.remove();
        };
        ScreenSaver.prototype.startScreenSaver = function () {
            var _this = this;
            console.log('starting screensaver ');
            clearTimeout(this.timer1);
            this.isScreenSaver = true;
            this.view.appendTo(document.body);
            if (!this.touchClip)
                this.touchClip = new TouchClip();
            this.touchClip.start();
            this.touchClip.view.appendTo(document.body);
            var d = this.url;
            this.view.show('fast', function () {
                $(this).attr('src', d);
            });
            this.btn.appendTo(document.body).on(CLICK, function (evt) { return _this.removeScreensaver(evt); });
            document.location.href = '#screensaver=start';
        };
        ScreenSaver.prototype.runRelay = function () {
            var _this = this;
            if (this.reason1 && this.reason2)
                this.reloadApp();
            var now = Date.now();
            this.checkForBlank();
            //  console.log((now - this.lasttime));
            if ((now - this.lasttime) > (this.testinterval * 1.3)) {
                var msg = "\n\r" + now + '  ERROR MEMORY LEAK interval should be: ' + this.testinterval / 1000 + ' but it is: ' + (now - this.lasttime) / 1000;
                if (!this.reason1)
                    this.reason1 = msg;
                else
                    this.reason2 = msg;
            }
            this.lasttime = now;
            this.connector.getUpdates(this.timestamp, function (resp) { return _this.onControl(resp); }, function (resp) { return _this.onRelayError(resp); });
        };
        ScreenSaver.prototype.reloadApp = function () {
            console.log('reloading appp     server:' + uplight.Registry.getInstance().isServer + '  screensaver: ' + this.isScreenSaver);
            if (uplight.Registry.getInstance().isServer && this.isScreenSaver) {
                this.connector.Log(this.reason1 + this.reason2);
                setTimeout(document.location.reload(), 3000);
            }
        };
        ScreenSaver.prototype.onControl = function (res) {
            uplight.Registry.getInstance().isServer = true;
            try {
                var ctr = JSON.parse(res);
            }
            catch (e) {
                console.log(' screensaver ERRRORR ', e);
            }
            ;
            if (!ctr)
                return;
            if (ctr.stamp)
                this.timestamp = ctr.stamp;
            if (ctr.reload) {
                console.log('     server respond        ', ctr);
                if (this.isScreenSaver)
                    location.reload();
            }
        };
        // private isBlack: number = 0;
        ScreenSaver.prototype.onRelayError = function (err) {
            uplight.Registry.getInstance().isServer = false;
            console.log('scrennsaver relay', err);
        };
        /*
                private makeScreenBlack(): void {
                    if (this.isBlack) return;
                    this.removeScreensaver();
                   
                    this.blank =  $('<div id="blackscreen"></div>').addClass('fullscreen').css('background', 'black').appendTo(document.body);
                    this.isBlack = 1;
                }
        
                private blank: JQuery;
                private makeScreenWhite(): void {
                    if (this.isBlack == 0) return;
                    this.isBlack == 0;
                    this.blank.remove();
                    this.startScreenSaver();
                }
        */
        ScreenSaver.prototype.checkForBlank = function () {
            if (!uplight.Registry.getInstance().settings.blank)
                return;
            var blank = uplight.Registry.getInstance().settings.blank;
            var now = new Date();
            var mins = (now.getHours() * 60) + now.getMinutes();
            //    console.log('now: ' + now + '  start: ' + blank.start + '   stop: ' + blank.stop + ' isblack: ' + this.isBlack);
            var onn = blank.stop;
            var off = blank.start;
            if (mins > off) {
                if (onn > off && mins > onn)
                    return;
                if (uplight.Registry.getInstance().isServer)
                    window.location.href = 'BlackScreen.php';
            }
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
        };
        TouchClip.prototype.stop = function () {
            clearInterval(this.interval);
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
            this.text.animate(500, '>', 1000).x(500);
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
//# sourceMappingURL=screensaver.js.map