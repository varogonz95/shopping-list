import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { PagesModule } from './pages/pages.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
// import { ProgressBarComponent } from './commons/progress-bar/progress-bar.component';

@NgModule({
	declarations: [
		/* App Cmponent */
		AppComponent,
		NavbarComponent,
		// ProgressBarComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AppRoutingModule,
		FormsModule,
		SidebarModule,
		PagesModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
