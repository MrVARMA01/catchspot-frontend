import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'chat/:chatId/:id',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'collection/:id',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'prev-file/:id',
    loadChildren: () => import('./prev-file/prev-file.module').then( m => m.PrevFilePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
