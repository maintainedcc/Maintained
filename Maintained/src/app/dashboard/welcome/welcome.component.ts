import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  stepsSeen = 0;

  constructor() { }

  ngOnInit(): void {
  }

  incrementStep() {
    this.stepsSeen++;
  }

}
