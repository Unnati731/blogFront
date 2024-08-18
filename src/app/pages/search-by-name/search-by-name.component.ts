import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.scss'
})
export class SearchByNameComponent {

  result:any =[];
  name:any ="";

  constructor(
    private postService: PostService,
    private snackBar : MatSnackBar
  ){}
  

  searchByName(){
    this.postService.searchByName(this.name).subscribe(res=>{
      this.result=res;
      console.log(this.result);
    }, error=>{
      this.snackBar.open("Something went wrong !!", "Ok")
    })
  }
}
