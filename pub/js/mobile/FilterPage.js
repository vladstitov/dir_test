/// <reference path="../kiosk/registry.ts" />
/// <reference path="../Mobile.ts" />
var uplight;
(function (uplight) {
    var FilterPage = (function () {
        function FilterPage(view, model, tableRender) {
            var _this = this;
            this.view = view;
            this.model = model;
            this.tableRender = tableRender;
            this.ALL = 'all_';
            this.cache = {};
            this.input = view.find('[data-id=filter]');
            this.input.on('input', function (evt) { return _this.onInput(evt); });
            this.list = view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) { return _this.onListClick(evt); });
            this.list.on(CLICK, 'img', function (evt) { return _this._onImageClick(evt); });
            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter = view.find('[data-id=tiFilter]:first');
            this.catTitle = view.find('[data-id=catTitle]:first').hide();
            view.find('[data-id=btnClear]:first').click(function () {
                _this.input.val('');
                _this.renderAll();
            });
            this.details = $('<div>').addClass('details');
            $('#ImageView').click(function () {
                $('#ImageView').fadeOut();
            });
        }
        FilterPage.prototype.resetView = function () {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');
            return this.view;
        };
        FilterPage.prototype.showDefault = function () {
            this.data = this.model.getData();
            this.input.val('');
            this.tiFilter.show();
            this.catTitle.text('').hide();
            this.renderAll();
            this.show();
            this.input.focus();
        };
        FilterPage.prototype.showPattern = function (str) {
            if (str.length == 0) {
                this.renderAll();
            }
            else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList(str);
            }
        };
        FilterPage.prototype.showCategory = function (num) {
            this.tiFilter.hide();
            var cat = this.model.getCategoryById(num);
            this.catTitle.text(cat.label).show();
            this.data = this.model.getDestsByCat(num);
            this.catid = num;
            this.renderList('cat_' + num);
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
        FilterPage.prototype._onImageClick = function (evt) {
            var el = $(evt.target);
            var src = el.attr('src');
            //$('#ImageView').removeClass('hidden');
            $('#ImageView').fadeIn();
            $('#ImageView img').attr('src', src);
            if (this.onImageClick)
                this.onImageClick(src);
        };
        FilterPage.prototype.addDetails = function (vo, el) {
            console.log(vo);
            if (!vo.details)
                vo.details = uplight.Utils.renderDetails(vo);
            el.append(vo.details);
        };
        FilterPage.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget).parent();
            if (el.hasClass(SELECTED)) {
                el.removeClass(SELECTED);
                // el.children('.details');
                this.selected = null;
            }
            else {
                el.addClass(SELECTED);
                this.selected = el;
                if (el.children('.details').length !== 0) {
                }
                else {
                    var vo = this.model.getDestById(el.data('id'));
                    if (vo)
                        this.addDetails(vo, el);
                }
            }
        };
        FilterPage.prototype.getHeader = function () {
            return this.input;
        };
        FilterPage.prototype.onInputFocus = function (evt) {
            this.input.val('');
        };
        FilterPage.prototype.renderAll = function () {
            this.data = this.model.getData();
            this.renderList(this.ALL);
        };
        FilterPage.prototype.onInput = function (evt) {
            var _this = this;
            setTimeout(function () { return _this.doFilter(); }, 200);
        };
        FilterPage.prototype.doFilter = function () {
            var str = this.input.val();
            if (str.length == 0) {
                this.renderAll();
            }
            else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList(str);
            }
        };
        FilterPage.prototype.makeCats = function () {
            var ar = this.model.getCategories();
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out[ar[i].id] = ar[i].icon;
            }
            return out;
        };
        FilterPage.prototype.renderList = function (str) {
            if (this.cache[str])
                this.list.html(this.cache[str]);
            else {
                if (!this.cats)
                    this.cats = this.makeCats();
                var ar = this.data;
                var out = '';
                for (var i = 0, n = ar.length; i < n; i++)
                    out += uplight.Utils.renderItem(ar[i], this.cats);
                this.cache[str] = out;
                this.list.html(out);
            }
        };
        return FilterPage;
    })();
    uplight.FilterPage = FilterPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=filterpage.js.map