import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/core/services';

@Component({
  selector: 'dashboard-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  collapsed = true;
  @ViewChild('manageAccount', {static: true}) public template?: TemplateRef<any>;

  constructor(private modal: ModalService) { }

  toggle(): void {
    this.collapsed = !this.collapsed;
  }

  openAccountSettings(): void {
    this.modal.modalOpened.next(this.template);
  }
}
