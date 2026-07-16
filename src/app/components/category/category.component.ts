import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormsModule, NgForm } from '@angular/forms'
import { CategoryModel } from '../../model/categoryModel.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-category',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  catecories: CategoryModel[] = []
  isAdd:boolean=true
  updateData:CategoryModel = {
      id: '',
      name: '',
      color:'',
      countTodo:0,

    }
 
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.featchCategory()
    this.categoryService.allCategory.subscribe((response) => {
      this.catecories = response
    })


  }
  onSubmit(form: NgForm) {
    const catData: CategoryModel = form.value
    if (catData.id === ''||catData.id===null) {
      const categoryName = form.value.name
      this.categoryService.createCategory(categoryName)
    } else {
      this.categoryService.updateCategory(catData)
    }
    form.reset()
  
    
     this.updateData = {
      id: '',
      name: '',
      color:'',
      countTodo:0,

    }
      this.isAdd=true

  
  }
  updateCategory(category: CategoryModel,event:Event) {
    event.stopPropagation()
    this.updateData=category
    this.isAdd=false

  }
  deleteCategory(event:Event,categoryId:string){
    event.stopPropagation()
    this.categoryService.deleteCategory(categoryId)
  }




}
