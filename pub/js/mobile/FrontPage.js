/**
 * Created by VladHome on 9/28/2015.
 */
/// <reference path="../Mobile.ts" />
var uplight;
(function (uplight) {
    var FrontPage = (function () {
        function FrontPage(view) {
            this.view = view;
        }
        FrontPage.prototype.init = function () {
            console.log(this.view);
        };
        return FrontPage;
    })();
    uplight.FrontPage = FrontPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=FrontPage.js.map