/**
 * Created by VladHome on 8/23/2015.
 */
    /// <reference path="../Registry.ts" />
    /// <reference path="TouchClip.ts" />
    /// <reference path="Gallery.ts" />
module uplight{

    export class VOAL {
     constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
     id: number;
     name: string;
     src: string;
     data_url:string;
     delay:number;
     size:string;
     type:string;
     TC:boolean
     }


    export class AttractLoop{
        al:VOAL;
        body:JQuery;
        private view:JQuery;
        private R:Registry;
        private cover:JQuery;

        private timer:number;
        private timeout:number=60000;
        private gallery:Gallery;
        private tc:TouchClip;

        constructor(el:HTMLElement){
            this.R=Registry.getInstance();
            this.view = $(el)
            var tt:number = Number(this.R.settings.ss_timeout)
            if(isNaN(tt) || tt<10) tt=10;
            this.timeout = tt*1000;

            this.al = this.R.settings.attract_loop;

            this.body=$(document);

            this.body.click(()=>{
                this.hide();
                this.resetTimer();
            })

            this.cover = this.view.find('[data-id=cover]:first');
            this.loadAL();
            this.R.events.on( Registry.getInstance().AL_START,()=>this.start());
            this.R.events.on( Registry.getInstance().AL_STOP,()=>this.stop());
        }

        private resetTimer():void{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{Registry.getInstance().events.triggerHandler(Registry.getInstance().AL_START)},this.timeout)
        }

      private isActive=true;
        hide():void{
            if(this.isActive){
                this.R.events.triggerHandler(this.R.AL_STOPED);
                this.view.addClass(HIDDEN);
                this.isActive = false;
                this.tc.stop();
                this.gallery.stop();
            }

        }

        start():void{
            this.show();
            this.tc.start();
            this.gallery.start();

        }
        show():void{
            if(!this.isActive){
                this.view.removeClass(HIDDEN);
                this.isActive = true
                this.start();
            }
        }
        stop():void{
            this.hide();
        }

        loadAL():void{
            var vo:VOAL = this.al;
            if(vo.type=='gallery' || vo.type=='gallery2'){
                    var gal:Gallery = new Gallery(vo);
                    this.cover.append(gal.getView());
                this.gallery =gal;

            }
            if(vo.TC)
                var tc = new TouchClip();
                this.cover.append(tc.view);
                tc.start();
            this.tc= tc;

            //console.log(vo);
        }


    }
}