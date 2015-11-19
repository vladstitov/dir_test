/**
 * Created by VladHome on 11/9/2015.
 */
    /// <reference path="../RegA.ts" />
    /// <reference path="DeviceBase.ts" />
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../../typing/underscore.d.ts" />
module uplight{

    export class DevicesData {
        private data:VODevice[];
        private devices:DeviceModel[];
        private s_time:number;
        private list:JQuery;
        private kioskTimer:number;
        // private greenLite:JQuery;
        constructor(private view:JQuery,private colors:string[]){
            //console.log('DevicesData');

            if(RegA.getInstance().props['timer']) this.kioskTimer = RegA.getInstance().props['timer'].value;
            this.list = view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
            setInterval(()=>this.loadData(),10000);
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
            var kt:number = this.kioskTimer;
            console.log(kt);
            var s_time=this.s_time;
            var ar:VODevice[] =  this.data;
            var out='';
            var ks:DeviceModel[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                var k:DeviceModel = new DeviceModel(ar[i],s_time,kt);
                ks.push(k);
                out+=this.createDevice(k);
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



            var stsrtTime:string= obj.start?new Date(obj.start*1000).toLocaleString():'';
            var lastTime:string =obj.now? new Date(obj.now*1000).toLocaleString():'';
            return '<tr>' +
                '<td>'+obj.name+'</td>' +
                '<td><a target="_blank" href="'+obj.template+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td><span title="'+statusStr+'" class="status fa '+cl+'" style="color:'+color+'">&nbsp</span></td>' +
                '<td>'+obj.ip+'</td>' +
                '<td>'+obj.ping+'</td>' +
                '<td class="text-right">'+stsrtTime+'</td>' +
                '<td class="text-right">'+lastTime+'</td>' +
                '</tr>';


        }



    }
}