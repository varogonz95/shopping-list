import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'max' })
export class MaxPipe implements PipeTransform {

	transform(value: any[], max: number): any[] {
		return value? value.slice(0, max) : []
	}

}
