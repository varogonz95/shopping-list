import { Observable, of } from 'rxjs';
import { Component, OnInit, ElementRef } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

import { List } from '../shared/List';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	public listNameModel = ''
	public isExpanded = true
	public isAddingList = false
	public lists = new Observable<any[]>()

	private nativeElement: HTMLElement
	private shoppingListCollection: AngularFirestoreCollection<List>

	constructor(
		private element: ElementRef,
		private router: Router,
		private store: AngularFirestore,
		private authService: AngularFireAuth) {
		this.nativeElement = this.element.nativeElement
		/* Firebase */
		this.shoppingListCollection = this.store.collection('shopping-lists')
	}
	
	ngOnInit() {
		if (this.authService.auth.currentUser) {
			this.lists = this.shoppingListCollection.snapshotChanges()
							.pipe(switchMap(docs => 
								of(docs.map(doc => {
									const data = doc.payload.doc.data()
									return { id: doc.payload.doc.id, name: data.name }
								}))
							))
		}

		this.nativeElement.style.transition = 'width .3s'
		this.nativeElement.classList.add('column', 'is-one-fifth')
	}
	
	/* public async addList(name: string) {
		if (name.length) {
			try {
				await this.shoppingListCollection.add({name, isMain: false, creationTimestamp: Date.now()})
			} 
			catch (error) {
				console.error(error)	
			}
		}
		this.isAddingList = false
	} */

	public signOut() {
		this.authService.auth.signOut()
			.then(() => this.router.navigate(['signIn']))
	}

	public toggleExpand() {
		if (this.isExpanded) {
			this.nativeElement.style.width = '0px'
			this.nativeElement.style.overflowX = 'hidden'
			this.nativeElement.classList.remove()
			this.nativeElement.classList.add('condensed')
			this.isExpanded = false
		}
		else {
			this.nativeElement.style.width = null
			this.nativeElement.classList.add('column', 'is-one-fifth')
			this.isExpanded = true
		}
	}
}
