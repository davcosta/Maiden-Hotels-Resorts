import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from './rooms.model';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({providedIn: 'root'})
export class RoomsService {

    constructor(private http: HttpClient, private constants: ConstantsService){}

    createAndStoreRoom(beds: number, divisions: number, type: string, size: number){
        console.log("inserting: " + beds + " " + divisions + " " + type + " "+ size);
        let data: {
            beds: number,
            divisions: number,
            type: string,
            size: number
        };
        data = {beds: beds, divisions: divisions, type: type, size: size};
        return this.http.post(this.constants.webServicesUrl+'/Rooms/RoomCreate',data);
    }

    updateRoom(id: number, beds: number, divisions: number, type: string, size: number){
        let data: {
            id: Number,
            beds: number,
            divisions: number,
            type: string,
            size: number
        };
        data = {id: id, beds: beds, divisions: divisions, type: type, size: size};
        return this.http.post(this.constants.webServicesUrl+'/Rooms/RoomUpdate',data);
    }

    deleteRoom(id: number){
        let data: {
            id: number
        };
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl +'/Rooms/RoomDelete',data);
    }

    fetchRooms(){

        return this.http.get<Room[]>(this.constants.webServicesUrl+'/Rooms');

    }
}