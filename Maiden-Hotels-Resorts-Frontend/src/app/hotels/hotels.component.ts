import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from './hotels.model';
import { HttpClient } from '@angular/common/http';
import { HotelsService } from './hotels.service';
import {HotelService} from '../hotels-services/hotels-services.model';
import {ServicesService} from '../services/services.service';
import {Service} from '../services/services.model';
import { HotelsServicesService } from '../hotels-services/hotels-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;
  readServicesForm: FormGroup;
  deleteServicesForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  public currentlySelected = -1;

  public hotels: Hotel[] = []
  public hotelsServices: HotelService[] = [ ];
  public services: Service[] = [ ];
  public servicesFromHotel: HotelService[] = [];
  public fetchedHotels: boolean;
  public fetchedServices: boolean;
  public fetchedHotelServices: boolean;

  constructor(private http: HttpClient, private hotelsService: HotelsService, private servicesService: ServicesService, private hotelsServicesService: HotelsServicesService) { }

  ngOnInit() {
    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'hotelName' : new FormControl(null,Validators.required),
      'hotelLocation' : new FormControl(null, Validators.required),
      'hotelClassification' : new FormControl(null, Validators.required),
      'hotelType' : new FormControl(null, Validators.required)
    });

    this.editForm = new FormGroup({
      'hotelId' : new FormControl(null),
      'hotelName' : new FormControl(null,Validators.required),
      'hotelLocation' : new FormControl(null, Validators.required),
      'hotelClassification' : new FormControl(null, Validators.required),
      'hotelType' : new FormControl(null, Validators.required)
    });
    
    this.deleteForm = new FormGroup({
      'hotelId' : new FormControl(null),
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

  populateDeleteServicesForm(index: number){
    this.deleteServicesForm.setValue({
      idHotelService : index
    });
    console.log("populateDeleteServicesForm index: "+index);
  }

  onRefresh(){
    this.fetchHotels();
    this.fetchServices();
    while(this.fetchedHotels && this.fetchedServices){}
    this.fetchHotelsServices();
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
          this.getServicesByHotelId(this.hotels[this.readServicesForm.value.idHotel].id);
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
      this.hotelsServices[this.editForm.value.idHotelService].id,
      this.hotels[this.editForm.value.idHotel].id,
      this.services[this.editForm.value.idService].id
      
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

    console.log("deleting hotel-service id: " + this.servicesFromHotel[index].id);
    //send http request
    this.hotelsServicesService.deleteHotelService(this.servicesFromHotel[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Hotel-service Deleted!";
      this.error = "";
      this.fetchHotelsServices();
      console.log(this.servicesFromHotel);
      this.getServicesByHotelId(this.hotels[this.readServicesForm.value.idHotel].id);
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
            this.hotelsServices.push(new HotelService(hotelsServices[i].id, hotelsServices[i].idHotel, hotelsServices[i].idService));
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
        console.log(this.services);
        this.fetchedServices = true;
    },
    error =>{
        this.error = error.message;
    });
  }

  populateEditForm(index: number){
    console.log("editing hotel id " + this.hotels[index].id);
    
        this.editForm.setValue({
          hotelId: index,
          hotelName: this.hotels[index].name,
          hotelLocation: this.hotels[index].location,
          hotelClassification: this.hotels[index].classification,
          hotelType: this.hotels[index].type
    });
    
  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      hotelId : index
    });
  }

  onCreateHotel(){
    console.log("onCreateHotel");
    //send http request
    this.hotelsService.createAndStoreHotel(
      this.insertForm.value.hotelName, 
      this.insertForm.value.hotelLocation, 
      this.insertForm.value.hotelClassification, 
      this.insertForm.value.hotelType).subscribe(responseData => {
        console.log(responseData);
        this.success = "New Hotel Inserted.";
        this.error ="";
        this.fetchHotels();
    },
    error =>{
        this.error = error.message;
        this.success = "";
    });
    
  }

  onUpdateHotel(){
    console.log("onUpdateAiport");
    //send http request
    this.hotelsService.updateHotel(
        this.hotels[this.editForm.value.hotelId].id,
        this.editForm.value.hotelName, 
        this.editForm.value.hotelLocation, 
        this.editForm.value.hotelClassification, 
        this.editForm.value.hotelType).subscribe(responseData => {
          console.log(responseData);
          this.success = "Hotel Updated.";
          this.error ="";
          this.fetchHotels();
      },
      error =>{
          this.error = error.message;
          this.success ="";
      });
  }

  onDeleteHotel(){
    console.log("onDeleteHotel");
    //get id from the deleteForm
    let index = this.deleteForm.value.hotelId;
    console.log("deleting hotel id: " + this.hotels[index].id);
    //send http request
    this.hotelsService.deleteHotel(this.hotels[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "hotel Deleted.";
      this.error = "";
      this.fetchHotels();
  },
  error =>{
      this.error = error.message;
      this.success = "";
  });
  }


  private fetchHotels(){
    this.isFetching = true;
    console.log("Fetching hotels...");
    this.hotelsService.fetchHotels().subscribe(data =>{
        this.isFetching = false;
        console.log(data);
        this.hotels = [];
        for (var i = 0, len = data.length; i < len; i++) {
          this.hotels.push(new Hotel(data[i].id, data[i].name, data[i].location, data[i].classification, data[i].type));
        }
        this.error = "";
        this.fetchedHotels = true;
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

  private getHotelByIdHotel(idHotel: number){
    console.log("hotel id: "+ idHotel);
    return this.hotels.find(x => x.id === idHotel);
  }

  private getServiceByIdService(idService: number){
    //console.log("service id: "+ idService);
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
            this.servicesFromHotel.push(new HotelService(hotelsServices[i].id, hotelsServices[i].idHotel, hotelsServices[i].idService));
        }
        this.fetchedHotelServices = true;
        console.log(this.servicesFromHotel);
    },
    error =>{
        this.error = error.message;
    });
  }

}
