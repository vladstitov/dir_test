/**
 * Created by VladHome on 11/9/2015.
 */
    /// <reference path="../RegA.ts" />
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../../typing/underscore.d.ts" />
module uplight{

    export class DeviceModel{
       // status:number;
        status:number;
        track:VOTrack;
       static s_time:number;
        constructor(private dev:VODevice){
            for(var str in dev) this[str] = dev[str];
         //   var delta:number = (s_time-this.s_time);
           // if(delta < timer)this.status=1;
            //else this.status=0;
        }
    }


    export class DevicesData implements UModule {
        private data:VODevice[];
        private devices:DeviceModel[];
        private s_time:number;
        private list:JQuery;
        private kioskTimer:number;
        private timer:number;
        private ID:string ='uplight.DevicesData';

        // private greenLite:JQuery;

        private R:RegA;
        constructor(private $view:JQuery,private colors:string[]){
            //console.log('DevicesData');

            this.R =  RegA.getInstance()
            if(RegA.getInstance().props['timer']) this.kioskTimer =this.R.props['timer'].value;
            this.list = $view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
           this.timer =  setInterval(()=>this.loadData(),10000);
        }

        detach():void{
            this.$view.detach();
        }
        appendTo(cont:JQuery):UModule{
            this.$view.appendTo(cont);
            return this;
        }
        getName():string{
            return this.ID;
        }
        destroy():void{
            clearInterval(this.timer);
        }

        private loadData():void{
            this.list.find('.status').detach();
            RegA.getInstance().connector.getDevicesData().done((res)=>this.onDeviceData(res));
        }

        private onDeviceData(res:VOResult):void{
            var ar:any[] =res.result;
            DeviceModel.s_time = Number(res.success);
           var out:DeviceModel[]=[];
            for(var i=0,n=ar.length;i<n;i++) out.push(new DeviceModel(ar[i]));


          //  console.log(res);
          //  this.s_time = Number(res.success);
            // console.log(this.data);
            // console.log(this.s_time);
           // this.render();
            // RegA.getInstance().connector.  getServerTime().done((res)=>{
            //  this.s_time = Number(res);
            //  this.render();
            //  });


        }

        private render():void {
            var kt:number = this.kioskTimer;
            console.log(kt);
            var s_time=this.s_time;
            var ar:VODevice[] =  this.data;
            var out='';
            var ks:DeviceModel[]=[];
            for(var i=0,n=ar.length;i<n;i++){
              //  var k:DeviceModel = new DeviceModel(ar[i],s_time,kt);
               // ks.push(k);
               // out+=this.createDevice(k);
            }
            this.devices = ks;
            this.list.html(out) ;

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


            return '';
/*
            var stsrtTime:string= obj.start?new Date(obj.start_at*1000).toLocaleString():'';
            var lastTime:string =obj.now? new Date(obj.now*1000).toLocaleString():'';
            return '<tr>' +
                '<td>'+obj.name+'</td>' +
                '<td><a target="_blank" href="'+obj.template+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td><span title="'+statusStr+'" class="status fa '+cl+'" style="color:'+color+'">&nbsp</span></td>' +
                '<td>'+obj.ip+'</td>' +
                '<td>'+obj.ping+'</td>' +
                '<td class="text-right">'+stsrtTime+'</td>' +
                '<td class="text-right">'+lastTime+'</td>' +
                '</tr>';*/


        }



    }
}