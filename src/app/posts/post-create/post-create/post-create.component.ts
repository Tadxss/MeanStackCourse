import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT';

  // It's better to add "on" word on your events or functions.
  onAddPost() {
    this.newPost = this.enteredValue;  
  }
}
