/**
 * Created by VladHome on 8/8/2015.
 */
    ///<reference path="../RegA"/>
module uplight{
    export class Statistics{

        R:RegA;
        constructor(contauner:JQuery){
            this.R = RegA.getInstance();
            contauner.load('js/admin/impexp/Statistics.html',()=>this.init());
        }


        private init():void{
           // var today = new Date()
          //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            this.R.connector.getStatistics('-30 days','now').done((res)=>this.onData(res));

        }

        private onData(res):void{

            console.log(res.length);
        }


    }
}