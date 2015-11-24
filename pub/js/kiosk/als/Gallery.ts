/**
 * Created by VladHome on 8/23/2015.
 */
  /// <reference path="../Registry.ts" />
    /// <reference path="AttractLoop.ts" />
module uplight{
  export  class Gallery{
    private view:JQuery
      private galleries:GalleryDisplay[];
      getView():JQuery{
          return this.view;
      }
      start():void{
            var ar = this.galleries
            for(var i=0,n=ar.length;i<n;i++) ar[i].start();;

      }
      stop():void{
          var ar = this.galleries
          for(var i=0,n=ar.length;i<n;i++) ar[i].stop();;
      }

    constructor(private vo:VOAL){
        this.galleries=[];
        this.view=$('<div>').addClass('gallery');
       if(vo.type=='gallery') {
           var gal:GalleryDisplay = new GalleryDisplay(vo.data_url);
           this.view.append(gal.view)
           this.galleries.push(gal)
       }
        else if(vo.type=='gallery2'){
           var ar:string[] = this.vo.data_url.split(',')
           var gal:GalleryDisplay = new GalleryDisplay(ar[0]);
           this.galleries.push(gal)
           this.view.append(gal.view);
           var gal2:GalleryDisplay = new GalleryDisplay(ar[1]);
           this.view.append(gal2.view);
           this.galleries.push(gal2)
       }

    }


}
    export class GalleryDisplay{
        private selector:string
        view:JQuery
       private list:JQuery;

        private data:any;
       private galley:JQuery[];
       private props:VOAL;
       private timeout:number;
        private current=-1;
       private  interval:number=0;
        private prev:JQuery;
        private cur:JQuery;

        constructor(url:string){
            this.view = $('<div>');
            this.list=$('<div>').appendTo(this.view);
            Registry.getInstance().connector.get('rem/kiosk.php?a=get_data&file_name='+url).done((res)=>this.onData(res));
           // Registry.getInstance().events.on( Registry.getInstance().AL_START,()=>this.start());
           // Registry.getInstance().events.on( Registry.getInstance().AL_STOP,()=>this.stop());
        }

        private onData(res:string){
            var data = JSON.parse(res);
         //   console.log(data);
            var ar = data.gallery;
            var out:JQuery[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                out.push(this.createImage(ar[i]));
            }
            this.galley = out;
            this.props=data.props;
            this.timeout = Number(this.props.delay);
            if(isNaN(this.timeout))this.timeout=20;
            this.view.addClass('x'+this.props.size);
            this.start();
        }

        private goNext():void{
         //   console.log('next');
            this.current++;
            if(this.current>=this.galley.length) this.current=0;
          var next = this.galley[this.current];
            if( this.list.children().length>1){
                this.list.children().detach();
                this.cur=null;
            }
            this.list.append(next);
            if(this.cur){
                var prev = this.cur;
                this.list.addClass('move');
                setTimeout(()=>{
                    prev.detach();
                    this.list.removeClass('move');

                },2000)
                /*
               var p = this.view.animate({scrollLeft:650},5000).promise();
                console.log('animate');
                p.done(()=>{
                    console.log('done');
                    this.prev.remove();
                })
                */
            }
           this.cur=next;
        }
        private createImage(url:string):JQuery{
            return $('<div>').addClass('item').html('<img src="'+url+'" />');
        }
        start():void{
            if(this.interval===0) this.interval = setInterval(()=>{this.goNext()},this.timeout*1000);
            this.goNext();
        }
        stop():void{
            clearInterval(this.interval);
            this.interval=0;

        }
    }
}