import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntryService } from '@iquipsys/pip-suite2-entry';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LogsDataService {
    private logGroupsUrl = '/api/v1/cloudwatch/log_groups';
    private logStreamsUrl = '/api/v1/cloudwatch/log_streams';
    private logEventsUrl = '/api/v1/cloudwatch/logs';

    public constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private entryService: EntryService
    ) { }

    private handleError(response: Response) {
        const error = response.json();
        return Observable.throw(error);
    }

    public getLogGroups(groupNamePrefix?: string, limit?: number): Observable<any> {
        let url = this.entryService.serverUrl + this.logGroupsUrl;

        url += '?name_prefix=' + groupNamePrefix;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public getLogStreams(group: string, streamNamePrefix?: string, limit?: number): Observable<any> {
        let url = this.entryService.serverUrl + this.logStreamsUrl;

        url += '?group=' + group;

        if (streamNamePrefix) {
            url += '&stream_prefix=' + streamNamePrefix;
        }
        if (limit) {
            url += '&limit=' + limit;
        }

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public getLogEvents(group: string, stream: string, startTime: string, endTime: string,
        filter: string, limit?: number): Observable<any> {
        let url = this.entryService.serverUrl + this.logEventsUrl;

        url += '?group=' + group +
            '&stream=' + stream +
            '&start_time=' + startTime +
            '&end_time=' + endTime +
            '&filter=' + filter +
            '&limit=' + limit;

        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }
}
