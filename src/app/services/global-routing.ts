import { HttpClient } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { environment } from "../env/env-dev";

@Component({
    selector: 'app-global-router',
    imports: [],
    template: ``,
    styles: ``
})

@Injectable({
    providedIn: 'root'
})

export class globalRouting {

    constructor(public http: HttpClient) { }

    api(Controller: string, Method: string, Data: any) {
        return this.http.post(`${environment.server_url}${Controller}/${Method}`, Data);
    }


    alertBox: boolean = false;
    alertContent: any;
    alertType: any = '';
    private toastTimeout: any;

    toast($msg: any, $type = 'success') {
        if ($msg != '') {
            // Clear any existing timeout
            if (this.toastTimeout) {
                clearTimeout(this.toastTimeout);
            }
            this.alertBox = true;
            this.alertContent = $msg;
            this.alertType = $type;
            // Auto hide after 3 seconds
            this.toastTimeout = setTimeout(() => {
                this.alertBox = false;
                this.alertContent = '';
                this.alertType = '';
            }, 2000);
        } else {
            this.alertBox = false;
            this.alertContent = '';
            this.alertType = '';
        }
    }

}