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

// TODO: I am lazy and need to finish writing this. If you get this far before I finish, contact me on Twitter for help: @maloric85
