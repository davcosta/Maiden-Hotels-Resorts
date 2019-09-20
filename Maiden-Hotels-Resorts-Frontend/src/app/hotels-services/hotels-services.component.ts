import { Component, OnInit } from '@angular/core';
import {Hotel} from '../hotels/hotels.model';
import {HotelsService} from '../hotels/hotels.service';
import {HotelService} from './hotels-services.model';
import {ServicesService} from '../services/services.service';
import {Service} from '../services/services.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotelsServicesService } from './hotels-services.service';

@Component({
  selector: 'app-hotels-services',
  templateUrl: './hotels-services.component.html',
  styleUrls: ['./hotels-services.component.css']
})
export class HotelsServicesComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  
  public hotelsServices: HotelService[] = [ ];
  public hotels: Hotel[] = [ ];
  public services: Service[] = [ ];
  public fetchedHotels: boolean;
  public fetchedServices: boolean;

  constructor(private hotelsService: HotelsService, private servicesService: ServicesService, private hotelsServicesService: HotelsServicesService) { }

  ngOnInit() {

    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'hotelId' : new FormControl(null,Validators.required),
      'serviceId' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'hotelServiceId': new FormControl(null,Validators.required),
      'hotelId' : new FormControl(null,Validators.required),
      'serviceId' : new FormControl(null,Validators.required)
    });

    this.deleteForm = new FormGroup({
      'hotelServiceId' : new FormControl(null),
    });

  }

  onRefresh(){
    this.fetchHotels();
    this.fetchServices();
    while(this.fetchedHotels && this.fetchedServices){}
    this.fetchHotelsServices();
  }

  populateEditForm(index: number){
    console.log("editing hotel-service id " + this.hotelsServices[index].id);
    
    
        this.editForm.setValue({
          hotelServiceId:index,
          hotelId: this.hotels[index].name,
         serviceId : this.services[index].name,
          
        });

  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      hotelServiceId : index
    });
  }

  onCreateHotelService(){
    console.log("onCreateHotelService");
    //send http request
    this.hotelsServicesService.createAndStoreHotelService(
      this.hotels[this.insertForm.value.hotelId].id,
      this.services[this.insertForm.value.serviceId].id
       
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the hotel-service..."
        }else{
          this.success = "Hotel-service inserted!";
          this.fetchHotelsServices();
        }
        
      },
      error =>{
          this.error = error.message;
      });
  }

  onUpdateHotelService(){
    console.log("onUpdateHotelService");
    //send http request
    this.hotelsServicesService.updateHotelService(
      this.hotelsServices[this.editForm.value.hotelServiceId].id,
      this.hotels[this.editForm.value.hotelId].id,
      this.services[this.editForm.value.serviceId].id
      
      ).subscribe(responseData => {
        console.log(responseData);
        this.success = "Hotel-service updated!";
        this.fetchHotelsServices();
      },
      error =>{
          this.error = error.message;
      });
  }

  onDeleteHotelService(){
    console.log("onDeleteHotelService");
    //get id from the deleteForm
    let index = this.deleteForm.value.hotelServiceId;
    console.log("deleting client id: " + this.hotelsServices[index].id);
    //send http request
    this.hotelsServicesService.deleteHotelService(this.hotelsServices[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Hotel-service Deleted!";
      this.fetchHotelsServices();
    },
    error =>{
        this.error = error.message;
    });

  }

  onFetchHotelsServices(){
    this.fetchHotelsServices();
  }

  private fetchHotelsServices(){
    this.isFetching = true;
    this.hotelsServicesService.fetchHotelsServices().subscribe(hotelsServices =>{
      this.isFetching = false;
      this.hotelsServices = [];
        for (var i = 0, len = hotelsServices.length; i < len; i++) {
          this.hotelsServices.push(new HotelService(hotelsServices[i].id, hotelsServices[i].hotelId, hotelsServices[i].serviceId));
        }
    },
    error =>{
        this.error = error.message;
    });
    
  }

  onErrorClose(){
    this.error = null;
  }

  onSuccessClose(){
    this.success = null;
  }

  public getHotelIndex(hotel: Hotel){
    return this.hotels.indexOf(hotel);
  }

  fetchHotels() {
    this.fetchedHotels = false;
    this.hotelsService.fetchHotels().subscribe(hotels =>{
      this.fetchedHotels = true;
      this.hotels = [];
        for (var i = 0, len = hotels.length; i < len; i++) {
          this.hotels.push(new Hotel(hotels[i].id, hotels[i].name, hotels[i].location, hotels[i].classification, hotels[i].type));
        }
    },
    error =>{
        this.error = error.message;
    });
  }

  fetchServices() {
    this.fetchedServices = false;
    this.servicesService.fetchServices().subscribe(services =>{
      this.fetchedServices = true;
      this.hotels = [];
        for (var i = 0, len = services.length; i < len; i++) {
          this.services.push(new Service(services[i].id, services[i].name));
        }
    },
    error =>{
        this.error = error.message;
    });
  }

}
