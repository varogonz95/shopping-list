import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'skeleton-item',
	templateUrl: './skeleton-item.component.html',
	styleUrls: ['./skeleton-item.component.css']
})
export class SkeletonItemComponent implements OnInit {

	@Input()
	direction: 'left' | 'right' = 'right'

	constructor() { }

	ngOnInit() { }
}
