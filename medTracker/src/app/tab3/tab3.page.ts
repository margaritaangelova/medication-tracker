import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';


//to prevent any warnings from TypeScript about the google object from the Google Maps SDK:
declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  latLng: any;
  geometryLocation: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {


    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();


      console.log("online, loading map");

      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if (this.apiKey) {
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
      }

      document.body.appendChild(script);


    }
    else {

      this.initMap();
      this.enableMap();

    }

  }

  initMap() {

    this.mapInitialised = true;

    this.geolocation.getCurrentPosition().then((position) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // console.log(this.latLng);


      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //creates a request object, containing type and radius of the search
      this.addReqest(this.map);

    });

  }


  addReqest(map: any) {
    let request = {
      location: this.latLng,
      radius: 1000,
      type: ['pharmacy']
    };

    let service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {

          this.addMarker(map, results[i]);

        }
       
      }
    });

  }

  addMarker(map: any, result: any) {
    console.log(result);
    
          let placeLoc = result.geometry.location;
    
          let marker = new google.maps.Marker({
            map: map,
            position: placeLoc,
            animation: google.maps.Animation.DROP,
          });

    let content = `<h4>${result.name}</h4>
                    <h6>${result.vicinity}</h6>`;

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }



  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

}