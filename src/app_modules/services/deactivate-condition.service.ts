import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class DeactivateConditionService implements CanDeactivate<any> {
    canDeactivate(data: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(resolve => {
            if (data.onDeactivate) {
                data.onDeactivate(resolve, {data, route, state});
            } else {
                resolve(true);
            }
        });
    }
}
