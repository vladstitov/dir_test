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
        view:JQuery;
        body:JQuery;



        constructor(){
            this.view=$('AttractLoop');
            this.al = u_settings.attract_loop;
            this.body=$('[data-id=Body]:first');
            this.loadAL();
        }


        start():void{

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