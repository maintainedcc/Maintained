import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  stepsSeen = 0;

  constructor() { }

  incrementStep() {
    this.stepsSeen++;
  }

  decrementStep() {
    this.stepsSeen--;
  }

  hideWelcome() {
    
  }

}
