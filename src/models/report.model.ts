// Models
import { Student } from './student.model';

export class Report {

    id: any;
    date_created: any;
    text: any;
    date_modified: any;
    student: Student = new Student();

    constructor(id?: any, date_created?: any, date_modified?: any, text?: any, student?: Student) {

        this.id = id;
        this.date_created = date_created;
        this.text = text;
        this.date_modified = date_modified;
        this.student = student;
        this.text = text;

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