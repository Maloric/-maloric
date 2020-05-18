import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list';
import { MultiListComponent } from './list-multi';

@NgModule({
  declarations: [ListComponent, MultiListComponent],
  imports: [CommonModule, IonicModule, RouterModule.forChild([])],
  exports: [ListComponent, MultiListComponent]
})
export class ListModule {}
