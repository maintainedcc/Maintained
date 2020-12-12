import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { Badge } from 'src/app/core/schemas';
import { ModalService } from 'src/app/core/services';

@Component({
  selector: 'project-badge-editor',
  templateUrl: './badge-editor.component.html',
  styleUrls: ['./badge-editor.component.scss']
})
export class BadgeEditorComponent {
  @Input() badge: Badge = { id: -1, title: { content: "", color: 0, width: 0 }, style: 0 };
  selectedModalTab = "badge";

  @ViewChild('badgeEditorModal', { static: true }) template?: TemplateRef<any>;

  constructor(private modal: ModalService) { }

  openEditorModal(tab: string): void {
    this.selectedModalTab = tab;
    this.modal.modalOpened.next(this.template);
  }

  setTab(tab: string): void {
    this.selectedModalTab = tab;
  }

}
