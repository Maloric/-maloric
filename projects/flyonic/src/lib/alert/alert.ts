import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Alert {
    constructor(private alertController: AlertController) {}

    show(header: string, message: string): Promise<string> {
        return new Promise<string>(() => {
            this.alertController
                .create({
                    header,
                    message,
                    buttons: [
                        {
                            text: 'Ok',
                            role: 'cancel',
                            cssClass: 'alertButton'
                        }
                    ]
                })
                .then(x => x.present());
        });
    }
}
