import { Skill } from './skill.model';
import { ProgressionTotal } from './progression-total.model';

export class Module {
  [x: string]: any;

    id: any;
    name: any;
    progressionTotal: ProgressionTotal = new ProgressionTotal();
    skills: Skill[] = [];
    
}