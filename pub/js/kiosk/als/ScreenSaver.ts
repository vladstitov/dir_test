/// <reference path="../Registry.ts" />

module uplight {
    export class ScreenSaver2 {
        view:JQuery;
        private timeout:number;
        private sscontent:string;
        private attratLoop:AttractLoop;
        R:Registry;

        constructor() {
            this.init();
        }

        init():void {
            this.view = $('#AttractLoop').appendTo('body');
            if (!this.view.get(0)) return;
            this.R = Registry.getInstance();
            this.timeout = Number(this.R.settings.ss_timeout) * 1000;
            if (isNaN(this.timeout) || this.timeout < 10000)this.timeout = 10000;
            this.attratLoop = new AttractLoop($('#AttractLoop'),this.R.settings.attract_loop);
            this.isActive = true;
        }

        private timer:number

        private startTimer():void {
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>this.startScreenSaver(), this.timeout);
        }

        private onViewClick():void {
            if (this.isActive) this.stopScreenSaver();
        }


        private onClick(evt:MouseEvent):void {
            this.startTimer();
            if (this.isActive) this.stopScreenSaver();
        }

        private isActive;

        startScreenSaver():void {
            if (this.isActive) return;
            this.isActive = true;
            console.log('start ss');
            this.view.appendTo('body');
            this.R.events.triggerHandler(this.R.SS_START);

        }

        private stopScreenSaver():void {
            this.isActive = false;
            this.view.remove();
            console.log('stop ss');
            this.R.events.triggerHandler(this.R.SS_STOP);
        }


    }

}


