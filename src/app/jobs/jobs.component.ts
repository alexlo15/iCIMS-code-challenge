import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  public jobs;
  public jobsearch;
  public filterArray
  public filterArg;
  public options: string[] = [];
  public myControl = new FormControl();
  public filterOptions: Observable<string[]>;
  public chosenJob = "";

  constructor(private http: HttpClient) { }
  ngOnInit() {
    const res = this.http.get("https://testapi.io/api/crimsonsunset/code-challenge-jobs");
    res.subscribe(data => {
      this.saveData(data);
    });
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (this._filter(value))
      ))
  };

  private _filter(value: string): string[] {
    const filterVal = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterVal)
    );
  };

  saveData(resp) {
    this.jobs = resp.jobs;
    console.log(this.jobs);
    this.saveJobTitles(this.jobs);
    // this.filterArray = resp.jobs;
  };

  saveJobTitles(x) {
    x.map(name => this.options.push(name.data.title))
    console.log(this.options)
  };

  // saveSearchData(resp) {
  //   this.jobsearch = resp.jobs
  //   console.log(this.jobsearch)
  //   this.jobsearch.filter(this.searchFilter())
  // };

  // searchFilter(x, y){
  //   if (x.data.title = y){
  //     return x;
  //   }
  // }

  // Fills form out with a string instead of object
  displayFunc(subj) {
    return subj ? subj : undefined;
  };


  onclick(value) {
    this.chosenJob = value
    console.log(this.myControl.value)
    console.log(this.chosenJob);
    let filterArg = {title: this.chosenJob};
    let filterArray = this.jobs;

    console.log(filterArg)
    //   let res2 = this.http.get("https://testapi.io/api/crimsonsunset/code-challenge-jobs");
    //   res2.subscribe(data => {
    //     this.saveSearchData(data);
    //   });
    //   this.filterOptions = this.myControl.valueChanges.pipe(
    //     startWith(''),
    //     map(value => (this._filter(value))
    //     ))
  }
};
