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
            console.log(res.length);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map