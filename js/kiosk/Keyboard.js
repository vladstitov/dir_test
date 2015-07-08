/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Keyboard = (function () {
        function Keyboard(view) {
            var _this = this;
            this.arHints = [];
            //private kb_enter: HTMLDivElement;
            this._pattern = '';
            this._startText = '';
            this.alpabet = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
            this.cursor = '_';
            this.hintsTotal = 4;
            this.hintsLineHieght = 21;
            //  private btnClose: JQuery;
            this.showHints = false;
            this.view = view;
            this.R = uplight.Registry.getInstance();
            var set = this.R.settings;
            if (set && set.keyboard)
                this.initSettings(set.keyboard);
            //this.kb_enter = <HTMLDivElement>document.getElementById('kb_enter');
            this.btnEnter = $('#kb_enter');
            if (this.btnEnter)
                this.btnEnter.on(CLICK, function (evt) { return _this.onEnterPressed(_this._pattern); });
            // this.hints = <HTMLDivElement>document.getElementById('kb_hints_list');       
            this.text = $('#kb_text');
            if (this.text)
                this.text.text(this._startText);
            this.keys = $('<div>');
            var ar = this.alpabet.split(',');
            var k = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if (i === 10)
                    k += '</div><div class="row2">';
                if (i === 20)
                    k += '</div><div class="row3">';
                if (i === 30)
                    k += '</div><div class="row4">';
                k += this.itemRenderer(ar[i]);
            }
            k += '</div>';
            this.keys.html(k).appendTo(this.view);
            console.log(this.view);
            // $(this.keys).children().last().children().addClass("kb_space");
            // $(this.keys).children().last().addClass("kb_space");
            // $(this.keys).append('<div class="kb_button"><span>.</span></div>');
            $('#kb_close').on(CLICK, function (evt) { return _this.onCloseClick(evt); });
            $('.kb-key').on(CLICK, function (evt) { return _this.onKeyPressed(evt); });
            // $(this.hints).on(CLICK, '.hint', (evt) => this.onHintClick(evt));
            this.reset();
        }
        Keyboard.prototype.reset = function () {
            if (!this.isReset) {
                // this.btnClose.removeClass(DISABLED);
                // setTimeout(() => {
                clearInterval(this._interval);
                clearTimeout(this.showHintsTimeout);
                this._pattern = '';
                this.text.text(this._startText);
                // this.hideHintsView();                  
                // }, 300);
                this.isReset = true;
            }
        };
        Keyboard.prototype.initSettings = function (obj) {
            this.settings = obj;
            this.alpabet = obj.keys;
            this._startText = obj.starttext;
            this.showHints = obj.showHints;
        };
        Keyboard.prototype.onHintClick = function (evt) {
            var tag = evt.target;
            if ($(tag).is('li')) {
                this._pattern = $(tag).text();
                this.blink();
            }
        };
        Keyboard.prototype.insertHints = function (ar) {
            for (var i = 0, n = ar.length; i < n; i++) {
                this.arHints[i].innerText = ar[i];
            }
        };
        Keyboard.prototype.renderHints = function (ar) {
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<li class="hint" >' + ar[i] + '</li>';
            return out;
        };
        Keyboard.prototype.hideHintsView = function () {
            if (this.hintsHidden)
                return;
            this.hintsHidden = true;
            this.hintsInTransition = true;
            var self = this;
            TweenLite.to(this.hints, 0.5, {
                top: 100,
                onComplete: function () {
                    self.hintsInTransition = false;
                }
            });
        };
        Keyboard.prototype.showHintView = function (num) {
            //trace(num);          
            this.hintsHidden = false;
            this.hintsInTransition = true;
            var self = this;
            TweenLite.to(this.hints, 0.5, {
                top: 100 - (num * this.hintsLineHieght),
                onComplete: function () {
                    self.hintsInTransition = false;
                }
            });
        };
        Keyboard.prototype._showHints = function () {
            var _this = this;
            // var _this = this;
            clearTimeout(this.showHintsTimeout);
            if (this.hintsInTransition) {
                this.showHintsTimeout = setTimeout(function () { return _this._showHints(); }, 500);
                return;
            }
            var str = this._pattern;
            if (str.length == 0)
                this.hideHintsView();
            else {
                var ar; //= Registry.getInstance().modelDestinations.getHints(str); 
                if (ar.length > 0) {
                    this.hints.innerHTML = this.renderHints(ar);
                    //this.insertHints(ar);
                    this.showHintView(ar.length);
                }
                else
                    this.hideHintsView();
            }
            //trace('getHints: '+str)
            // this.connector.getHints((resp) => this.onGetHints(resp), str);
        };
        Keyboard.prototype.releaseClose = function () {
        };
        Keyboard.prototype.onCloseClick = function (evt) {
            var _this = this;
            this.view.triggerHandler(CLOSE);
            setTimeout(function () { return _this.reset(); }, 500);
        };
        Keyboard.prototype.itemRenderer = function (item) {
            var cl = 'Plastic031';
            if (item == 'SPACE')
                cl += ' space';
            if (item == '&nbsp;')
                cl += ' back fa fa-caret-square-o-left';
            return '<div class="kb-key ' + cl + '"><span>' + item + '</span></div>';
        };
        Keyboard.prototype.onKeyPressed = function (evt) {
            // trace(evt.target);
            var tag = evt.target;
            // alert(tag.tagName);
            if (tag.tagName == 'SPAN')
                this.typeLetter(tag.innerHTML);
        };
        Keyboard.prototype.typeLetter = function (str) {
            this.isReset = false;
            if (str == 'SPACE')
                str = ' ';
            if (str == 'DEL') {
                if (this._pattern.length == 0)
                    return;
                this._pattern = this._pattern.substr(0, this._pattern.length - 1);
            }
            else if (this._pattern.length == 0) {
                if (str == ' ')
                    return;
                str = str.toUpperCase();
                this._pattern = str;
            }
            else {
                if (this._pattern.substr(-1) == ' ' && str == ' ')
                    return;
                str = str.toLowerCase();
                this._pattern += str;
            }
            // if(this.showHints)this._showHints();
            this.blink();
            if (this.onKeyboardTyping)
                this.onKeyboardTyping(this._pattern);
        };
        Keyboard.prototype.blink = function () {
            var _this = this;
            clearInterval(this._interval);
            this._interval = setTimeout(function () { return _this.blink(); }, 500);
            this.cursor = this.cursor == '' ? '_' : '';
            this.text.text(this._pattern + this.cursor);
        };
        return Keyboard;
    })();
    uplight.Keyboard = Keyboard;
})(uplight || (uplight = {}));
//# sourceMappingURL=keyboard.js.map