import { NgModule } from '@angular/core';
import { ListModule } from './components/list.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, IonicModule, ListModule],
    providers: [],
    exports: [ListModule, ModalComponent],
    entryComponents: [ModalComponent]
})
export class FlyonicModule {}
