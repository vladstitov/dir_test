/// <reference path="Registry.ts" />
/// <reference path="../typing/svgjs.d.ts" />
module uplight {
    export class ScreenSaver {
        view: JQuery;
        private timeout: number;
        private sscontent: string;
        R:Registry

        constructor(private container:JQuery) {
            this.R=Registry.getInstance();
           this.timeout = Number(this.R.settings.ss_timeout)*1000;
            if(isNaN(this.timeout) || this.timeout<20000)this.timeout=20000;
            this.view = $('<div>').attr('id','Screensaver');
            document.addEventListener(CLICK, (evt: MouseEvent) => this.onClick(evt));
            this.startTimer();
            this.startScreenSaver();
        }

        private timer:number
        private startTimer():void{
            clearTimeout( this.timer);
            console.log(this.timeout);
            this.timer = setTimeout(()=>this.startScreenSaver(),this.timeout);
        }


        private onClick(evt: MouseEvent): void {
            this.startTimer();
            if(this.isActive) this.stopScreenSaver();
        }
        private isActive;
        private tt:TouchClip = new TouchClip();
        private startScreenSaver(): void {
            if(this.isActive) return;
            this.isActive=true;
            console.log('start ss');
            this.view.appendTo(this.container);
            this.view.append(this.tt.start());
            this.R.dispatcher.triggerHandler(this.R.SS_START);

        }
        private stopScreenSaver():void{
            this.isActive=false;
            this.tt.stop();
            this.view.empty();
            this.view.remove();

            console.log('stop ss');
        }


      
       
    }


    export class TouchClip{
        view: JQuery
        private rec1: svgjs.Element;
        private rec2: svgjs.Element;
        private text: svgjs.Element;
        private interval:number

        start(): JQuery {
            clearInterval(this.interval);          
            this.runIn();
            return this.view
        }

        stop(): JQuery {
            clearInterval(this.interval);
            return this.view
        }
        constructor(){
            var el = document.createElement('div'); 
            el.id = 'Touchclip';             
            var draw = SVG(el);
            var rect = draw.rect(1920, 100).fill({ color: '#000', opacity: 0.5 }).y(20);;

           this.rec1 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 }).y(125);
            this.rec2 = draw.rect(1920, 15).fill({ color: '#a90329', opacity: 1.0 })
            this.text = draw.text('TOUCH TO BEGIN').fill('#fff').y(-25);

            this.text.font({
                family: 'Arial'
                , size: 100
               // , anchor: 'middle'
                //, leading: 1
            })

        this.view = $(el);
        }
        private runOut(): void {

        }
        private runIn(): void {
            this.text.x(2000);
            this.rec1.x(2000);
            this.rec2.x(-2000);
            this.rec1.animate().x(0);
            this.rec2.animate().x(0);
            this.text.animate(500, '>', 1000).x(100);
            this.interval = setTimeout(()=>this.removeText(),5000);
            
        }

        private removeText(): void {
            this.text.animate(500).x(-1000);
            setTimeout(() => this.runIn(), 700);
        }



    }
}

