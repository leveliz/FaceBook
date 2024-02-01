import { Component,ElementRef, ViewChild } from '@angular/core';
import { Post } from '../models/post';
import { NgForm } from '@angular/forms';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @ViewChild('formFileMultiple') formFileMultiple!: ElementRef;
  enterContent = '';
  enterDate = new Date();
  enterImage = '';
  imageUrls: string[] = [];
  enterLike = 0;
  enterComment: string[] = [];

  constructor(public postsService: PostsService) { }

  onAddPost(form: NgForm) {
    if (this.enterContent || this.imageUrls.length > 0) {
      const post: Post = {
        content: form.value.content,
        date: new Date(),
        imageUrls: this.imageUrls,
        like: 0,
        comment: [],
        likechack: false,
        commentchack: false,
        newComment: ''
      };
      this.postsService.addPost(post);
      form.resetForm(); // รีเซ็ตค่าในฟอร์ม
      this.imageUrls = [];
    }

  }

  onClose(form: NgForm): void {
    form.resetForm(); // รีเซ็ตค่าในฟอร์ม
    this.imageUrls = [];
  }


  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      // ตรวจสอบว่าไฟล์ที่เลือกเป็นไฟล์รูปภาพหรือไม่
      const isImage = files[0].type.startsWith('image/');
      if (isImage) {
        this.imageUrls = []; // เคลียร์รายการรูปภาพที่ถูกเลือกเมื่อมีการเลือกไฟล์ใหม่
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      } else {
        // แสดง alert หรือทำการจัดการในกรณีที่ไม่ใช่ไฟล์รูปภาพ
        alert('Please select an image file.');
      }

    }
  }

}
