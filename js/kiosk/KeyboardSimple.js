/**
 * Created by VladHome on 6/9/2015.
 */
/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Keyboard = (function () {
        function Keyboard(view) {
            var _this = this;
            this.alphabet = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
            this.view = view;
            this.R = uplight.Registry.getInstance();
            // if(set && set.keyboard) this.initSettings(set.keyboard);
            this.keys = $('<div>');
            this.keys.html(this.parseKeys(this.alphabet.split(','))).appendTo(this.view);
            this.keys.on(CLICK, '.kb-key', function (evt) {
                _this.onKeyClick($(evt.currentTarget));
            });
            this.R.dispatcher.on(this.R.ON_SETTINGS, function (evt, data) {
                //console.log(data);
                //this.alphabet= data.keyboard.keys;
                //this.keys.html(this.parseKeys(this.alphabet.split(',')))
            });
        }
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
            var _this = this;
            this.view = view;
            this.data = '';
            this.input = this.view.find('input');
            this.R = uplight.Registry.getInstance();
            this.R.dispatcher.on(this.R.KEY_PRESSED, function (evt, txt) {
                _this.onKeyPressed(txt);
            });
            this.R.dispatcher.on(this.R.KEYWORD_PRESSED, function (evt, txt) {
                _this.setText(txt);
            });
        }
        SearchInput.prototype.onKeyPressed = function (txt) {
            if (this.data.length == 0)
                this.data = txt.toUpperCase();
            else if (txt == 'del') {
                if (this.data.length > 1)
                    this.data = this.data.substr(0, this.data.length - 1);
                else
                    this.data = '';
            }
            else
                this.data += txt;
            this.input.val(this.data);
            this.input.focus();
            this.R.dispatcher.triggerHandler(this.R.SEARCH_CANGED, this.data);
        };
        SearchInput.prototype.setText = function (txt) {
            this.data = txt;
            this.input.val(this.data);
        };
        return SearchInput;
    })();
    uplight.SearchInput = SearchInput;
    var Keywords = (function () {
        function Keywords(view) {
            var _this = this;
            this.R = uplight.Registry.getInstance();
            this.view = view;
            this.list = view.find('ul');
            this.list.on(CLICK, 'li', function (evt) {
                _this.onClick(evt.currentTarget);
            });
        }
        Keywords.prototype.onClick = function (e) {
            var el = $(e);
            var i = el.data('i');
            var val = this.data[i];
            if (val.length > 1)
                this.R.dispatcher.triggerHandler(this.R.KEYWORD_PRESSED, val);
        };
        Keywords.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '">' + item + '</li>';
        };
        Keywords.prototype.setData = function (ar) {
            this.data = ar;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
        };
        return Keywords;
    })();
    uplight.Keywords = Keywords;
})(uplight || (uplight = {}));
//# sourceMappingURL=KeyboardSimple.js.map