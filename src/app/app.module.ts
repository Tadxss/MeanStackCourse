import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';

@NgModule({
  declarations: [ // Declarations of Component to be detectable by Angular
    AppComponent,
    PostCreateComponent
  ],
  imports: [ // Importing of Modules needed to support our components
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // 3rd. Tells Angular to scan/render finally in the page the declared component or index.html
})
export class AppModule { }
