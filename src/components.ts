import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms'
import {Directive, OnChanges, ElementRef, ViewChild} from '@angular/core'
import {NgForm} from '@angular/forms'

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core'

import 'rxjs/add/operator/debounceTime';


@Component({
    selector: 'date-input',
    template: `
        <div class="row" [formGroup]="form">
            <div class="col-4 col-md-3">
                <select class="form-control" formControlName="day">
                    <option [ngValue]="null">&mdash;</option>
                    <option *ngFor="let d of getDayChoices()" [ngValue]="d">
                        {{ d }}
                    </option>
                </select>
            </div>
            <div class="col-4 col-md-4">
                <select class="form-control" formControlName="month">
                    <option [ngValue]="null">&mdash;</option>
                    <option *ngFor="let o of monthChoices" [ngValue]="o.value" translate>
                        {{ o.key }}
                    </option>
                </select>
            </div>
            <div class="col-4 col-md-3">
                <select class="form-control" formControlName="year">
                    <option [ngValue]="null">&mdash;</option>
                    <option *ngFor="let y of getYearChoices()" [ngValue]="y">
                        {{ y }}
                    </option>
                </select>
            </div>
        </div>
    `,
})
export class DateInputComponent implements OnInit {
    @Input() defaultToday: boolean = false;

    public form;

    private day = null;
    private month = null;
    private year = null;

    public monthChoices: any[] = [
        {value: 1, key: 'January'},
        {value: 2, key: 'Febuary'},
        {value: 3, key: 'March'},
        {value: 4, key: 'April'},
        {value: 5, key: 'May'},
        {value: 6, key: 'June'},
        {value: 7, key: 'July'},
        {value: 8, key: 'August'},
        {value: 9, key: 'September'},
        {value: 10, key: 'October'},
        {value: 11, key: 'November'},
        {value: 12, key: 'December'},
    ];

    @Input()
    set date(str) {
        if (!str) {
            this.day = null;
            this.month = null;
            this.year = null;
            return;
        }
        if (!str || !(str = str.trim())) return;
        let parts = str.split('/').map(p => parseInt(p));
        this.day = parts[0];
        this.month = parts[1];
        this.year = parts[2];
    }
    get date() {
        if (this.day && this.month && this.year) {
            return this.day + '/' + this.month + '/' + this.year;
        }
        return null;
    };

    @Output() onChange = new EventEmitter();

    constructor(
        private fb: FormBuilder,
    ) {}

    getDayChoices() {
        let d: number[] = [];
        for (let i = 1; i < 31 + 1; i++) {
            d.push(i);
        }
        return d;
    }

    getYearChoices() {
        let y: number[] = [];
        for (let i = 1910; i < 2018 + 1; i++) {
            y.push(i);
        }
        return y;
    }

    private isValid() {
        return (this.day && this.month && this.year);
    }

    ngOnInit() {
        if (this.defaultToday && ! (this.isValid())) {
            let d = new Date();
            this.day = d.getDate();
            this.month = 1 + d.getMonth();
            this.year = d.getFullYear();
            this.onChange.emit({
                value: this.date,
            });
        }
        this.form = this.fb.group({
            day: [this.day, Validators.required],
            month: [this.month, Validators.required],
            year: [this.year, Validators.required],
        });
        this.form.valueChanges.subscribe((f) => {
            this.day = f['day'];
            this.month = f['month'];
            this.year = f['year'];
            this.onChange.emit({
                value: this.date,
            });
        });
    }
}


@Component({
    selector: 'muted-if-na',
    template: `
        <span *ngIf="value" [ngClass]="{'white-space-pre': whiteSpacePre}">{{ value }}</span>
        <span *ngIf="!value" class="text-muted">N/A</span>
    `,
    styles: [`
        .white-space-pre {
            white-space: pre-wrap;
        }
    `]
})
export class MutedIfNa {
    private _value;
    @Input() whiteSpacePre: boolean = false;
    @Input()
    set value(v: any) {
        if (typeof v == "string") {
            v = v.trim();
        }
        this._value = v;
    }
    get value() {
        return this._value;  
    };
}


/**
 * A simple component used to create HTML paragraphs from text split on new lines.
 * This allows the resulting html to look more like the content entered by a user
 * in a textarea input.
 */
@Component({
    selector: 'newline-to-paragraph',
    template: `
        <p *ngFor="let para of splitParagraphs">
            {{ para }}
        </p>
    `,
})
export class NewlineToParagraphComponent implements OnChanges {
    @Input() text: string = '';
    public splitParagraphs: string[] = [];
    ngOnChanges() {
        this.text = this.text.replace("\r\n", "\n");
        let parts = this.text.split("\n");
        this.splitParagraphs = parts.filter((part) => {
            part = part.trim();
            return (part.length > 0);
        });
    }
}


/**
 * This is a panel used for grouping content. It shadows on hover.
 */
@Component({
    selector: 'panel',
    template: `
        <div class="panel" (mouseover)="onMouseover()" (mouseout)="onMouseout()">
            <div class="my-panel" [ngClass]="{'activePanel': isActive}" style="padding: 1rem; margin-bottom: 1rem">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `
        .activePanel {
            -webkit-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            -moz-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }`,
    ]
})
export class PanelComponent {
    @Input() hoverShadow: boolean = true;
    public isActive: boolean = false;
    onMouseover() { if (this.hoverShadow ) this.isActive = true; }
    onMouseout() { if (this.hoverShadow) this.isActive = false; }
}


@Component({
    selector: 'password-input',
    template: `
        <div class="input-group" [formGroup]="form">
            <input [type]="type" class="form-control" formControlName="password">
            <span class="input-group-btn">
                <button class="btn btn-outline-secondary" type="button"
                    (click)="togglePreview(inputElm)">
                    <i class="fa fa-fw" [ngClass]="{
                        'fa-eye-slash': type == 'text',
                        'fa-eye': type == 'password'}"></i>
                    <span translate *ngIf="type == 'password'">Show</span>
                    <span translate *ngIf="type == 'text'">Hide</span>
                </button>
            </span>
        </div>
    `,
})
export class PreviewPasswordComponent {
    public form: FormGroup;
    public type: string = "password";
    @Output() onChange = new EventEmitter();
    togglePreview() {
        if (this.type != "password") {
            this.type = "password";
        } else {
            this.type = "text";
        }
    }
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            password: [''],
        });
        this.form.controls['password'].valueChanges.subscribe((newPassword) => {
            this.onChange.emit({value: newPassword});
        })
    }
}


@Component({
    selector: 'panel-header',
    template: `
        <div class="row">
            <div class="col-6">
                <h4 style="margin-bottom: 0px">{{ title }}</h4>
            </div>
            <div class="col-6 text-right">
                <ng-content></ng-content>
            </div>
        </div>
        <hr style="margin-top: 15px">
    `,
})
export class PanelHeaderComponent {
    @Input() title: string = "N/A";
}


@Component({
    selector: 'app',
    templateUrl: '/static/templates/app.html',
})
export class AppComponent {
    public user: any = null;
    constructor(
        private translate: TranslateService,
        private toastrService: ToastrService,
    ) {}

