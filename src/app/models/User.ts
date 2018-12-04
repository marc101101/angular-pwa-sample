
export class User {
    constructor(
        firstname: string,
        address: string,
        id: number,
        email: string,
        lastname: string) {

        this.email = email;
        this.address = address;
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
    }

    firstname: string;
    address: string;
    id: number;
    email: string;
    lastname: string;

}