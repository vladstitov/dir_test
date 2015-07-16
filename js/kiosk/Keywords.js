/**
 * Created by VladHome on 7/11/2015.
 */
/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Keywords = (function () {
        function Keywords(view) {
            var _this = this;
            this.R = uplight.Registry.getInstance();
            this.view = view.empty();
            this.list = $('<ul>').appendTo(view);
            this.list.on(CLICK, 'li', function (evt) {
                _this.onClick(evt.currentTarget);
            });
            this.R.model.dispatcher.on(this.R.model.READY, function () { return _this.onDataReady(); });
        }
        Keywords.prototype.onDataReady = function () {
            var obj = this.R.model.getKeywords();
            var out = [];
            for (var str in obj)
                out.push(new VOKw(str, obj[str]));
            this.data = out;
            this.render();
        };
        Keywords.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            // console.log(out);
            this.list.html(out);
        };
        Keywords.prototype.onClick = function (e) {
            var el = $(e);
            var i = el.data('i');
            var val = this.data[i].label;
            if (val.length > 1)
                this.R.dispatcher.triggerHandler(this.R.KEYWORD_PRESSED, val);
        };
        Keywords.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '">' + item.label + '</li>';
        };
        return Keywords;
    })();
    uplight.Keywords = Keywords;
    var VOKw = (function () {
        function VOKw(label, dests) {
            this.label = label;
            this.dests = dests;
        }
        return VOKw;
    })();
    uplight.VOKw = VOKw;
})(uplight || (uplight = {}));
//# sourceMappingURL=keywords.js.map