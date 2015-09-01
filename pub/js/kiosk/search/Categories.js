/**
 * Created by VladHome on 7/9/2015.
 */
/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Categories = (function () {
        function Categories() {
            var _this = this;
            this.view = $('#Categories');
            this.R = uplight.Registry.getInstance();
            this.list = $('<ul>').appendTo(this.view);
            this.R.model.dispatcher.on(this.R.model.READY, function () { return _this.onDataReady(); });
            this.addListeners();
        }
        Categories.prototype.addListeners = function () {
            var _this = this;
            this.list.on(CLICK, 'input', function (evt) { return _this.onListChanged($(evt.currentTarget)); });
            this.R.dispatcher.on(this.R.RESET_ALL, function () { return _this.reset(); });
        };
        Categories.prototype.reset = function () {
            this.render();
        };
        Categories.prototype.addCategory = function (id) {
            var ind = this.selected.indexOf(id);
            if (ind == -1) {
                this.selected.push(id);
                this.R.connector.Stat('cp', id.toString());
                this.R.dispatcher.triggerHandler(this.R.CATEGORIES_CHANGE, [this.selected]);
            }
        };
        Categories.prototype.removeCategory = function (id) {
            var ind = this.selected.indexOf(id);
            if (ind !== -1) {
                this.selected.splice(ind, 1);
                //console.log(this.selected);
                this.R.connector.Stat('cm', id.toString());
                this.R.dispatcher.triggerHandler(this.R.CATEGORIES_CHANGE, [this.selected]);
            }
        };
        Categories.prototype.onListChanged = function (evt) {
            var id = Number(evt.data('id'));
            if (isNaN(id))
                return;
            if (evt.prop('checked'))
                this.addCategory(id);
            else
                this.removeCategory(id);
        };
        Categories.prototype.onDataReady = function () {
            this.data = this.R.model.getCategories();
            this.render();
        };
        Categories.prototype.renderItem = function (vo, i) {
            return '<li><div><input type="checkbox" data-id="' + vo.id + '" checked="true" /></div><div class="icon ' + vo.icon + '"></div> <div class="name">' + vo.label + '</div></li>';
        };
        Categories.prototype.render = function () {
            console.log('render');
            var ar = this.data;
            var out = '';
            var idis = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
                idis.push(ar[i].id);
            }
            this.selected = idis;
            this.list.html(out);
        };
        return Categories;
    })();
    uplight.Categories = Categories;
})(uplight || (uplight = {}));
//# sourceMappingURL=Categories.js.map