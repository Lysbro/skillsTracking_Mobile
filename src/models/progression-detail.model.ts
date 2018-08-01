export class ProgressionDetails {

    progressionId: any;
    studentValue: any;
    studentValidationDate: any;
    teacherValue: any;
    teacherValidationDate: any;

    constructor (progressionId?: any, studentValue?: any, studentValidationDate?: any, teacherValue?: any, teacherValidationDate?: any) {

        this.progressionId = progressionId;
        this.studentValue = studentValue;
        this.studentValidationDate = studentValidationDate;
        this.teacherValue = teacherValue;
        this.teacherValidationDate = teacherValidationDate;
        
    }
    
}