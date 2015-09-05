/// <reference path="Registry.ts" />
module uplight {
    export class Connector {
        private service = 'rem/kiosk.php?a=';
        private serv= 'rem/kiosk.php';
        id:number;
        who:string='kiosk';
        public device: string;
        public lang: string;

        public onData: Function;

        getData(filename:string):JQueryPromise<VOResult> {
           return $.get(this.service + 'get_data&device=' + this.device+'&data='+filename);

        }
        getUpdates(stamp:number,callBack: Function, onError: Function): void {
            $.get(this.service + 'get_updates&stamp='+stamp).done(callBack).fail(onError);
        }
        Log(msg:string): void {
            msg=(new Date()).toString()+'||'+msg;
            $.post(this.service + 'log_log',msg);
        }

        relay(kiosk_id,stamp:number,now:number,ping:number,timer:number,status:string):JQueryPromise<VOResult>{

            return $.get(this.service+'get_stamp&id='+kiosk_id+'&stamp='+stamp+'&now='+now+'&ping='+ping+'&timer='+timer+'&status='+status);

        }
        Error(msg:string): void {
            msg=(new Date()).toString()+'||'+msg;
            $.post(this.service + 'log_error',msg);
        }
        Stat(type:string,val:string): void {
            var who = this.who;
            var stamp= Date.now();
            $.get(this.service + 'log_stat'+'&type='+type+'&val='+val+'&who='+who+'&id='+this.id+'&stamp='+stamp);
        }

        getCategories(callBack:Function) {
            $.get(this.service + 'get_categories').done(callBack);

        }
        ////////////////////////////////////////
        getPagesList(callBack: Function) {
            $.get(this.service + 'get_pages_list').done(callBack);

        }
        getPage(callBack: Function,id:string) {
            $.get(this.service + 'get_page&id='+id).done(callBack);

        }
        ///////////////////////////////////////////////
        getSettings():JQueryPromise <JSON> {
            return $.get(this.service + 'get_settings',null,'application/json');
        }
///////////////////////////////
        getPersonal(callBack:Function, destid:number): void {
            $.ajax(this.service + 'get_personal&destid='+destid).done(callBack);
        }
        getAdvanced(callBack: Function, adv:string): void {
            $.ajax(this.service + 'get_advanced&id=' + adv).done(callBack);
        }
        getDestinations():JQueryPromise <JSON> {
            return $.get(this.service + 'get_dests');
        }
      
    }
}

