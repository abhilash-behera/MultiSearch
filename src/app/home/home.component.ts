import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SearchService} from '../search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm:NgForm;
  searchResults:any;
  query:string='';
  constructor(private searchService:SearchService,private router:Router) { 
    
  }

  ngOnInit() {
    
  }
  
  getSuggestions(query:string){
    this.query=query;
    console.log('getting suggestions for: '+query);
    if(query!=''){
      this.searchService.getSearchHint(query).subscribe(
        data=>{
          this.searchResults=data.hits.hits;
          console.log('Search response: ',data);
        },
        err=>{
          console.log('Error in searching: '+err);
        }
      );
    }else{
      this.searchResults=null;
    }
    
  }

  search(){
    console.log('Searching for: '+this.query);
    this.searchResults=null;
    this.router.navigate(['/search'], { queryParams:{q:this.query}});
  }
}
