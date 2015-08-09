/**
 * Created by VladHome on 8/8/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var Statistics = (function () {
        function Statistics(contauner) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            contauner.load('js/admin/impexp/Statistics.html', function () { return _this.init(); });
        }
        Statistics.prototype.init = function () {
            var _this = this;
            // var today = new Date()
            //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            this.R.connector.getStatistics('-30 days', 'now').done(function (res) { return _this.onData(res); });
        };
        Statistics.prototype.onData = function (res) {
            var cats = new CategoriesChart($('#CategoriesChart'), res);
            console.log(res.length);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
    var CategoriesChart = (function () {
        function CategoriesChart(view, data) {
            var _this = this;
            this.view = view;
            this.data = data;
            this.colors = ['#9F9977', '#B2592D', '#BDC2C7', '#BC8777', ' #996398', '#839182', '#708EB3', '#BC749A'];
            uplight.RegA.getInstance().connector.getCategories().done(function (res) { return _this.onCategories(res); });
        }
        CategoriesChart.prototype.onCategories = function (res) {
            var list = $('<ul>');
            var out = '';
            var ar = res;
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory(ar[i]);
                cat.color = this.colors[i];
                out += '<li><span class="glyphicon glyphicon-stop" style="color:' + cat.color + ';"></span> <span> ' + cat.label + '</span></li>';
            }
            list.html(out);
            this.list = list;
            list.appendTo(this.view.find('[data-id=list]:first'));
            var myPieChart = new Chart(ctx[0]).Pie(data, options);
            //console.log(res);
        };
        return CategoriesChart;
    })();
    var KiosksCart = (function () {
        function KiosksCart(view) {
        }
        return KiosksCart;
    })();
    var DestinationsTable = (function () {
        function DestinationsTable(view) {
        }
        return DestinationsTable;
    })();
    var SearcheTable = (function () {
        function SearcheTable(view) {
        }
        return SearcheTable;
    })();
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map