import { Injectable } from '@angular/core';
import { Post } from './models/post';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }
  getPosts() {
    return this.posts;
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.posts.push({
      ...post,
      like: 0,
      comment: [],
      date: new Date(),
    });
    this.postsUpdated.next([...this.posts]);
  }

}
