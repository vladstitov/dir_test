/// <reference path="Registry.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var SearchResult = (function () {
        function SearchResult(model) {
            this.model = model;
            // private model: kiosk.DestinantionsModel;
            this.cache = {};
        }
        SearchResult.prototype.getListByCategory = function (vo) {
            var id = 'catid' + vo.catid;
            var ar = this.model.getDestsByCat(vo.catid);
            if (!this.cache[id])
                this.cache[id] = $('<div class="view"></div>').html('<div class="mytitle">' + vo.label + '</div><div class="mylist" >' + this.renderList(ar) + '</div>');
            return this.cache[id];
        };
        SearchResult.prototype.getListByPattern = function (pattern) {
            var id = 'pat' + pattern;
            if (!this.cache[id]) {
                var num = Number(pattern);
                var ar;
                if (isNaN(num))
                    ar = this.model.getDestsByPattern(pattern);
                else
                    ar = this.model.getDestsByUnit(num);
                this.cache[id] = this.cache[id] = $('<div class="view"></div>').html('<div class="mytitle">' + pattern + '</div><div class="mylist" >' + this.renderList(ar) + '</div>');
            }
            return this.cache[id];
        };
        SearchResult.prototype.renderList = function (data) {
            var str = '';
            for (var i = 0, n = data.length; i < n; i++) {
                str += this.renderItem(data[i]);
            }
            return str;
        };
        SearchResult.prototype.renderItem = function (item) {
            var cl = (item.email + item.phone + item.website + item.advanced).length < 5 ? '' : 'moredata';
            // if (item.advanced && item.advanced.length > 5) cl = 'advanced';
            var hr = cl.length == 0 ? '' : 'href = "#destid=' + item.destid + '"';
            return '<a  class="u-brand"  ' + hr + '> <span class="name ' + cl + '">' + item.name + '</span><span class="unit">' + item.unit + '</span></a>';
        };
        return SearchResult;
    })();
    uplight.SearchResult = SearchResult;
})(uplight || (uplight = {}));
//# sourceMappingURL=searchresult.js.map