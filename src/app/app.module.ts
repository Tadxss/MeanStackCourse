import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // Declarations of Component to be detectable by Angular
    AppComponent
  ],
  imports: [ // Importing of Modules needed to support our components
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // 3rd. Tells Angular to scan/render finally in the page the declared component or index.html
})
export class AppModule { }
