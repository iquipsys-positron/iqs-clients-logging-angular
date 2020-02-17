import { inject, TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';

describe('Module : App', () => {
    let app: AppModule;

    beforeEach(() => {
        app = new AppModule();
    });

    it('should be initialized', () => {
        expect(app).toBeTruthy();
    });
});
