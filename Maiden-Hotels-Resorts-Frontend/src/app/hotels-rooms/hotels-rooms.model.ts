export class HotelRoom {
    public id: number;
    public hotelId: number;
    public roomId: number;
    public roomNumber: number;
    public cost: number;

    constructor (id:number, hotelId: number, roomId: number, roomNumber: number, cost: number){
        this.id = id;
        this.hotelId = hotelId;
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.cost = cost;
    }
}