import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PipSidenavService, PipMediaService } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounce } from 'lodash';
import { series, each } from 'async';

import { LoggingContainerTranslations } from './logging-container.strings';
import { LogsDataService } from '../services/logs.data.service';


@Component({
    selector: 'iqs-logging-container',
    templateUrl: './logging-container.component.html',
    styleUrls: ['./logging-container.component.scss']
})
export class LoggingContainerComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    private limit = 100;

    public selectedIndex = 0; // index in menu list
    public selectedGroup = 0;
    public selectedStream = 0;
    public isSingle = false;

    // public logGroups = ['positron.stage.iquipsys.net', 'positron.us2.iquipsys.net'];
    public logGroups = [];
    public logStreams = [];
    public logs = [];

    public menuBusy$ = new BehaviorSubject(false);
    public contentBusy$ = new BehaviorSubject(true);
    public logsLoading$ = new BehaviorSubject(false);

    public language: string;

    public search = '';

    // start of week
    public startDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(
        new Date(new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).setHours(0, 0, 0, 0))
    );
    // end of week
    public endDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(
        new Date(new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7)).setHours(23, 59, 59, 999))
    );

    constructor(
        private translate: TranslateService,
        private sidenav: PipSidenavService,
        private logsDataService: LogsDataService,
        private pipNavService: PipNavService,
        public media: PipMediaService,
    ) {
        console.log('Logging container loaded');
        this.media.activate();
        this.media.asObservableMain().subscribe((changes) => {
            // console.log(changes);
            // this.isSingle = this.media.isMainActive('lt-sm');
        });
        this.language = this.translate.currentLang;
        this.sidenav.active = true;
        this.translate.setTranslation('en', LoggingContainerTranslations.en, true);
        this.translate.setTranslation('ru', LoggingContainerTranslations.ru, true);
        this.pipNavService.showTitle('Logs');
    }

    public onItemClick(i, j) {
        this.contentBusy$.next(true);

        this.selectedIndex = 0;
        for (let k = 0; k < i; k++) {
            this.selectedIndex += this.logStreams[k].length;

        }
        this.selectedIndex += j;
        this.selectedGroup = i;
        this.selectedStream = j;

        if (this.media.isMainActive('lt-md')) {
            this.isSingle = true;

            this.pipNavService.showNavIcon({
                icon: 'arrow_back', action: () => {
                    this.isSingle = false;
                    this.pipNavService.showNavIcon({ icon: 'menu' });
                }
            });
        }

        this.loadLogs(this.startDate$.getValue(), true);
    }

    public loadMore() {
        this.logsLoading$.next(true);

        const fromDate = new Date(this.logs[this.logs.length - 1].time);
        fromDate.setSeconds(fromDate.getSeconds() + 1);

        this.loadLogs(fromDate);
    }

    private loadLogs(fromDate: Date, clear: boolean = false) {
        if (this.sub) {
            this.sub.unsubscribe();
        }

        const group = this.logGroups[this.selectedGroup];
        const stream = this.logStreams[this.selectedGroup][this.selectedStream].title;

        if (clear) {
            this.logs = [];
        }

        this.sub = this.logsDataService.getLogEvents(group, stream,
            fromDate.toISOString(), this.endDate$.getValue().toISOString(), this.search, this.limit).subscribe((res) => {
                res.events.forEach(event => {

                    this.logs.push({
                        time: new Date(event.timestamp),
                        message: event.message
                    });
                });
                this.contentBusy$.next(false);
                this.logsLoading$.next(false);
            });
    }

    public ngOnInit() {
        this.menuBusy$.next(true);

        series([
            (callback) => {
                this.logsDataService.getLogGroups('positron').subscribe((res) => {
                    if (res) {
                        res.logGroups.forEach(i => {
                            this.logGroups.push(i.logGroupName);
                        });
                    }
                    callback(null, this.logGroups);
                });
            },
            (callback) => {

                let i = 0;
                each(this.logGroups, (logGroup, callback) => {

                    this.logsDataService.getLogStreams(logGroup).subscribe((res) => {
                        this.logStreams[i] = [];
                        res.logStreams.forEach(item => {
                            this.logStreams[i].push({ title: item.logStreamName });
                        });
                        i++;
                        callback();
                    });
                }, (err) => {
                    callback(null, this.logStreams);
                });

            }
        ], (err, res) => {
            this.menuBusy$.next(false);
            this.onItemClick(0, 0);
        });
    }

    public ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    public onStartDateChange($event) {
        // console.log('start', $event, $event.toLocaleTimeString());
        this.startDate$.next($event);
        this.onItemClick(this.selectedGroup, this.selectedStream);
    }

    public onEndDateChange($event) {
        // console.log('end', $event);
        this.endDate$.next($event);
        this.onItemClick(this.selectedGroup, this.selectedStream);
    }

    public filterLogs = debounce(() => {
        this.logsLoading$.next(true);
        this.loadLogs(this.startDate$.getValue(), true);
    }, 300);

}
