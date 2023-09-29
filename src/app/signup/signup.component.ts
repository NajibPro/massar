import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFunctionsService } from '../services/global-functions.service';
import { Experience, fields, universitiesAlgeria, Link, Skill } from '../signup/experience';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../login/login.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private fb: FormBuilder, public globalFunctions: GlobalFunctionsService, private el: ElementRef, private renderer: Renderer2){
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', [Validators.required, Validators.minLength(8)]],
      isStudent: [null],
      fieldOfStudy: [''],
      educationLevel: [null, [Validators.min(1), Validators.max(20)]],
      university: [''],
      skills: this.fb.array([]),
      /*related to experience (part of it):*/
      skillName: '',
      discription: '',

      cv: [null],
      experience: this.fb.array([]),
      /*related to experience (part of it):*/
      title: '',
      position: '',
      establishmentName: '',
      timePeriod: '',

      linkedin: [''],
      companyName: [''],
      companyEmail: ['', [Validators.email]],
      establishmentLink: this.fb.array([]),
      /*related to establishmentLink (part of it):*/
      name: '',
      link: '',

      location: [''],
      companyPhone: ['', [Validators.pattern('/^[0-9\+]+$/')]]
    })
  }

  signupForm!: FormGroup;
  experienceList!: Experience[];
  fieldList: string[] = fields;
  uniList: string[] = universitiesAlgeria;
  showErrors: boolean = false;
  showErrorsStepOne: boolean = false;
  showErrorsStepTwo: boolean = false;
  showErrorsStepStudent: boolean = false;
  showErrorsStepCompany: boolean = false;
  CVname!: string;
  isStudent: boolean | null = null
  inStepOne: boolean = true
  inStepTwo: boolean = false
  inStepStudent: boolean = false
  inStepCompany: boolean = false
  isEstablishmentLinksInputsVisible = false
  isExperienceInputsVisible = false
  isSkillsInputsVisible = false
  experiencesList: Experience[] = []
  linksList: Link[] = []
  skillsList: Skill[] = []
  experiencesCounter: number = 0
  linksCounter: number = 0


  isPasswordMatch(): boolean {
    return this.signupForm.get('cpassword')?.value === this.signupForm.get('password')?.value;
  }

  handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      this.CVname = file.name;
    } else {
      this.CVname = '';
    }
  }

  setUserType(isStudent: boolean){
    this.signupForm.value.isStudent = isStudent;
    this.isStudent = isStudent
  }

  handleStepTransitionUp(){
    if(this.inStepOne){
      if(this.signupForm.get('username')?.invalid || this.signupForm.get('email')?.invalid || this.signupForm.get('password')?.invalid || this.signupForm.get('cpassword')?.invalid || !this.isPasswordMatch()){
        this.showErrorsStepOne = true
      }else{
        this.inStepTwo = true;
        this.inStepOne = false
      }
      
    } else if(this.inStepTwo){
      if(this.isStudent === null){
        this.showErrorsStepTwo = true
      }else{
        if(this.isStudent){
          this.inStepStudent = true
        } else {
          this.inStepCompany = true
        }
  
        this.inStepTwo = false
      }
      
    } else {
      if(this.signupForm.invalid){
        if(this.inStepCompany){ 
          this.showErrorsStepCompany = true 
        } else if(this.inStepStudent){
          this.showErrorsStepStudent = true
        }

      } else {
        this.onSubmit();
      }
      
    }
  }

  handleStepTransitionDown(){
    if(this.inStepOne){

    }else if(this.inStepTwo){
      this.inStepTwo = false
      this.inStepOne = true
    }else if(this.inStepCompany || this.inStepStudent){
      this.inStepCompany = this.inStepStudent = false
      this.inStepTwo = true
    }
  }

  toggleEstablishmentLinksInputsVisiblity(){
    this.isEstablishmentLinksInputsVisible = !this.isEstablishmentLinksInputsVisible;
  }

  toggleExperienceInputsVisiblity(){
    this.isExperienceInputsVisible = !this.isExperienceInputsVisible;
  }

  toggleSkillsInputsVisiblity(){
    this.isSkillsInputsVisible = !this.isSkillsInputsVisible;
  }

  isExperienceEmpty(): boolean {
    const experienceArray = this.signupForm.get('experience') as FormArray;
    return experienceArray.length === 0;
  }

  saveLink() {
    const name = this.signupForm.get('name')?.value;
    const url = this.signupForm.get('link')?.value;
  
    const link: Link = { name, url };

    this.linksList.push(link)

    this.drawLinkList()

    this.signupForm.get('name')?.setValue('');
    this.signupForm.get('link')?.setValue('');
  }

  saveExperience(){
    const title = this.signupForm.get('title')?.value;
    const position = this.signupForm.get('position')?.value;
    const establishmentName = this.signupForm.get('establishmentName')?.value;
    const timePeriod = this.signupForm.get('timePeriod')?.value;

    const experience: Experience = { title, position, establishmentName, timePeriod };

    this.experiencesList.push(experience)

    this.drawExperienceList()

    this.signupForm.get('title')?.setValue('');
    this.signupForm.get('position')?.setValue('');
    this.signupForm.get('establishmentName')?.setValue('');
    this.signupForm.get('timePeriod')?.setValue('');
  }

  saveSkill(){
    const name = this.signupForm.get('skillName')?.value;
    const discription = this.signupForm.get('discription')?.value;
  
    const skill: Skill = { name, discription };

    this.skillsList.push(skill)

    this.drawSkillList()

    this.signupForm.get('skillName')?.setValue('');
    this.signupForm.get('discription')?.setValue('');
  }

  drawExperienceList(){
    const experienceList = this.el.nativeElement.querySelector('.experiences .entries-list')
    while (experienceList.firstChild) {
      this.renderer.removeChild(experienceList, experienceList.firstChild);
    }

    let counter = 0

    this.experiencesList.forEach(element => {
      // Create the main div element with class "entry"
    const entryElement = this.renderer.createElement('div');
    this.renderer.addClass(entryElement, 'entry');

    // Create the div element with class "entry-text"
    const entryTextElement = this.renderer.createElement('div');
    this.renderer.addClass(entryTextElement, 'entry-text');

    // Create the div element with class "movable-text"
    const movableTextElement = this.renderer.createElement('div');
    this.renderer.addClass(movableTextElement, 'movable-text');

    const titleText = this.renderer.createText(element.title);
    this.renderer.appendChild(movableTextElement, titleText);

    if (element.title.length > 27) {
      this.renderer.addClass(movableTextElement, 'overflowing');
    }

    // Create the div element with class "x-mark" and add a click event
    const xMarkElement = this.renderer.createElement('div');
    this.renderer.addClass(xMarkElement, 'x-mark');
    console.log(this.experiencesCounter)
    const experienceIndex = counter
    this.renderer.listen(xMarkElement, 'click', () => this.removeExperience(experienceIndex));
    counter += 1;

    // Append the elements to form the desired structure
    this.renderer.appendChild(entryTextElement, movableTextElement);
    this.renderer.appendChild(entryElement, entryTextElement);
    this.renderer.appendChild(entryElement, xMarkElement);
    this.renderer.appendChild(experienceList, entryElement)
    });
  }

  drawLinkList(){
    const linkList = this.el.nativeElement.querySelector('.links .entries-list')
    while (linkList.firstChild) {
      this.renderer.removeChild(linkList, linkList.firstChild);
    }

    let counter = 0

    this.linksList.forEach(element => {
      // Create the main div element with class "entry"
    const entryElement = this.renderer.createElement('div');
    this.renderer.addClass(entryElement, 'entry');

    // Create the div element with class "entry-text"
    const entryTextElement = this.renderer.createElement('div');
    this.renderer.addClass(entryTextElement, 'entry-text');

    // Create the div element with class "movable-text"
    const movableTextElement = this.renderer.createElement('div');
    this.renderer.addClass(movableTextElement, 'movable-text');

    const titleText = this.renderer.createText(element.name);
    this.renderer.appendChild(movableTextElement, titleText);

    if (element.name.length > 27) {
      this.renderer.addClass(movableTextElement, 'overflowing');
    }

    // Create the div element with class "x-mark" and add a click event
    const xMarkElement = this.renderer.createElement('div');
    this.renderer.addClass(xMarkElement, 'x-mark');
  
    const linkIndex = counter
    this.renderer.listen(xMarkElement, 'click', () => this.removeLink(linkIndex));
    counter += 1;

    // Append the elements to form the desired structure
    this.renderer.appendChild(entryTextElement, movableTextElement);
    this.renderer.appendChild(entryElement, entryTextElement);
    this.renderer.appendChild(entryElement, xMarkElement);
    this.renderer.appendChild(linkList, entryElement)
    });
  }

  drawSkillList(){
    debugger
    const skillList = this.el.nativeElement.querySelector('.skills .entries-list')
    while (skillList.firstChild) {
      this.renderer.removeChild(skillList, skillList.firstChild);
    }

    let counter = 0
    console.log(this.skillsList)
    this.skillsList.forEach(element => {
      console.log('drawing hehe')
      // Create the main div element with class "entry"
    const entryElement = this.renderer.createElement('div');
    this.renderer.addClass(entryElement, 'entry');

    // Create the div element with class "entry-text"
    const entryTextElement = this.renderer.createElement('div');
    this.renderer.addClass(entryTextElement, 'entry-text');

    // Create the div element with class "movable-text"
    const movableTextElement = this.renderer.createElement('div');
    this.renderer.addClass(movableTextElement, 'movable-text');

    const titleText = this.renderer.createText(element.name);
    this.renderer.appendChild(movableTextElement, titleText);

    if (element.name.length > 27) {
      this.renderer.addClass(movableTextElement, 'overflowing');
    }

    // Create the div element with class "x-mark" and add a click event
    const xMarkElement = this.renderer.createElement('div');
    this.renderer.addClass(xMarkElement, 'x-mark');

    const skillIndex = counter
    this.renderer.listen(xMarkElement, 'click', () => this.removeSkill(skillIndex));
    counter += 1;

    // Append the elements to form the desired structure
    this.renderer.appendChild(entryTextElement, movableTextElement);
    this.renderer.appendChild(entryElement, entryTextElement);
    this.renderer.appendChild(entryElement, xMarkElement);
    this.renderer.appendChild(skillList, entryElement)
    })

    console.log(this.skillsList)
  }

  removeExperience(index: number){
    if (index >= 0 && index < this.experiencesList.length) {
      this.experiencesList.splice(index, 1)
      this.drawExperienceList()
    }
  }

  removeLink(index: number){
    if (index >= 0 && index < this.linksList.length) {
      this.linksList.splice(index, 1)
      this.drawLinkList()
    }
  }

  removeSkill(index: number){
    if (index >= 0 && index < this.skillsList.length) {
      this.skillsList.splice(index, 1)
      this.drawSkillList()
    }
  }

  onSubmit(){
    if(this.signupForm.invalid){
      this.showErrors = true
      return;
    }
  }
}
