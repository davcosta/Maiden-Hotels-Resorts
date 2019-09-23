import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import { Guest } from './guests.model';

@Injectable({providedIn: 'root'})
export class GuestsService {

    constructor(private http: HttpClient, private constants:ConstantsService){}

    createAndStoreGuest(firstName: string,
        lastName: string,
        dateBirth: string,
        gender: string,
        idNumber: number,
        address: string,
        contactNumber: number,
        email: string,
        status: string){

            let data: {
                firstName: string,
                lastName: string,
                dateBirth: string,
                gender: string,
                idNumber: number,
                address: string,
                contactNumber: number,
                email: string,
                status: string
            };
            data = {firstName: firstName, lastName: lastName, dateBirth: dateBirth, gender: gender, idNumber: idNumber, address: address, contactNumber: contactNumber, email: email, status: status};
        return this.http.post(this.constants.webServicesUrl+'/GuestCreate',data);
    }

    updateGuest(id: number,firstName: string,
        lastName: string,
        dateBirth: string,
        idNumber: number,
        address: string,
        contactNumber: number,
        gender: string,
        email: string,
        status: string){

            let data: {
                firstName: string,
                lastName: string,
                dateBirth: string,
                gender: string,
                idNumber: number,
                address: string,
                contactNumber: number,
                email: string,
                status: string
            };
            data = {firstName: firstName, lastName: lastName, dateBirth: dateBirth, gender: gender, idNumber: idNumber, address: address, contactNumber: contactNumber, email: email, status: status};
        return this.http.post(this.constants.webServicesUrl+'/GuestUpdate',data);
    }

    deleteGuest(id: number){
        let data: {
            id: number
        }
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl+'/GuestDelete', data);
    }

    fetchGuests(){
        return this.http.get<{id: number,firstName: string,
            lastName: string,
            dateBirth: string,
            idNumber: number,
            address: string,
            gender:string,
            contactNumber: number,
            contactType: string,
            email: string,
            status: string}[]>(this.constants.webServicesUrl+'/Guests');
    }
}