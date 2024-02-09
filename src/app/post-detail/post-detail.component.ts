// import { PostsService } from './../posts.service';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Post } from '../models/post';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-post-detail',
//   templateUrl: './post-detail.component.html',
//   styleUrl: './post-detail.component.css'
// })

// export class PostDetailComponent implements OnInit, OnDestroy{

//   posts: Post | undefined;
//   private postsSub: Subscription = new Subscription; //สร้าง Subscription เพื่อเก็บ subscription ที่ได้จากการ subscribe
//   constructor(public postsService: PostsService) {}


//   //ทำการเริ่มต้นการโหลดข้อมูลหรือการทำงานอื่น ๆ
//   ngOnInit(): void{

//     this.postsService.getPosts();
//     this.postsService.getPostUpdateListener()
//       .subscribe((posts: Post[]) => {
//         // หาโพสต์ที่ต้องการและเก็บไว้ในตัวแปร posts
//         this.posts = posts.find(post => post.id === 'your_post_id');
//       });
//   }

//   onLikeClicked(posts: Post){
//     if(posts.likechack){
//       // ถ้า likechack เป็น true ให้ลบ like ออกจาก posts.like
//       posts.like = posts.like > 0 ? posts.like - 1 : 0;
//       posts.likechack = false;

//     }else{
//       // ถ้า likechack เป็น false ให้เพิ่ม like ใน posts.like
//       posts.like = (posts.like || 0) + 1;
//       posts.likechack = true;
//       // เรียกใช้งาน likePost จาก PostsService
//       this.postsService.likePost(posts.id ?? '').subscribe((res) => {
//         console.log(res);
//       });
//     }

//   }
// // ใช้ตรวจสอบเพื่อเปิดปิดคอมเม้น
//   onCommented(posts: Post){
//     if(posts.commentchack){
//       posts.commentchack = false;
//     }else{
//       posts.commentchack = true;
//     }
//   }
//   // newComment = '';
//   postComment(posts: Post){
//     if(posts.newComment){
//       posts.comment.push(posts.newComment); // เพิ่มความคิดเห็นใหม่ลงใน posts.comment

//       // เรียกใช้งาน commentPost จาก PostsService
//       this.postsService.commentPost(posts.id ?? '', posts.newComment).subscribe((res) => {
//         console.log(res);
//       });
//       posts.commentchack = false; // กำหนด commentchack เป็น false เพื่อยกเลิกการแสดงช่องกรอกความคิดเห็น
//     }
//     posts.newComment = ''; // ล้างค่า newComment ให้เป็นค่าว่าง
//   }

//   ondelete(postId: string){
//     this.postsService.deletePost(postId); // เรียกใช้ deletePost จาก PostsService เพื่อลบโพสต์
//   }

//   ngOnDestroy(): void {
//     this.postsSub.unsubscribe(); // Unsubscribe จาก Subscription เมื่อ component ถูกทำลาย
//   }

//   // Add these variables at the top of the component class
// editMode = false;
// editPostContent = '';
// editPostphoto:string[] = [];

// // Add these methods in the component class
// editPost(post: Post) {
//   this.editMode = true;
//   this.editPostContent = post.content;
//   this.editPostphoto = post.imageUrls;
// }


// // Update the post method in feeds.component.ts
// saveEdit(post: Post) {
//   // You may need to update this logic based on your actual API and service
//   post.content = this.editPostContent;
//   post.imageUrls = this.editPostphoto;
//   this.postsService.updatePost(post);
//   this.editMode = false;
//   this.editPostContent = '';
//   this.editPostphoto = [];

// }



// }
