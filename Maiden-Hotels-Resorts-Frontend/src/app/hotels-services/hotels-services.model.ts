export class HotelService {
    public id: number;
    public idHotel: number;
    public idService: number;

    constructor (id:number, idHotel: number, idService: number){
        this.id = id;
        this.idHotel = idHotel;
        this.idService = idService;
    }
}