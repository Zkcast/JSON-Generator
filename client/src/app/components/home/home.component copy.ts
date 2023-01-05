import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpmethodsService } from 'src/app/services/httpmethods.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {


  @ViewChild('content') public modal: NgbModal;

  constructor(
    private fb: FormBuilder,
    private http: HttpmethodsService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    config: NgbModalConfig

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  modalForm: FormGroup;
  info: FormGroup;
  obj: object = {}
  index: number = -8
  inputQuant = [1, 2, 3, 4]
  downloadJsonHeref: any;
  settingValueOf: number;
  modal_typeSelected: string = 'array';

  ngOnInit() {

    this.info = new FormGroup({

      0: new FormControl(),
      1: new FormControl(),
      2: new FormControl(),
      3: new FormControl(),
      4: new FormControl(),
      5: new FormControl(),
      6: new FormControl(),
      7: new FormControl(),
      8: new FormControl(),
      9: new FormControl(),
      10: new FormControl(),
      11: new FormControl(),
      12: new FormControl(),
      13: new FormControl(),
      14: new FormControl(),
      15: new FormControl(),
      16: new FormControl(),
      17: new FormControl(),
      18: new FormControl(),
      19: new FormControl(),
      20: new FormControl(),
      21: new FormControl(),
      22: new FormControl(),
      23: new FormControl(),
      24: new FormControl(),
      25: new FormControl(),
      26: new FormControl(),
      27: new FormControl(),
      28: new FormControl(),
    })

    this.modalForm = new FormGroup({
      modalInput: new FormControl('', Validators.maxLength(5))
    })

  }



  showForm() {
    console.log(this.info.value)
    console.log(this.obj)
    console.log(typeof this.obj)
  }


  addInput() {
    if (this.inputQuant.length === 28) { alert('A maximum of 14 key/value pairs can be set for each object'); return }
    let key = (Object.keys(this.info.controls).length).toString()

    // this.info.addControl(key, new FormControl());
    // this.info.addControl(key+1, new FormControl());

    this.inputQuant.push(1)
    this.inputQuant.push(1)
  }

  showInfo() {
    console.log('asdsad')
  }


  open(content: any, i: number) {
    if (!this.info.controls[i - 1].value) { alert('please name key before setting a value'); return }
    this.settingValueOf = i
    this.modalService.open(content);
  }

  getPair(n: number) {
    if (n % 2 === 0) return `input_left`
    else return `input_right`
  }

  getKeyOrValue(n: number) {
    if (n % 2 === 0) return `Key`
    else return `Value`
  }

  handleInputValue(i: number) {
    let value = this.info.controls[i].value
    if (value && value.length > 3 && value.includes('&')) {let v = value.split(','); return `Range(${v[0]} to ${v[2]})`}
    if (value === 'boolean') { return 'Boolean (true/false)' }
    return value ? `[ ${value.split(',').length} elements ]` : 'Value'
  }

  getValueOfKey(i: number) {
    return this.info.controls[i - 1].value

  }

  handleSelectedType(e: Event, i: number) {

    this.info.patchValue({
      [i]: ''
    });

    let value = (e.target as HTMLInputElement).name
    this.modal_typeSelected = value
  }


  handleRangeNumber(i: number, min: string, max: string) {
    if (min && max) {

      if (Number(min) > Number(max)) {alert('Min number must be lowest than max.'); return}

      this.info.patchValue({
        [i]: `${min},&,${max}`
      });
    }
  }

  submitValue(i: number, inputValue: string) {

    if (inputValue.length < 1 && inputValue.length > 16) { alert('Only 15 characters per key'); return }
    if (this.info.controls[i].value && this.info.controls[i].value.includes(inputValue)) { return }

    this.modalForm.reset()
    this.info.patchValue({
      [i]: this.info.controls[i].value ? this.info.controls[i].value.concat(',' + inputValue) : inputValue
    });

  }

  submitBoolean(i: number) {

    this.modal_typeSelected = 'boolean'

    this.info.patchValue({
      [i]: 'boolean'
    });
  }

  getPossibleValues(i: number) {
    if (this.info.controls[i].value !== null && this.info.controls[i].value !== '') {
      return this.info.controls[i].value.split(',')
    }
  }

  deleteValue(value: string, i: number) {

    if (value === '89358923578327532434') { this.info.patchValue({ [i]: '' }); } // Reset form

    let array = this.info.controls[i].value.split(',')
    let filter = array.filter((e: string) => e !== value)
    this.info.patchValue({
      [i]: filter.join(',')
    });

  }

  handleInputMaxMin(value: string) {
    return !isNaN(Number(value))
  }

  setForm() {

    this.obj = {}

    let quantity = Object.keys(this.info.controls).length

    for (let i = 0; i < quantity; i++) {

      if (this.info.value[i] && this.info.value[i + 1]) {

        this.obj = {
          ...this.obj,
          [this.info.value[i]]: this.info.value[i + 1].split(',')
        }
        i++

      }

    }
  }

  postObj() {
    this.setForm();
    this.http.sendObj(this.obj).subscribe(res => {
      console.log(res);
      var theJSON = JSON.stringify([...res]);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHeref = uri;
    })


  }

  disableDownload() {
    const formValue = this.info.value;
    const mapped = Object.values(formValue).map(value => !!value);
    const hasValues = mapped.some(value => value);
   return hasValues
  }
}