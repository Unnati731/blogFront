import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  postId!: number;
  postData: any;
  comments: any;

  commentForm!: FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    // Assign postId from route params
    this.postId = +this.activatedRoute.snapshot.params['id'];
    console.log(this.postId);

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required]
    });

    // Fetch post details and comments
    this.getPostById();
  }

  publishComment() {
    if (this.commentForm.invalid) {
      return;
    }

    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe(
      res => {
        this.matSnackBar.open("Comment published successfully", "Ok");
        this.getCommentsByPost();
      },
      error => {
        console.error("Error publishing comment:", error);
        this.matSnackBar.open("Something went wrong", "Ok");
      }
    );
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      res => {
        this.postData = res;
        console.log(res);
        this.getCommentsByPost();
      },
      error => {
        console.error("Error fetching post:", error);
        this.matSnackBar.open("Something went wrong !!", "Ok");
      }
    );
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe(
      response => {
        this.matSnackBar.open("Post liked successfully", "Ok");
        this.getPostById();
      },
      error => {
        console.error("Error liking post:", error);
        this.matSnackBar.open("Something went wrong!!", "Ok");
      }
    );
  }

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      res => {
        this.comments = res;
      },
      error => {
        console.error("Error fetching comments:", error);
        this.matSnackBar.open("Something went wrong!!", "Ok");
      }
    );
  }
}
