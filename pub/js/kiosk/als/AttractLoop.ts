/**
 * Created by VladHome on 8/23/2015.
 */
    /// <reference path="../Registry.ts" />
    /// <reference path="TouchClip.ts" />
    /// <reference path="GalleryDisplay.ts" />
module uplight{
    export class ALProps{
        id:number;
        templateid:number;
        url:string;
        delay:number;
    }
    export class ALoop{
        id:number;
        TC:boolean;
        type:string;
        props:ALProps[];
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
    }

    export class AttractLoop{
        al:ALoop;
        body:JQuery;
        private view:JQuery;
        private R:Registry;
        private cover:JQuery;

        private timer:number;
        private timeout:number=60000;

        private tc:TouchClip;
        width:number;

        constructor(el:HTMLElement){

            this.R=Registry.getInstance();
            this.view = $(el)
             this.width= this.view.width();

            var tt:any= this.R.getProp('ss_timeout');
            var timeout:number = 60;
            if(tt)timeout = Number(tt.value);
            if(isNaN(timeout) || timeout<10) timeout=60;
            this.timeout = timeout*1000;

            console.log(this.timeout);


            this.al = new ALoop(this.R.getSettings('attract_loop'));
           // console.log(this.al);

            this.body=$(document);

            this.body.click(()=>{
                this.stop();
                this.resetTimer();
            })

            this.cover = this.view.find('[data-id=cover]:first');
           this.initAL();
            this.start();

        }

        private resetTimer():void{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>this.start(),this.timeout)
        }

      private isActive;

        hide():void{
                this.view.addClass(HIDDEN);
        }

        private start():void{
            if(!this.isActive){
                this.isActive = true;
                this.show();
                this.R.events.triggerHandler(Registry.getInstance().AL_START)
            }
        }

        show():void{
            console.log('show ');
            this.isActive = true;
            this.view.removeClass(HIDDEN);
        }

        private stop():void{
            if(this.isActive){
                this.R.events.triggerHandler(this.R.AL_STOP);
                this.isActive =false;
                this.hide();
            }
        }

        initAL():void{
            var vo:ALoop = this.al;
            var ar:ALProps[] = vo.props
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                if(item.url.substr(0,3)==='gal'){
                    var gal:GalleryDisplay = new GalleryDisplay(item,i);
                    gal.appendTo(this.cover);
                }
            }

            if(vo.TC){
                var tc = new TouchClip(this.width);
                this.cover.append(tc.view);
            }
        }


    }
}