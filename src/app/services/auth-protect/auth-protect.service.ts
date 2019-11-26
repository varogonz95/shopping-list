import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthProtectService {

	private subscriptions: Subscription[] = []
	private thisSubscription: Subscription

	constructor(private authService: AngularFireAuth) {
		this.thisSubscription = this.init()
	}

	public unsubscribe() {
		if (!this.thisSubscription.closed) {
			this.thisSubscription.unsubscribe()
		}
	}

	/**
	 * @description Unsubscribes a resource when user has signed out.
	 * @returns Subscription
	 */
	public watch(subscription: Subscription) {
		this.subscriptions.push(subscription)
		return this.thisSubscription
	}

	private init() {
		return this.authService.authState.subscribe(user => {
			if (!user)
				for (const sub of this.subscriptions) {
					sub.unsubscribe()
				}
		})
	}
}
