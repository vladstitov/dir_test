/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="AttractLoop.ts" />
var uplight;
(function (uplight) {
    /* export  class Gallery{
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
   
       constructor(private vo:ALProps){
           this.galleries=[];
           this.view=$('<div>').addClass('gallery');
          if(vo.type=='gallery') {
              var gal:GalleryDisplay = new GalleryDisplay(vo.props[0].url);
              this.view.append(gal.view)
              this.galleries.push(gal)
          }
           else if(vo.type=='gallery2'){
              var ar:string[] = this.vo.props[0].url.split(',')
              var gal:GalleryDisplay = new GalleryDisplay(ar[0]);
              this.galleries.push(gal)
              this.view.append(gal.view);
              var gal2:GalleryDisplay = new GalleryDisplay(ar[1]);
              this.view.append(gal2.view);
              this.galleries.push(gal2)
          }
   
       }
     }
   */
    var GalleryDisplay = (function () {
        function GalleryDisplay(props) {
            this.current = -1;
            this.interval = 0;
            this.view = $('<div>');
            this.list = $('<div>').appendTo(this.view);
            //  Registry.getInstance().connector.get('rem/kiosk.php?a=get_data&file_name='+url).done((res)=>this.onData(res));
            // Registry.getInstance().events.on( Registry.getInstance().AL_START,()=>this.start());
            // Registry.getInstance().events.on( Registry.getInstance().AL_STOP,()=>this.stop());
        }
        GalleryDisplay.prototype.appendTo = function (container) {
            this.view.appendTo(container);
        };
        GalleryDisplay.prototype.onData = function (res) {
            var data = JSON.parse(res);
            //   console.log(data);
            var ar = data.gallery;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(this.createImage(ar[i]));
            }
            this.galley = out;
            // this.props=data.props;
            // this.timeout = Number(this.props.delay);
            // if(isNaN(this.timeout))this.timeout=20;
            // this.view.addClass('x'+this.props.size);
            // this.start();
        };
        GalleryDisplay.prototype.goNext = function () {
            var _this = this;
            //   console.log('next');
            this.current++;
            if (this.current >= this.galley.length)
                this.current = 0;
            var next = this.galley[this.current];
            if (this.list.children().length > 1) {
                this.list.children().detach();
                this.cur = null;
            }
            this.list.append(next);
            if (this.cur) {
                var prev = this.cur;
                this.list.addClass('move');
                setTimeout(function () {
                    prev.detach();
                    _this.list.removeClass('move');
                }, 2000);
            }
            this.cur = next;
        };
        GalleryDisplay.prototype.createImage = function (url) {
            return $('<div>').addClass('item').html('<img src="' + url + '" />');
        };
        GalleryDisplay.prototype.start = function () {
            var _this = this;
            if (this.interval === 0)
                this.interval = setInterval(function () {
                    _this.goNext();
                }, this.timeout * 1000);
            this.goNext();
        };
        GalleryDisplay.prototype.stop = function () {
            clearInterval(this.interval);
            this.interval = 0;
        };
        return GalleryDisplay;
    })();
    uplight.GalleryDisplay = GalleryDisplay;
})(uplight || (uplight = {}));
//# sourceMappingURL=GalleryDisplay.js.map