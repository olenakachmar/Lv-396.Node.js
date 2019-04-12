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

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
  }
  selectOp(info): boolean {
    this.router.navigate(['/profile/contact-info/', info], {relativeTo: this.route});
    return false;
  }

  ngOnInit() {
  }

}
