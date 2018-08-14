// Models
import { Student } from './student.model';

export class Report {

    id: any;
    date: any;
    student: Student = new Student();
    text: any;
    createdAt: any;

    constructor (id?: any, date?: any, student?: any, text?: any, createdAt?: any) {

        this.id = id;
        this.date = date;
        this.student = student;
        this.text = text;
        this.createdAt = createdAt;

    }

    public getAutor(): Student {

        return this.student;

    }

    public getAuthorName(): any {

        return this.student.getName();

    }

    public setAutor(student: Student): void {

        this.student = student;

    }
    
}