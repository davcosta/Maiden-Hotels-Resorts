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
  readServicesForm: FormGroup;
  deleteServicesForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  
  public hotelsServices: HotelService[] = [ ];
  public hotels: Hotel[] = [ ];
  public services: Service[] = [ ];
  public servicesFromHotel: HotelService[] = [];
  public fetchedHotels: boolean;
  public fetchedServices: boolean;
  public fetchedHotelServices: boolean;

  constructor(private hotelsService: HotelsService, private servicesService: ServicesService, private hotelsServicesService: HotelsServicesService) { }

  ngOnInit() {

    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'idHotel' : new FormControl(null,Validators.required),
      'idService' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'idHotelService': new FormControl(null,Validators.required),
      'idHotel' : new FormControl(null,Validators.required),
      'idService' : new FormControl(null,Validators.required)
    });

    this.deleteForm = new FormGroup({
      'idHotelService' : new FormControl(null),
    });

    this.readServicesForm = new FormGroup({
      'idHotel': new FormControl(null,Validators.required),
      'idService': new FormControl(null,Validators.required)
    })

    this.deleteServicesForm = new FormGroup({
      'idHotelService' : new FormControl(null),
    });

  }

  populateReadServicesForm(hotelIndex: number){
    console.log("index hotel: "+ hotelIndex);
    this.readServicesForm.setValue({
      idHotel: hotelIndex,
      idService: 0, 
    });

    this.getServicesByHotelId(this.hotels[hotelIndex].id);
  }

  onRefresh(){
    this.fetchHotels();
    this.fetchServices();
    while(this.fetchedHotels && this.fetchedServices){}
    this.fetchHotelsServices();
  }

  populateEditForm(index: number){
    console.log("index and length: "+index+" "+this.hotelsServices.length);
    console.log(this.hotelsServices);
    console.log("editing hotel-service id " + this.hotelsServices[index].id);
    
    
        this.editForm.setValue({
          idHotelService:index,
          idHotel: this.getHotelIndex(this.getHotelByIdHotel(this.hotelsServices[index].idHotel)),
          idService : this.getServiceIndex(this.getServiceByIdService(this.hotelsServices[index].idService)),
          
        });

  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      idHotelService : index
    });
  }

  populateDeleteServicesForm(index: number){
    this.deleteServicesForm.setValue({
      idHotelService : index
    });
  }

  onAddServiceToHotel(){
    this.hotelsServicesService.createAndStoreHotelService(
      this.hotels[this.readServicesForm.value.idHotel].id,
      this.services[this.readServicesForm.value.idService].id
       
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the hotel-service..."
          this.success ="";
        }else{
          this.success = "Hotel-service inserted!";
          this.error = "";
          this.fetchHotelsServices();
          this.getServicesByHotelId(this.servicesFromHotel[this.readServicesForm.value.idHotel].idHotel);
        }
        
      },
      error =>{
          this.error = error.message;
          this.success = "";
      });
  }

  onCreateHotelService(){
    console.log("onCreateHotelService");
    //send http request
    this.hotelsServicesService.createAndStoreHotelService(
      this.hotels[this.insertForm.value.idHotel].id,
      this.services[this.insertForm.value.idService].id
       
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the hotel-service..."
          this.success ="";
        }else{
          this.success = "Hotel-service inserted!";
          this.error = "";
          this.fetchHotelsServices();
        }
        
      },
      error =>{
          this.error = error.message;
          this.success = "";
      });
  }

  onUpdateHotelService(){
    console.log("onUpdateHotelService");
    //send http request
    this.hotelsServicesService.updateHotelService(
      null,
      null,
      null,
      "Inactive"
      
      ).subscribe(responseData => {
        console.log(responseData);
        this.success = "Hotel-service updated!";
        this.error = "";
        this.fetchHotelsServices();
      },
      error =>{
          this.error = error.message;
          this.success = "";
      });
  }

  onDeleteHotelService(){
    console.log("onDeleteHotelService");
    //get id from the deleteForm
    let index = this.deleteServicesForm.value.idHotelService;
    console.log("deleting client id: " + this.hotelsServices[index].id);
    //send http request
    this.hotelsServicesService.deleteHotelService(this.hotelsServices[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Hotel-service Deleted!";
      this.error = "";
      this.fetchHotelsServices();
      this.getServicesByHotelId(this.servicesFromHotel[this.readServicesForm.value.idHotel].idHotel);
    },
    error =>{
        this.error = error.message;
        this.success ="";
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
            this.hotelsServices.push(new HotelService(hotelsServices[i].id, hotelsServices[i].idHotel, hotelsServices[i].idService, hotelsServices[i].status));
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
      this.services = [];
        for (var i = 0, len = services.length; i < len; i++) {
          this.services.push(new Service(services[i].id, services[i].name));
        }
    },
    error =>{
        this.error = error.message;
    });
  }

  onDeleteService(){
    console.log("onDeleteService");
    //get id from the deleteForm
    let index = this.deleteServicesForm.value.hotelServicesId;
    console.log("deleting service id: " + this.servicesFromHotel[index].id);
    //send http request
    this.hotelsServicesService.deleteHotelService(this.servicesFromHotel[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Service Deleted.";
      this.error = "";
      this.getServicesByHotelId(this.servicesFromHotel[this.readServicesForm.value.idHotel].idHotel);
  },
  error =>{
      this.error = error.message;
      this.success = "";
  });
  }

  private getHotelByIdHotel(idHotel: number){
    console.log("hotel id: "+ idHotel);
    return this.hotels.find(x => x.id === idHotel);
  }

  private getServiceByIdService(idService: number){
    console.log("service id: "+ idService);
    return this.services.find(x => x.id === idService);
  }

  private getHotelIndex(hotel: Hotel){
    console.log("hotel name: "+ hotel.name);
    return this.hotels.findIndex(x => x.id === hotel.id)
  }

  private getServiceIndex(service: Service){
    console.log("service name: "+ service.name);
    return this.services.findIndex(x => x.id === service.id)
  }

  private getServicesByHotelId(idHotel: number){
    console.log("getServicesByHotelId hotel id: "+idHotel);
    this.fetchedHotelServices = false;
    this.isFetching = true;
    this.hotelsServicesService.getServicesByHotelId(idHotel).subscribe(hotelsServices =>{
      this.isFetching = false;
      this.servicesFromHotel = [];
        for (var i = 0, len = hotelsServices.length; i < len; i++) {
          console.log(hotelsServices[i].id);
          if((""+hotelsServices[i].id) != "")
            this.servicesFromHotel.push(new HotelService(hotelsServices[i].id, hotelsServices[i].idHotel, hotelsServices[i].idService, hotelsServices[i].status));
        }
        this.fetchedHotelServices = true;
        console.log(this.servicesFromHotel);
    },
    error =>{
        this.error = error.message;
    });
  }
}
