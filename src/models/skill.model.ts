// Models
import { ProgressionDetails } from './progression-detail.model';

export class Skill {

    id: any;
    name: any;
    progressionDetails: ProgressionDetails = new ProgressionDetails();

    constructor (id?: any, name?: any, progressionDetails?: any) {

        this.id = id;
        this.name = name;
        this.progressionDetails = progressionDetails;
        
    }

    public getId(): any {

        return this.id;

    }

    public setId(newId: any): void {

        this.id = newId;

    }

    public getName(): any {

        return this.name;

    }

    public setName(newName: any): void {

        this.name = newName;

    }

    public getDetails(): ProgressionDetails {

        return this.progressionDetails;

    }

    public setDetails(newDetails: ProgressionDetails): void {

        this.progressionDetails = newDetails;

    }

    public getProgressionId(): any {

        return this.progressionDetails.progressionId

    }

    public setProgressionId(newId: any): void {

        this.progressionDetails.progressionId = newId;

    }

    public getStudentValue(): any {

        return this.progressionDetails.studentValue;

    }

    public setStudentValue(newValue: any) {

        this.progressionDetails.studentValue = newValue;

    }

    public getStudentValidatedAt(): any {

        return this.progressionDetails.studentValidationDate;

    }

    public setStudentValidatedAt(newDate: any): void {

        this.progressionDetails.studentValidationDate = newDate;

    }

    public getTeacherValue(): any {

        return this.progressionDetails.teacherValue;

    } 

    public setTeacherValue(newValue: any): void {

        this.progressionDetails.teacherValue = newValue;

    }

    public getTeacherValidatedAt(): any {

        return this.progressionDetails.teacherValidationDate;

    }

    public setTeacherValidatedAt(newDate: any): void {

        this.progressionDetails.teacherValidationDate = newDate;

    }

}