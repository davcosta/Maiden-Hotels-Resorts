import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './services.model';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from './services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  insertForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  public isFetching = false;
  public error = "";
  public success = "";
  public currentlySelected = -1;

  public services: Service[] = []

  constructor(private http: HttpClient, private servicesService: ServicesService) { }

  ngOnInit() {
    this.fetchServices();

    //using Reactive Forms
    this.insertForm = new FormGroup({
      'serviceName' : new FormControl(null,Validators.required)
    });

    this.editForm = new FormGroup({
      'serviceId' : new FormControl(null),
      'serviceName' : new FormControl(null,Validators.required)
    });
    
    this.deleteForm = new FormGroup({
      'serviceId' : new FormControl(null),
    });

  }

  populateEditForm(index: number){
    console.log("editing service id " + this.services[index].id);
    
        this.editForm.setValue({
          serviceId: index,
          serviceName: this.services[index].name
    });
  }

  populateDeleteForm(index: number){
    this.deleteForm.setValue({
      serviceId : index
    });
  }

  onCreateService(){
    console.log("onCreateService");
    //send http request
    this.servicesService.createAndStoreService(
      this.insertForm.value.serviceName).subscribe(responseData => {
        console.log(responseData);
        this.success = "New Service Inserted.";
        this.error ="";
        this.fetchServices();
    },
    error =>{
        this.error = error.message;
        this.success = "";
    });
    
  }

  onUpdateService(){
    console.log("onUpdateAiport");
    //send http request
    this.servicesService.updateService(
        this.services[this.editForm.value.serviceId].id,
        this.editForm.value.serviceName).subscribe(responseData => {
          console.log(responseData);
          this.success = "Service Updated.";
          this.error ="";
          this.fetchServices();
      },
      error =>{
          this.error = error.message;
          this.success;
      });
  }

  onDeleteService(){
    console.log("onDeleteService");
    //get id from the deleteForm
    let index = this.deleteForm.value.serviceId;
    console.log("deleting service id: " + this.services[index].id);
    //send http request
    this.servicesService.deleteService(this.services[index].id).subscribe(responseData => {
      console.log(responseData);
      this.success = "Service Deleted.";
      this.fetchServices();
  },
  error =>{
      this.error = error.message;
  });
  }


  private fetchServices(){
    this.isFetching = true;
    console.log("Fetching services...");
    this.servicesService.fetchServices().subscribe(data =>{
        this.isFetching = false;
        console.log(data);
        this.services = [];
        for (var i = 0, len = data.length; i < len; i++) {
          this.services.push(new Service(data[i].id, data[i].name));
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
