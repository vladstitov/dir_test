/**
 * Created by VladHome on 8/23/2015.
 */
    /// <reference path="../Registry.ts" />
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



        constructor(private view:JQuery,prop:any){

            this.al = prop
            this.body=$('[data-id=Body]:first');
            this.loadAL();
        }


      private isActive
        hide():boolean{
            if(this.isActive){
                this.view.addClass(HIDDEN);
                this.isActive = false
                this.stop();
                return true;
            }
            return false;
        }

        start():void{


        }
        show():void{
            if(!this.isActive){
                this.view.removeClass(HIDDEN);
                this.isActive = true
                this.start();
            }
        }
        stop():void{


        }

        loadAL():void{
            var vo:VOAL = this.al;
            if(vo.type=='gallery' || vo.type=='gallery2'){
                $.getScript('js/kiosk/als/Gallery.js',()=>{
                    var gal:Gallery = new Gallery(vo);
                    this.body.append(gal.view);
                })

            }
            if(vo.TC)$.getScript('js/kiosk/als/TouchClip.js',()=>{
                var tc = new TouchClip();
                this.body.append(tc.view);
                tc.start();
            })
            //console.log(vo);
        }


    }
}