import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HotelRoom } from './hotels-rooms.model';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({providedIn: 'root'})
export class HotelsRoomsService {

    constructor(private http: HttpClient, private constants: ConstantsService){}

    createAndStoreHotelRoom(hotelId: number, roomId: number, roomNumber: number, cost: number){
        console.log("inserting: " + hotelId + " " + roomId + " " + roomNumber + " "+ cost);
        let data: {
            hotelId: number,
            roomId: number,
            roomNumber: number,
            cost: number
        };
        data = {hotelId: hotelId, roomId: roomId, roomNumber: roomNumber, cost: cost};
        return this.http.post(this.constants.webServicesUrl+'/HotelsRooms/HotelsRoomsCreate',data);
    }

    updateHotelRoom(id: number, hotelId: number, roomId: number, roomNumber: number, cost: number){
        let data: {
            id: Number,
            hotelId: number,
            roomId: number,
            roomNumber: number,
            cost: number
        };
        data = {id: id, hotelId: hotelId, roomId: roomId, roomNumber: roomNumber, cost: cost};
        return this.http.post(this.constants.webServicesUrl+'/HotelsRooms/HotelsRoomsUpdate',data);
    }

    deleteHotelRoom(id: number){
        let data: {
            id: number
        };
        return this.http.post(this.constants.webServicesUrl +'/HotelsRooms/HotelsRoomsDelete',data);
    }

    fetchHotelsRooms(){

        return this.http.get<HotelRoom[]>(this.constants.webServicesUrl+'/HotelsRooms');

    }
}