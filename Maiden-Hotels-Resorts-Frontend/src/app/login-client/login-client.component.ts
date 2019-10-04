import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../clients/clients.model';
import { ClientsService } from '../clients/clients.service';
import { Guest} from '../guests/guests.model';
import { GuestsService} from '../guests/guests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  registerForm: FormGroup;

  public error = "";
  public success = "";

  constructor(private datepipe: DatePipe,private clientsService: ClientsService, private guestsService: GuestsService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      'registerFirstName' : new FormControl(null,Validators.required),
      'registerLastName' : new FormControl(null,Validators.required),
      'registerDateBirth' : new FormControl(null,Validators.required),
      'registerGender' : new FormControl(null,Validators.required),
      'registerAddress' : new FormControl(null,Validators.required),
      'registerIdNumber' : new FormControl(null,Validators.required),
      'registerContactNumber' : new FormControl(null,Validators.required),
      'registerEmail' : new FormControl(null,[Validators.required, Validators.email] ),
      'registerPassword' : new FormControl(null,Validators.required),
      'registerPassword2': new FormControl(null,Validators.required)
    });

    
  }

  onRegisterClient(){
    console.log("onRegisterClient");
    //send http request
    this.guestsService.createAndStoreGuest(
      this.registerForm.value.registerFirstName,
      this.registerForm.value.registerLastName,
      this.registerForm.value.registerDateBirth,
      this.registerForm.value.registerGender,
      this.registerForm.value.registerIdNumber,
      this.registerForm.value.registerAddress,
      this.registerForm.value.registerContactNumber,
      this.registerForm.value.registerEmail,
      "Inactive"
    ).subscribe(responseData => {
        console.log(responseData);
        if(responseData == -1){
          this.error = "Something went wrong inserting the guest..."
        }else{
          this.success = "Guest registred!";
          this.clientsService.createAndStoreClient(null,
            Number(responseData),
            this.registerForm.value.registerPassword,
            0
            
          ).subscribe(responseData => {
              console.log(responseData);
              if(responseData == -1){
                this.error = "Something went wrong inserting the Client..."
              }else{
                this.success = "Client registred!";
              }
              
            },
            error =>{
                this.error = error.message;
            });
        }
        
      
      },
      error =>{
          this.error = error.message;
      });
  }

}
