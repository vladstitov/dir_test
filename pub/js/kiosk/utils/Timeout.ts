/**
 * Created by VladHome on 9/18/2015.
 */
    /// <reference path="../Kiosk.ts" />

module uplight{
    export class Timeout{
        timer:number;
        constructor(private timeout:number){
            document.addEventListener(CLICK, (evt: MouseEvent) => this.startTimer());
            }
        private startTimer():void{
            clearTimeout( this.timer);
            this.timer = setTimeout(()=>{window.location.href='#timeout'},this.timeout);
        }
    }
}