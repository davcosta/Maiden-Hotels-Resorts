import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HotelRoom } from './hotels-rooms.model';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({providedIn: 'root'})
export class HotelsRoomsService {

    constructor(private http: HttpClient, private constants: ConstantsService){}

    createAndStoreHotelRoom(idHotel: number, idRooms: number, roomNumber: number, cost: number){
        console.log("inserting: " + idHotel + " " + idRooms + " " + roomNumber + " "+ cost);
        let data: {
            idHotel: number,
            idRooms: number,
            roomNumber: number,
            cost: number
        };
        data = {idHotel: idHotel, idRooms: idRooms, roomNumber: roomNumber, cost: cost};
        return this.http.post(this.constants.webServicesUrl+'/RoomsHotel/RoomsHotelCreate',data);
    }

    updateHotelRoom(id: number, idHotel: number, idRooms: number, roomNumber: number, cost: number){
        let data: {
            id: Number,
            idHotel: number,
            idRooms: number,
            roomNumber: number,
            cost: number
        };
        data = {id: id, idHotel: idHotel, idRooms: idRooms, roomNumber: roomNumber, cost: cost};
        return this.http.post(this.constants.webServicesUrl+'/RoomsHotel/RoomsHotelUpdate',data);
    }

    deleteHotelRoom(id: number){
        let data: {
            id: number
        };
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl +'/RoomsHotel/RoomsHotelDelete',data);
    }

    fetchHotelsRooms(){

        return this.http.get<HotelRoom[]>(this.constants.webServicesUrl+'/RoomsHotel');

    }

    getRoomsByHotelId(idHotel: number){
        let data: {
            id: number,
            idHotel: number,
            idRooms: number
        };
        data = {id: null, idHotel: idHotel, idRooms: null};
        return this.http.post<HotelRoom[]>(this.constants.webServicesUrl+'/RoomsHotel/RoomsHotelByParam',data);
    }
}