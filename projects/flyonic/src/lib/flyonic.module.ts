import { NgModule } from '@angular/core';
import { ListModule, NumSelectorModule } from './components';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, IonicModule, ListModule, NumSelectorModule],
    providers: [],
    exports: [ListModule, ModalComponent, NumSelectorModule],
    entryComponents: [ModalComponent]
})
export class FlyonicModule {}
