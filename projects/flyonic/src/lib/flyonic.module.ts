import { NgModule } from '@angular/core';
import { ListComponent, MultiListComponent } from './components';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [ListComponent, MultiListComponent],
    imports: [IonicModule],
    providers: [],
    exports: [ListComponent, MultiListComponent]
})
export class FlyonicModule {}
