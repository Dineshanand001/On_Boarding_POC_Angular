import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'welcome', component: WelcomePageComponent},
    { path: 'login', component: LoginPageComponent}
    // { path: '', redirectTo: 'welcome', pathMatch: 'full' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
