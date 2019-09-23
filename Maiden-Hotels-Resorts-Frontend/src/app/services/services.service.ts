import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from './services.model';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({providedIn: 'root'})
export class ServicesService {

    constructor(private http: HttpClient, private constants: ConstantsService){}

    createAndStoreService(name: string){
        console.log("inserting: " + name);
        let data: {
            name: string,
        };
        data = {name: name};
        return this.http.post(this.constants.webServicesUrl+'/Services/ServiceCreate',data);
    }

    updateService(id: number, name: string){
        let data: {
            id: number,
            name: string
        };
        data = {id: id, name: name};
        return this.http.post(this.constants.webServicesUrl+'/Services/ServiceUpdate',data);
    }

    deleteService(id: number){
        let data: {
            id: number
        };
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl +'/Services/ServiceDelete',data);
    }

    fetchServices(){

        return this.http.get<Service[]>(this.constants.webServicesUrl+'/Services');

    }
}