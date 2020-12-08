import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/core/services';

@Component({
  selector: 'dashboard-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent {
  @ViewChild('createProject', {static: true}) template?: TemplateRef<any>;

  constructor(private modal: ModalService) { }

  dialog(): void {
    this.modal.modalOpened.next(this.template);
  }

}
