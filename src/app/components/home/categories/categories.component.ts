import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../shared/communication.service';


@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public dataIsAvailable: boolean = false;
  public categories: Array<any>;
  public colorArray: Array<any> = ["primary", "link", "danger", "success", "warning", "info",  "primary", "link", "danger", "success", "warning", "info"];

  constructor(public categoryService: CategoryService, private router: Router, public comService: CommunicationService) { }

  /**
   * Requests all categories from backend.
   */
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(response =>{    
      if(response.name != "HttpResponseError"){
        this.dataIsAvailable = true;  
        this.categories = response;
      }
    });
  }

  /**
   * 
   * @param categoryId ID of category.
   * @param color Color of category.
   * @param category Category name itself.
   * Routes user to category.
   */
  routeToCourse(categoryId: number, color: string, category: string) {
    this.router.navigate(['/home/kurs-uebersicht/' + categoryId]);
    this.comService.setInfo(color, category);
  }

}
