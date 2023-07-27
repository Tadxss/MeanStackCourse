import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    // When getting something from API Calls or Arrays its
    // a best practice to just return it like this so that the
    // main array object is not being edited etc since we just
    // return a copy

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`; 
    this.http.get<{ message: string, posts: any, maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(map((postData) => {
        return { posts: postData.posts.map(post => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              imagePath: post.imagePath,
              // creator: post.creator
            }
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({ 
          posts: [...this.posts], 
          postCount: transformedPostData.maxPosts
        });
      });
  }

  // This serves as a listener where an component can subscribe
  // get the value that this one returns
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get
      <{
        message: string, 
        post: { 
          _id: string, 
          title: string, 
          content: string,
          imagePath: string 
        }
      }>
      ('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http
      .post<{ message: string, post: Post }>(
        'http://localhost:3000/api/posts', 
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;

    if (typeof(image) === 'object') {
      postData = new FormData();

      postData.append("id", id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image as string
      }
    }

    this.http.put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete('http://localhost:3000/api/posts/' + postId);
  }
}
