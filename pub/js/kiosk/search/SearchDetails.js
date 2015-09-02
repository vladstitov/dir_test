/**
 * Created by VladHome on 7/16/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var SearchDetails = (function () {
        function SearchDetails(view) {
            this.view = view;
            this.more = $('<div>').addClass('more').appendTo(view);
            this.tmb = $('<div>').addClass('tmb').appendTo(view);
        }
        SearchDetails.prototype.createTable = function (ar) {
            var out = '<table class="table">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + (item[1] || '&nbsp;') + '</td></tr>';
            }
            out + '</table>';
            this.more.html(out);
        };
        SearchDetails.prototype.createImage = function (tmb) {
            this.tmb.html('<img src="' + tmb + '" />');
            return 'img';
        };
        return SearchDetails;
    })();
    uplight.SearchDetails = SearchDetails;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchDetails.js.map