// Models
import { Report } from './report.model';
import { Module } from './module.model';
import { StudentDetails } from './student-details.model';
import { Student } from './student.model';
import { ProgressionTotal } from './progression-total.model';

export class Formation {

    id: any;
    name: any;
    students: StudentDetails[] = [];
    modules: Module[] = [];
    reports: Report[] = [];
    logo: any;
    startAt: any;
    endAt: any;

    constructor (id?: any, name?: any, logo?: any, startAt?: any, endAt?: any) {

        this.id = id;
        this.name = name;
        this.logo = logo;
        this.startAt = startAt;
        this.endAt = endAt;

    }

    public getId(): any {

        return this.id;

    }

    public setId(newId: any) {

        this.id = newId;

    }

    public getName(): any {

        return this.name;

    }

    public setName(newName: any): void {

        this.name = newName;

    }

    public addStudent(student: Student, progression: ProgressionTotal): void {

        this.students.push(new StudentDetails(student, progression));

    }

    public addModule(module: Module): void {

        this.modules.push(module);

    }

    public addReport(report: Report): void {

        this.reports.push(report);
        
    }

}