import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnDestroy {
  users = [];

  cols: any[];

  first = 0;

  rows = 10;

  constructor( private auditApi: UserService) { }

  ngOnInit() {
    this.auditApi.getAudiorData().pipe(first()).subscribe(users => {
      this.users = users;
  });
      this.cols = [
          { field: 'username', header: 'User Name' },
          { field: 'lastLoginAt', header: 'Last Login At' },
          { field: 'clientIp', header: 'Client Ip' },
      ];
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.first === (this.users.length - this.rows);
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }

  ngOnDestroy() {
  this.users = [];
  }
}
