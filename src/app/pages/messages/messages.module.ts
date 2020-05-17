import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';

import { IonicModule } from '@ionic/angular';
import { CountdownModule } from 'ngx-countdown';
import { MessagesPage } from './messages.page';

const agoraConfig: AgoraConfig = { AppID: 'c023596a5f6d4c949d9b207101ee8c74' };

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularAgoraRtcModule.forRoot(agoraConfig),
    CountdownModule
  ],
  declarations: [MessagesPage,]
})
export class MessagesPageModule {}
