/// <reference path="../kiosk/models.ts" />
module mobile {
    export class SearchResult  {   
        view: JQuery
        private title: JQuery;       
        private list: JQuery

        private cache: {}
        private model: uplight.DestinantionsModel;

        showCategory(cat:uplight.VOItem): JQuery { 
            this.title.text(cat.label);
            this.list.html(this.getListByCatId(cat.catid));         
           return this.view;

        }

        getDestinationById(ids: string): uplight.VODestination {
            var id: number = Number(ids);
            return this.model.getDestById(id);          
        }


        constructor(private id:string) {
            this.view = $(id);
            this.list = $(id + ' [data-id=list]');
            this.title = $(id + ' [data-id=title]');
            this.cache = {};
            this.model = uplight.Registry.getInstance().modelDests;

        }
        
       private  getListByCatId(catid: number): JQuery {
            var id: string = 'c__' + catid;
            if (!this.cache[id]) this.cache[id] = this.renderList(this.model.getDestsByCat(catid));
            return this.cache[id];
        }

        private renderList(data: uplight.VODestination[]): string {
            var out: string = '';                          
            for (var i = 0, n = data.length; i < n; i++)  out += this._renderItem(data[i]);            
            return out;
        }
        _renderItem(item: uplight.VODestination): string {
            var cl: string='"';
            if (item.advanced) cl = ' more-data"  href="#Details/'+item.destid+'"';
            else if ((item.email.length + item.phone.length + item.website.length) >20 ) cl= ' more-data" href="#Details/'+item.destid+'"';
var prf:string=cl.length==1?'':'+ ';
            return '<a  class="u-brand' + cl +'> <span class="left">'+prf + item.name + '</span><span class="right">' + item.unit + '</span></a>';

        }
       

    }
}