import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dashboard-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  stepsSeen = 0;
  @Output() completed = new EventEmitter<void>();

  constructor() { }

  incrementStep(): void {
    this.stepsSeen++;
  }

  decrementStep(): void {
    this.stepsSeen--;
  }

  hideWelcome(): void {
    this.completed.emit();
  }

}
