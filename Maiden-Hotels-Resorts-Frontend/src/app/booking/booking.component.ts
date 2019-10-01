import { Component, Input, ViewChild, NgZone,OnInit } from '@angular/core';
//import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { MapsAPILoader, AgmMap } from '@agm/core';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
 
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  geocoder:any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
 
  //@ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    /*private wrapper: GoogleMapsAPIWrapper*/) {
this.mapsApiLoader = mapsApiLoader;
this.zone = zone;
//this.wrapper = wrapper;
this.mapsApiLoader.load().then(() => {
this.geocoder = new google.maps.Geocoder();
});
}
  ngOnInit() {
    this.location.marker.draggable = true;
  }

  

}
