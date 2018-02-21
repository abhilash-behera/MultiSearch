import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults:any;
  query:string='';
  resultsFound:boolean=true;
  constructor(private activatedRoute:ActivatedRoute,private searchService:SearchService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = params['q'];
      console.log('showing search results for: '+this.query);
    });

    this.searchService.getExactMatches(this.query).subscribe(
      data=>{
        console.log('Search response: ',data);
        this.searchResults=data.hits.hits;
        if(this.searchResults.length>0){
          this.resultsFound=true;
        }else{
          this.resultsFound=false;
        }
      },
      err=>{
        console.log('Error in searching: '+err);
        this.resultsFound=false;
      }
    );

  }

}
