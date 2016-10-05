import {Routes, RouterModule} from '@angular/router';
import {helpers} from 'utils';
import * as routes from './pages/routes';

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(<Routes>helpers.parseList(routes));
