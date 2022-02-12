import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule), 
    canLoad: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard] // Check if we should show the introduction or forward to inside
  },
  {
    path: 'abonnement/:id',
    loadChildren: () => import('./pages/sub-details/sub-details.module').then( m => m.SubDetailsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'konto',
    loadChildren: () => import('./pages/konto/konto.module').then( m => m.KontoPageModule)
  },
  {
    path: 'historik',
    loadChildren: () => import('./pages/historik/historik.module').then( m => m.HistorikPageModule)
  },
  {
    path: 'historik/:id',
    loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
