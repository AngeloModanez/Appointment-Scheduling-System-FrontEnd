import { Component } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";

@Component({
  selector: 'app-client-form-page',
  imports: [PageLayout, FormInput, Button],
  templateUrl: './client-form-page.html',
  styles: ``,
})
export class ClientFormPage {

}
