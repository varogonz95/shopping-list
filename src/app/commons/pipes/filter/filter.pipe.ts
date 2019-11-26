import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(collection: any, filterBy: string, value: any): any {
		value = value.toLowerCase()

		return collection && value? 
			   collection.filter(val => 
					val[filterBy]
						.toLowerCase()
						.search(value) >= 0) 
				: []
	}

}
