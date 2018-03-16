import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map'

import 'rxjs'

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Injectable()
export class UserService {
    private _currentUser: any = null;
    constructor(public http: Http) {
    }
    getCurrentUser() {
        return this.http.get('/api/v1/self/').map(r => r.json());
    }
    setLang(userPk: number, lang: string) {
        return this.http.put('/api/v1/user/' + userPk + '/settings/', {
            'lang': lang,
            'password': '',
        }).map(r=>r.json());
    }
    getListing() {
        return this.http.get("/api/v1/users/").map(r=>r.json());
    }
    addUser(data) {
        return this.http.post("/api/v1/users/", data).map(r=>r.json());
    }
    updateUser(pk: number, data) {
        return this.http.put("/api/v1/user/" + pk, data).map(r => r.json());
    }
    updatePassword(pk: number, data) {
        return this.http.put("/api/v1/user/" + pk + "/password/", data).map(r=>r.json());
    }
    updateUserProfile(pk: number, data) {
        return this.http.put("/api/v1/user/" + pk + "/settings/", data).map(r=>r.json());
    }
    deleteUser(pk: number) {
        return this.http.delete("/api/v1/user/" + pk).map(r => r.json());
    }
}
