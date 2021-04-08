import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardFormService } from '../card-form.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})

export class CardFormComponent implements OnInit {

  dataform: FormGroup;
  lisDataCompanies: any;

  ngOnInit(): void {

    this.cardFormService.change.subscribe(lisData => {
      this.lisDataCompanies = lisData;
    });
  }

  constructor(private fb: FormBuilder,
    private cardFormService: CardFormService) {

    this.dataform = this.fb.group({

      fromaccount: ['', Validators.required],
      toaccount: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  addTransfer(): void {

    if (this.dataform.value.toaccount == '') {
      alert("Please enter an account ");
    }
    else if (this.dataform.value.amount == '') {
      alert("Please enter an ammount ");
    } else {

      this.cardFormService.setTransfer(this.dataform.value);
      this.dataform.reset();
    }
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*\.?\d?$/g;
    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
}
