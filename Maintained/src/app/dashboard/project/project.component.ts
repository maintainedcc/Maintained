import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../../core/schemas';

@Component({
  selector: 'dashboard-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project?: Project;
  @Input() user?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
