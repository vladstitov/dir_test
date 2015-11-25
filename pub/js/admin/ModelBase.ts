/**
 * Created by VladHome on 11/24/2015.
 */
module uplight{
    export class VODevice{
        constructor(obj:any){for(var str in obj ) this[str] = obj[str];}
        id:number;
        name:string;
        status:string;
        S_time:number=0;
        K_time:number=0;
        ip:string='';
        ping:number=0;
        start_at:number=0;
        timer:number=15000;
        template:string;
        typeid:number;
        type:string;
    }
}