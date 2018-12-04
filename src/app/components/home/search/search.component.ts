import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { CoursesService } from '../shared/courses.service';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchElement') searchElement: ElementRef;

  public courses: any;
  public dataIsAvailable: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private comService: CommunicationService,
    private _location: Location,
    private renderer: Renderer2) { }

  /**
   * Enables the search icon.
   */
  ngOnInit(){
    this.comService.searchViewMessage(true);
  }

  /**
   * Submits search requests to backend.
   * Displays found courses - result.
   */
  onSubmit():void {
    this.coursesService.getSearchCourses(this.searchElement.nativeElement.value).subscribe(response => {
      if(response.name != "HttpResponseError"){
        this.courses = response;
        this.dataIsAvailable = true;     
      }  
    });
  } 

}
