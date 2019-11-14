import { Component, OnInit, Input, Output, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SinglejobpageComponent } from '../singlejobpage/singlejobpage.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
@Injectable()
export class JobsComponent implements OnInit {
  
  public jobs;
  // public jobsearch;
  // public jobFilterList;
  // public filterArg;
  public filteredData;
  public options: string[] = [];
  public idArray: string[] = [];
  public myControl = new FormControl();
  public myControlID = new FormControl();
  public filterOptions: Observable<string[]>;
  public chosenJob = "";
  // @Output () filteredJob = this.filteredData;

  constructor(private http: HttpClient, private _bottomSheet: MatBottomSheet) { }
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
    // catches the slugs(ids) in an array
    this.jobs.map(x => this.idArray.push(x.data.slug))
    console.log(this.idArray)
    this.saveJobTitles(this.jobs);
    // this.filterArray = resp.jobs;
  };
  saveJobTitles(x) {
    x.map(name => this.options.push(name.data.title))
    console.log(this.options)
  };


  // Fills form out with a string instead of object
  displayFunc(subj) {
    return subj ? subj : undefined;
  };

  openBottomSheet(): void {
    this._bottomSheet.open(SinglejobpageComponent, {
      data: { searchResults: ["darn you", "{{filteredData}}" ,"work plz"] },
    });
  }

  filterForone(y) {
    let filteredData = this.jobs.filter(x => x.data.title === y)
    console.log(filteredData)
    console.log(filteredData[0])
    this.openBottomSheet();
  }

  onclick(value) {
    this.chosenJob = value;
    console.log(this.myControl.value);
    console.log(this.chosenJob);
    let filterArg = { title: this.chosenJob };
    this.filterForone(filterArg.title);
    // this.getOnebyTitle(filterArg.title)
  }
};
