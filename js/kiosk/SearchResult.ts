/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />

module uplight {
    export class SearchResult { 

        getListByCategory(vo: uplight.VOItem): JQuery {
            var id: string = 'catid' + vo.catid;
            var ar: VODestination[] = this.model.getDestsByCat(vo.catid);
            if (!this.cache[id])  this.cache[id] = $('<div class="view"></div>').html('<div class="mytitle">' + vo.label + '</div><div class="mylist" >' + this.renderList(ar) + '</div>');
            return this.cache[id];
        }      
        
        getListByPattern(pattern: string):JQuery{
            var id: string = 'pat' + pattern;
            if (!this.cache[id]) {
                var num: number = Number(pattern);
                var ar: VODestination[];
                if (isNaN(num)) ar = this.model.getDestsByPattern(pattern);
                else ar = this.model.getDestsByUnit(num);
                this.cache[id] = this.cache[id] = $('<div class="view"></div>').html('<div class="mytitle">' + pattern + '</div><div class="mylist" >' + this.renderList(ar) + '</div>');
            }
           
            return this.cache[id];
        }

       // private model: kiosk.DestinantionsModel;
        private cache: {} = {};

       

       
        constructor(private model: DestinantionsModel) { 
          
        }
             
        private currentDest: VODestination;
             
    

       
        private renderList(data: VODestination[]):string {            
            var str: string = '';                 
            for (var i = 0, n = data.length; i < n; i++) {
               str +=this.renderItem(data[i]);
            }                    
            return str;
        }

       private renderItem(item: VODestination): string {
           var cl: string = (item.email + item.phone + item.website+item.advanced).length < 5 ? '' : 'moredata';
          // if (item.advanced && item.advanced.length > 5) cl = 'advanced';
           var hr: string = cl.length == 0 ? '' : 'href = "#destid=' + item.destid + '"';
           return '<a  class="u-brand"  ' + hr + '> <span class="name ' + cl + '">' + item.name + '</span><span class="unit">' + item.unit + '</span></a>';
        }

      
    }
}