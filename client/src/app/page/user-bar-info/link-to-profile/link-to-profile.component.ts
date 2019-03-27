import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link-to-profile',
  templateUrl: './link-to-profile.component.html',
  styleUrls: ['./link-to-profile.component.scss']
})
export class LinkToProfileComponent implements OnInit {
  @Input() label: string;
  @Input() info: string;

  constructor() { }

  ngOnInit() {
  }

  onClickEvent(): boolean {
    return false;
  }
}
