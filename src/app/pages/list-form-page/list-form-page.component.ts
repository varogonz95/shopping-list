import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreCollection, DocumentReference, AngularFirestore } from '@angular/fire/firestore';

import { Product } from '../../shared/Product';
import { List } from '../../shared/List';

import { Observable, of, Subscription } from 'rxjs';
import { firestore } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { ListProduct } from 'src/app/shared/ListProduct';
import { AuthProtectService } from 'src/app/services/auth-protect/auth-protect.service';
import { ListService } from 'src/app/services/list-service/list.service';

interface ListViewModel extends List {
	editable?: boolean
}

interface ListReference {
	name: string
	isMain: boolean
	creationTimestamp: number
	listProducts: ListProduct[]
}

@Component({
	selector: 'list-form-page',
	templateUrl: './list-form-page.component.html',
	styleUrls: ['./list-form-page.component.css']
})
export class ListFormPage implements OnInit, OnDestroy {
	
	@ViewChild('listNgForm', { static: true })
	public listNgForm: NgForm
	
	public list: ListViewModel
	public listProducts: ListProduct[] = []
	public products = new Observable<Product[]>()

	private currentDocId: string
	private listCollection: AngularFirestoreCollection<List>
	private productCollection: AngularFirestoreCollection<Product>
	private payloadSubscription: Subscription

	constructor(
		private router: Router,
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private store: AngularFirestore,
		private authProtect: AuthProtectService,
		private listService: ListService) {
		this.listCollection = this.store.collection<List>('shopping-lists')
		this.productCollection = this.store.collection<Product>('products')
		this.list = this.createEmptyList()
	}

	ngOnInit() {
		this.initList()
		this.fetchProducts()
		this.authProtect.watch(this.payloadSubscription)
	}

	/**
	 * @deprecated
	 */
	public back() {
		this.location.back()
	}

	public onEscKey(kbEvent: KeyboardEvent) {
		if (kbEvent.code === 'Escape') {
			this.toggleEditable()
		}
	}

	public async onSubmit() {
		try {
			//* Form is invalid, show a message
			if (this.listNgForm.invalid) {
				/* this.messages.requiredListName.valid = this.listForm.controls['listNameModel'].valid
				this.messages.requiredProductName.valid = this.listForm.controls['productName'].valid
				this.listName.nativeElement.focus() */
			}
			//* Form valid but not persisted yet
			else if (this.list.creationTimestamp === 0) {
				//* Create new List --------------------------
				//* ------------------------------------------
				//* Set creation timestamp
				this.list.creationTimestamp = Date.now()
				//* Add List to collection
				const listRef = await this.listService.setList(this.list)
				console.log(listRef);

				//* Create Product if:
				//* 	a.  An existing product was selected from the Typeahead component
				//* 	b.  productName input has a non-existing product value
				const lastIndex = this.list.listProducts.length - 1
				const productName = this.list.listProducts[lastIndex].product.name
				if (productName.trim()) {
				}
	
				/* if (!this.router.isActive(`/shopping-lists/${this.currentDocId}`, false)) {
					const newUrl = this.router.createUrlTree(['/shopping-lists', listRef.id])
					this.location.replaceState(newUrl.toString())
				} */
			}
		}
		catch (error) {
			//* Show a better alert
			alert('An error ocurred')
			console.error(error)	
		}
		//* Reset list to non-editable state
		// this.list.editable = false
	}

	public onProductItemOver(element: HTMLElement) {
		if (!element.classList.contains('ion-ios-checkmark-circle')) {
			element.classList.remove('ion-ios-radio-button-off')
			element.classList.add('ion-ios-checkmark-circle-outline')
		}
	}

	public onProductItemOut(element: HTMLElement) {
		if (!element.classList.contains('ion-ios-checkmark-circle')) {
			element.classList.remove('ion-ios-checkmark-circle-outline')
			element.classList.add('ion-ios-radio-button-off')
		}
	}

