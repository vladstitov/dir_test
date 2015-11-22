/**
 * Created by VladHome on 11/12/2015.
 */
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="../typing/google.maps.d.ts" />
/// <reference path="../admin/RegA.ts" />
/*poi.attraction	poi.business	poi.government	poi.medical
poi.park	poi.place_of_worship	poi.school	poi.sports_complex*/
var uplight;
(function (uplight) {
    var VOGeo = (function () {
        function VOGeo(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOGeo;
    })();
    uplight.VOGeo = VOGeo;
    var GmapCtr = (function () {
        function GmapCtr(container) {
            var _this = this;
            this.ID = 'uplight.GmapCtr';
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            this.center = '43.657816714886074, -79.376571';
            container.load('htms/admin/Gmap.htm', function () { return _this.init(); });
            var geo = uplight.RegA.getInstance().getSettings('geo');
            console.log(geo);
            if (!geo)
                geo = { lat: 43.657816714886074, lng: -79.37558501958847, zoom: 18 };
            this.geo = new VOGeo(geo);
            this.lat = this.geo.lat;
            this.lng = this.geo.lng;
            this.zoom = this.geo.zoom;
        }
        GmapCtr.prototype.detach = function () {
            this.$view.detach();
        };
        GmapCtr.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        GmapCtr.prototype.getName = function () {
            return this.ID;
        };
        GmapCtr.prototype.destroy = function () {
            // this.$lat = null;
            // this.$lng = null;
            // this.$zoom = null;
            //  this.$btnSave = null;
            //google.maps.event.clearInstanceListeners(this.map);
            // this.map = null;
        };
        GmapCtr.prototype.init = function () {
            var _this = this;
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
            this.$view = $('#GoogleMapCtr');
            this.$lat = this.$view.find('[data-id=txtLat]:first').text(this.lat);
            this.$lng = this.$view.find('[data-id=txtLng]:first').text(this.lng);
            this.$zoom = this.$view.find('[data-id=txtZoom]:first').text(this.zoom);
            this.$btnSave = this.$view.find('[data-id=btnSave]:first').click(function () {
                _this.save();
            });
            var opt = {
                center: { lat: this.geo.lat, lng: this.geo.lng },
                zoom: this.geo.zoom,
                /* panControl:true,
                 zoomControl:true,
                 mapTypeControl:true,
                 scaleControl:true,
                 streetViewControl:false,
                 overviewMapControl:true,
                 rotateControl:true,*/
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                minZoom: 7
            };
            var map = new google.maps.Map(document.getElementById('GoogleMap'), opt);
            google.maps.event.addListener(map, 'click', function (event) {
                _this.lat = event.latLng.lat();
                _this.$lat.text(_this.lat);
                _this.lng = event.latLng.lng();
                _this.$lng.text(_this.lng);
                _this.marker.setPosition(event.latLng);
            });
            //zoom_changed
            map.addListener('zoom_changed', function (evt) {
                _this.zoom = map.getZoom();
                _this.$zoom.text(_this.zoom);
            });
            this.marker = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                title: 'Hello World!'
            });
            var styles = [
                {
                    featureType: 'poi',
                    elementType: "labels" /*,
                    stylers: [ { visibility: 'off' }]*/
                }
            ];
            map.setOptions({ styles: styles });
            this.handleInfoWindow();
            this.initPanorama(map);
            this.map = map;
        };
        GmapCtr.prototype.initPanorama = function (map) {
            var _this = this;
            var streetView = map.getStreetView();
            streetView.setOptions({
                clickToGo: false,
                linksControl: false,
                fullScreenControl: false,
                disableDefaultUI: true
            });
            google.maps.event.addListener(streetView, 'visible_changed', function () {
                clearTimeout(_this.striitViewTimer);
                if (streetView.visible)
                    setTimeout(function () {
                        streetView.setVisible(false);
                    }, 20000);
            });
        };
        GmapCtr.prototype.handleInfoWindow = function () {
            //store the original setContent-function
            var fx = google.maps.InfoWindow.prototype.setContent;
            //override the built-in setContent-method
            google.maps.InfoWindow.prototype.setContent = function (content) {
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
        };
        GmapCtr.prototype.save = function () {
            var _this = this;
            this.geo.lat = this.lat;
            this.geo.lng = this.lng;
            this.geo.zoom = this.zoom;
            uplight.RegA.getInstance().saveSettings('geo', this.geo).done(function (res) {
                if (res.success == 'success')
                    uplight.RegA.getInstance().msg('Data saved', _this.$btnSave.parent());
            });
        };
        GmapCtr.prototype.showValues = function () {
        };
        return GmapCtr;
    })();
    uplight.GmapCtr = GmapCtr;
})(uplight || (uplight = {}));
//# sourceMappingURL=GmapCtr.js.map