import { Product } from './Product';

export interface ShoppingList {
	id?: number
	name: string
	description?: string
	products?: Product[]
	isMain: boolean
}