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
  styleUrls: ['./jobs.component.scss'],
})
@Injectable()
export class JobsComponent implements OnInit {

  public jobs;
  public filteredData;
  public options: string[] = [];
  public idArray: string[] = [];
  public myControl = new FormControl();
  public filterOptions: Observable<string[]>;
  public chosenJob = "";

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
    this.saveJobTitles(this.jobs);

  };
  saveJobTitles(x) {
    x.map(name => this.options.push(name.data.title))
  };


  // Fills form out with a string instead of object
  displayFunc(subj) {
    return subj ? subj : undefined;
  };

  openBottomSheet(): void {
    this._bottomSheet.open(SinglejobpageComponent, {
      data: { 
        searchTitle: this.filteredData[0].data.title,
        searchDescription: this.filteredData[0].data.description,
        searchCompany: this.filteredData[0].data.hiring_organization,
        searchStreet: this.filteredData[0].data.street_address,
        searchCity: this.filteredData[0].data.city,
        searchState: this.filteredData[0].data.state,
        searchSummary: this.filteredData[0].data.meta_data.googlejobs.jobSummary,
        // searchTitle: this.filteredData[0].data.title,
        // searchTitle: this.filteredData[0].data.title,
       },
    });
  }

  filterForone(y) {
    this.filteredData = this.jobs.filter(x => x.data.title === y)
    this.openBottomSheet();
  }

  onclick(value) {
    this.chosenJob = value;
    let filterArg = { title: this.chosenJob };
    this.filterForone(filterArg.title);
  }
};
