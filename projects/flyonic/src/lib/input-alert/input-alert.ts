import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InputAlert {
    constructor(private alertController: AlertController) {}

    show(
        header: string,
        message: string,
        defaultValue: string,
        dataType: 'text' | 'number' = 'text',
        required: boolean = true
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.alertController
                .create({
                    header,
                    message,
                    inputs: [
                        {
                            type: dataType,
                            name: 'value',
                            value: defaultValue
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'alertButton'
                        },
                        {
                            text: 'Ok',
                            handler: async data => {
                                if (required && !data.value) {
                                    const alert = await this.alertController.create({
                                        message: "Value can't be blank.",
                                        buttons: [
                                            {
                                                text: 'OK'
                                            }
                                        ]
                                    });

                                    alert.present();
                                    return false;
                                }
                                resolve(data.value);
                            },
                            cssClass: 'alertButton'
                        }
                    ]
                })
                .then(x => x.present());
        });
    }
}
