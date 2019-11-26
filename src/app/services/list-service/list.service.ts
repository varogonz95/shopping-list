import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';

import { List } from '../../shared/List';
import { Product } from '../../shared/Product';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ListService {

	private readonly path = "shopping-lists"

	constructor(private store: AngularFirestore) { }

	public setList(list: List, id?: string) {
		if (id) {
			return this.collection(id)
				.get()
				.pipe(
					switchMap(
						query => {
							if (query.empty) {
								return this.collection()
										   .add(list)
							}
							else {
								return query.docs[0].ref
											.update(list)
											.then(() => query.docs[0].ref)
							}
						}
					)
				)
				.toPromise()
		}
		return this.collection().add(list)
	}

	public collection(): AngularFirestoreCollection<List>
	public collection(query: QueryFn): AngularFirestoreCollection<List>
	public collection(path: string, query?: QueryFn): AngularFirestoreCollection<List>
	public collection(pathOrQuery?: string | QueryFn, queryOrUndefined?: QueryFn): AngularFirestoreCollection<List> {
		if (typeof pathOrQuery === "string") {
			return this.store.collection(`${this.path}/${pathOrQuery}`, queryOrUndefined)
		}
		return this.store.collection(this.path, pathOrQuery)
	}

	// TODO: Delegate this method to another service -> Respect Single Responsibility principle
	public async fetchProducts(refs: DocumentReference[]) {
		const deferredProducts = await Promise.all(refs.map(ref => ref.get()))
		return deferredProducts.map(product => product.data() as Product)
	}

	public getByPath(path: string): AngularFirestoreDocument<List> {
		return this.collection().doc(path)
	}
	
	public query(query: QueryFn) {
		return this.collection(query)
	}
}
