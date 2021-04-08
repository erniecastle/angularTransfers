import { ElementRef,ViewChild,Component, OnInit  } from '@angular/core';
import { CardFormService } from '../card-form.service';


@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})


export class TableFormComponent implements OnInit {

  @ViewChild('filterCompany', { static: false }) filterCompanyInput: ElementRef<HTMLInputElement>
  model: any;

  lisData: any;
  constructor(private cardFormService: CardFormService) {
  }

  ngOnInit(): void {

    this.cardFormService.change.subscribe(lisData => {
      this.lisData = lisData;
    });
  }

  getIcon(name) {
    name = name.toLowerCase()
    name = name.replace(/\s/g, "-");
    return "./../assets/icons/" + name + ".png";
  }


  applyFilter(filterValue: string) {
    this.cardFormService.filterData(filterValue);

  }

  applyFilterBenef(){
    this.cardFormService.filterDataPerBenef();
  }

  applyFilterAmount(){
    this.cardFormService.filterDatamount();
  }

  changeDate(filterValue:any){
    this.cardFormService.filterPerDate(filterValue);
  }

  clearFilter() {
    this.cardFormService.clearFilter();
    this.filterCompanyInput.nativeElement.value = '';
  }

}
