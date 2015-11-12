/**
 * Created by VladHome on 11/9/2015.
 */
    module uplight{
    export class VODevice{
        id:number;
        name:string;

        start:number=0;
        s_time:number=0;
        now:number=0;
        ip:string='';
        ping:number=0;
        start_at:number=0;
        timer:number=15000;
        template:string;
        track:any;
        constructor(obj:any){
            for(var str in obj) this[str] = obj[str];
        }
    }

    export class DeviceModel extends VODevice {
        status:number;
        constructor(dev:VODevice,s_time:number,timer:number){
            super(dev.track);
            for(var str in dev) this[str] = dev[str];
            var delta:number = (s_time-this.s_time);
            if(delta < timer)this.status=1;
            else this.status=0;
        }
    }


}
