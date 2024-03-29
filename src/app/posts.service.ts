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

  // private baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อขอข้อมูลโพสต์ 
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
      // ติดตามการเปลี่ยนแปลงของโพสต์ และส่งข้อมูลไปยังคอมโพเนนต์ที่ต้องการ
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // ส่งข้อมูลโพสต์ที่มี id ที่ระบุไปยังคอมโพเนนต์ที่ต้องการ
  getPost(id: string) {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`);
  }

  // ส่งข้อมูลไปยังคอมโพเนนต์ต่างๆที่ต้องการ โดยจะส่งข้อมูลทุกครั้งที่มีการเปลี่ยนแปลงของโพสต์
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // ส่งข้อมูลโพสต์ไปยังเซิร์ฟเวอร์ โพสต์ที่ถูกสร้างจะถูกส่งกลับมาเป็นข้อมูล JSON และจะถูกเก็บไว้ในตัวแปร posts และจะถูกส่งไปยังคอมโพเนนต์ที่ต้องการ
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

  // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อลบโพสต์ โพสต์ที่ต้องการลบจะถูกส่งไปเป็นพารามิเตอร์ postId และจะถูกลบออกจาก posts และจะถูกส่งไปยังคอมโพเนนต์ที่ต้องการ
  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe((response) => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log(response);
      });
  }

  // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่ออัพเดทโพสต์ โพสต์ที่ต้องการอัพเดทจะถูกส่งไปเป็นพารามิเตอร์ post และจะถูกส่งไปเป็นข้อมูล JSON ไปยังเซิร์ฟเวอร์ โพสต์ที่ถูกอัพเดทจะถูกส่งกลับมาเป็นข้อมูล JSON และจะถูกเก็บไว้ในตัวแปร posts และจะถูกส่งไปยังคอมโพเนนต์ที่ต้องการ
  updatePost(post: Post) {
    this.http.put('http://localhost:3000/api/posts/' + post.id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log(response);
      });
  }
  // likePost(postId: string) {
  //   return this.http.patch(`$(baseUrl)/${postId}/like`,{});
  // }

  // ส่งคำขอ PATCH ไปยัง API เพื่อทำการ like โพสต์ที่มี postId ที่ระบุ
  likePost(postId: string) {
    return this.http.patch(`http://localhost:3000/api/posts/${postId}/like`, {});
  }

  // ส่งคำขอ PATCH ไปยัง API เพื่อทำการ comment โพสต์ที่มี postId ที่ระบุ
  commentPost(postId: string, comment: string) {
    return this.http.patch(`http://localhost:3000/api/posts/${postId}/comment`, {comment});
  }

}
