/**
 * Created by VladHome on 11/12/2015.
 */
    /// <reference path="../typing/jquery.d.ts" />
    /// <reference path="../typing/underscore.d.ts" />
    /// <reference path="../typing/google.maps.d.ts" />
    /// <reference path="../admin/RegA.ts" />
/*poi.attraction	poi.business	poi.government	poi.medical
poi.park	poi.place_of_worship	poi.school	poi.sports_complex*/


module uplight{

    export class VOGeo{
    lat:number;
    lng:number;
    zoom:number;
        constructor(obj:any){for(var str in obj )this[str] = obj[str];}
    }
    export class GmapCtr{

        private key:string='AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
        center:string='43.657816714886074, -79.376571';
        lat:number;
        lng:number;
        zoom:number;

       private geo:VOGeo;



        private marker:google.maps.Marker;


        private $lat:JQuery;
        private $lng:JQuery;
        private $zoom:JQuery;
        private $btnSave:JQuery;

        private $view:JQuery;
        private $gmap:JQuery;
        private $gover:JQuery;


        constructor(container:JQuery){
            container.load('htms/admin/Gmap.htm',()=>this.init())
            var geo=RegA.getInstance().getSettings('geo');
            console.log(geo);
            if(!geo) geo = {lat:43.657816714886074,lng:-79.37558501958847,zoom:18};
            this.geo = new VOGeo(geo);
            this.lat = this.geo.lat;
            this.lng = this.geo.lng;
            this.zoom = this.geo.zoom;

        }
        private init(){
            this.$gmap = $('#GoogleMap');
        //    document.getElementById('GoogleMap').addEventListener('click',(evt:MouseEvent)=>{
              // evt.stopImmediatePropagation();
               // evt.stopPropagation();
//evt.preventDefault();
              //  console.log(evt);
              // // var evt3:MouseEvent = new MouseEvent();


               // var evt2 = new MouseEvent("click", evt);

              //  console.log(evt);
              //  document.getElementById('GoogleMap').dispatchEvent(evt2);
          //  },false)
         //   this.$gover=$('#GoogleMapOver').click((evt:JQueryEventObject)=>{
             //   console.log(evt);
              //  document.getElementById('GoogleMap').dispatchEvent(evt.originalEvent);
              //  this.$gmap.trigger(evt);
               // google.maps.event.trigger(map,'click',evt.originalEvent)
          //  });
            this.$view =$('#GoogleMapCtr');
            this.$lat = this.$view.find('[data-id=txtLat]:first').text(this.lat);
            this.$lng = this.$view.find('[data-id=txtLng]:first').text(this.lng);
            this.$zoom = this.$view.find('[data-id=txtZoom]:first').text(this.zoom);
            this.$btnSave = this.$view.find('[data-id=btnSave]:first').click(()=>{
                this.save();
            })
            var opt:any = {
                center: {lat: this.geo.lat, lng:this.geo.lng},
                zoom: this.geo.zoom,
               /* panControl:true,
                zoomControl:true,
                mapTypeControl:true,
                scaleControl:true,
                streetViewControl:false,
                overviewMapControl:true,
                rotateControl:true,*/
                disableDefaultUI:true,
                zoomControl: true,
                streetViewControl: false,
                minZoom:7
               /* mapTypeControl: boolean,
                scaleControl: boolean,
                streetViewControl: boolean,
                rotateControl: boolean*/
            }
            var map = new google.maps.Map(document.getElementById('GoogleMap'),opt);

            google.maps.event.addListener(map, 'click', (event)=> {
                this.lat = event.latLng.lat();
                this.$lat.text(this.lat);
                this.lng=event.latLng.lng();
                this.$lng.text(this.lng);
                this.marker.setPosition(event.latLng);

            })

            //zoom_changed
            map.addListener('zoom_changed',(evt)=>{
               this.zoom =  map.getZoom();
                this.$zoom.text(this.zoom);
            })

            this.marker = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                title: 'Hello World!'
            });

            var styles = [
                {
                    featureType: 'poi',
                    elementType: "labels"/*,
                    stylers: [ { visibility: 'off' }]*/
                }/*,{
                    featureType: ' poi.business',
                    stylers: [ { visibility: 'off' }]
                }*//*,
                { featureType: 'poi.business',
                    stylers: [ { visibility: 'off' }]
                }*/
            ];

            map.setOptions({styles: styles});
            this.handleInfoWindow();
            this.initPanorama(map);
        }

        private striitViewTimer:number;
        initPanorama(map):void{
            var streetView:google.maps.StreetViewPanorama = map.getStreetView();
            streetView.setOptions(
                {
                    clickToGo:false,
                    linksControl:false,
                    fullScreenControl: false,
                    disableDefaultUI:true

                }
            );

            google.maps.event.addListener(streetView,'visible_changed',()=>{
               clearTimeout(this.striitViewTimer);
             if(streetView.visible)  setTimeout(function(){streetView.setVisible(false)},20000);

            })
        }
        handleInfoWindow():void{
            //store the original setContent-function
            var fx = google.maps.InfoWindow.prototype.setContent;

            //override the built-in setContent-method
            google.maps.InfoWindow.prototype.setContent = function (content:HTMLElement) {

                if (content.querySelector) {
                    var addr = content.querySelector('.gm-basicinfo .gm-addr');
                    if (addr) {
                    }
                }

              /*
               console.log(this);
               if (this.logAsInternal) {
                    google.maps.event.addListenerOnce(this, 'map_changed',function () {
                        var map = this.getMap();
                        //the infoWindow will be opened, usually after a click on a POI

                        if (map) {
                            //trigger the click
                            google.maps.event.trigger(map, 'click', {latLng: this.getPosition()});
                        }
                    });
                }*/
                //run the original setContent-method
                fx.apply(this, arguments);
            };
        }

        private save():void{
            this.geo.lat= this.lat;
            this.geo.lng = this.lng;
            this.geo.zoom = this.zoom;
            RegA.getInstance().saveSettings('geo',this.geo).done((res:VOResult)=>{
                if(res.success=='success')  RegA.getInstance().msg('Data saved',this.$btnSave.parent());
            });

        }

        showValues():void{

        }
    }

}