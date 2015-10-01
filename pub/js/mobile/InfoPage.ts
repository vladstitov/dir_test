/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight {
    
    export class InfoPageMobile {

      //  view: JQuery;
        private content: JQuery;
        private title: JQuery;

        private data:any[];
       
        private cache: {} = {};
        private R: uplight.Registry;

        isHidden:boolean;
        show():void{
            if(this.isHidden){
                this.isHidden = false;
                this.view.removeClass(HIDE);
                this.view.addClass(SHOW);
            }
        }

        hide():void{
            if(!this.isHidden){
                this.isHidden = true;
                this.view.addClass(HIDE);
                this.view.removeClass(SHOW);
            }
        }

        constructor(private view:JQuery,private connector:uplight.Connector) {
            this.content = view.find('[data-id=content]');
            this.title = view.find('[data-id=title]');
            this.isHidden  = view.hasClass(HIDE);
            var pgs = connector.getPages().done((res)=>{
                this.data=res;
                //console.log(res);
            })
        }

        private showPage(item:any):void{
            if(item.html)this.content.html(item.html);
            else {
                $.get(item.url).done((res)=>{
                    item.html = res;
                    console.log(res);
                    this.content.html(item.html);
                })
            }

            this.show();
        }

        showInfo(id:number):void{
            var ar = this.data
            for(var i=0,n=ar.length;i<n;i++){
                var item=ar[i]
                if(item.id==id) break;
            }

            console.log(item);
            if(item.id==id) this.showPage(item);

        }


    }

   
}