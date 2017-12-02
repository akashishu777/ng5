import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animation, keyframes, query, stagger, animate } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('sandBox', [
      transition('* => *', [
        query(':enter', style({opacity: 0 }), {optional:true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform : 'translateY(-75%)', offset : 0 }),
            style({opacity:.5, transform : 'translateY(35px)', offset : .3}),
            style({opacity:1, transform : 'translateY(0)', offset : 1 })
          ]))]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity:1, transform : 'translateY(0)', offset : 0 }),
              style({opacity:.5, transform : 'translateY(35px)', offset : .3}),
              style({opacity:0, transform : 'translateY(-75%)', offset  : 1 })
            ]))]), {optional: true})
      ])
    ])
  ]
})  
export class HomeComponent implements OnInit {


  itemCount : number;
  btnText: string = 'Add an item';
  goalText : string = 'My First life goal';
  sandBox = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
  this._data.goal.subscribe(res => this.sandBox =res);
  this.itemCount = this.sandBox.length;
  this._data.changeGoal(this.sandBox);
  }

  addItem(){
    this.sandBox.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.sandBox.length;
    this._data.changeGoal(this.sandBox);
  }

  removeItem(i){
    this.sandBox.splice(i,1);
    this.itemCount = this.itemCount -1;
    this._data.changeGoal(this.sandBox);
  }
}
