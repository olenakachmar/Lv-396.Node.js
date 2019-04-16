import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-link-to-profile',
  templateUrl: './link-to-profile.component.html',
  styleUrls: ['./link-to-profile.component.scss']
})
export class LinkToProfileComponent implements OnInit {
  @Input() label: string;
  @Input() info: string;
  @Input() idLinks: string;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
  }

  selectDepartment(idLinks, info, label): any {
    if (label === 'My department') {
      this.router.navigate(['/profile/contact-info/', info], {relativeTo: this.route});
    }
    if (label === 'My manager') {
      this.router.navigate(['/profile/my-profile/', idLinks], {relativeTo: this.route});
    }
    if (label === 'My Team Lead') {
      this.router.navigate(['/profile/my-profile/', idLinks], {relativeTo: this.route});
    }
  }
}
