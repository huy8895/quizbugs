import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {ICategory} from "../ICategory";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  updateCategoryForm: FormGroup;


  constructor(private router: ActivatedRoute, private categoryService: CategoryService, private formBuilder: FormBuilder, private route: Router) {
  }

  currentCategory: ICategory;
  ngOnInit(): void {
    // tslint:disable-next-line:radix
    const id = Number.parseInt(this.router.snapshot.paramMap.get('id'));
    this.categoryService.findById(id).subscribe(data => {
      this.currentCategory = data;
    });
    this.updateCategoryForm = this.formBuilder.group({
      category: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // @ts-ignore
    console.log(this.currentBook);
    this.categoryService.update( this.currentCategory.id, this.currentCategory).subscribe(e => {
      console.log(e);
    });
    this.route.navigate(['']);
  }

}
