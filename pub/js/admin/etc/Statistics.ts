/**
 * Created by VladHome on 8/8/2015.
 */
    ///<reference path="../../typing/chart.d.ts"/>
    /// <reference path="../DirsAdmin.ts" />
    /// <reference path="DeviceBase.ts" />
    /// <reference path="TopSearches.ts" />
    /// <reference path="KioskChart.ts" />
    /// <reference path="DeviceData.ts" />
module uplight{
    export class Statistics{
        R:RegA;
        private data:VOStat[];
       private colors:string[]=['#9F9977','#B2592D','#BDC2C7','#BC8777',' #996398','#839182','#708EB3','#BC749A'];
        private fromTo:string
        constructor(contauner:JQuery){
            this.R = RegA.getInstance();
            contauner.load('htms/admin/Statistics.htm',()=>this.init());
        }

        private init():void{
           // var today = new Date()
          //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);

           this.R.connector.getStatistics().done((res)=>this.onData(res));

            var today = new Date()
            var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            this.fromTo = 'from '+today.toDateString().substr(4) +' to '+priorDate.toDateString().substr(4);
            var kiosksChart:KiosksChart = new KiosksChart($('#KiosksChart'),this.colors,this.fromTo);
            var devices:DevicesData = new DevicesData($('#DevicesData'),this.colors);

        }

        private onData(res:any):void{
            var cats =  res.categories;
            var dests = res.destinations;

          //  console.log(res);

            var categ:CategoriesChart  = new CategoriesChart($('#CategoriesChart'),cats,this.colors);
            var destinTopDestinations = new TopDestinations($('#TopDestinations'),dests);
            var searches:TopSearches = new TopSearches($('#TopSearches'), res.search,res.keywords);

        }
    }









}