import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge-btn',
  templateUrl: './badge-btn.component.html',
  styleUrls: ['./badge-btn.component.scss']
})
export class BadgeBtnComponent {
  @Input() href?: string;
  @Input() leftText?: string;
  @Input() rightText?: string;

  constructor() { }

}
