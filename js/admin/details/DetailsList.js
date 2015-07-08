/// <reference path="../rega.ts" />
/// <reference path="DetailsEditor.ts" />
var uplight;
(function (uplight) {
    var DetailsList = (function () {
        function DetailsList(view) {
            this.dispatcher = $({});
            this.SELECTED = 'SELECTED';
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.init();
        }
        // isMultyselect: boolean = true;
        DetailsList.prototype.setSelectedItem = function (vo) {
            this.selectedItem = vo;
        };
        DetailsList.prototype.getSelectedItem = function () {
            return this.selectedItem;
        };
        DetailsList.prototype.show = function () {
            this.view.show();
            if (this.selectedEl) {
                var num = this.selectedEl.offset().top;
                if (num > 700 || num < 200)
                    this.scrollToElemnt(this.selectedEl);
            }
        };
        DetailsList.prototype.hide = function () {
            this.view.hide();
        };
        DetailsList.prototype.reset = function () {
            this.selectedItem = null;
            this.listContainer.scrollTop(0);
            this.selectedEl = null;
        };
        DetailsList.prototype.init = function () {
            var _this = this;
            this.listContainer = this.view.find('.nano:first');
            this.thead = $('<thead>').html('<tr class="item-header"><th class="item-id">id</th><th class="item-uid">UID</th><th class="item-name">Name</th><th class="item-unit">Unit</th><th class="item-categories">Categories</th></tr>');
            this.table = $('<table>').addClass('table table-striped').append(this.thead).appendTo(this.listContainer);
            this.list = $('<tbody>').appendTo(this.table);
            // this.listContainer =$('<div>').addClass('list-container').append(this.list).appendTo(this.table);
            //  this.listView =
            this.list.on(CLICK, 'tr', function (evt) { return _this.onSelected(evt); });
            this.tiFilter = $('#txtFilter');
            this.tiFilter.bind('input', function () { return _this.onFilterChange(); });
            this.selectCats = this.view.find('[data-id=select]').on(CHANGE, function (evt) { return _this.onSelectChange(evt); });
            this.total = this.view.find('[data-id=total]');
            this.currentCat = 0;
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () { return _this.onModelChange(); });
            this.destinations = this.R.model.getData();
            if (this.destinations) {
                this.renderDestinations();
                this.renderCategories();
            }
        };
        DetailsList.prototype.onFilterChange = function () {
            this.filterList(this.tiFilter.val());
        };
        DetailsList.prototype.filterList = function (pattern) {
            this.destinations = this.R.model.getDestinantionsByPattern(pattern);
            this.reset();
            this.renderDestinations();
        };
        DetailsList.prototype.onModelChange = function () {
            this.tiFilter.val('');
            this.renderCategories();
            this.destinations = this.R.model.getData();
            this.renderDestinations();
        };
        DetailsList.prototype.onSelected = function (evt) {
            var el = $(evt.currentTarget);
            var i = this.selectElement(el);
            var dest = this.destinations[i];
            console.log(dest);
            this.selectedItem = dest;
            this.dispatcher.triggerHandler(this.SELECTED, dest);
        };
        DetailsList.prototype.renderItem = function (item, i) {
            return '<tr class="item" data-i="' + i + '" data-id="' + item.id + '" >' + '<td class="item-id">' + item.id + '+</td>' + '<td class="item-uid">' + item.uid + '</td>' + '<td class="item-name">' + item.name + '</td>' + '<td class="item-unit">' + item.unit + '</td>' + '<td class="item-categories">' + (item.categories || '&nbsp') + '</td>';
            '</tr>';
        };
        DetailsList.prototype.renderDestinations = function () {
            this.selectedEl = null;
            var ar = this.destinations;
            //  console.log(ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += this.renderItem(ar[i], i);
            this.list.html(out);
            this.total.text(n);
            if (this.selectedItem)
                this.selectItemById(this.selectedItem.id);
        };
        DetailsList.prototype.selectElement = function (el) {
            console.log('selecting ' + el.offset().top);
            var i = el.data('i');
            if (isNaN(i))
                return 0;
            if (this.selectedEl)
                this.selectedEl.removeClass('selected');
            el.addClass('selected');
            this.selectedEl = el;
            return i;
        };
        DetailsList.prototype.selectItemById = function (id) {
            var el = this.list.children('[data-id=' + id + ']:first');
            if (el)
                this.selectElement(el);
            return el;
        };
        DetailsList.prototype.scrollToElemnt = function (el) {
            console.log('scrolling ');
            this.listContainer.scrollTop(0);
            var num = +el.offset().top;
            this.listContainer.scrollTop(num - 300);
        };
        /*
                renderHeader(){
                    var tr = this.list.children()[0]
        
                    var thead = this.thead.find('th');
                    $(tr).children('td').each(function(ind,el){
        
                        $(thead[ind]).width($(el).width());
                        // console.log($(el).width());
                    });
                    this.table.prepend(this.thead);
                }
                */
        // private listContainer:JQuery;
        DetailsList.prototype.renderCategories = function () {
            var ar = this.R.model.getCategories();
            // console.log(ar);
            var str = '<option value="0">All</option>';
            str += '<option value="-1">unassigned</option>';
            for (var i = 0, n = ar.length; i < n; i++)
                str += this.renderCats(ar[i]);
            this.selectCats.html(str);
        };
        DetailsList.prototype.renderCats = function (vo) {
            return '<option value="' + vo.id + '">' + vo.label + '</option>';
        };
        DetailsList.prototype.onSelectChange = function (evt) {
            var cat = Number($(evt.target).prop('value'));
            if (!isNaN(cat))
                this.filterByCategory(cat);
        };
        DetailsList.prototype.filterByCategory = function (cat) {
            this.currentCat = cat;
            if (this.currentCat == 0)
                this.destinations = this.R.model.getData();
            else if (this.currentCat == -1)
                this.destinations = this.R.model.getUnassigned();
            else
                this.destinations = this.R.model.getDestinationsInCategory(this.currentCat);
            this.tiFilter.val('');
            this.reset();
            this.renderDestinations();
        };
        return DetailsList;
    })();
    uplight.DetailsList = DetailsList;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsList.js.map