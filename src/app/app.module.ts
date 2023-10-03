import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavVisitorComponent } from './nav-visitor/nav-visitor.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LandingComponent } from './landing/landing.component';
import { HeroSectionComponent } from './landing/hero-section/hero-section.component';
import { WhyMassarComponent } from './landing/why-massar/why-massar.component';
import { BuildingCareersComponent } from './landing/building-careers/building-careers.component';
import { TeamComponent } from './landing/team/team.component';
import { FooterComponent } from './footer/footer.component';
import { NavLandingComponent } from './nav-landing/nav-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavVisitorComponent,
    UserInfoComponent,
    LandingComponent,
    HeroSectionComponent,
    WhyMassarComponent,
    BuildingCareersComponent,
    TeamComponent,
    FooterComponent,
    NavLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
