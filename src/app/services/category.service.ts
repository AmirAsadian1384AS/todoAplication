import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';
import { CategoryModel } from '../model/categoryModel.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  readonly url: string = 'http://localhost:3000/categories'

  allCategory = new BehaviorSubject<CategoryModel[]>([])

  constructor(private http: HttpClient, private toaster: ToastrService) { }

  featchCategory() {
    this.http.get<CategoryModel[]>(this.url).subscribe({
      next: (response: CategoryModel[]) => {
        this.allCategory.next(response)

      }
    })
  }
  createCategory(name: string) {

    const newCat = {
      name: name,
      color: this.generateColor(),
      countTodo: 0
    }
    this.http.post<CategoryModel>(this.url, newCat).subscribe({
      next: (res) => {
        const currentDataList = this.allCategory.getValue() || []
        this.allCategory.next([...currentDataList, res])
      },
      complete: () => {
        this.toaster.success('دسته بندی مورد نظر اضافه شد')

      }

    })




  }
  updateCategory(data: CategoryModel) {
    const catId = data.id

    this.http.patch(`${this.url}/${catId}`, data).subscribe({
      complete: () => {
        this.featchCategory()
        this.toaster.info('دسته بندی مورد نظر ویرایش شد')

      }
    })

  }
  deleteCategory(categoryId: string) {
    this.http.delete(`${this.url}/${categoryId}`).subscribe({
      complete: () => {
        this.featchCategory()
        this.toaster.error('دسته بندی مورد نظر حذف شد')


      }
    })
  }

  incrementCountTodo(categoryId: string) {

    this.http.get<CategoryModel>(`${this.url}/${categoryId}`).subscribe({
      next: (category) => {
        const newCunt = (category.countTodo || 0) + 1
        this.http.patch(`${this.url}/${categoryId}`, { countTodo: newCunt }).subscribe()

      }
    })
  }
  decrmentCountTodo(categoryId: string) {
    this.http.get<CategoryModel>(`${this.url}/${categoryId}`).subscribe({
      next: (category) => {
        const newCount = (category.countTodo || 0) - 1
        this.http.patch(`${this.url}/${categoryId}`, { countTodo: newCount }).subscribe()

      }
    })
  }
  private generateColor(): string {
    const colorArry = ['#ce9e2e', '#14e930', '#28200c', '#ff9113', '#3f6b4c', '#078d9c', '#951270', '#f50e0e']

    const randomColor = Math.floor(Math.random() * colorArry.length)
    return colorArry[randomColor]
  }
}
