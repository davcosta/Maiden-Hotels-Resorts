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
            idService: number,
            status: string
        };
        data = {idHotel: idHotel, idService: idService, status: "Active"};
        return this.http.post(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelCreate', data);
    }

    updateHotelService(id: number, idHotel: number, idService: number, status: string){
        let data: {
            id: number,
            idHotel: string,
            idService: string,
            status: string
        };
        data = {id: id, idHotel: "", idService: "", status: status};
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
        return this.http.get<HotelService[]>(this.constants.webServicesUrl+'/ServicesHotel');
    }

    getServicesByHotelId(idHotel: number){
        let data: {
            id: number,
            idHotel: number,
            idService: number,
            status: string

        };
        data = {id: null, idHotel: idHotel, idService: null, status: ""};
        return this.http.post<HotelService[]>(this.constants.webServicesUrl+'/ServicesHotel/ServicesHotelByParam',data);
    }
}