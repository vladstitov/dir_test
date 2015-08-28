/**
 * Created by VladHome on 6/18/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsCategory = (function () {
        function DetailsCategory(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.categories = view.find('[data-id=categories]:first').on('click', function () { return _this.showHideCategories(); });
            this.categoriesAll = $('#details-categories-list').on('click', 'input', function (evt) { return _this.onCategoryClick($(evt.currentTarget)); }).hide();
        }
        DetailsCategory.prototype.render = function () {
            if (!this.model)
                this.createModel();
            var ar = this.current;
            var ind = this.indexed;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(ind[ar[i]].label);
            }
            this.categories.val(out);
        };
        DetailsCategory.prototype.reset = function () {
            this.hideEditCategories();
            this.categories.val('');
            this.current = null;
        };
        DetailsCategory.prototype.createModel = function () {
            this.model = this.R.model.getCategories();
            var ar = this.model;
            var ind = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                ind[ar[i].id] = ar[i];
            }
            this.indexed = ind;
        };
        DetailsCategory.prototype.setCurrent = function (ar) {
            this.current = ar;
            this.hideEditCategories();
        };
        DetailsCategory.prototype.getCurrent = function () {
            return this.current;
        };
        DetailsCategory.prototype.hideEditCategories = function () {
            if (this.catsVisible) {
                this.categoriesAll.hide('fast');
                this.catsVisible = false;
            }
        };
        DetailsCategory.prototype.showEditCategories = function () {
            if (this.catsVisible)
                return;
            this.categoriesAll.show('fast');
            this.catsVisible = true;
        };
        DetailsCategory.prototype.showHideCategories = function () {
            if (this.catsVisible)
                this.hideEditCategories();
            else {
                this.editCategories();
                this.showEditCategories();
            }
        };
        DetailsCategory.prototype.showItemCategories = function () {
            var ar = this.current;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = this.R.model.getCategoryById(ar[i]);
                if (item)
                    out.push(item.label);
            }
            this.categories.val(out.join(', '));
        };
        DetailsCategory.prototype.addCategory = function (cat) {
            var id = cat.id;
            if (this.current.indexOf(id) === -1) {
                this.current.push(id);
                this.showItemCategories();
                this.haveChanges = true;
            }
        };
        DetailsCategory.prototype.removeCategory = function (cat) {
            var id = cat.id;
            var ind = this.current.indexOf(id);
            if (ind !== -1) {
                this.current.splice(ind, 1);
                this.showItemCategories();
                this.haveChanges = true;
            }
        };
        DetailsCategory.prototype.onCategoryClick = function (el) {
            var cat = this.R.model.getCategoryById(el.val());
            if (el.prop('checked'))
                this.addCategory(cat);
            else
                this.removeCategory(cat);
        };
        DetailsCategory.prototype.editCategories = function () {
            if (!this.current) {
                this.current = [];
                this.renderAllCats();
                return;
            }
            var ar1 = [];
            var ar2 = [];
            var cats = this.R.model.getCategories();
            var catsAr = this.current;
            for (var i = 0, n = cats.length; i < n; i++) {
                if (catsAr.indexOf(cats[i].id) == -1)
                    ar2.push(cats[i]);
                else
                    ar1.push(cats[i]);
            }
            var out = this.renderCats(ar1, true);
            out += this.renderCats(ar2, false);
            this.categoriesAll.html(out);
        };
        DetailsCategory.prototype.renderAllCats = function () {
            this.categoriesAll.html(this.renderCats(this.model, false));
        };
        DetailsCategory.prototype.renderCats = function (cats, selected) {
            var out = '';
            for (var i = 0, n = cats.length; i < n; i++) {
                out += '<div><input type="checkbox" value="' + cats[i].id + '" ' + (selected ? 'checked="true"' : '') + '/><label>' + cats[i].label + '</label></div>';
            }
            return out;
        };
        return DetailsCategory;
    })();
    uplight.DetailsCategory = DetailsCategory;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsCategory.js.map