import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeBtnComponent } from './components/badge-btn/badge-btn.component';

@NgModule({
  declarations: [BadgeBtnComponent],
  imports: [CommonModule],
  exports: [BadgeBtnComponent]
})
export class SharedModule { }
