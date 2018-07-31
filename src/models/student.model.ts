export class Student {

    id: any;
    lastName: any;
    firstName: any;

    constructor (id?: any, lastName?: any, firstName?: any) {
        
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        
    }

    public getName(): any {

        return this.lastName + ' ' + this.firstName;

    }

}