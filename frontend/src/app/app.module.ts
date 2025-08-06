import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    CommonModule,
    RouterModule, 
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddTaskComponent,
    TaskListComponent,
    CalendarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AppModule {}
