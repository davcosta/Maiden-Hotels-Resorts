import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../common/services/constants.service';
import { HotelService } from './hotels-services.model';


@Injectable({providedIn: 'root'})
export class HotelsServicesService {

    constructor(private http: HttpClient, private constants:ConstantsService){}

    createAndStoreHotelService(hotelId: number, serviceId: number){
        let data: {
            hotelId: number,
            serviceId: number
        };
        return this.http.post(this.constants.webServicesUrl+'/HotelsServices/HotelsServicesCreate', data);
    }

    updateHotelService(id: number, hotelId: number, serviceId: number){
        let data: {
            id: number,
            hotelId: number,
            serviceId: number
        };
        return this.http.post(this.constants.webServicesUrl+'/HotelsServices/HotelsServicesUpdate', data);
    }

    deleteHotelService(id: number){
        let data: {
            id: number
        };
        return this.http.post(this.constants.webServicesUrl+'/HotelsServices/HotelsServicesDelete', data);
    }

    fetchHotelsServices(){
        return this.http.get<{id: number, hotelId: number, serviceId: number}[]>(this.constants.webServicesUrl+'/HotelsServices');
    }
}