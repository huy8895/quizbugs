import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListQuestionComponent } from './list-question/list-question.component';
import {MaterialsModule} from '../../materials.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {CategoryModule} from '../category/category.module';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {CategoryAddComponent} from '../category/category-add/category-add.component';
import {CategoryEditComponent} from '../category/category-edit/category-edit.component';
import {CreateQuestionComponent} from './create-question/create-question.component';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import {MessageComponent} from '../message/message.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  {
    path: '', component: ListQuestionComponent
  },
  {
    path: 'add', component: CreateQuestionComponent
  },
  {
    path: ':id/edit', component: EditQuestionComponent
  },
  {
    path: ':id/detail', component: DetailQuestionComponent
  }
];
@NgModule({
  declarations: [ListQuestionComponent, CreateQuestionComponent, EditQuestionComponent, DetailQuestionComponent, MessageComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class QuestionModule { }