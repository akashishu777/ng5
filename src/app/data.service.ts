  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs/BehaviorSubject';

  @Injectable()
  export class DataService {

    private goals = new BehaviorSubject<any>(['The initial goals', 'Another sily goal']);
    goal =this.goals.asObservable();

    changeGoal(goal){
      this.goals.next(goal);
    }

    constructor() { }

  }
