import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { ModalService } from '../../../core/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  collapsed = true;
  template: TemplateRef<any>|null = null;

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.modalOpened.subscribe({
      next: this.show.bind(this)
    });
  }

  show(ref: TemplateRef<any>|null): void {
    if (ref) {
      this.template = ref;
      this.collapsed = false;
    }
  }

  collapse(): void {
    this.collapsed = true;
  }

  stopProp(event: Event): void {
    event.stopPropagation();
  }

}
