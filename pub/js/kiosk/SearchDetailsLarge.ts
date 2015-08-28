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
           this.vo=vo;
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

           var det = $('<div>').addClass('detailsL');


           det.append('<h2><span>'+this.vo.name+'</span><span class="pull-right">'+this.vo.unit+'</span></h2>');
           if(this.detSm) det.append(this.detSm.view);
           if(this.gall) det.append(this.gall);
           if(this.pages) det.append(this.pages);
           return det;
       }

       setDetailsSmall(det:SearchDetails):SearchDetailsLarge{
                this.detSm = det;
           return this;
       }



    }
}