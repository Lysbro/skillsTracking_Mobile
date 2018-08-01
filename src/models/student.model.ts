import { ProgressionTotal } from "./progression-total.model";
export class Student {

    id: any;
    lastName: any;
    firstName: any;
    avatar: any;
    progressionTotal: ProgressionTotal = new ProgressionTotal();

    constructor(id?: any, lastName?: any, firstName?: any) {

        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;

    }

    public getName(): any {

        return this.lastName + ' ' + this.firstName;

    }

}