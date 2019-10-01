import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  //define global variables here...
  readonly webServicesUrl: string = 'http://192.168.0.102:8085';
  readonly companyName: string = 'Maiden Hotels & Resorts';
  //readonly clubName: string = 'Club Metal Miles';
  
  

  constructor() { }
}