import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-intercepter.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books/books.component';
import { NewComponent } from './books/new/new.component';
import { AuthorsComponent } from './authors/authors/authors.component';
import { ShowComponent } from './books/show/show.component';
import { EditComponent } from './books/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { ShowAuthorComponent } from './authors/show-author/show-author.component';
import { NewAuthorComponent } from './authors/new-author/new-author.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    NewComponent,
    AuthorsComponent,
    ShowComponent,
    EditComponent,
    EditAuthorComponent,
    ShowAuthorComponent,
    NewAuthorComponent,
    LoginComponent,
    RegisterComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],

  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
