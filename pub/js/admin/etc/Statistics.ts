/**
 * Created by VladHome on 8/8/2015.
 */
    ///<reference path="../../typing/chart.d.ts"/>
    /// <reference path="../DirsAdmin.ts" />
    /// <reference path="DeviceBase.ts" />
    /// <reference path="TopSearches.ts" />
    /// <reference path="KioskChart.ts" />
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
          //  var search = res.search;

          //  console.log(res);

            var categ:CategoriesChart  = new CategoriesChart($('#CategoriesChart'),cats,this.colors);

            var destinTopDestinations = new TopDestinations($('#TopDestinations'),dests);
            var searches:TopSearches = new TopSearches($('#TopSearches'), res.search,res.keywords);

        }
    }


    export class DevicesData {
        private data:VODevice[];
        private devices:DeviceModel[];
        private s_time:number;
        private list:JQuery;
       // private greenLite:JQuery;
        constructor(private view:JQuery,private colors:string[]){
            //console.log('DevicesData');
            this.list = view.find('[data-id=list]:first');
           // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
        }
        private loadData():void{
           this.list.find('.status').detach();
            RegA.getInstance().connector.getDevicesData().done((res)=>this.onKiosks(res));
        }
        private onKiosks(res:VOResult):void{
            this.data=res.result;
            this.s_time = Number(res.success);
          // console.log(this.data);
           // console.log(this.s_time);
            this.render();
           // RegA.getInstance().connector.  getServerTime().done((res)=>{
              //  this.s_time = Number(res);
              //  this.render();
          //  });


        }

        private render():void {
            var s_time=this.s_time;
            var ar:VODevice[] =  this.data
            var out='';
            var ks:DeviceModel[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                var k:DeviceModel = new DeviceModel(ar[i],s_time);
               /// console.log(k);
                ks.push(k);
                out+=this.createDevice(k);
            }
            this.devices = ks;
            this.list.html(out) ;
            setTimeout(()=>this.loadData(),10000);
        }

        private createDevice(obj:DeviceModel):string{

            var color:string='#0F0';
            var statusStr='Working fine';
            var  cl ='fa-circle';
           if(obj.status === 0){
               color = '#ECCC6B';
               cl='fa-exclamation-triangle';
               statusStr = 'Experienced delays';
           }



            var stsrtTime:string= obj.start?new Date(obj.start*1000).toLocaleString():'';
            var lastTime:string =obj.now? new Date(obj.now*1000).toLocaleString():'';
            return '<tr>' +
                '<td>'+obj.name+'</td>' +
                '<td><a target="_blank" href="'+obj.template+'?kiosk='+obj.id+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td><span title="'+statusStr+'" class="status fa '+cl+'" style="color:'+color+'">&nbsp</span></td>' +
                '<td>'+obj.ip+'</td>' +
                '<td>'+obj.ping+'</td>' +
                '<td class="text-right">'+stsrtTime+'</td>' +
                '<td class="text-right">'+lastTime+'</td>' +
                '</tr>';


        }



    }







}