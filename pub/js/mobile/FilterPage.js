/// <reference path="../kiosk/registry.ts" />
var mobile;
(function (mobile) {
    var FilterPage = (function () {
        function FilterPage(view, model) {
            var _this = this;
            this.view = view;
            this.model = model;
            this.input = view.find('[data-id=filter]');
            this.input.on('input', function (evt) { return _this.onInput(evt); });
            this.list = view.find('[data-id=list]');
            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter = view.find('[data-id=tiFilter]:first');
            this.catTitle = view.find('[data-id=catTitle]:first');
            view.find('[data-id=btnClear]:first').click(function () {
                _this.input.val('');
                _this.doAll();
            });
        }
        FilterPage.prototype.resetView = function () {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');
            return this.view;
        };
        FilterPage.prototype.showDefault = function () {
            this.data = this.model.getData();
            this.renderList();
            this.input.val('');
            this.tiFilter.show();
            this.catTitle.text('');
            this.doAll();
            this.show();
            this.input.focus();
        };
        FilterPage.prototype.showCategory = function (num) {
            this.tiFilter.hide();
            var cat = this.model.getCategoryById(num);
            console.log(cat);
            this.catTitle.text(cat.label);
            this.data = this.model.getDestsByCat(num);
            this.catid = num;
            this.renderList();
            this.show();
        };
        FilterPage.prototype.show = function () {
            if (this.isHidden) {
                this.isHidden = false;
                this.view.show('fast');
                this.input.focus();
            }
        };
        FilterPage.prototype.hide = function () {
            if (!this.isHidden) {
                this.isHidden = true;
                this.view.hide('fast');
            }
        };
        FilterPage.prototype.getHeader = function () {
            return this.input;
        };
        FilterPage.prototype.onInputFocus = function (evt) {
            this.input.val('');
        };
        FilterPage.prototype.doAll = function () {
            this.data = this.model.getData();
            this.renderList();
        };
        FilterPage.prototype.onInput = function (evt) {
            var str = this.input.val();
            if (str.length == 0) {
                this.doAll();
            }
            else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList();
            }
        };
        FilterPage.prototype.renderList = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += this._renderItem(ar[i]);
            this.list.html(out);
        };
        FilterPage.prototype._renderItem = function (item) {
            var cl = '"';
            //  if (item.advanced) cl = ' more-data"  href="#Details/'+item.destid+'"';
            // else if ((item.email.length + item.phone.length + item.website.length) >20 ) cl= ' more-data" href="#Details/'+item.destid+'"';
            //  var prf:string=cl.length==1?'':'+ ';
            return '<a  href="#details/' + item.id + '" class="list-group-item' + cl + '> <span class="left">' + item.name + '</span><span class="pull-right">' + item.unit + '</span></a>';
        };
        return FilterPage;
    })();
    mobile.FilterPage = FilterPage;
})(mobile || (mobile = {}));
//# sourceMappingURL=filterpage.js.map