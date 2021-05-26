import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post/post-service.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Post } from '../post/post.component';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.css']
})
export class NewestComponent implements OnInit {

  private posts: Post[] = [];

  constructor(private postService:PostServiceService, private userService:UserServiceService){

    this.postService.getNewest().subscribe(data=>{
        this.posts=data;
        this.posts.forEach(post => {
          if(post.user_id)
          this.userService.getMyProfile(post.user_id).subscribe(data=>{
            post.full_name = data.full_name;
            post.image = data.avatar_url;
          })
        });
    })
 
  }

  get getPosts(){
    return this.posts;
  }
  
  ngOnInit(): void {
  }

}
