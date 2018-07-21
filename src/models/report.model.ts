// Models
import { Student } from './student.model';

export class Report {

    id: any;
    date: any;
    student: Student = new Student();

    constructor (id?: any, date?: any, student?: any) {

        this.id = id;
        this.date = date;
        this.student = student;

    }

    public getAutor(): Student {

        return this.student;

    }

    public setAutor(student: Student): void {

        this.student = student;

    }
    
}