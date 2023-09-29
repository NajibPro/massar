import { Component } from '@angular/core';
import { GlobalFunctionsService } from '../services/global-functions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, fields, universitiesAlgeria } from '../signup/experience';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css', '../login/login.component.css']
})
export class UserInfoComponent {
  constructor(public globalFunctions: GlobalFunctionsService, private fb: FormBuilder){
    this.studentInfo = this.fb.group({
      fieldOfStudy: [''],
      educationLevel: [null, [Validators.min(1), Validators.max(20)]],
      university: [''],
      skills: [[]],
      cv: [null],
      linkedin: ['', ]
    })
  }

  studentInfo!: FormGroup;
  experienceList!: Experience[];
  fieldList: string[] = fields;
  uniList: string[] = universitiesAlgeria;
  showErrors: boolean = false;
  CVname!: string;

  handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      this.CVname = file.name;
    } else {
      this.CVname = '';
    }
  }
}
