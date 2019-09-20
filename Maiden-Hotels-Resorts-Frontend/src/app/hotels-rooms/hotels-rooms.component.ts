import { Component, OnInit } from '@angular/core';
import {Hotel} from '../hotels/hotels.model';
import {HotelsService} from '../hotels/hotels.service';
import {HotelRoom} from './hotels-rooms.model';
import {RoomsService} from '../rooms/rooms.service';
import {Room} from '../rooms/rooms.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotelsRoomsService } from './hotels-rooms.service';

@Component({
  selector: 'app-hotels-rooms',
  templateUrl: './hotels-rooms.component.html',
  styleUrls: ['./hotels-rooms.component.css']
})
export class HotelsRoomsComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  
  public hotelsRooms: HotelRoom[] = [ ];
  public hotels: Hotel[] = [ ];
  public rooms: Room[] = [ ];
  public fetchedHotels: boolean;
  public fetchedRooms: boolean;

  constructor(private hotelsService: HotelsService, private roomsService: RoomsService, private hotelsRoomsService: HotelsRoomsService) { }

  ngOnInit() {

    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'hotelId' : new FormControl(null,Validators.required),
      'roomId' : new FormControl(null,Validators.required),
      'roomNumber': new FormControl(null,Validators.required),
      'cost' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'hotelRoomId': new FormControl(null,Validators.required),
      'hotelId' : new FormControl(null,Validators.required),
      'roomId' : new FormControl(null,Validators.required),
      'roomNumber': new FormControl(null,Validators.required),
      'cost' : new FormControl(null,Validators.required)
    });

    this.deleteForm = new FormGroup({
      'hotelRoomId' : new FormControl(null)
    });

  }

  onRefresh(){
    this.fetchHotels();
    this.fetchRooms();
    while(this.fetchedHotels && this.fetchedRooms){}
    this.fetchHotelsRooms();
  }

  populateEditForm(index: number){
    console.log("editing hotel-service id " + this.hotelsRooms[index].id);
    
    
        this.editForm.setValue({
          hotelRoomId:index,
          hotelId: this.hotels[index].name,
          roomId : this.rooms[index].id, //change later with a better property...
          
        });

  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      hotelServiceId : index
    });
  }

  onCreateHotelRoom(){
    console.log("onCreateHotelRoom");
    //send http request
    this.hotelsRoomsService.createAndStoreHotelRoom(
      this.hotels[this.insertForm.value.hotelId].id,
      this.rooms[this.insertForm.value.serviceId].id,
      this.insertForm.value.roomNumber,
      this.insertForm.value.cost
       
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the hotel-room..."
        }else{
          this.success = "Hotel-room inserted!";
          this.fetchHotelsRooms();
        }
        
      },
      error =>{
          this.error = error.message;
      });
  }

  onUpdateHotelRoom(){
    console.log("onUpdateHotelRoom");
    //send http request
    this.hotelsRoomsService.updateHotelRoom(
      this.hotelsRooms[this.editForm.value.hotelServiceId].id,
      this.hotels[this.editForm.value.hotelId].id,
      this.rooms[this.editForm.value.serviceId].id,
      this.editForm.value.roomNumber,
      this.editForm.value.cost
      
      ).subscribe(responseData => {
        console.log(responseData);
        this.success = "Hotel-room updated!";
        this.fetchHotelsRooms();
      },
      error =>{
          this.error = error.message;
      });
  }

  onDeleteHotelRoom(){
    console.log("onDeleteHotelRoom");
    //get id from the deleteForm
    let index = this.deleteForm.value.hotelRoomId;
    console.log("deleting hotel-room id: " + this.hotelsRooms[index].id);
    //send http request
    this.hotelsRoomsService.deleteHotelRoom(this.hotelsRooms[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Hotel-service Deleted!";
      this.fetchHotelsRooms();
    },
    error =>{
        this.error = error.message;
    });

  }

  onFetchHotelsRooms(){
    this.fetchHotelsRooms();
  }

  private fetchHotelsRooms(){
    this.isFetching = true;
    this.hotelsRoomsService.fetchHotelsRooms().subscribe(hotelsrooms =>{
      this.isFetching = false;
      this.hotelsRooms = [];
        for (var i = 0, len = hotelsrooms.length; i < len; i++) {
          this.hotelsRooms.push(new HotelRoom(hotelsrooms[i].id, hotelsrooms[i].hotelId, hotelsrooms[i].roomId, hotelsrooms[i].roomNumber, hotelsrooms[i].cost));
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

  fetchRooms() {
    this.fetchedRooms = false;
    this.roomsService.fetchRooms().subscribe(rooms =>{
      this.fetchedRooms = true;
      this.hotels = [];
        for (var i = 0, len = rooms.length; i < len; i++) {
          this.rooms.push(new Room(rooms[i].id, rooms[i].beds, rooms[i].divisions, rooms[i].type, rooms[i].size));
        }
    },
    error =>{
        this.error = error.message;
    });
  }

}
