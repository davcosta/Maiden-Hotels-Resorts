import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  //public clients: client[] = [];
  public isFetching = false;
  public error = "";
  public success = "";
  public currentlySelected = -1;
  
  public rooms: Room[] = [ ];
  

  constructor(private http: HttpClient, private roomsService: RoomsService) { }

  ngOnInit() {

    this.fetchRooms();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'roomBeds' : new FormControl(null,Validators.required),
      'roomDivisions' : new FormControl(null, Validators.required),
      'roomType' : new FormControl(null, Validators.required),
      'roomSize' : new FormControl(null, Validators.required)
    });

    this.editForm = new FormGroup({
      'roomId' : new FormControl(null),
      'roomBeds': new FormControl(null, Validators.required),
      'roomDivisions' : new FormControl(null, Validators.required),
      'roomType' : new FormControl(null, Validators.required),
      'roomSize' : new FormControl(null, Validators.required)
    });
    
    this.deleteForm = new FormGroup({
      'roomId' : new FormControl(null),
    });
  }


  populateEditForm(index: number){
    console.log("editing room id " + this.rooms[index].id);
    
        this.editForm.setValue({
          roomId: index,
          roomBeds: this.rooms[index].beds,
          roomDivisions: this.rooms[index].divisions,
          roomType: this.rooms[index].type,
          roomSize: this.rooms[index].size
    });
  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      roomId : index
    });
  }

  onCreateRoom(){
    console.log("onCreateRoom");
    //send http request
    this.roomsService.createAndStoreRoom(
      this.insertForm.value.roomBeds, 
      this.insertForm.value.roomDivisions, 
      this.insertForm.value.roomType, 
      this.insertForm.value.roomSize).subscribe(responseData => {
        console.log(responseData);
        this.success = "New Room Inserted.";
        this.error ="";
        this.fetchRooms();
    },
    error =>{
        this.error = error.message;
        this.success ="";
    });
    
  }

  onUpdateRoom(){
    console.log("onUpdateRoom");
    //send http request
    this.roomsService.updateRoom(
        this.rooms[this.editForm.value.roomId].id,
        this.editForm.value.roomBeds, 
        this.editForm.value.roomDivisions, 
        this.editForm.value.roomType, 
        this.editForm.value.roomSize).subscribe(responseData => {
          console.log(responseData);
          this.success = "Room Updated.";
          this.error ="";
          this.fetchRooms();
      },
      error =>{
          this.error = error.message;
          this.success ="";
      });
  }

  onDeleteRoom(){
    console.log("onDeleteRoom");
    //get id from the deleteForm
    let index = this.deleteForm.value.roomId;
    console.log("deleting room id: " + this.rooms[index].id);
    //send http request
    this.roomsService.deleteRoom(this.rooms[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Room Deleted.";
      this.error="";
      this.fetchRooms();
  },
  error =>{
      this.error = error.message;
      this.success = "";
  });
  }


  private fetchRooms(){
    this.isFetching = true;
    console.log("Fetching rooms...");
    this.roomsService.fetchRooms().subscribe(data =>{
        this.isFetching = false;
        console.log(data);
        this.rooms = [];
        for (var i = 0, len = data.length; i < len; i++) {
          this.rooms.push(new Room(data[i].id, data[i].beds, data[i].divisions, data[i].type, data[i].size));
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
