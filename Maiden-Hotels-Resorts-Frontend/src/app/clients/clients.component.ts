import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from './clients.model';
import { ClientsService } from './clients.service';
import { Guest} from '../guests/guests.model';
import { GuestsService} from '../guests/guests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  
  public guests: Guest[] = [ ];
  public clients: Client[] = [ ];
  
  public fetchedGuests: boolean;
   
  constructor(private datepipe: DatePipe,private clientsService: ClientsService, private guestsService: GuestsService) {}

  ngOnInit() {

    this.onRefresh();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'clientGuestId' : new FormControl(null,Validators.required),
      'clientPassword' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'clientId' : new FormControl(null),
      'clientGuestId' : new FormControl(null,Validators.required),
      'clientPassword' : new FormControl(null,Validators.required)
    });
    
    this.deleteForm = new FormGroup({
      'clientId' : new FormControl(null),
    });

  }

  onRefresh() {
    this.fetchGuests();
    while(this.fetchedGuests){}
    this.fetchClients();
  }

  

  populateEditForm(index: number){
    console.log("editing Guest id " + this.clients[index].id);
    
    
        this.editForm.setValue({
          clientId:index,
          clientGuestId: this.guests[index].firstName + " " + this.guests[index].lastName,
          clientPassword: this.clients[index].password
        });

  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      clientId : index
    });
  }

  onCreateClient(){
    console.log("onCreateClient");
    //send http request
    this.clientsService.createAndStoreClient(
      this.guests[this.insertForm.value.guestId].id,
      this.insertForm.value.guestPassword,
      0
     
      ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the Client..."
        }else{
          this.success = "Client inserted!";
          this.fetchClients();
        }
        
      },
      error =>{
          this.error = error.message;
      });
  }

  
  onUpdateClient(){
    console.log("onUpdateClient");
    //send http request
    this.clientsService.updateClient(
      this.clients[this.editForm.value.clientId].id,
      this.guests[this.editForm.value.guestId].id,
      this.editForm.value.password
      ).subscribe(responseData => {
        console.log(responseData);
        this.success = "Client updated!";
        this.fetchClients();
      },
      error =>{
          this.error = error.message;
      });
  }

  onDeleteClient(){
    console.log("onDeleteClient");
    //get id from the deleteForm
    let index = this.deleteForm.value.clientId;
    console.log("deleting Client id: " + this.clients[index].id);
    //send http request
    this.clientsService.deleteClient(this.clients[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Client Deleted!";
      this.fetchClients();
    },
    error =>{
        this.error = error.message;
    });

  }

  onFetchClients(){
    this.fetchClients();
  }

  private fetchClients(){
    this.isFetching = true;
    this.clientsService.fetchClients().subscribe(clients =>{
      this.isFetching = false;
      this.clients = [];
        for (var i = 0, len = clients.length; i < len; i++) {
          this.clients.push(new Client(clients[i].id, clients[i].guestId, clients[i].password, clients[i].moneySpent));
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

  private fetchGuests(){
    this.fetchedGuests = false;
    this.guestsService.fetchGuests().subscribe(guests =>{
      this.fetchedGuests = true;
      this.guests = [];
        for (var i = 0, len = guests.length; i < len; i++) {
          this.guests.push(new Guest(guests[i].id, guests[i].firstName, guests[i].lastName, guests[i].dateBirth, guests[i].gender, guests[i].idNumber, guests[i].address, guests[i].contactNumber, guests[i].email, guests[i].status ));
        }
    },
    error =>{
        this.error = error.message;
    });
    
  }

  private getGuestByGuestId(guestId: number){
    return this.guests.find(x => x.id = guestId);
  }

}
