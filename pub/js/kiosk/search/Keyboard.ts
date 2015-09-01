/// <reference path="../Registry.ts" />

module uplight{
    export class Keyboard2 {
        onKeyboardTyping: Function;
        private keys: JQuery;
        private text: JQuery;
        private hints: HTMLDivElement;

        private arHints: HTMLLIElement[]=[];
        //private kb_enter: HTMLDivElement;
        private _pattern: string = '';
        private _startText: string = '';
        private alpabet: string = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
        private _interval: number;
        private cursor: string = '_';
        private isReset: boolean;

        hintsTotal: number = 4;
        hintsLineHieght: number = 21;

        onEnterPressed: Function;
        onClose: Function;
        onTyping: Function;

        reset(): void {
            if (!this.isReset) {
               // this.btnClose.removeClass(DISABLED);
               // setTimeout(() => {
                    clearInterval(this._interval);
                    clearTimeout(this.showHintsTimeout);
                    this._pattern = '';
                    this.text.text(this._startText);
                   // this.hideHintsView();                  
               // }, 300);
                this.isReset = true;
            }
            
        }



        view: JQuery;
        private btnEnter: JQuery;
      //  private btnClose: JQuery;
        private showHints: boolean = false
        private settings:any;

        private initSettings(obj:any):void{
            this.settings = obj;
            this.alpabet = obj.keys;
            this._startText =obj.starttext;
            this.showHints = obj.showHints;
        }
        R:Registry
        constructor(view:JQuery) {
            this.view = view;
            this.R=Registry.getInstance();

           var set = this.R.settings
            if(set && set.keyboard) this.initSettings(set.keyboard);

            //this.kb_enter = <HTMLDivElement>document.getElementById('kb_enter');
            this.btnEnter = $('#kb_enter');
            if(this.btnEnter)  this.btnEnter.on(CLICK, (evt) => this.onEnterPressed(this._pattern));
            // this.hints = <HTMLDivElement>document.getElementById('kb_hints_list');       

            this.text = $('#kb_text');
            if(this.text) this.text.text(this._startText);
            this.keys = $('<div>');
            var ar: string[] = this.alpabet.split(',');
            var k: string = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if(i===10)k+='</div><div class="row2">';
                if(i===20) k+='</div><div class="row3">'
                if(i===30) k+='</div><div class="row4">'
                k += this.itemRenderer(ar[i]);
            }

            k+='</div>';
            this.keys.html(k).appendTo(this.view);
            console.log(this.view);
           // $(this.keys).children().last().children().addClass("kb_space");
           // $(this.keys).children().last().addClass("kb_space");
           // $(this.keys).append('<div class="kb_button"><span>.</span></div>');
            $('#kb_close').on(CLICK, (evt) => this.onCloseClick(evt));

            $('.kb-key').on(CLICK, (evt) => this.onKeyPressed(evt));
            // $(this.hints).on(CLICK, '.hint', (evt) => this.onHintClick(evt));

            this.reset();
          
        }

        private onHintClick(evt) {
            var tag: HTMLLIElement = evt.target;           
            if ($(tag).is('li')) {
                this._pattern = $(tag).text();              
                this.blink();
            }
        }

        private insertHints(ar: string[]): void{
            for (var i = 0,n=ar.length; i < n; i++){
                this.arHints[i].innerText = ar[i];
            }
        }

        private renderHints(ar: string[]): string {
            var out: string = '';
            for (var i = 0, n = ar.length; i < n; i++) out += '<li class="hint" >' + ar[i] + '</li>';
            return out;
        }
        /*
        private onGetHints(resp: string): void {
            //  trace("onGetHints \n"+resp);
            try {
                var res: any = JSON.parse(resp);
            } catch (e) {
                trace(e + resp);
            }

            if (res) {
                this.hints.innerHTML = this.renderHints(res);
                $('.hint').on(CLICK, (evt) => this.onHintClick(evt));
            }
        }
*/


        private hintsHidden: boolean;
        private hintsInTransition: boolean;

        private hideHintsView(): void{
            if (this.hintsHidden) return;

            this.hintsHidden = true;
            this.hintsInTransition = true;

            var self = this;
                TweenLite.to(this.hints, 0.5, {
                    top: 100, onComplete: function () {
                        self.hintsInTransition = false;
                 }
                });           
        }

        private showHintView(num: number): void{
            //trace(num);          
            this.hintsHidden = false;
            this.hintsInTransition = true;
            var self = this;
            TweenLite.to(this.hints, 0.5, {
                top: 100 - (num * this.hintsLineHieght), onComplete: function () {
                    self.hintsInTransition = false;
                }
            });         
        }


        private showHintsTimeout: number;
        

        private _showHints(): void {

           // var _this = this;
            clearTimeout(this.showHintsTimeout);
            if (this.hintsInTransition) {
                this.showHintsTimeout = setTimeout(() => this._showHints(), 500);
                return;
            }
           
            var str: string = this._pattern;               
            if (str.length == 0)  this.hideHintsView();              
            else {               
                var ar: string[] ;//= Registry.getInstance().modelDestinations.getHints(str); 
                            
                if (ar.length > 0) {
                    this.hints.innerHTML = this.renderHints(ar);
                    //this.insertHints(ar);
                    this.showHintView(ar.length);
                } else this.hideHintsView();              
            }
         
            //trace('getHints: '+str)
           // this.connector.getHints((resp) => this.onGetHints(resp), str);

        }


        private releaseClose(): void {
           
        }
        private onCloseClick(evt): void{
           this.view.triggerHandler(CLOSE);
           setTimeout(() => this.reset(), 500);
        }
        private itemRenderer(item: string): string {
            var cl = 'Plastic031';
            if(item=='SPACE') cl+=' space';
            if(item == '&nbsp;')cl+=' back fa fa-caret-square-o-left';
            return '<div class="kb-key '+cl+'"><span>' + item + '</span></div>';
        }
        private onKeyPressed(evt): void {

            // trace(evt.target);

            var tag: HTMLSpanElement = evt.target;
            // alert(tag.tagName);
            if (tag.tagName == 'SPAN') this.typeLetter(tag.innerHTML);
        }
        private typeLetter(str: string): void {
            this.isReset = false;
            if (str == 'SPACE') str = ' ';
            if (str == 'DEL') {
                if (this._pattern.length == 0) return;
                this._pattern = this._pattern.substr(0, this._pattern.length - 1);

            } else if (this._pattern.length == 0) {
                if (str == ' ') return
                str = str.toUpperCase();
                this._pattern = str;
            } else {
                if (this._pattern.substr(-1) == ' ' && str == ' ') return;
                str = str.toLowerCase();
                this._pattern += str;

            }

            // if(this.showHints)this._showHints();
            
            this.blink();
            if (this.onKeyboardTyping) this.onKeyboardTyping(this._pattern);
            
        }

        private blink(): void {
            clearInterval(this._interval);
            this._interval = setTimeout(() => this.blink(), 500);
            this.cursor = this.cursor == '' ? '_' : '';
            this.text.text(this._pattern + this.cursor) ;
        }

    }
}
