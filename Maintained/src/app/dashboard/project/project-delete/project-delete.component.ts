import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/core/services';

@Component({
  selector: 'dashboard-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss']
})
export class ProjectDeleteComponent {
  @ViewChild('deleteProject', {static: true}) template?: TemplateRef<any>;

  constructor(private modal: ModalService) { }

  dialog(): void {
    this.modal.modalOpened.next(this.template);
  }

}
