/**
 * Created by VladHome on 7/7/2015.
 */

    ///<reference path="../RegA"/>
module uplight {
    export class RestartKiosk {

        R:RegA

        constructor(container:JQuery) {
            this.R = RegA.getInstance();
        }

        restart():void{
            var yes:boolean = confirm('Tou want to restart kiosks?');
            if(yes) this.R.connector.restartKiosks().done((res)=>this.onResult(res))
        }

        private onResult(res:VOResult):void{
            console.log(res);
        }



    }

}