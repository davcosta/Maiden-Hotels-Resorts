export class Hotel {
    public id: number;
    public name: string;
    public location: string;
    public classification: number;
    public type: string;

    constructor (id:number, name: string, location: string, classsification: number, type: string){
        this.id = id;
        this.name = name;
        this.location = location;
        this.classification = classsification;
        this.type = type;
    }
}