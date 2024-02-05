import { Injectable } from '@angular/core';
import { Post } from './models/post';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }
  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            content: post.content,
            date: post.date,
            id: post._id,
            imageUrls: post.imageUrls,
            like: post.like,
            comment: post.comment,
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      // console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;

      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  // likePost(postId: string) {
  //   this.http.put<{ message: string, likes: number }>('http://localhost:3000/api/posts/like/' + postId, {})
  //     .subscribe((responseData) => {
  //       const updatedPosts = [...this.posts];
  //       const oldPostIndex = updatedPosts.findIndex(p => p.id === postId);
  //       updatedPosts[oldPostIndex].like = responseData.likes;
  //       this.posts = updatedPosts;
  //       this.postsUpdated.next([...this.posts]);

  //     });
  // }
}
