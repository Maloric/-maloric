import { NgModule } from '@angular/core';
import { ListModule } from './components/list.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [CommonModule, IonicModule, ListModule],
    providers: [],
    exports: [ListModule]
})
export class FlyonicModule {}
