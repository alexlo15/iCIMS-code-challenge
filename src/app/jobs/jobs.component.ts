import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let res = this.http.get("https://testapi.io/api/crimsonsunset/code-challenge-jobs");
    res.subscribe(data => {
      this.saveData(data);
    });
  }

  saveData(resp) {
    this.jobs = resp.jobs
    console.log(this.jobs)
  }

  //  doThis = () => {
  //   console.log(this.jobData);
  // }
};
