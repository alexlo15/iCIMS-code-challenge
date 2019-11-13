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
  public options: string[] = [];
  public myControl = new FormControl();
  public filterOptions: Observable<string[]>;
  public chosenJob = "";

  constructor(private http: HttpClient) { }
  ngOnInit() {
    let res = this.http.get("https://testapi.io/api/crimsonsunset/code-challenge-jobs");
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
    this.jobs = resp.jobs
    console.log(this.jobs)
    this.saveJobTitles(this.jobs)
  };

  saveJobTitles(x) {
    x.map(name => this.options.push(name.data.title))
    console.log(this.options)
  };

  // Fills form out with a string instead of object
  displayFunc(subj) {
    return subj ? subj : undefined;
  };


  onclick(value) {
    this.chosenJob = value
    console.log(this.chosenJob);
    console.log(value)
  };

};
