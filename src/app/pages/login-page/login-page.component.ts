import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from "firebase/app";

@Component({
	selector: 'login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	private authProvider: auth.GoogleAuthProvider

	constructor(private authService: AngularFireAuth) {
		this.authProvider = new auth.GoogleAuthProvider()
	}

	ngOnInit() {
	}

	async loginWithPopup() {
		// await this.authService.auth.setPersistence(auth.Auth.Persistence.LOCAL)
		await this.authService.auth.signInWithRedirect(this.authProvider)
	}

	async logout() {
		await this.authService.auth.signOut()
	}
}
