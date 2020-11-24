import { Component, Input, OnInit } from '@angular/core';

import { Badge } from 'src/app/core/schemas';

@Component({
  selector: 'project-badge-editor',
  templateUrl: './badge-editor.component.html',
  styleUrls: ['./badge-editor.component.scss']
})
export class BadgeEditorComponent implements OnInit {
  @Input() badge?: Badge;

  constructor() { }

  ngOnInit(): void {
  }

}
