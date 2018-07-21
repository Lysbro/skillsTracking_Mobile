// Models
import { Student } from './student.model';
import { ProgressionTotal } from './progression-total.model';

export class StudentDetails {

    student: Student = new Student();
    progressionTotal: ProgressionTotal = new ProgressionTotal();

    constructor (student?: Student, progressionTotal?: ProgressionTotal) { 

        this.student = student;
        this.progressionTotal = progressionTotal;
        
    }

    public getStudent(): Student {

        return this.student;

    }

    public setStudent(newStudent: Student): void {

        this.student = newStudent;

    }

    public getId(): any {

        return this.student.id;

    }

    public setId(newId: any): any {

        this.student.id = newId;

    }

    public getLastName(): any {

        return this.student.lastName;

    }

    public setLastName(newLastName: any): void {

        this.student.lastName = newLastName;

    }

    public getFirstName(): any {

        return this.student.firstName;

    }

    public setFirstName(newFirstName: any): void {

        this.student.firstName = newFirstName;

    }

    public getName(): any {

        return this.student.getName();

    }

    public getProgression(): ProgressionTotal {

        return this.progressionTotal;

    }

    public setProgression(newProgression: ProgressionTotal): void {

        this.progressionTotal = newProgression;

    }

    public getSkillsCount(): any {

        return this.progressionTotal.totalSkills;

    }

    public setSkillsCount(newCount: any): void {

        this.progressionTotal.totalSkills = newCount;

    }

    public getStudentValidation(): any {

        return this.progressionTotal.studentValidations;

    }

    public setStudentValidation(newValue: any): void {

        this.progressionTotal.studentValidations = newValue;

    }

    public getTeacherValidation(): any {

        return this.progressionTotal.teacherValidations;

    }

    public setTeacherValidation(newValue: any): void {

        this.progressionTotal.teacherValidations = newValue;

    }

}