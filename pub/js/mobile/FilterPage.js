/// <reference path="../kiosk/registry.ts" />
var mobile;
(function (mobile) {
    var FilterPage = (function () {
        function FilterPage(id, model) {
            var _this = this;
            this.model = model;
            this.view = $(id);
            this.input = $(id + ' input:first');
            this.input.on('input', function (evt) {
                return _this.onInput(evt);
            });
            this.list = $(id + ' [data-id=list]');
            this.cache = { ' ': 'Please type in feild' };
        }
        FilterPage.prototype.resetView = function () {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');

            return this.view;
        };

        FilterPage.prototype.getHeader = function () {
            return this.input;
        };
        FilterPage.prototype.onInputFocus = function (evt) {
            this.input.val('');
        };

        FilterPage.prototype.onInput = function (evt) {
            var str = this.input.val();

            if (str.length == 0)
                this.list.html('Please type in feild ');
else {
                if (!this.cache[str])
                    this.cache[str] = this.renderList(str);
                this.list.html(this.cache[str]);
            }
        };

        FilterPage.prototype.renderList = function (str) {
            var ar = this.model.getDestsByPattern(str);
            var out = '';
            if (ar.length == 0)
                out = '<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>';

            for (var i = 0, n = ar.length; i < n; i++)
                out += this._renderItem(ar[i]);
            return out;
        };

        FilterPage.prototype._renderItem = function (item) {
            var cl = '"';
            if (item.advanced)
                cl = ' more-data"  href="#Details/' + item.destid + '"';
else if ((item.email.length + item.phone.length + item.website.length) > 20)
                cl = ' more-data" href="#Details/' + item.destid + '"';
            var prf = cl.length == 1 ? '' : '+ ';
            return '<a  class="ubutton' + cl + '> <span class="left">' + prf + item.name + '</span><span class="right">' + item.unit + '</span></a>';
        };
        return FilterPage;
    })();
    mobile.FilterPage = FilterPage;
})(mobile || (mobile = {}));
//# sourceMappingURL=FilterPage.js.map
