import { Component, OnInit } from '@angular/core';
import { AngularFireAuth,  } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	public user: Observable<firebase.User>
	public isReady = false
	
	constructor(
		private authService: AngularFireAuth) {
	}
	
	ngOnInit() {
		this.user = this.authService.user
	}
	
	ngOnDestroy() { }
}