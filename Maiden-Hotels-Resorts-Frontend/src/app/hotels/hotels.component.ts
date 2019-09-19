import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from './hotels.model';
import { HttpClient } from '@angular/common/http';
import { HotelsService } from './hotels.service';
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

  public isFetching = false;
  public error = "";
  public success = "";
  public currentlySelected = -1;

  public hotels: Hotel[] = []

  constructor(private http: HttpClient, private hotelsService: HotelsService) { }

  ngOnInit() {
    this.fetchHotels();

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
        this.fetchHotels();
    },
    error =>{
        this.error = error.message;
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
          this.fetchHotels();
      },
      error =>{
          this.error = error.message;
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
      this.fetchHotels();
  },
  error =>{
      this.error = error.message;
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

}
