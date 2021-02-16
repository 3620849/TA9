import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectMaterialModule } from './shared/project-material/project-material.module';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CommunicationService } from './services/communication.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UserPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProjectMaterialModule,
    HttpClientModule
  ],
  providers: [
    CommunicationService, {provide : APP_INITIALIZER, useFactory : initFunction, deps: [CommunicationService] , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initFunction(config : CommunicationService)
{
  return ()=> config.init();
}