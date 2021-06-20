import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Project } from '../../core/schemas';

@Component({
  selector: 'dashboard-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project?: Project;
  @Input() user?: string;

  @Output() deleteThis = new EventEmitter<string>();

  constructor() { }

  delete(): void {
    this.deleteThis.emit(this.project?.title);
  }

}
