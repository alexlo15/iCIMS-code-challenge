import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule ,MatDividerModule ,MatIconModule ,MatCardModule, MatInputModule, MatExpansionModule, MatGridListModule, MatToolbarModule, MatAutocompleteModule, MatAutocomplete } from "@angular/material"
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { SinglejobpageComponent } from './singlejobpage/singlejobpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyFilterPipe } from './pipes/jobfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    SinglejobpageComponent,
    NavbarComponent,
    MyFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: JobsComponent },
      { path: 'job/:id', component: SinglejobpageComponent },
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
