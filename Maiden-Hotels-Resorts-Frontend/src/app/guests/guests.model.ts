export class Guest {
    public id: number;
    public firstName: string;
    public lastName: string;
    public dateBirth: string;
    public gender: string;
    public idNumber: number;
    public address: string;
    public contactNumber: number;
    public email: string;
    public status: string;

    constructor (id: number, firstName: string, lastName: string, dateBirth: string, gender: string, idNumber: number, address: string, contactNumber: number, email: string, status: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateBirth = dateBirth;
        this.gender = gender;
        this.idNumber = idNumber;
        this.address = address;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
    }
}