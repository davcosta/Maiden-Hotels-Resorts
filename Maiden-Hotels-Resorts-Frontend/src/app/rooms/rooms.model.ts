export class Room {
    public id: number;
    public beds: number;
    public divisions: number;
    public type: string;
    public size: number;

    constructor (id:number, beds: number, divisions: number, type: string, size: number){
        this.id = id;
        this.beds = beds;
        this.divisions = divisions;
        this.type = type;
        this.size = size;
    }
}