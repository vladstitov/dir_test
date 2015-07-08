/// <reference path="../kiosk/registry.ts" />

module mobile {

    export class Menu {

        private cats: uplight.VOItem[];
        private pages: uplight.VOItem[];
       view: JQuery;
        private list: JQuery;



        getCategoryById(id: number): uplight.VOItem {
            var data: uplight.VOItem[] = this.cats;
            for (var i = 0, n = data.length; i < n; i++) if (data[i].catid == id) return data[i];
            return null;
        }
        getPageById(id: number): uplight.VOItem {
            var data: uplight.VOItem[] = this.pages;
            for (var i = 0, n = data.length; i < n; i++) if (data[i].id == id) return data[i];
            return null;
        }


private connector:uplight.Connector;
        constructor(private id: string,conn:uplight.Connector) {
            this.view = $(id);
            this.list = $(id + ' [data-id=list]');
            conn.getCategories((data) => this.onCatData(data));
            this.connector=conn;
        }


        private onCatData(resp: string): void {
           // console.log(resp);
            var data:uplight.VOItem[] = JSON.parse(resp);
            if (!$.isArray(data)) {
                console.error(data);
                return;
            }
            this.cats = data;           
            var out: string = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += this.renderCat(data[i]);
            }

            this.list.html(out);            
            this.connector.getPagesList((data) => this.onPagesData(data));
        }
        private onPagesData(resp: string): void {
            var data: uplight.VOItem[] = JSON.parse(resp);
            if (!$.isArray(data)) {
                console.error(data);
                return;
            }
            this.pages = data;
            //  var color: string = this.R.settings.color;;  
            var out: string = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += this.renderPage(data[i]);
            }
           this.list.append(out);           
           
        }
        renderCat(item: uplight.VOItem): string {
            return '<a class="u-brand" href="#category/'+item.catid+'">' + item.label + '</a>';
        }
        renderPage(item: uplight.VOItem): string {
            return '<a  class="u-brand" href="#page/' + item.id + '">' + item.label + '</a>';
        }

    }

}