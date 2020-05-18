import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumSelectorComponent } from './num-selector';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [NumSelectorComponent],
    imports: [CommonModule, IonicModule],
    exports: [NumSelectorComponent]
})
export class NumSelectorModule {}
