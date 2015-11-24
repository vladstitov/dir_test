/**
 * Created by VladHome on 11/23/2015.
 */

    /// <reference path="../RegA.ts" />
    /// <reference path="DeviceBase.ts" />
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../../typing/underscore.d.ts" />

module uplight{

    export class KiosksManager implements UModule{
        private $view:JQuery;
        private ID:string='uplight.KiosksManager';
        constructor(container:JQuery){
            this.$view= $('<div>').appendTo(container).load('htms/admin/KiosksManager.htm',()=>this.init());

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
        destroy(){

        }

        private init():void{

        }
    }
}