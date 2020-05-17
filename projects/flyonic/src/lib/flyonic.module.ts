import { NgModule } from '@angular/core';
import { ListModule } from './components/list.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertModule } from './alert/alert.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, IonicModule, ListModule, AlertModule, InputAl],
    providers: [],
    exports: [ListModule]
})
export class FlyonicModule {}
