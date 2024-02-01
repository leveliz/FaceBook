import { PostsService } from './../posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Subscribable, Subscription } from 'rxjs';
import e from 'express';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css'
})
export class FeedsComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit(): void{
    this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onLikeClicked(posts: Post){
    if(posts.likechack){
      posts.like = posts.like > 0 ? posts.like - 1 : 0;
      posts.likechack = false;
    }else{
      posts.like = (posts.like || 0) + 1;
      posts.likechack = true;
    }
  }

  onCommented(posts: Post){
    if(posts.commentchack){
      posts.commentchack = false;
    }else{
      posts.commentchack = true;
    }
  }
  // newComment = '';
  postComment(posts: Post){
    if(posts.newComment){
      posts.comment.push(posts.newComment);
      posts.commentchack = false;
    }
    posts.newComment = '';
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
