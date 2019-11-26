import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';

import { ListService } from '../../services/list-service/list.service';
import { AuthProtectService } from 'src/app/services/auth-protect/auth-protect.service';

import { List } from '../../shared/List';
import { Product } from '../../shared/Product';

import { firestore } from 'firebase';

interface ListViewModel {
	id: string
	name: string
	deferredProducts: Promise<any[]>
}

@Component({
	selector: 'home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePage implements OnInit, OnDestroy {

	public documents: Observable<ListViewModel[]>
	
	private documentsSubscription: Subscription

	constructor(
		private service: ListService,
		private authProtect: AuthProtectService) { }
		
		ngOnInit() {
			this.initDocuments()
			this.documentsSubscription = this.documents.subscribe()
			this.authProtect.watch(this.documentsSubscription)
		}
		
		// TODO: Use TitleCase format for product names when inserting 
		getProductName(val: DocumentSnapshot<Product>): string {
			const data = val.data()
			return data.name[0].toUpperCase() + data.name.substring(1, data.name.length)
		}
		
		/* private fetchListViewModel(docs: DocumentChangeAction<List>[]) {
			return of(docs.map<ListViewModel>(i => {
				const data = i.payload.doc.data()
				const products = data.products as any[]
				const promises: Promise<firestore.DocumentSnapshot>[] = products.map(p => p.get())
				return {
					id: i.payload.doc.id,
					name: data.name,
					deferredProducts: Promise.all(promises)
				}
			}))
		} */
		
		private initDocuments() {
			/* this.documents = this.service.collection()
				.snapshotChanges()
				.pipe(switchMap(docs => this.fetchListViewModel(docs))) */
		}

		ngOnDestroy() {
			this.authProtect.unsubscribe()
		}
}