	public onProductItemClick(element: HTMLElement) {
		if (!element.classList.contains('ion-ios-checkmark-circle')) {
			element.classList.remove('ion-ios-radio-button-off', 'ion-ios-checkmark-circle-outline')
			element.classList.add('ion-ios-checkmark-circle')
		}
		else {
			element.classList.add('ion-ios-radio-button-off')
			element.classList.remove('ion-ios-checkmark-circle')
		}
	}

	public onFavOver(element: HTMLElement) {
		if (element.classList.contains('ion-md-heart-empty')) {
			element.classList.remove('ion-md-heart-empty')
			element.classList.add('ion-md-heart')
		}
	}

	public onFavOut(element: HTMLElement) {
		if (element.classList.contains('ion-md-heart') && !element.classList.contains('has-text-danger')) {
			element.classList.remove('ion-md-heart')
			element.classList.add('ion-md-heart-empty')
		}
	}

	public onTypeaheadItemSelected(data: Product) {
		this.list.listProducts[this.list.listProducts.length - 1].product = data
	}
	
	public toggleEditable() {
		this.list.editable = !this.list.editable
	}

	public async toggleIsMain(element: HTMLElement) {
		try {
			this.list.isMain = !this.list.isMain

			//TODO: Improve mass update...
			//* Get all documents
			console.log('Get all documents')
			const query = await this.listCollection.get().toPromise()
			//* Update all documents one by one, and wait for it...
			console.log('Update all documents one by one, and wait for it...')
			await Promise.all(query.docs.map(q => q.ref.update({isMain: false})))
			//* Finally, update the current document
			console.log('Finally, update the current document')
			await this.listCollection.doc<List>(this.currentDocId).update({isMain: this.list.isMain})

			if (this.list.isMain) {
				element.classList.remove('has-text-grey-lighter')
				element.classList.add('has-text-danger')
			}
			else {
				element.classList.add('has-text-grey-lighter', 'ion-md-heart-empty')
				element.classList.remove('ion-md-heart', 'has-text-danger')
			}
		}
		catch (error) {
			this.list.isMain = !this.list.isMain
			console.log(error)
			alert('Something went wrong')
		}
	}

	private async addProduct(product: Product): Promise<DocumentReference> {
		product.creationTimestamp = Date.now()

		const productRef = await this.productCollection.add(product)

		this.list.listProducts.push({
			product: this.createEmptyProduct(),
			price: 0,
			quantity: 0,
		})

		return productRef
	}

	private createEmptyList(editable = false): ListViewModel {
		return {
			// name: 'My list',
			name: '',
			isMain: false,
			listProducts: [
				{
					product: this.createEmptyProduct(),
					price: 0,
					quantity: 0,
				}
			],
			creationTimestamp: 0,
			editable
		}
	}

	private createEmptyProduct(): Product {
		return {
			name: '',
			creationTimestamp: 0
		}
	}

	private fetchProducts() {
		this.products = this.productCollection
			.snapshotChanges()
			.pipe(
				switchMap(docs => 
					of(docs.map(d => d.payload.doc.data()))
				)
			)
	}
	
	private initList() {
		const payload = this.activatedRoute.snapshot.data.payload
		this.activatedRoute.paramMap.subscribe((param) => {
			if (payload)
				this.payloadSubscription = payload.subscribe(
					list => {
						this.currentDocId = param.get('id')
						if (list && this.currentDocId) {
							this.setList(list)
						}
						else {
							this.list = this.createEmptyList(true)
						}
					})
			else this.list.editable = true
		})
	}

	private setList(list: ListReference) {
		this.list = {
			name: list.name,
			isMain: list.isMain,
			creationTimestamp: list.creationTimestamp,
			listProducts: []
		}

		/* list.products.then(products => {
			// const emptyProduct = this.list.products.pop()
			this.list.products.push(...products)
			this.list.products.push(this.createEmptyProduct())
		}) */
	}

	private updateList() {}

	ngOnDestroy() {
		console.log('ngOnDestroy');
		this.payloadSubscription.unsubscribe()
		this.authProtect.unsubscribe()
	}
}
