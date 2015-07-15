/// <reference path="Registry.ts" />
module uplight {
    export class Connector {
        private service = 'rem/kiosk.php?a='
        public device: string;
        public lang: string;

        public onData: Function;

        getMessages(callBack:Function,onError:Function): void {
            $.get(this.service + 'get_messages&device=' + this.device).done(callBack).fail(onError);

        }
        getUpdates(stamp:number,callBack: Function, onError: Function): void {
            $.get(this.service + 'get_updates&stamp='+stamp).done(callBack).fail(onError);
        }
        Log(msg:string): void {
            $.post(this.service + 'log_log',msg);
        }

        relay(kiosk_id,stamp:number,now:number,let:number,timer:number):JQueryPromise<VOResult>{

            return $.get(this.service+'get_stamp&kiosk_id='+kiosk_id+'&stamp='+stamp+'&now='+now+'&let='+let+'&timer='+timer);

        }
        Error(msg:string): void {
            $.post(this.service + 'log_error',msg);
        }
        Stat(msg:string): void {
            $.post(this.service + 'log_stat',msg);
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

