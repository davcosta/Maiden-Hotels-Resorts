import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guest } from './guests.model';
import { GuestsService } from './guests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  
  public guests: Guest[] = [ ];

   
  constructor(private datepipe: DatePipe,private guestsService: GuestsService) {}

  ngOnInit() {

    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'guestFirstName' : new FormControl(null,Validators.required),
      'guestLastName' : new FormControl(null,Validators.required),
      'guestDateBirth' : new FormControl(null,Validators.required),
      'guestGender' : new FormControl(null,Validators.required),
      'guestIdNumber' : new FormControl(null,Validators.required),
      'guestAddress' : new FormControl(null,Validators.required),
      'guestContactNumber' : new FormControl(null,Validators.required),  
      'guestEmail' : new FormControl(null,[Validators.required, Validators.email]),
      'guestStatus' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'guestId' : new FormControl(null),
      'guestFirstName' : new FormControl(null,Validators.required),
      'guestLastName' : new FormControl(null,Validators.required),
      'guestDateBirth' : new FormControl(null,Validators.required),
      'guestGender' : new FormControl(null,Validators.required),
      'guestIdNumber' : new FormControl(null,Validators.required),
      'guestAddress' : new FormControl(null,Validators.required),
      'guestContactNumber' : new FormControl(null,Validators.required),  
      'guestEmail' : new FormControl(null,[Validators.required, Validators.email]),
      'guestStatus' : new FormControl(null,Validators.required)
    });
    
    this.deleteForm = new FormGroup({
      'guestId' : new FormControl(null),
    });

  }

  onRefresh() {
    this.fetchGuests();
  }

  

  populateEditForm(index: number){
    console.log("editing Guest id " + this.guests[index].id);
    
    
        this.editForm.setValue({
          guestId: index,
          guestFirstName: this.guests[index].firstName,
          guestLastName : this.guests[index].lastName,
          guestDateBirth : this.datepipe.transform(this.guests[index].dateOfBirth, 'yyyy-MM-dd'),
          guestGender : this.guests[index].gender,
          guestIdNumber : this.guests[index].idNumber,
          guestAddress : this.guests[index].address,
          guestContactNumber : this.guests[index].contactNumber,
          guestEmail : this.guests[index].email,
          guestStatus: this.guests[index].status
        });

  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      guestId : index
    });
  }

  onCreateGuest(){
    console.log("onCreateGuest");
    //send http request
    this.guestsService.createAndStoreGuest(
      this.insertForm.value.guestFirstName,
      this.insertForm.value.guestLastName,
      this.insertForm.value.guestDateBirth,
      this.insertForm.value.guestGender,
      this.insertForm.value.guestIdNumber,
      this.insertForm.value.guestAddress,
      this.insertForm.value.guestContactNumber,
      this.insertForm.value.guestEmail,
      this.insertForm.value.guestStatus 
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the Guest..."
        }else{
          this.success = "Guest inserted!";
          this.fetchGuests();
        }
        
      },
      error =>{
          this.error = error.message;
      });
  }

  
  onUpdateGuest(){
    console.log("onUpdateGuest");
    //send http request
    this.guestsService.updateGuest(
      this.guests[this.editForm.value.guestId].id,
      this.editForm.value.guestFirstName,
      this.editForm.value.guestLastName,
      this.editForm.value.guestDateBirth,
      this.editForm.value.guestIdNumber,
      this.editForm.value.guestAddress,
      this.editForm.value.guestContactNumber,
      this.editForm.value.guestGender,
      this.editForm.value.guestEmail,
      this.editForm.value.guestStatus
      ).subscribe(responseData => {
        console.log(responseData);
        this.success = "Guest updated!";
        this.fetchGuests();
      },
      error =>{
          this.error = error.message;
      });
  }

  onDeleteGuest(){
    console.log("onDeleteGuest");
    //get id from the deleteForm
    let index = this.deleteForm.value.guestId;
    console.log("deleting Guest id: " + this.guests[index].id);
    //send http request
    this.guestsService.deleteGuest(this.guests[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Guest Deleted!";
      this.fetchGuests();
    },
    error =>{
        this.error = error.message;
    });

  }

  onFetchGuests(){
    this.fetchGuests();
  }

  private fetchGuests(){
    this.isFetching = true;
    this.guestsService.fetchGuests().subscribe(guests =>{
      this.isFetching = false;
      this.guests = [];
      this.guests = guests;
        console.log(this.guests);
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
