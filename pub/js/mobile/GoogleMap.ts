/**
 * Created by VladHome on 10/7/2015.
 */
    /// <reference path="../typing/jquery.d.ts" />

module uplight{
    export class GoogleMapOptions{
        static SATELITE:string='satellite';
        static ROADMAP:string='roadmap';
        key:string='AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
        center:string='43.657467, -79.376571';
        zoom:number=10;
        maptype:string='satelite';
    }

    export class GoogleMap{
        private view:JQuery;
        private key:string='AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
       // private TORONTO:string=;
        private url:string='https://www.google.com/maps/embed/v1/'

        private  type:string='view';
        private options:GoogleMapOptions;
        constructor(){

            this.options = new GoogleMapOptions();
            this.options.key = this.key;
            this.options.zoom=18;
            this.options.maptype = GoogleMapOptions.ROADMAP;

        }

        private createView():JQuery{
           return $('<div>').addClass('loader').load('htms/mobile/GoogleMap.htm',()=>this.init())
        }

        getView():JQuery{
            if(!this.view) this.view = this.createView();
            return this.view;

        }

        toString(opt):string{
            var ar:string[]=[]
            for(var str in opt)ar.push(str+'='+opt[str]);
            return this.url+this.type+'?'+ar.join('&');
        }
        private init():void{
            this.view.prepend(this.view.children());
             var iframe:JQuery = this.view.find('iframe:first');
            iframe.attr('src',this.toString(this.options));
        }
}
}