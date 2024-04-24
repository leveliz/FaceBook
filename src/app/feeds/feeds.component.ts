import { PostsService } from '../posts.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare const bootstrap: any; // เพิ่มบรรทัดนี้เพื่อประกาศ bootstrap ให้กับ TypeScript

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css'
})
export class FeedsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  onPostSet: boolean;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('userInput') userInput!: ElementRef;
  userName: string = ''; // ตัวแปรสำหรับเก็บชื่อผู้ใช้

  private postsSub: Subscription = new Subscription; //สร้าง Subscription เพื่อเก็บ subscription ที่ได้จากการ subscribe
  constructor(public postsService: PostsService, private router: Router ) {
    this.onPostSet = true;
  }


  @Output() postClicked = new EventEmitter<string>();


  //ทำการเริ่มต้นการโหลดข้อมูลหรือการทำงานอื่น ๆ
  ngOnInit(): void {
    // เรียก getPosts() เพื่อดึงข้อมูล posts จาก API
    this.postsService.getPosts();
    // ติดตามอัพเดตจาก getPostUpdateListener()
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        // อัพเดตค่าของ this.posts เมื่อมีการเปลี่ยนแปลง
        this.posts = posts;
      });
  }

  onLikeClicked(posts: Post) {
    if (posts.likechack) {
      // ถ้า likechack เป็น true ให้ลบ like ออกจาก posts.like
      posts.like = posts.like > 0 ? posts.like - 1 : 0;
      posts.likechack = false;

    } else {
      // ถ้า likechack เป็น false ให้เพิ่ม like ใน posts.like
      posts.like = (posts.like || 0) + 1;
      posts.likechack = true;
      // เรียกใช้งาน likePost จาก PostsService
      this.postsService.likePost(posts.id ?? '').subscribe((res) => {
        console.log(res);
      });
    }

  }
  // ใช้ตรวจสอบเพื่อเปิดปิดคอมเม้น
  onCommented(posts: Post) {
    if (posts.commentchack) {
      posts.commentchack = false;
    } else {
      posts.commentchack = true;
    }
  }
  // newComment = '';
  postComment(posts: Post) {
    if (posts.newComment) {
      posts.comment.push(posts.newComment); // เพิ่มความคิดเห็นใหม่ลงใน posts.comment

      // เรียกใช้งาน commentPost จาก PostsService
      this.postsService.commentPost(posts.id ?? '', posts.newComment).subscribe((res) => {
        console.log(res);
      });
      posts.commentchack = false; // กำหนด commentchack เป็น false เพื่อยกเลิกการแสดงช่องกรอกความคิดเห็น
    }
    posts.newComment = ''; // ล้างค่า newComment ให้เป็นค่าว่าง
  }

  closeToast() {
    const toastElement = document.getElementById('toast');
    const bootstrapToast = new bootstrap.Toast(toastElement);
    bootstrapToast.hide();
  }

  updateUserName() {
    this.userName = this.userInput.nativeElement.value; // อัพเดตชื่อผู้ใช้เมื่อมีการเลือก option
  }

  showToast() {
    const toastUserName = document.querySelector('.toast-header strong');
    if (toastUserName) {
      toastUserName.innerHTML = this.userName; // แสดงชื่อผู้ใช้ใน Toast
    }
    const message = this.messageInput.nativeElement.value;
    // ตรวจสอบว่ามีข้อความที่พิมพ์เข้ามาหรือไม่
    if (message.trim() !== '') {
      // แสดง Toast
      // ตรวจสอบเงื่อนไขและทำตามที่ต้องการ
      // ในที่นี้ให้ใส่ข้อความที่พิมพ์เข้ามาลงใน Toast
      const toastBody = document.querySelector('.toast-body');
      if (toastBody) {
        toastBody.innerHTML = message;
      }
      const toastElement = document.getElementById('toast');
      const bootstrapToast = new bootstrap.Toast(toastElement);
      bootstrapToast.show();
    }
  }

  ondelete(postId: string) {
    const confirmation: boolean = confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      this.onPostSet = false;
      this.postsService.deletePost(postId); // เรียกใช้ deletePost จาก PostsService เพื่อลบโพสต์
    }

  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe(); // Unsubscribe จาก Subscription เมื่อ component ถูกทำลาย
  }

  // Add these variables at the top of the component class
  editMode = false;
  editPostContent = '';
  editPostphoto: string[] = [];

  // Add these methods in the component class
  editPost(post: Post) {
    this.onPostSet = false;
    this.editMode = true;
    this.editPostContent = post.content;
    this.editPostphoto = post.imageUrls;
  }


  // Update the post method in feeds.component.ts
  saveEdit(post: Post) {
    // You may need to update this logic based on your actual API and service
    post.content = this.editPostContent;
    post.imageUrls = this.editPostphoto;
    this.postsService.updatePost(post);
    this.editMode = false;
    this.editPostContent = '';
    this.editPostphoto = [];

  }

  onPostClicked(postId: string) {
    if (this.onPostSet && postId) {
      this.postClicked.emit(postId);
      this.router.navigate(['/posts', postId]);

    } else {
      console.error('postId is not available');
    }
  }


}
