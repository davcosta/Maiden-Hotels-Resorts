export class Client {
    public id: number;
    public guestId: number;
    public password: string;
    public moneySpent: number;


    constructor (id: number, guestId: number, password: string, moneySpent: number){
        this.id = id;
        this.guestId = guestId;
        this.password = password;
        this.moneySpent = moneySpent;
        
    }
}