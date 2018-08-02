export class Student {

    id: any;
    lastName: any;
    firstName: any;
    avatar: any;
    email: any;
    gender: any;

    constructor (id?: any, lastName?: any, firstName?: any, avatar?: any, gender?: any) {
        
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.avatar = avatar;
        this.gender = gender;
        
    }

    public getName(): any {

        return this.lastName + ' ' + this.firstName;

    }

}