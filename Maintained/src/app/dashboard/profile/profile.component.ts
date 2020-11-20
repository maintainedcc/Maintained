import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
  }
}
