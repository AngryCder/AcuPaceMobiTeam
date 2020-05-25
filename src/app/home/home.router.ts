import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/user-data.resolver';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/messages/messages.module').then(
                m => m.MessagesPageModule
              )
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/notifications/notifications.module').then(
                m => m.NotificationsPageModule
              )
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(
                m => m.SettingsPageModule
              )
          }
        ]
      },
       {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(
                m => m.ProfilePageModule
              )
          }
        ]
      },
      {
        path: 'contact-us',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/contact-us/contact-us.module').then(
                m => m.ContactUsPageModule
              )
          }
        ]
      },
      {
        path: 'tutorial',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/tutorial/tutorial.module').then(
                m => m.TutorialPageModule
              )
          }
        ]
      },

      
      {
        path: 'about-us',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/about-us/about-us.module').then(
                m => m.AboutUsPageModule
              )
          }
        ]
      },
        
      {
        path: 'faq',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/faq/faq.module').then(
                m => m.FaqPageModule
              )
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/feed',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter {}
