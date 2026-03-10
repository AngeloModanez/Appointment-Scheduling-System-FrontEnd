import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap/dropdown';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {

  getName(): string {
    return "John Doe";
  }

  getRole(): string {
    return "admin"
  }

  logout() {
    console.log("logout");
  }
}
