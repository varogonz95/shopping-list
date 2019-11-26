import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { HomePage } from './home-page/home-page.component';
import { AddShoppingListBoxComponent } from '../commons/add-shopping-list-box/add-shopping-list-box.component';
import { ListFormPage } from './list-form-page/list-form-page.component';
import { CreditsPage } from './credits-page/credits-page.component';
import { NotFoundPage } from './not-found-page/not-found-page.component';

import { SwitchToggleComponent } from '../commons/switch-toggle/switch-toggle.component';
import { DumpComponent } from '../commons/dump/dump.component';
import { ListResolverService } from '../services/list-resolver/list-resolver.service';
import { NotFoundShoppingListPage } from './not-found-shopping-list/not-found-shopping-list.component';
// import { MapPipe } from '../commons/pipes/map/map.pipe';
// import { JoinStringPipe } from '../commons/pipes/join-string/join-string.pipe';
import { MaxPipe } from '../commons/pipes/max/max.pipe';
import { ShoppingListBoxComponent } from '../commons/shopping-list-box/shopping-list-box/shopping-list-box.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TypeaheadComponent } from '../commons/typeahead/typeahead.component';
import { FilterPipe } from '../commons/pipes/filter/filter.pipe';

const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['signIn'])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])

const routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home',
	},
	{
		path: 'home',
		component: HomePage,
		resolve: { mainlist: ListResolverService },
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToSignIn }
	},
	{
		path: 'signIn',
		component: LoginPageComponent,
		canActivate: [AngularFireAuthGuard],
		data: {authGuardPipe: redirectLoggedInToHome}
	},
	{
		path: 'shopping-lists/new',
		component: ListFormPage,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToSignIn }
	},
	{
		path: 'shopping-lists/:id',
		component: ListFormPage,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToSignIn },
		resolve: { payload: ListResolverService },
	},
	/* {
		path: 'shopping-lists/not-found',
		component: NotFoundShoppingListPage	// <-- Change to 404ShoppingList
	},
	{
		path: 'shopping-lists/**',
		redirectTo: 'shopping-lists/not-found'
	}, */
	{
		path: 'credits',
		component: CreditsPage
	},
	{
		path: 'page-not-found',
		component: NotFoundPage
	},
	{
		path: '**',
		redirectTo: 'page-not-found'
	},
]

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularFireAuthGuardModule,
		RouterModule.forRoot(routes, /* {enableTracing: !environment.production} */)
	],
	declarations: [
		HomePage, 
		ListFormPage, 
		ListFormPage, 
		CreditsPage,
		NotFoundPage,
		NotFoundShoppingListPage,
		
		ShoppingListBoxComponent, 
		AddShoppingListBoxComponent, 
		SwitchToggleComponent,
		DumpComponent,
		TypeaheadComponent,

		/* Directives */
		// MapPipe,
		// JoinStringPipe,
		MaxPipe,
		FilterPipe,

		LoginPageComponent,

		// ProgressBarComponent,
	],
	providers: [
		ListResolverService,
	]
})
export class PagesModule { }
