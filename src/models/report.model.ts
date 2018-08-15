// Models
import { Student } from './student.model';

export class Report {

    id: any;
    date: any;
    student: Student = new Student();
    text: any;
    rate: any;
    isDaily: any;
    updatedAt: any;
    createdAt: any;

    constructor (id?: any, date?: any, student?: any, text?: any, rate?: any, isDaily?: any, createdAt?: any, updatedAt?: any) {

        this.id = id;
        this.date = date;
        this.student = student;
        this.text = text;
        this.rate = rate;
        this.isDaily = isDaily;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

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