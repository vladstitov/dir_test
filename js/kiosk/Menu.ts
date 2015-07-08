/// <reference path="../../../Scripts/typings/greensock/greensock.d.ts" />
/// <reference path="registry.ts" />
/// <reference path="Connector.ts" />
/// <reference path="../typing/jquery.d.ts" />


 module uplight {
   
     export class Menu {
         onSelect: Function;  
         onCategorySelected: Function;   

         private pages: VOItem[]
         private categories: VOItem[];

         getPageById(id: number): VOItem {
             if (isNaN(id)) return null;
             for (var i = 0, n = this.pages.length; i < n; i++) if (this.pages[i].id == id) return this.pages[i];
             return null;
         }

         getCategoryById(id: number): VOItem {
             if (isNaN(id)) return null;
             for (var i = 0, n = this.categories.length; i < n; i++) if (this.categories[i].catid == id) return this.categories[i];
             return null
         }
           

         
        

         reset() {
             this.list.scrollTop(0);
            // this.hideArrow();

         }
         private isArrow: boolean;
         private listView: JQuery;

         hideArrow(): void {
             if (this.isArrow) {
                 this.isArrow = false;
                 $(this.arrow).hide('fast');
             }
         }
         getView(): JQuery {
             this.list.on(CLICK, 'li', (data) => this.onListClick(data)); 
             return this.view;
         }

         private _data: VOItem[];
         private R:Registry;

         private list: JQuery;

         private arrow: HTMLDivElement;

         private title: JQuery;

         constructor(private view: JQuery, width: number, height: number,private connector:Connector) {
             view.width(width);
            
             this.R = Registry.getInstance();

             this.arrow = <HTMLDivElement> document.getElementById('myArrow');

             this.isArrow = true;

             this.list = this.view.children('ul:first');//  $('<ul class="listHolder"></ul>').appendTo(this.listView);
           //  console.log('Menu width: ' + width);
             this.list.width(width);
             this.list.height(height);
             this.list.css('overflow-x', 'hidden');
            this.list.css('overflow-y', 'scroll');  
                      
            // setTimeout(() => this.hideArrow(), 1000);
            // if (this.R.DISPATCHER) this.R.DISPATCHER.on(SCREENSAVER_START, () => this.reset());
            this.connector.getCategories((data) => this.onCatData(data));
         }      


         private onCatData(resp: string): void {
            // console.log(resp);
             var data: VOItem[] = JSON.parse(resp);
             if (!$.isArray(data)) {
                 console.error(data);
                 return;
             } 
             this.categories = data;
             this._data = data;
             var color: string = this.R.settings.color;                  
             var out: string = '';
             for (var i = 0, n = data.length; i < n; i++) {                
                     out += this.renderCat(data[i]);
                 }

             this.list.html(out); 
           //  this.listView.prepend(this.arrow);
            this.connector.getPagesList((data) => this.onPagesData(data));            
         }
         private onPagesData(resp:string): void {
             var data: VOItem[] = JSON.parse(resp);
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
             $(out).appendTo(this.list); 

             this._data = this._data.concat(data);
             this.getView();
           //  console.log(this._data);           
         }
         renderCat(item: VOItem): string {           
             return '<a  class="u-brand" href="#category=' + item.catid + '"><span class="name">' + item.label + '</span></a>';
         }
         renderPage(item: VOItem): string {
             return '<a  class="u-brand"  href="#page=' + item.id +'"><span class="name">' + item.label + '</span></a>';
         }
         private selected: JQuery;         
         private selecteEl(el: JQuery): void {
             if (this.selected) this.selected.removeClass(SELECTED);
            // if (!this.isArrow) {
              //   $(this.arrow).show();
               //  this.isArrow = true;
                
            // }           
             //if (this.arrow) TweenMax.to(this.arrow, 0.5, { y: (<any>el.context).offsetTop - 55 });
             this.selected = el;
             this.selected.addClass(SELECTED);
         }
         private onListClick(evt: JQueryEventObject): void {            
             var el: JQuery = $(evt.currentTarget);
                 if(el.is('li')) {
                     this.selecteEl(el);
                   //  try {
                   //  console.log(el);
                         var vo: VOItem = this._data[el.index()];
                         if (this.onSelect && vo) this.onSelect(vo);
                   //  } catch (e) {
                       //  console.log(e);
                    // }
                     
             }
         
       }

      
    }    
    
}

