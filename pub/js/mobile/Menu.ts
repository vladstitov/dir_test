/// <reference path="../kiosk/registry.ts" />

module mobile {

    export class Menu {

        private cats: uplight.VOCategory[];
        private pages: any[];

        private listP: JQuery;
        private listC:JQuery;
        private btnMenu:JQuery;
        private content:JQuery

        isHidden:boolean;
        show():void{
            if(this.isHidden){
                this.isHidden = false;
                this.content.show('fast');
            }
        }

        hide():void{
            if(!this.isHidden){
                this.isHidden = true;
                this.content.hide('fast');
            }
        }

        toggle():void{
            if(this.isHidden)this.show();
            else this.hide();
        }
        constructor(private view:JQuery,private conn:uplight.Connector,private model:uplight.Model) {

            this.listP = this.view.find( '[data-id=listP]:first');
            this.listC = this.view.find( '[data-id=listC]:first');
            this.content = this.view.find('[data-id=content]:first');
            this.btnMenu = this.view.find('[data-id=btnMenu]:first').click(()=>this.toggle());
            var cats:uplight.VOCategory[] = model.getCategories();
            var d1:JQueryDeferred<uplight.VOCategory> = $.Deferred();
            if(!cats) {
                model.dispatcher.on(model.READY,()=>{
                    cats=model.getCategories();
                    d1.resolve(cats)})

            }else d1.resolve(cats);
            $.when(d1).then((cats)=>{
                  console.log(cats);
                var out: string = '';
                var ar = cats
                for (var i = 0, n = ar.length; i < n; i++)  for(var i=0,n=ar.length;i<n;i++) out+= '<a class="u-brand" href="#category/'+ar[i].id+'"><span class="'+ar[i].icon+'"></span> ' + ar[i].label + '</a>';
                this.listC.html(out);
               })


           var p0 =   conn.getPages().done((res)=>{
              // console.log(res);
             var out='';
              var ar = res
              for(var i=0,n=ar.length;i<n;i++) out+= '<a class="u-brand" href="#page/'+ar[i].id+'"><span class="'+ar[i].icon+'"></span> ' + ar[i].label + '</a>';
               this.listP.html(out);

           });

           // $.when(p0,d1).then((pages,cats)=>{
            //    console.log(pages,cats);

           // })


          //  conn.getCategories((data) => this.onCatData(data));

        }

    }

}