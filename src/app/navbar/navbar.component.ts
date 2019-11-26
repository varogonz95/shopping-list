import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from '../services/list-service/list.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

	private mainListName: Promise<string>
	private routerEvents: Subscription

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private shoppingListService: ListService) { }

	ngOnInit() { }
}
