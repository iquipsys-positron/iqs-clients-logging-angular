import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { Observable } from 'rxjs';

@Injectable()
export class LogsDataService {
    private logGroupsUrl = '/api/v1/cloudwatch/log_groups';
    private logStreamsUrl = '/api/v1/cloudwatch/log_streams';
    private logEventsUrl = '/api/v1/cloudwatch/logs';

    public constructor(
        private http: HttpClient,
        private sessionConfig: IqsSessionConfigService
    ) { }

    public getLogGroups(groupNamePrefix?: string, limit?: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.logGroupsUrl;
        url += '?name_prefix=' + groupNamePrefix;
        return this.http.get<any[]>(url);
    }

    public getLogStreams(group: string, streamNamePrefix?: string, limit?: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.logStreamsUrl;

        url += '?group=' + group;

        if (streamNamePrefix) {
            url += '&stream_prefix=' + streamNamePrefix;
        }
        if (limit) {
            url += '&limit=' + limit;
        }

        return this.http.get(url);
    }

    public getLogEvents(group: string, stream: string, startTime: string, endTime: string,
        filter: string, limit?: number): Observable<any> {
        let url = this.sessionConfig.serverUrl + this.logEventsUrl;

        url += '?group=' + group +
            '&stream=' + stream +
            '&start_time=' + startTime +
            '&end_time=' + endTime +
            '&filter=' + filter +
            '&limit=' + limit;

        return this.http.get(url);
    }
}
