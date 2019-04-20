import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { api } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../common/services/auth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule],
        providers: [AuthService, HomeComponent]
      });
    }));

  it('should be created', () => {
    const service: HomeComponent = TestBed.get(HomeComponent);
    expect(service).toBeTruthy();
  });
});
