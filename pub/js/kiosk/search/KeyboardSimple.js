/**
 * Created by VladHome on 6/9/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Keyboard = (function () {
        function Keyboard() {
            this.alphabet = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
            this.view = $('#Keyboard');
            this.R = uplight.Registry.getInstance();
            // if(set && set.keyboard) this.initSettings(set.keyboard);
            this.keys = $('<div>');
            this.keys.html(this.parseKeys(this.alphabet.split(','))).appendTo(this.view);
            this.addListeners();
        }
        Keyboard.prototype.addListeners = function () {
            var _this = this;
            this.keys.on(CLICK, '.kb-key', function (evt) {
                _this.onKeyClick($(evt.currentTarget));
            });
        };
        Keyboard.prototype.onKeyClick = function (el) {
            var txt = el.text().toLowerCase();
            if (txt == '\u00A0') {
                txt = 'del';
            }
            else if (txt == 'space') {
                txt = ' ';
            }
            this.R.dispatcher.triggerHandler(this.R.KEY_PRESSED, txt);
        };
        Keyboard.prototype.parseKeys = function (ar) {
            var out = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if (i === 10)
                    out += '</div><div class="row2">';
                if (i === 20)
                    out += '</div><div class="row3">';
                if (i === 30)
                    out += '</div><div class="row4">';
                out += this.itemRenderer(ar[i]);
            }
            return out + '</div>';
        };
        Keyboard.prototype.itemRenderer = function (item) {
            var cl = 'Plastic031';
            if (item == 'SPACE')
                cl += ' space';
            if (item == '&nbsp;')
                cl += ' back fa fa-caret-square-o-left';
            return '<div class="kb-key ' + cl + '"><span>' + item + '</span></div>';
        };
        return Keyboard;
    })();
    uplight.Keyboard = Keyboard;
    var SearchInput = (function () {
        function SearchInput(view) {
            this.view = view;
            this.data = '';
            this.input = this.view.find('input');
            this.R = uplight.Registry.getInstance();
            this.btnClear = view.find('[data-id=btnClear]:first');
            this.addListeners();
        }
        SearchInput.prototype.reset = function () {
            this.input.val('');
            this.data = '';
        };
        SearchInput.prototype.addListeners = function () {
            var _this = this;
            this.btnClear.on(CLICK, function () { return _this.onClearClick(); });
            this.R.dispatcher.on(this.R.KEY_PRESSED, function (evt, txt) {
                _this.onKeyPressed(txt);
            });
            this.R.dispatcher.on(this.R.KEYWORD_PRESSED, function (evt, txt) {
                _this.onKeyword(txt);
            });
            this.R.dispatcher.on(this.R.RESET_ALL, function () { return _this.reset(); });
        };
        SearchInput.prototype.onKeyword = function (str) {
            //this.isKw=true
            this.R.connector.Stat('kw', str);
            this.setText(str);
        };
        SearchInput.prototype.onClearClick = function () {
            this.setText('');
        };
        SearchInput.prototype.setText = function (txt) {
            this.data = txt;
            this.input.val(this.data);
            this.R.dispatcher.triggerHandler(this.R.SEARCH_CHANGED, this.data);
        };
        SearchInput.prototype.onKeyPressed = function (txt) {
            var str = this.data;
            if (str.length == 0)
                str = txt.toUpperCase();
            else if (txt == 'del') {
                if (str.length > 1)
                    str = str.substr(0, str.length - 1);
                else
                    str = '';
            }
            else
                str += txt;
            this.setText(str);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                uplight.Registry.getInstance().connector.Stat('kb', str);
            }, 1500);
            this.input.focus();
        };
        return SearchInput;
    })();
    uplight.SearchInput = SearchInput;
})(uplight || (uplight = {}));
//# sourceMappingURL=KeyboardSimple.js.map