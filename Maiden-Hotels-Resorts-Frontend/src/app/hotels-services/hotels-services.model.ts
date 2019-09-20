export class HotelService {
    public id: number;
    public hotelId: number;
    public serviceId: number;

    constructor (id:number, hotelId: number, serviceId: number){
        this.id = id;
        this.hotelId = hotelId;
        this.serviceId = serviceId;
    }
}