/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var SearchResult = (function () {
        function SearchResult() {
            var _this = this;
            this.view = $('#list-main');
            this.R = uplight.Registry.getInstance();
            this.model = uplight.Registry.getInstance().model;
            this.list = $('<ul>').addClass('nano-content');
            this.addListeners();
            this.cache = {};
            this.mainport = $('#mainport');
            this.viewDetails = $('#DetailsLarge').click(function (evt) { return _this.onCoverClick(evt); });
            this.detailsContent = this.viewDetails.find('.content:first');
        }
        SearchResult.prototype.reset = function () {
            this.result = this.data;
            this.render(true);
            this.hideDetails();
        };
        SearchResult.prototype.addListeners = function () {
            var _this = this;
            this.R.dispatcher.on(this.R.CATEGORIES_CHANGE, function (evt, cats) { return _this.onCategoriesChange(cats); });
            this.R.dispatcher.on(this.R.SEARCH_CHANGED, function (evt, pattern) { return _this.onSearchChange(pattern); });
            this.R.dispatcher.on(this.R.RESET_ALL, function () { return _this.reset(); });
            this.model.dispatcher.on(this.model.READY, function () { return _this.onDataReady(); });
            console.log('listeners');
        };
        SearchResult.prototype.getModelById = function (id) {
            if (this.cache[id])
                return this.cache[id];
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id) {
                    return this.cache[id] = ar[i];
                    return ar[i];
                }
            }
            return null;
        };
        SearchResult.prototype.onListClick = function (evt) {
            // console.log(evt.currentTarget);
            var id = $(evt.currentTarget).data('id');
            // console.log(id);
            if (isNaN(Number(id)))
                return;
            var mod = this.getModelById(id);
            if (mod) {
                var det = mod.togleDetails();
                if (det)
                    this.showDetailsLarge(det);
            }
            this.R.connector.Stat('sr', id.toString());
        };
        SearchResult.prototype.hideDetails = function () {
            if (this.isDetails) {
                this.viewDetails.hide();
                this.detailsContent.empty();
                this.isDetails = false;
            }
        };
        SearchResult.prototype.onCoverClick = function (evt) {
            // console.log($(evt.target));
            if ($(evt.target).data('id') == 'btnClose') {
                this.hideDetails();
            }
        };
        SearchResult.prototype.showDetailsLarge = function (det) {
            this.viewDetails.show();
            this.detailsContent.append(det);
            this.isDetails = true;
        };
        SearchResult.prototype.onSearchChange = function (pattern) {
            this.currentPattern = pattern.toLowerCase();
            //  console.log(pattern);
            if (pattern.length)
                this.result = this.filterSearch();
            else
                this.result = this.data;
            this.render(false);
        };
        SearchResult.prototype.filterSearch = function () {
            var out1 = [];
            var out2 = [];
            var out3 = [];
            var ar = this.data;
            var str = this.currentPattern;
            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].clearKeyword();
                var ind = ar[i].filterStr(str);
                if (ind === 1)
                    out1.push(ar[i]);
                else if (ind === 2)
                    out2.push(ar[i]);
                else if (ind === 3)
                    out3.push(ar[i]);
            }
            return out1.concat(out2, out3);
        };
        SearchResult.prototype.onCategoriesChange = function (cats) {
            this.currentCats = cats;
            // console.log(cats);
            this.filterCats(cats);
        };
        SearchResult.prototype.filterCats = function (cats) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++)
                ar[i].setCats(cats).render();
        };
        SearchResult.prototype.render = function (reset) {
            var _this = this;
            var ar = this.result;
            // console.log(this.data.length);
            var list = this.list.remove().html('');
            for (var i = 0, n = ar.length; i < n; i++)
                list.append(ar[i].getView(reset));
            this.list.appendTo(this.view);
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick(evt); });
        };
        SearchResult.prototype.onDataReady = function () {
            var ar = this.model.getData();
            var list = this.list, out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new uplight.DestModel(ar[i]));
            this.data = out;
            this.result = out;
            this.render(false);
            // this.searchController = new SearchController());
        };
        return SearchResult;
    })();
    uplight.SearchResult = SearchResult;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchResult.js.map