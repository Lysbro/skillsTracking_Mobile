import { Skill } from './skill.model';
import { ProgressionTotal } from './progression-total.model';

export class Module {

    id: any;
    name: any;
    progressionTotal: ProgressionTotal = new ProgressionTotal();
    skills: Skill[] = [];

    constructor (id?: any, name?: any, progressionTotal?: ProgressionTotal) {

        this.id = id;
        this.name = name;
        this.progressionTotal = progressionTotal;

    }

    public getSkillsCount(): any {

        return this.progressionTotal.totalSkills;

    }

    public setSkillsCount(newCount: any): void {

        this.progressionTotal.totalSkills = newCount;

    }

    public getStudentValidations(): any {

        return this.progressionTotal.studentValidations;

    }

    public setStudentValidations(newValue: any): void {

        this.progressionTotal.studentValidations = newValue;

    }

    public getTeacherValidations(): any {

        return this.progressionTotal.teacherValidations;

    }

    public setTeacherValidations(newValue: any): void {

        this.progressionTotal.teacherValidations = newValue;

    }

    public addSkill(skill: Skill): void {

        this.skills.push(skill);

    }
    
}