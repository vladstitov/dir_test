/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight {

    export class InfoPage {      
        private content: JQuery;
        private cache: {} = {};
       
        constructor(private connector:Connector) {
           

        }
        /*
        getPage(page:VOItem): JQuery {
            if (!this.cache[page.id]) this.cache[page.id] = this.createPage(page);           
            return this.cache[page.id];
        }
      
        private createPage(page: VOItem): JQuery {
            var p:JQuery = $('<div class="view"><div class="mytitle">'+page.label+'</div></div>');
            this.content = $('<div class="view-content">Loading</div>').appendTo(p);
            this.loadPage(page.id.toString());
            return p;

        }

        */
        private loadPage(id: string): void {        
            this.connector.getPage((res) => this.onPageLoaded(res), id);

        }
        
        private onPageLoaded(res: string): void {          
            this.content.html(res);

        }




    }

   
}