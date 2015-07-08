/// <reference path="Registry.ts" />
/// <reference path="../typing/svgjs.d.ts" />
module uplight {

   
    export class ScreenSaver {
        btn: JQuery;
        view: JQuery;

        private delay: number=0.5;

        private url: string;
        private sscontent: string;
        private testinterval: number = 5000;


        constructor(private connector:Connector) {
           this.delay = Number(Registry.getInstance().settings.screensaver.delay);
            this.url = Registry.getInstance().settings.screensaver.url;
            this.view = $('<iframe class="fullscreen"></iframe>');;//.attr('src', this.url).appendTo(document.body);  
            //  this.view.css('background-color', 'rgba(0, 0, 0, 0.5)');//.css('width':'100%').css('height','100%');

           // this.lasttime = Date.now();        
            this.btn = $('<div class="fullscreen"></div>');;//.appendTo(document.body).on(CLICK, (evt) => this.removeScreensaver(evt));
            document.addEventListener(CLICK, (evt: MouseEvent) => this.onClick(evt), true); 


            this.startScreenSaver();

            this.lasttime = Date.now();
            // clearTimeout(this.timerRelay);
            this.timerRelay = setInterval(() => this.runRelay(), this.testinterval);
           
               
          //  setTimeout(() => this.makescreenBalck(), 10000);        
        }
               
        private isBlocked: boolean;
        private clickdelay: number = 500;
        
        private timer1: number;
        private timerRelay: number;       
        private timestamp: number = 0;
             

        private onClick(evt: MouseEvent): void {
            var del:number= this.delay * 1000;
           // console.log('Click with delay: '+del+ '   '+ this.timer1);
           if(this.timer1) clearTimeout(this.timer1);

           // if(!this.isBlack)
            this.timer1 = setTimeout(() => this.startScreenSaver(),del);
        }

       
        private touchClip: TouchClip;

        private removeScreensaver(evt?): void {
            
            document.location.href = '#screensaver=end';
            this.isScreenSaver = false;
           
            this.sscontent = this.view.html();
            // console.log(this.sscontent);
            this.view.hide('fast', function () {

            });
            this.view.attr('SRC', ' ');
            this.view.html('');
            this.btn.off(CLICK);
            if (this.touchClip) {
                this.touchClip.stop();
                this.touchClip.view.remove();
            }
            this.btn.remove();

        }


        private startScreenSaver(): void {
              console.log('starting screensaver ');
            clearTimeout(this.timer1);
            this.isScreenSaver = true;
            this.view.appendTo(document.body);

            if (!this.touchClip) this.touchClip = new TouchClip();
            this.touchClip.start();

            this.touchClip.view.appendTo(document.body);
            var d = this.url
            this.view.show('fast', function () {
                $(this).attr('src', d);
            });

            this.btn.appendTo(document.body).on(CLICK, (evt) => this.removeScreensaver(evt));    
                      
            document.location.href = '#screensaver=start';
                       
            
        }

        //private startRelay(): void {
           
       // }
      

      //  private isReload: boolean;
        private reason1: string;
        private reason2: string;
        private lasttime: number;

        private isScreenSaver: boolean;

        private runRelay(): void {
            if (this.reason1 && this.reason2)  this.reloadApp();    

            var now: number = Date.now();

          this.checkForBlank();
          //  console.log((now - this.lasttime));


            if ((now - this.lasttime) > (this.testinterval * 1.3)) {
                var msg: string = "\n\r" + now + '  ERROR MEMORY LEAK interval should be: ' + this.testinterval / 1000 + ' but it is: ' + (now - this.lasttime) / 1000;
                if (!this.reason1) this.reason1 = msg;
                else this.reason2 = msg;
            } 

            this.lasttime = now;
            this.connector.getUpdates(this.timestamp, (resp) => this.onControl(resp), (resp) => this.onRelayError(resp));
        }

        private reloadApp(): void {          
            console.log('reloading appp     server:' + Registry.getInstance().isServer +'  screensaver: '+ this.isScreenSaver)
            if (Registry.getInstance().isServer && this.isScreenSaver) {
                this.connector.Log(this.reason1 + this.reason2);
               setTimeout(document.location.reload(),3000);
            }
            
        }

        private onControl(res): void {
            Registry.getInstance().isServer = true;
          
            try {
                var ctr: any = JSON.parse(res);
            } catch (e) {
                console.log(' screensaver ERRRORR ', e);
            };

            if (!ctr) return;  
                     
            if (ctr.stamp) this.timestamp = ctr.stamp;
            if (ctr.reload) {               
                console.log('     server respond        ', ctr);
              if(this.isScreenSaver) location.reload();
            }


            
        }
       // private isBlack: number = 0;
        private onRelayError(err): void {
            Registry.getInstance().isServer = false;
            console.log('scrennsaver relay', err);
        }
/*
        private makeScreenBlack(): void {
            if (this.isBlack) return;
            this.removeScreensaver();
           
            this.blank =  $('<div id="blackscreen"></div>').addClass('fullscreen').css('background', 'black').appendTo(document.body);
            this.isBlack = 1;
        }

        private blank: JQuery;
        private makeScreenWhite(): void {
            if (this.isBlack == 0) return;
            this.isBlack == 0;
            this.blank.remove();
            this.startScreenSaver();           
        }
*/

        private checkForBlank(): void {
            if (!Registry.getInstance().settings.blank) return;

                var blank: any = Registry.getInstance().settings.blank;
                var now: Date = new Date();
                var mins: number = (now.getHours() * 60) + now.getMinutes();

            //    console.log('now: ' + now + '  start: ' + blank.start + '   stop: ' + blank.stop + ' isblack: ' + this.isBlack);
                var onn:number=blank.stop;
                var off:number = blank.start;

                if(mins>off){
                    if(onn>off && mins>onn) return;
                    if(Registry.getInstance().isServer)  window.location.href='BlackScreen.php';
                }





               
               

        }


      
       
    }


    export class TouchClip{
        view: JQuery


        private rec1: svgjs.Element;
        private rec2: svgjs.Element;
        private text: svgjs.Element;
        private interval:number

        start(): void {
            clearInterval(this.interval);          
            this.runIn();
        }

        stop(): void {
            clearInterval(this.interval);
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
            this.text.animate(500, '>', 1000).x(500);
            this.interval = setTimeout(()=>this.removeText(),5000);
            
        }

        private removeText(): void {
            this.text.animate(500).x(-1000);
            setTimeout(() => this.runIn(), 700);
        }



    }
}

