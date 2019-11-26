import { ListProduct } from './ListProduct';

export interface List {
	name: string
	isMain: boolean
	creationTimestamp: number
	listProducts: ListProduct[]
}