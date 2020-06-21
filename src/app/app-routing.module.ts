import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/india',
    pathMatch:'full'
  },
  {
      path: 'india',
    loadChildren: () => import('./india/india.module').then(m => m.IndiaModule) 
  },
  {
    path: 'world',
  loadChildren: () => import('./world/world.module').then(m => m.WorldModule) 
  },
  {
    path: 'news',
  loadChildren: () => import('./news/news.module').then(m => m.NewsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
