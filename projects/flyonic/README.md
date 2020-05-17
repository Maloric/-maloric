# Flyonic - Ionic Components and Stuff

In my first Ionic application I was still learning the framework and found myself repeating a lot of the same code. So for my second, I decided to write a few reusable components both to reduce repetition and to make them easier to test. You're free to use these components in your application if you think they'll be useful. They are licensed under the MIT license, so feel free to modify and redistribute to your heart's content as long as you follow the rules of that license.

## Installation

First, install using npm:

    npm install @maloric/flyonic

Then include the module like so:

    import { FlyonicModule } from '@maloric/flyonic';
    ...
    @NgModule({
      declarations: [
        // Your components etc.
      ],
      imports: [
        // Your other modules here
        IonicComponentsModule
      ]
    })
    export class AppModule {}

From there you can utilise the components or services as per the instructions below:

## ListComponent

This wraps up the default Ionic List and extends its capabilities somewhat to make life easier when you have lots of similar looking lists in your app. I have provided a default list template which you can override, but I suggest you instead extend the component and provide the default template you need for your app, which avoids having to provide a template every time you instantiate the list.

## Modal

This is a wrapper for the Ionic ModalController with a set of defaults that I find useful. You can use it like so:

    @Component({
      selector: 'my-component',
      template: `
        <button (click)="showModal()">Show the modal</button>
      `
    })
    export class MyComponent {
      constructor(private modal: Modal) {}

      showModal() {
        this.modal.show({
            // This is the modal config (see below)
        });
      }
    }

The config allows you to either use a default modal component with some (very basic) styling or to override the component with your own component. In the latter case, simply provide a component property the same way you would with the Ionic ModalController class. If you want to use the default, however, you can provide content for it with config (see below).

-   **beforeDismiss** - A function to execute before the standard modal _dismiss_ method is called (the same as a normal Ionic modal). Anything you pass to _dismiss_ will also be passed into your _beforeDismiss_ method. If this method returns _false_ then the modal will not be closed, and _afterDismiss_ will not be executed. For details, see the example below.
-   **afterDismiss** - This executes after the standard _dismiss_ function, and also recieves the same config.
-   **props.title** - This is a string. I'm sure you know what it does.
-   **props.contentTemplate** - This is a template ref to inject your HTML into the modal. If you don't provide this you will see a warning message in the modal.
-   **props.buttonTemplate** - This is a template ref to inject custom HTML for the buttons. If you don't provide it, you will see one default button with the label "Close". Any data you pass into the dismiss method will be passed to your beforeDismiss and afterDismiss methods.

Here is an example:

    @Component({
      selector: 'my-component',
      template: `
        <ng-template #myContent>
          // Content HTML goes here
        </ng-template>

        <ng-template #myButtons>
          <ion-button (click)="dismiss()">Close</ion-button>
          <ion-button (click)="dismiss({save:true})">Save</ion-button>
        </ng-template>
        <button (click)="showModal()">Show the modal</button>
      `
    })
    export class MyComponent {
      constructor(private modal: Modal) {}

      showModal() {
        this.modal.show({
          beforeDismiss: (cfg: any) {
            // here is my custom config
            if (cfg.save) {
              // do something
            }

            // return false here if you don't want to close the modal
            // (e.g. if some kind of validation fails)
          },
          afterDismiss: (cfg: any) {
            if (cfg.save) {
              // do some more stuff
            }
          }
          props: {
            title: 'This is my modal!',
            contentTemplate: myContent,
            buttonsTemplate: myButtons,
            // These are just the props for the default modal component,
            // so if you want to provide your own (via the config.component
            // property), then you will need to provide a different set of
            // props to match your component.  In either case, you can also
            // override the "dismiss" method if you want to, which means
            // that config.beforeDismiss and config.afterDismiss will do
            // nothing.
          }
        });
      }
    }

### Backdrop Opacity

If, like me, you prefer a transparent backdrop for your modal, add something like this to your global stylesheet. I haven't added it to the component because it would have to be added globally and I don't want to mess up your styles.

    ion-modal {
        --background: none !important;
    }

// TODO: I am lazy and need to finish writing this. If you get this far before I finish, contact me on Twitter for help: @maloric85
