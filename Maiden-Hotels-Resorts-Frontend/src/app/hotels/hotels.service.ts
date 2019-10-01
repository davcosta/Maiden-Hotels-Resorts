import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotel } from './hotels.model';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({providedIn: 'root'})
export class HotelsService {

    constructor(private http: HttpClient, private constants: ConstantsService){}

    createAndStoreHotel(name: string, location: string, classification: number, type: string){
        console.log("inserting: " + name + " " + location + " " + classification + " "+ type);
        let data: {
            name: string,
            location: string,
            classification: number,
            type: string
        };
        data = {name: name, location: location, classification: classification, type: type};
        return this.http.post(this.constants.webServicesUrl+'/Hotels/HotelCreate',data);
    }

    updateHotel(id: number, name: string, location: string, classification: number, type: string){
        let data: {
            id: number,
            name: string,
            location: string,
            classification: number,
            type: string
        };
        data = {id: id, name: name, location: location, classification: classification, type: type};
        return this.http.post(this.constants.webServicesUrl+'/Hotels/HotelUpdate',data);
    }

    deleteHotel(id: number){
        let data: {
            id: number,
            name: string,
            location: string,
            classification: number,
            type: string
        };
        data = { id: id, name: "",location: "",classification: null,type:""};
        return this.http.post(this.constants.webServicesUrl +'/Hotels/HotelDelete',data);
    }

    fetchHotels(){

        return this.http.get<Hotel[]>(this.constants.webServicesUrl+'/Hotels');

    }
}