/// <reference path="Registry.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />

module uplight{
    export class Model{
        onReady: Function;
        dispatcher:JQuery;
        READY:string='READY';
        private dests: VODestination[];
        private _dataid: {};
        private cache: {};

        private keywords:any;
        getDestById(id: number): VODestination {
           return this.destInd[id];
        }

        getKeywords():any{
           return this.keywords;
        }
        getCategories():VOCategory[]{
            return this.cats;
        }

        getDestsByCat(catid: number): VODestination[]{
            // trace(' getAllByType : ' + type);
            var id: string = 'c__' + catid;
            if (!this.cache[id]) this.cache[id]=this._getDestsByCat(catid,this.dests);
            return this.cache[id];
        }

        getDestsByUnit(unit: number): VODestination[]{ 
            var id: string = 'u__' + unit;        
            if (!this.cache[id]) this.cache[id] = this._getDestsByUnit(unit.toString(),this.dests);
            return this.cache[id];
        }
        getDestsByPatternAndCat(cat: number, pattern: string): VODestination[]{
            var id: string = cat + '__' + pattern;
            if (!this.cache[id]) this.cache[id] = this._getDestsByPattern(pattern, this.getDestsByCat(cat));

            return this.cache[id];
        }

        getDestsByUnitAndCat(cat:number,unit: number): VODestination[] {
            var id: string = cat+'_u_' + unit;
            if (!this.cache[id]) this.cache[id] = this._getDestsByUnit(unit.toString(), this.getDestsByCat(cat));
            return this.cache[id];
        }
       
        getDestsByPattern(pattern:string): VODestination[]{            
            if (!this.cache[pattern]) this.cache[pattern] = this._getDestsByPattern(pattern,this.dests);
            return this.cache[pattern]
        }
       
        refreshData(): void {   
                  
          // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        }

        getData(): VODestination[] {
            return this.dests;
        }

        R:Registry;
        setData(data):void{
            this.dests=data;
            this.cache={};
        }


        private makeCats(ar:any[]):void{
          var out:VOCategory[]=[];
            var ind:any[] =[];
            for(var i=0,n=ar.length;i<n;i++){
                var cat:VOCategory =  new VOCategory(ar[i]);
                ind[cat.id]=cat;
                out.push(cat);
            }
            this.cats= out;
            this.catsInd= ind;
        }

        private addKeywords(str:string):void{

        }
        private makeDests(ar:any[]):void{
            var out:VODestination[]=[];
            var ind:any[] =[];
            var kws:any={};
            for(var i=0,n=ar.length;i<n;i++){
                var dest:VODestination = new VODestination(ar[i]);
                ind[dest.id] = dest;
                if(dest.kws.length){
                    dest.kws.split(',').forEach(function(el){
                        if(!kws[el])kws[el]=[];
                        kws[el].push(dest.id);
                    })
                }

               out.push(dest);
            }
            this.keywords=kws;
            this.dests= out;
            this.destInd=ind;
        }
        private destInd:VODestination[];
        private cats:VOCategory[];
        private catsInd:VOCategory[];

        private onResult(res):void{
            this.makeCats(res.cats);
            this.makeDests(res.dests);
            this.addIcon();
            this.dispatcher.triggerHandler(this.READY);
        }

        private addIcon():void{
            var catsI:VOCategory[] = this.catsInd;
            var ar:VODestination[] = this.dests
            for(var i=0,n=ar.length;i<n;i++){
                var item:VODestination = ar[i];
                if(item.cats && item.cats.length){
                    if(catsI[item.cats[0]])item.icon= catsI[item.cats[0]].icon;
                    else this.warn('cant find icon for category '+item.cats[0]+ ' ib dest: '+item.name);
                }
            }
        }
        warn:Function;
        error:Function;
        constructor() {
            this.R = Registry.getInstance();
            this.dispatcher = $({});
            this.error= this.R.error;
            this.warn= this.R.warn;

            this.R.connector.getDestinations().done((res)=>this.onResult(res))
        }
        private _getDestsByUnit(unit: string, data: VODestination[]): VODestination[] {
            var out: VODestination[] = [];           
            for (var i = 0, n = data.length; i < n; i++)    if (data[i].unit.indexOf(unit) != -1) out.push(data[i]);    
          
            return out;
        }
       
        private _getDestsByPattern(pattern: string, data: VODestination[]): VODestination[]{
            pattern = ' ' + pattern.toLowerCase(); 
            var out: VODestination[] = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var patt: string = ' ' + data[i].name.toLowerCase() + ' ' + data[i].unit;
                if (patt.indexOf(pattern) != -1) out.push(data[i]);               
            }
            return out;
        }

        private _getDestsByCat(cat: number, data: VODestination[]): VODestination[]{
            if (cat == 0) return data;
            var out: VODestination[] = [];
            for (var i = 0, n = data.length; i < n; i++)if (data[i].cats.indexOf(cat) != -1) out.push(data[i]);
            return out;
        }
         
             
        private onDestinations(data: VODestination[]): void {        
            this.dests = data;
            this.cache = {};
            this._dataid = {};        
            if (this.onReady) this.onReady();            
        }
        private pushKeywords(ar: string[], obj: {}):void {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        }

       
    }




   
}
