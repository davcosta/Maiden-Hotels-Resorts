export class HotelRoom {
    public id: number;
    public idHotel: number;
    public idRooms: number;
    public roomNumber: number;
    public cost: number;

    constructor (id:number, idHotel: number, idRooms: number, roomNumber: number, cost: number){
        this.id = id;
        this.idHotel = idHotel;
        this.idRooms = idRooms;
        this.roomNumber = roomNumber;
        this.cost = cost;
    }
}