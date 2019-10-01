import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../common/services/constants.service';
import { HotelService } from './hotels-services.model';


@Injectable({providedIn: 'root'})
export class HotelsServicesService {

    constructor(private http: HttpClient, private constants:ConstantsService){}

    createAndStoreHotelService(idHotel: number, idService: number){
        let data: {
            idHotel: number,
            idService: number
        };
        data = {idHotel: idHotel, idService: idService};
        return this.http.post(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelCreate', data);
    }

    updateHotelService(id: number, idHotel: number, idService: number){
        let data: {
            id: number,
            idHotel: number,
            idService: number
        };
        data = {id: id, idHotel: idHotel, idService: idService};
        return this.http.post(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelUpdate', data);
    }

    deleteHotelService(id: number){
        let data: {
            id: number
        };
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelDelete', data);
    }

    fetchHotelsServices(){
        return this.http.get<{id: number, idHotel: number, idService: number}[]>(this.constants.webServicesUrl+'/ServicesHotel');
    }

    getServicesByHotelId(idHotel: number){
        let data: {
            id: number,
            idHotel: number,
            idService: number
        };
        data = {id: null, idHotel: idHotel, idService: null};
        return this.http.post<{id: number, idHotel: number, idService: number}[]>(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelByParam',data);
    }
}