export class HotelService {
    public id: number;
    public idHotel: number;
    public idService: number;
    public status: string;

    constructor (id:number, idHotel: number, idService: number, status: string){
        this.id = id;
        this.idHotel = idHotel;
        this.idService = idService;
        this.status = status;

    }
}