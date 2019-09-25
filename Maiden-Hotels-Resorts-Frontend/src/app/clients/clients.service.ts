import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import { Client } from './clients.model';

@Injectable({providedIn: 'root'})
export class ClientsService {

    constructor(private http: HttpClient, private constants:ConstantsService){}

    createAndStoreClient(guestId: number, password: string, moneySpent: number){

            let data: {
                guestId: number,
                password: string,
                moneySpent: number
            };
            data = {guestId: guestId, password: password, moneySpent: moneySpent};
        return this.http.post(this.constants.webServicesUrl+'/ClientCreate',data);
    }

    updateClient(id: number,guestId: number,
        password: string){

            let data: {
                id: number,
                guestId: number,
                password: string
            };
            data = {id: id, guestId: guestId, password: password};
        return this.http.post(this.constants.webServicesUrl+'/ClientUpdate',data);
    }

    deleteClient(id: number){
        let data: {
            id: number
        }
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl+'/GuestDelete', data);
    }

    fetchClients(){
        return this.http.get<{id: number,guestId: number,
            password: string,
            moneySpent: number}[]>(this.constants.webServicesUrl+'/Guests');
    }
}