import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    // When getting something from API Calls or Arrays its
    // a best practice to just return it like this so that the
    // main array object is not being edited etc since we just
    // return a copy
    return [...this.posts];
  }

  // This serves as a listener where an component can subscribe
  // get the value that this one returns
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post =  { title: title, content: content };
    this.posts.push(post);

    this.postsUpdated.next([...this.posts]);
  }
}
