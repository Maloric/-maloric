import { NgModule } from '@angular/core';
import { ListComponent, MultiListComponent, ListModule } from './components';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [CommonModule, IonicModule, ListModule],
    providers: [],
    exports: [ListComponent, MultiListComponent]
})
export class FlyonicModule {}
