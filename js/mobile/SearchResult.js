/// <reference path="../kiosk/models.ts" />
var mobile;
(function (mobile) {
    var SearchResult = (function () {
        function SearchResult(id) {
            this.id = id;
            this.view = $(id);
            this.list = $(id + ' [data-id=list]');
            this.title = $(id + ' [data-id=title]');
            this.cache = {};
            this.model = uplight.Registry.getInstance().modelDests;
        }
        SearchResult.prototype.showCategory = function (cat) {
            this.title.text(cat.label);
            this.list.html(this.getListByCatId(cat.catid));
            return this.view;
        };

        SearchResult.prototype.getDestinationById = function (ids) {
            var id = Number(ids);
            return this.model.getDestById(id);
        };

        SearchResult.prototype.getListByCatId = function (catid) {
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this.renderList(this.model.getDestsByCat(catid));
            return this.cache[id];
        };

        SearchResult.prototype.renderList = function (data) {
            var out = '';
            for (var i = 0, n = data.length; i < n; i++)
                out += this._renderItem(data[i]);
            return out;
        };
        SearchResult.prototype._renderItem = function (item) {
            var cl = '"';
            if (item.advanced)
                cl = ' more-data"  href="#Details/' + item.destid + '"';
else if ((item.email.length + item.phone.length + item.website.length) > 20)
                cl = ' more-data" href="#Details/' + item.destid + '"';
            var prf = cl.length == 1 ? '' : '+ ';
            return '<a  class="u-brand' + cl + '> <span class="left">' + prf + item.name + '</span><span class="right">' + item.unit + '</span></a>';
        };
        return SearchResult;
    })();
    mobile.SearchResult = SearchResult;
})(mobile || (mobile = {}));
//# sourceMappingURL=SearchResult.js.map
