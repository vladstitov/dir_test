/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var SearchResult = (function () {
        function SearchResult(view) {
            this.view = view;
            this.R = uplight.Registry.getInstance();
            this.model = uplight.Registry.getInstance().model;
            this.list = $('<ul>');
            this.addListeners();
        }
        SearchResult.prototype.addListeners = function () {
            var _this = this;
            this.R.dispatcher.on(this.R.CATEGORIES_CHANGE, function (evt, cats) { return _this.onCategoriesChange(cats); });
            this.R.dispatcher.on(this.R.SEARCH_CHANGED, function (evt, pattern) { return _this.onSearchChange(pattern); });
            this.model.dispatcher.on(this.model.READY, function () { return _this.onDataReady(); });
            console.log('listeners');
        };
        SearchResult.prototype.onListClick = function (evt) {
            var id = $(evt.currentTarget).data('id');
            console.log(id);
            this.R.connector.Stat('sr', id.toString());
        };
        SearchResult.prototype.onSearchChange = function (pattern) {
            this.currentPattern = pattern.toLowerCase();
            //  console.log(pattern);
            if (pattern.length)
                this.result = this.filterSearch();
            else
                this.result = this.data;
            this.render();
        };
        SearchResult.prototype.filterSearch = function () {
            var out1 = [];
            var out2 = [];
            var out3 = [];
            var ar = this.data;
            var str = this.currentPattern;
            for (var i = 0, n = ar.length; i < n; i++) {
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
        SearchResult.prototype.render = function () {
            var _this = this;
            var ar = this.result;
            // console.log(this.data.length);
            var list = this.list.remove().html('');
            for (var i = 0, n = ar.length; i < n; i++)
                list.append(ar[i].getView());
            this.list.appendTo(this.view);
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick(evt); });
        };
        SearchResult.prototype.onDataReady = function () {
            var ar = this.model.getData();
            var list = this.list, out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new DestModel(ar[i]));
            this.data = out;
            this.result = out;
            this.render();
            // this.searchController = new SearchController());
        };
        return SearchResult;
    })();
    uplight.SearchResult = SearchResult;
    var DestModel = (function () {
        function DestModel(vo) {
            this.vo = vo;
            this.byCat = true;
            this.byPat = true;
            this.cache = {};
            this.view = this.renderVo(vo);
            this.name = ' ' + vo.name.toLowerCase();
            this.unit = ' ' + vo.unit.toLowerCase();
            this.kws = ',' + vo.kws;
            this.kw = this.view.find('.kws:first');
        }
        DestModel.prototype.tryName = function (pat) {
            var out = 0;
            var ind = this.name.indexOf(pat);
            if (ind === 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryUnit = function (pat) {
            var out = 0;
            var ind = this.unit.indexOf(pat);
            if (ind == 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryKw = function (pat) {
            var out;
            var kws = this.kws;
            if (this.kws.indexOf(pat) !== -1) {
                var ind = kws.indexOf(pat);
                var end = kws.indexOf(',', ind + 1);
                if (end === -1)
                    out = kws.substr(ind + 1);
                else
                    out = this.kws.substring(ind + 1, end);
            }
            return out;
        };
        DestModel.prototype.filterStr = function (pat) {
            if (this.iskw)
                this.clearKeyword();
            var out = 0;
            if (isNaN(Number(pat))) {
                out = this.tryName(' ' + pat);
                if (out === 0)
                    out = this.tryUnit(' ' + pat);
            }
            else {
                out = this.tryUnit(' ' + pat);
                if (out === 0)
                    out = this.tryName(' ' + pat);
            }
            if (out === 0) {
                var kw = this.tryKw(',' + pat);
                if (kw) {
                    this.showKeyword(kw);
                    out = 3;
                }
            }
            this.ind = out;
            return out;
        };
        DestModel.prototype.showKeyword = function (str) {
            console.log('showKeyword  ' + str);
            this.kw.text(str);
            this.iskw = 1;
        };
        DestModel.prototype.clearKeyword = function () {
            this.kw.text('');
            this.iskw = 0;
        };
        DestModel.prototype.setCats = function (cats) {
            this.cats = ar;
            var ar = this.vo.cats;
            if (!ar) {
                this.byCat = false;
                return this;
            }
            var dif = ar.filter(function (n) {
                return cats.indexOf(n) != -1;
            });
            if (dif.length === 0)
                this.byCat = false;
            else
                this.byCat = true;
            return this;
        };
        DestModel.prototype.render = function () {
            if (this.byCat && this.byPat)
                this.view.show();
            else
                this.view.hide();
        };
        DestModel.prototype.getView = function () {
            return this.view;
        };
        DestModel.prototype.renderVo = function (vo) {
            var more = '<div class="more"><span class="fa fa-plus"></span></div>';
            var icon = '<div class="icon"><span class="' + vo.icon + '"></span></div>';
            var name = '<div class="name">' + vo.name + '</div>';
            var unit = '<div class="unit">' + vo.unit + '</div>';
            var utype = '<div class="unittype">unit</div>';
            var kws = '<div class="kws">' + vo.kws + '</div>';
            var info = '<div class="info">' + vo.cats + '</div>';
            return $('<li>').data('id', vo.id).addClass('Plastic031').html(icon + more + name + unit + utype + kws + info);
        };
        return DestModel;
    })();
    uplight.DestModel = DestModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchResult.js.map