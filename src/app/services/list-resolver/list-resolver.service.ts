import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ListService } from '../list-service/list.service';
import { of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable()
export class ListResolverService implements Resolve<any> {

	constructor(private service: ListService, private router: Router) { }

	async resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
		if (route.paramMap.has('id')) {
			return this.fetchListData(route.paramMap.get('id'))
		}

		/* const query = this.service.query(query => query.where('isMain', '==', true)).snapshotChanges()
		return query.pipe(switchMap(value => {
			if (value.length) {
				return this.router.navigate(['shopping-lists', value[0].payload.doc.id], { state: value[0].payload.doc.data() })
			}
			return of()
		})) */
	}

	private fetchListData(id: string) {
		return this.service.getByPath(id)
			.valueChanges()
			.pipe(switchMap((value: any) => 
				of({
					...value,
					products: /* this.service.fetchProducts(value.products), */Promise.all([])
				})
			))
			.pipe(first())
	}
}
