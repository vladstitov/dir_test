/**
 * Created by VladHome on 11/9/2015.
 */
    module uplight{
    export class VODevice{
        id:number;
        name:string;
        maxdelay:number;
        start:number=0;
        S_time:number=0;
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
        constructor(dev:VODevice,s_time:number){
            super(dev.track);
            for(var str in dev) this[str] = dev[str];
            var delta:number = s_time-dev.S_time
            if(delta< dev.maxdelay)this.status=1;
            else this.status=0;

        }
    }
}
