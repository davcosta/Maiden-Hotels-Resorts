import { Guest } from '../guests/guests.model';

export class Client {
    public id: number;
    public idGuest: number;
    public guestClient: Guest;
    public password: string;
    public moneySpent: number;


    constructor (id: number, idGuest: number, guestClient: Guest, password: string, moneySpent: number){
        this.id = id;
        this.idGuest = idGuest;
        this.guestClient = guestClient;
        this.password = password;
        this.moneySpent = moneySpent;
        
    }
}