/**
 * Created by VladHome on 8/8/2015.
 */
///<reference path="../../typing/chart.d.ts"/>
/// <reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var Statistics = (function () {
        function Statistics(contauner) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            contauner.load('htms/admin/Statistics.htm', function () { return _this.init(); });
        }
        Statistics.prototype.init = function () {
            // var today = new Date()
            //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            var _this = this;
            this.R.connector.getStatistics('-30 days', 'now').done(function (res) { return _this.onData(res); });
            var today = new Date();
            var priorDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            this.fromTo = 'from ' + today.toDateString().substr(4) + ' to ' + priorDate.toDateString().substr(4);
        };
        Statistics.prototype.onData = function (res) {
            var ar = res;
            //   console.log(res);
            //  var out:VOStat[]=[];
            var kiosks = {};
            var dests = {};
            var kb = {};
            var kw = {};
            var cats = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                var st = new uplight.VOStat();
                var did = ar[i][4];
                if (!kiosks[did])
                    kiosks[did] = kiosks[did] = [];
                var k = kiosks[did];
                var stamp = Number(ar[i][5]);
                kiosks[did].push(stamp);
                var val = ar[i][2];
                switch (ar[i][1]) {
                    case 'cp':
                        if (cats[val] === undefined)
                            cats[val] = 0;
                        cats[val]++;
                        break;
                    case 'cm':
                        if (cats[val] === undefined)
                            cats[val] = 0;
                        cats[val]--;
                        break;
                    case 'kw':
                        if (kw[val] === undefined)
                            kw[val] = 0;
                        kw[val]++;
                        break;
                    case 'kb':
                        if (kb[val] === undefined)
                            kb[val] = 0;
                        kb[val]++;
                        break;
                    case 'sr':
                        if (!dests[val])
                            dests[val] = 1;
                        dests[val]++;
                        break;
                }
            }
            var colors = ['#9F9977', '#B2592D', '#BDC2C7', '#BC8777', ' #996398', '#839182', '#708EB3', '#BC749A'];
            var categ = new CategoriesChart($('#CategoriesChart'), cats, colors);
            var kiosksChart = new KiosksChart($('#KiosksChart'), kiosks, colors, this.fromTo);
            var destinTopDestinations = new TopDestinations($('#TopDestinations'), dests);
            var searches = new TopSearches($('#TopSearches'), kw, kb);
            console.log('total ' + n);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
    var TopSearches = (function () {
        function TopSearches(view, kw, kb) {
            this.view = view;
            var kwa = [];
            var kba = [];
            for (var str in kw)
                kwa.push({ v: str, n: kw[str] });
            for (var str in kb)
                kba.push({ v: str, n: kb[str] });
            kwa = _.sortBy(kwa, 'n').reverse();
            kba = _.sortBy(kba, 'n').reverse();
            this.showKewords(kwa);
            this.showKeyboard(kba);
        }
        TopSearches.prototype.showKewords = function (ar) {
            var out = '<table class="table"><thead><tr><td>Keyword</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].v + ' </td><td> ' + ar[i].n + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list1]:first').html(out);
        };
        TopSearches.prototype.showKeyboard = function (ar) {
            var out = '<table class="table"><thead><tr><td>Search</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].v + ' </td><td> ' + ar[i].n + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list2]:first').html(out);
        };
        return TopSearches;
    })();
    var TopDestinations = (function () {
        function TopDestinations(view, data) {
            var _this = this;
            this.view = view;
            this.data = data;
            uplight.RegA.getInstance().connector.getDestinations().done(function (res) { return _this.onDestinations(res); });
        }
        TopDestinations.prototype.getData = function () {
            var data = this.data;
            var ar = [];
            for (var str in data) {
                ar.push({ id: str, val: data[str] });
            }
            //console.log(ar);
            ar = _.sortBy(ar, 'val');
            ar = ar.reverse();
            ar = _.first(ar, 20);
            return ar;
        };
        TopDestinations.prototype.onDestinations = function (res) {
            // console.log(res);
            var data = this.data;
            var ar = res;
            var obj = [];
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i].id] = ar[i];
            ar = this.getData();
            var out = '<thead><tr><td>Clicks</td><td>Name</td><td>Unit</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var dest = obj[ar[i].id];
                if (dest) {
                    dest.clicks = ar[i].val;
                    out += this.renderItem(dest);
                }
            }
            out += '</tbody>';
            var list = $('<table>').addClass('table').html(out).appendTo(this.view.find('[data-id=list]:first'));
        };
        TopDestinations.prototype.renderItem = function (item) {
            return '<tr><td>' + item.clicks + '</td><td>' + item.name + '</td><td >' + item.unit + '</td></tr>';
        };
        return TopDestinations;
    })();
    var CategoriesChart = (function () {
        function CategoriesChart(view, data, colors) {
            var _this = this;
            this.view = view;
            this.data = data;
            this.colors = colors;
            uplight.RegA.getInstance().connector.getCategories().done(function (res) { return _this.onCategories(res); });
        }
        CategoriesChart.prototype.getCategryStat = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
            }
        };
        /* private parseData(cats:any,data:any):void{
            console.log(data);
             var ar = data
             for(var i=0,n=ar.length;i<n;i++){
                 if(ar[i].type=='cp'){ cats[ar[i].val]++}
                 else if(ar[i].type=='cm'){cats[ar[i].val]--};
             }
 
         }
 
         private rateCategories(cats:VOCategory[],obj:any):VOPie[]{
             var ar = cats;
             var out:VOPie[]=[]
             for(var i=0,n=ar.length;i<n;i++){
                 var item = ar[i];
                 var vo:VOPie = new VOPie();
                 vo.color=ar[i].color;
                 vo.label = ar[i].label;
                 vo.value = obj[ar[i].id];
                 out.push(vo);
             }
             return out;
         }
         private cats:any;*/
        CategoriesChart.prototype.onCategories = function (res) {
            var data = this.data;
            var list = $('<ul>');
            var out = '';
            var ar = res;
            var obj = {};
            var pies = [];
            var cats = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory(ar[i]);
                cat.color = this.colors[i];
                var vo = new VOPie();
                vo.color = cat.color;
                vo.label = cat.label;
                vo.value = 100 + (data[cat.id] || 0);
                pies.push(vo);
                cats.push(cat);
                out += '<li><span class="glyphicon glyphicon-stop" style="color:' + cat.color + ';"></span> <span> ' + cat.label + '</span></li>';
            }
            // console.log(pies);
            // this.parseData(obj,this.data);
            ///  var vis =  this.rateCategories(cats,obj);
            // console.log(cats);
            list.html(out);
            this.list = list;
            list.appendTo(this.view.find('[data-id=list]:first'));
            var canvas = this.view.find('[data-id=canvas]:first');
            //console.log('vis',vis);
            var myPieChart = new Chart(canvas.get(0).getContext("2d")).Pie(pies, this.getOptions());
            //console.log(res);
        };
        CategoriesChart.prototype.getOptions = function () {
            return {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 0,
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false
            };
        };
        return CategoriesChart;
    })();
    var VOPie = (function () {
        function VOPie() {
        }
        return VOPie;
    })();
    var VOKs = (function () {
        function VOKs(id) {
            this.id = id;
            this.clicks = [];
        }
        VOKs.prototype.buildDays = function () {
            var out;
            var ar = this.clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDay();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        return VOKs;
    })();
    var KiosksChart = (function () {
        function KiosksChart(view, clicks, colors, fromto) {
            //  console.log(clicks);
            var _this = this;
            this.view = view;
            this.clicks = clicks;
            this.colors = colors;
            this.view.find('[data-id=fromto]:first').text(fromto);
            uplight.RegA.getInstance().connector.getData('kiosks.json').done(function (res) { return _this.onKiosks(res); });
        }
        KiosksChart.prototype.craeateTimeline = function () {
            var now = new Date();
            var dates = [];
            dates.push(now.getDate());
            for (var i = 0, n = 30; i < n; i++) {
                now.setDate(now.getDate() - 1);
                dates.push(now.getDate());
            }
            return dates.reverse();
        };
        KiosksChart.prototype.breakeClicksInDays = function (clicks) {
            var ar = clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
            }
            var from = new Date(clicks[0] * 1000);
            var to = new Date(clicks[clicks.length - 1] * 1000);
            console.log(from);
            console.log(to);
        };
        KiosksChart.prototype.convertClicks = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDate();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        KiosksChart.prototype.mapClicks = function (ar, clicks) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(clicks[ar[i]] || 0);
            return out;
        };
        KiosksChart.prototype.renderKiosk = function (obj) {
            return '<li title="kiosk id ' + obj.id + '"><span class="glyphicon glyphicon-stop" style="color:' + obj.color + ';"></span> <span> ' + obj.name + '</span></li>';
        };
        KiosksChart.prototype.onKiosks = function (res) {
            var timeline = this.craeateTimeline();
            var ks = JSON.parse(res);
            var ar = ks;
            var list = $('<ul>');
            var out = '';
            var datasets = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                var clicks = this.clicks[ar[i].id];
                if (!clicks)
                    clicks = [];
                clicks = this.convertClicks(clicks);
                ar[i].clicks = this.mapClicks(timeline, clicks);
                ar[i].color = this.colors[i];
                out += this.renderKiosk(ar[i]);
                var ds = {};
                ds.label = ar[i].name;
                ds.strokeColor = ar[i].color;
                ds.pointColor = ar[i].color;
                ds.pointHighlightStroke = "rgba(220,220,220,1)";
                ds.pointStrokeColor = "#fff";
                ds.pointHighlightFill = "#666";
                ds.data = ar[i].clicks;
                datasets.push(ds);
            }
            list.html(out);
            this.view.find('[data-id=list]:first').append(list);
            var data = {
                labels: timeline.map(String),
                datasets: datasets /*[
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: ks[0].clicks
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: ks[1].clicks
                    }
                ]*/
            };
            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };
        KiosksChart.prototype.getOptions = function () {
            return {
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - Whether the line is curved between points
                bezierCurve: true,
                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,
                //Boolean - Whether to show a dot for each point
                pointDot: true,
                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 5,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill: false
            };
        };
        return KiosksChart;
    })();
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map