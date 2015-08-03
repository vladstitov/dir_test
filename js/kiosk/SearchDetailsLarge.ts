/**
 * Created by VladHome on 7/23/2015.
 */

    /// <reference path="Registry.ts" />

module uplight{
   export class  SearchDetailsLarge{
       vo:VODestination
       det:SearchDetails;
       haveData:boolean;
       view:JQuery
       detSm:SearchDetails;
       gall:JQuery;
       pages:JQuery;
       img:JQuery;
       imgs:string[];

       constructor(vo:VODestination){
           if(vo.imgs && vo.imgs.length) this.createGallery(vo.imgs);
           if(vo.pgs && vo.pgs.length)this.createPages(vo.pgs);
       }

        private  createGallery(imgs:string[]):void{
           this.haveData = true;
            var ar = imgs;
            var out='<div class="nano"><ul class="list nano-content">';
            for(var i=0,n=ar.length;i<n;i++)   out+='<li data-i="'+i+'"><img src="'+ar[i]+'" /></li>';
            out+='</ul></div>';
            var u='<div class="preview" ><div class="img"><img src="'+ar[0]+'" /></div></div>';
            this.gall=$('<div>').addClass('gallery').html(u+out);
            this.imgs=imgs;
            this.img = this.gall.find('.preview img:first');
       }

       private onGalClick(evt:JQueryEventObject):void{
         //console.log(evt);
           var i:number = $(evt.currentTarget).data('i');
            this.img.attr('src',this.imgs[i]);
       }

       getView():JQuery{
           if(!this.view) this.view = this.createView();
           if(this.gall){
               this.gall.on(CLICK,'li',(evt)=>this.onGalClick(evt));
              this.img.attr('src',this.imgs[0]);
           }
           return this.view;
       }

       private createPages(url:string):void{
           this.haveData = true;
       }

       private createView():JQuery{
           var view:JQuery= $('<div>').addClass('detailsL  Plastic031');

           var content = $('<div>').addClass('content').appendTo(view);
           view.append('<div class="fa fa-close" data-id="btnClose">');
           if(this.detSm) content.append(this.detSm.view);
           if(this.gall) content.append(this.gall);
           if(this.pages) content.append(this.pages);
           return view;
       }

       setDetailsSmall(det:SearchDetails):SearchDetailsLarge{
                this.detSm = det;
           return this;
       }



    }
}