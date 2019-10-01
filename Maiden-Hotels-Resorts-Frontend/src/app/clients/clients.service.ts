import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import { Client } from './clients.model';
import { Guest } from '../guests/guests.model';

@Injectable({providedIn: 'root'})
export class ClientsService {

    constructor(private http: HttpClient, private constants:ConstantsService){}

    createAndStoreClient(guestClient: Guest, idGuest: number, password: string, moneySpent: number){

            let data: {
                guestClient: Guest[],
                idGuest: number,
                password: string,
                moneySpent: number
            };
            data = {guestClient: null, idGuest: idGuest, password: password, moneySpent: moneySpent};
        return this.http.post(this.constants.webServicesUrl+'/Clients/ClientCreate',data);
    }

    updateClient(id: number,idGuest: number,
        password: string){

            let data: {
                id: number,
                idGuest: number,
                password: string
            };
            data = {id: id, idGuest: idGuest, password: password};
        return this.http.post(this.constants.webServicesUrl+'/Clients/ClientUpdate',data);
    }

    deleteClient(id: number){
        let data: {
            id: number
        }
        data = {id: id};
        return this.http.post(this.constants.webServicesUrl+'/Clients/ClientDelete', data);
    }

    fetchClients(){
        return this.http.get<Client[]>(this.constants.webServicesUrl+'/Clients');
    }
}