/// <reference path="../kiosk/registry.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var mobile;
(function (mobile) {
    var DetailsPage = (function () {
        function DetailsPage(id, conn) {
            //////////////////////////////////////////////////////////////////////////////////
            this.cache = {};
            this.view = $(id);
            // this.details = $(id + ' [data-id=details]');
            // this.advanced = $(id + ' [data-id=advanced]');
            this.connector = conn;
        }
        // private advanced: JQuery;
        // private details: JQuery;
        DetailsPage.prototype.reset = function () {
            this.cache = {};
        };
        //  private current: kiosk.VODestination;
        DetailsPage.prototype.getDetails = function (dest) {
            // console.log('DetailsPage', page);
            var id = dest.destid;
            if (!this.cache[id])
                this.cache[id] = this.createPage(dest);
            this.view.empty().append(this.cache[id]);
            return this.view;
        };
        DetailsPage.prototype.createPage = function (dest) {
            var p = $('<div></div>').html(this.renderDetails(dest));
            if (dest.advanced)
                $('<div></div>').load(dest.advanced).appendTo(p);
            return p;
        };
        /*
         private loadAdvanced(dest: kiosk.VODestination): string {
             if (dest.advanced.length < 40) {
                 this.current = dest;
                 this.connector.getAdvanced((res) => this.onPageLoaded(res), dest.destid.toString());
                 return '';
             } else return dest.advanced;
 
         }
 
 
         
 
         private onPageLoaded(res: string): void {
             this.current.advanced = res;
             this.advanced.html(res);
           
         }
         */
        DetailsPage.prototype.renderDetails = function (dest) {
            var out = '<p class="xlarge"><span class="left">' + dest.name + '</span><span class="right">' + dest.unit + '</span></p>';
            if (dest.email || dest.phone || dest.website) {
                out += '<table><tbody>';
                if (dest.phone)
                    out += '<tr><td>Phone:  </td><td>' + dest.phone + '</td></tr>';
                if (dest.email)
                    out += '<tr><td>Email:  </td><td>' + dest.email + '</td></tr>';
                if (dest.website)
                    out += '<tr><td>Website:  </td><td>' + dest.website + '</td></tr>';
                out += '</tbody></table>';
            }
            return out;
        };
        return DetailsPage;
    })();
    mobile.DetailsPage = DetailsPage;
})(mobile || (mobile = {}));
//# sourceMappingURL=DetailsPage.js.map