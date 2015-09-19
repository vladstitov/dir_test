/**
 * Created by VladHome on 9/16/2015.
 */
    /// <reference path="../Kiosk.ts" />
module uplight{
    export class Relay{
        constructor(delay:number){
            if(isNaN(delay) || delay<2) delay = 2;
            this.timer =(new Date()).getTime();
            setInterval(()=>this.relay(),delay*1000);
        }

        private stamp:number=0;
        private ping:number=0;
        private timer:number;

        private relay():void{
            var that=this;
            var now=(new Date()).getTime();
            var timer=now- this.timer;
            this.timer=now;
            Registry.getInstance().connector.relay(this.stamp,Math.round(now/1000),this.ping,timer,Registry.status).done(function(res:string){
                that.ping=(new Date()).getTime()-now;
                var vo:VOResult;
                try{
                    vo = JSON.parse(res)
                }catch(e){
                    console.warn('relay doesnt work '+ res);
                    return;
                }

                switch(vo.success){
                    case 'reload':
                        window.location.reload();
                        break;
                    case 'load':
                        window.location.href=vo.result;
                        break;
                    case 'stamp':
                        that.stamp = Number(vo.result);
                        break;
                }


            })
        }
    }

}