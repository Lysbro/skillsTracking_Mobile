export class User {

  id: any;
  lastname: any;
  firstname: any;
  avatar: any;
  gender: any;
  email: any;
  formation_id: any;

  constructor (id?: any, lastname?: any, firstname?: any, avatar?: any, gender?: any, email?: any){
    
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.avatar = avatar;
    this.gender = gender;
    this.email = email;
    
  }
}