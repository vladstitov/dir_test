/// <reference path="../kiosk/registry.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
module mobile {

    
    export class InfoPage {      

        // getPage: Function;
        // onDetailsReady: Function;
        ///  width: number;
        //height: number;
        view: JQuery;
        private content: JQuery;
        private title: JQuery;

        reset(): void {
            this.cache = {};

        }
        
            //////////////////////////////////////////////////////////////////////////////////
       
      
       
        private cache: {} = {};
        private R: uplight.Registry;
        private connector: uplight.Connector;

        constructor(id: string,conn:uplight.Connector) {
            this.view = $(id);
            this.content = $(id + ' [data-id=content]');
            this.title = $(id + ' [data-id=title]');
            this.connector= conn;

        }
        getPage(page:uplight.VOItem): JQuery {
            var id: number = page.id;
            this.title.text(page.label);
            if (!this.cache[id]) {
                this.cache[id] = 'Loading....';
                this.loadPage(id.toString());
            }
            this.content.html(this.cache[id])
            return this.view;
        }
        private pageid: string;
        private loadPage(id: string): void {
            this.pageid = id;           
            this.connector.getPage((res) => this.onPageLoaded(res), id);

        }

      
        

        private onPageLoaded(res: string): void {
            this.cache[this.pageid] = res;
            this.content.html(res);
          
        }        

       


    }

   
}