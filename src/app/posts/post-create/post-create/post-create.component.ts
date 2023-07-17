import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  // Event Emitter is a way to pass data or update other 
  // components (p.s. must be a parent component of this one and
  // the receiver should be also a child component of the
  // parent component of this one.) when something change 
  // in this specific component.
  @Output() postCreated = new EventEmitter();

  // It's better to add "on" word on your events or functions.
  onAddPost() {
    const post = { 
      title: this.enteredTitle, 
      content: this.enteredContent 
    };

    this.postCreated.emit(post);
  }
}
