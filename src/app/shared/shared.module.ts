import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeBtnComponent } from './components/badge-btn/badge-btn.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [BadgeBtnComponent, ModalComponent],
  imports: [CommonModule],
  exports: [BadgeBtnComponent, ModalComponent]
})
export class SharedModule { }
