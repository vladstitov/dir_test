/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />

module uplight{
    export class Model{
        onReady: Function;      
        private _data: VODestination[];
        private _dataid: {};
        private cache: {};

        getDestById(destid: number): VODestination {
            if (!this._dataid[destid]) this._dataid[destid] = this._getDestById(destid,this._data);
            return this._dataid[destid];
        }
        getDestsByCat(catid: number): VODestination[]{
            // trace(' getAllByType : ' + type);
            var id: string = 'c__' + catid;
            if (!this.cache[id]) this.cache[id]=this._getDestsByCat(catid,this._data);
            return this.cache[id];
        }
        getDestsByUnit(unit: number): VODestination[]{ 
            var id: string = 'u__' + unit;        
            if (!this.cache[id]) this.cache[id] = this._getDestsByUnit(unit.toString(),this._data);
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
            if (!this.cache[pattern]) this.cache[pattern] = this._getDestsByPattern(pattern,this._data);
            return this.cache[pattern]
        }
       
        refreshData(): void {   
                  
          // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        }

        getData(): VODestination[] {
            return this._data;
        }

        R:Registry;
        data:any;
        setData(data):void{
            this.data=data;
            this.cache={};
        }
        constructor() {
            this.R = Registry.getInstance();
            this.R.dispatcher.on(this.R.ON_DATA,(evt,data)=>this.setData(data));
            //setTimeout(() => this.refreshData(), 20);
        }

        private _getDestById(destid: number, data: VODestination[]): VODestination{
            for (var i = 0, n = data.length; i < n; i++)    if (data[i].id == destid) return data[i];
            return null;
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
            var c: string = cat + ',';
            var out: VODestination[] = [];
            for (var i = 0, n = data.length; i < n; i++)if (data[i].cats.indexOf(c) != -1) out.push(data[i]);
            return out;
        }
         
             
        private onDestinations(data: VODestination[]): void {        
            this._data = data;
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
