import { Component } from "@angular/core";

@Component({
    selector: "seed-app",
    template: `<div class="seed-app">Hello Seed App</div>`,
    styles: [`
        .seed-app {
            display: block;
            position: absolute;
            font-size: 80px;
            color: #F4A460;
            opacity: 0.4;
            font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `]
})
export class AppComponent {

    public constructor() {}

}
