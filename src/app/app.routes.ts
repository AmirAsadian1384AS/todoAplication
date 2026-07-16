import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
    {path:'',component:CategoryComponent},
    {path:'todo/:id',component:TodoComponent},
];
