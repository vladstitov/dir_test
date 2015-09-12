/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight {

    export class InfoPage {      
        private content: JQuery;

        private view:JQuery
        private list:JQuery;
        private width:number;
        data:any[];
        private prev:number=-2;

        constructor() {
           this.view=$('[data-id=Pages]:first');
            this.view.css('overfow','hidden');
            this.width = this.view.width();
            this.list=$('<div>').appendTo(this.view);

        }

        loadData(item:any):void {

            $.get(item.url).done(function(data){
             //   console.log(data);
               item.$div=$('<div>').html(data);
          })
        }

        setData(data:any[]):void{
                var ar = data
                for(var i=0,n=ar.length;i<n;i++){
                      this.loadData(ar[i]);
                }
            this.data = data
        }

        current:number=-1

        private _showPage(i:number):void{

        }
        inTrans:boolean

        showPage(i:number):void{
            if(this.inTrans)return;
            if(i==this.current) return

            var item=this.data[i]
            this.list.append(item.$div)
            if(this.list.children().length>1){
                this.inTrans=true
                this.view.animate({scrollLeft:this.width},()=>{
                    this.list.children().first().remove();
                    this.view.scrollLeft(0);
                    this.inTrans=false;
                })
            }

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

        
        private onPageLoaded(res: string): void {          
           // this.content.html(res);

        }




    }

   
}