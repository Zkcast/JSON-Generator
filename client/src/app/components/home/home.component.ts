import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpmethodsService } from 'src/app/services/httpmethods.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneratorService } from 'src/app/services/generator/generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {


  @ViewChild('content') public modal: NgbModal;
  @ViewChild('quantityInput') quantityInput: number

  constructor(
    private fb: FormBuilder,
    private http: HttpmethodsService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private generator: GeneratorService

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  modalForm: FormGroup;
  info: FormGroup;
  obj: object = {}
  index: number = -8
  inputQuant = [1, 2, 3, 4, 5, 6, 7, 8]
  downloadJsonHeref: any;
  settingValueOf: number;
  modal_typeSelected: string = 'array';
  preview: object = {};

  quantityToReturn: number = 1;

  ngOnInit() {

    this.preview = {}

    this.info = new FormGroup({

      0: new FormControl('usermail'),
      1: new FormControl('user@mail.com,json@gmail.com,jhondoe@mail.com,dont@worry.com,example@ex.net,me@mymail.com'),
      2: new FormControl('country'),
      3: new FormControl('EEUU,Argentina,Venezuela,Peru,Chile,Canada,Sweden,Spain,Italy,Mexico,Bolivia,Colombia,England,France,Ecuador,China,Croatia,Portugal'),
      4: new FormControl('age'),
      5: new FormControl('18,&,75'),
      6: new FormControl('subscribed'),
      7: new FormControl('boolean'),
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

    this.setForm()
  }

  showForm() {
    console.log()
  }


  handleQuantity(n: String) {
    if (Number(n) < 1 || isNaN(Number(n))) { this.quantityInput = 0; return false }
    if (Number(n) > 1000) { this.quantityInput = 1000; return false }

    if (Number(n) < 1000 && Number(n) > 0) { this.quantityToReturn = Number(n); return true }

    return false
  }


  asdasd() {
    var searchUrl = "https://www.google.com/search?q=busqueda+de+imagenes&source=lnms&tbm=isch";

    // Hacer una solicitud GET a la URL de búsqueda de Google
    var xhr = new XMLHttpRequest();
    xhr.open("GET", searchUrl);
    xhr.responseType = "document";
    xhr.send();

    xhr.onload = function () {
      // Obtener el elemento 'div' con la clase 'rg_i'
      var rg_i_elements = xhr.response.getElementsByClassName("rg_i");

      // Recorrer los primeros 10 elementos 'div'
      for (var i = 0; i < 10; i++) {
        // Obtener el enlace de la imagen
        var imageUrl = rg_i_elements[i].firstElementChild.getAttribute("src");
        console.log(imageUrl);
      }
    }
  }


  addInput() {
    if (this.inputQuant.length === 28) { alert('A maximum of 14 key/value pairs can be set for each object'); return }

    // let key = (Object.keys(this.info.controls).length).toString()
    // this.info.addControl(key, new FormControl());
    // this.info.addControl(key+1, new FormControl());

    this.inputQuant.push(1)
    this.inputQuant.push(1)
  }

  showInfo() {
    console.log('asdsad')
  }


  open(content: any, i: number) {
    if (this.info.controls[i].value == 'boolean') { this.modal_typeSelected = 'boolean' }
    else if (this.info.controls[i].value && this.info.controls[i].value.includes('&')) { this.modal_typeSelected = 'number' }
    else { this.modal_typeSelected = 'array' }

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
    if (value && value.length > 3 && value.includes('&')) { let v = value.split(','); return `${v[0]}-${v[2]}` }
    if (value === 'boolean') { return 'BOOLEAN' }
    return value ? `[ ${value.split(',').length} items ]` : 'Value'
  }

  getValueOfKey(i: number) {
    this.setForm()
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

      if (Number(min) > Number(max)) { alert('Min number must be lowest than max.'); return }

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

    this.preview = this.generator.generateRandom(1, this.obj)
  }



  postObj() {
    this.setForm();

    // this.http.sendObj(this.obj).subscribe(res => {
    //   console.log(res);
    //   var theJSON = JSON.stringify([...res]);
    //   var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    //   this.downloadJsonHeref = uri;
    // })


    if (this.quantityToReturn > 1000) {
      alert('1000 objects max.'); return

    } else {
      let result = this.generator.generateRandom(this.quantityToReturn, this.obj)

      var theJSON = JSON.stringify(result);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHeref = uri;


    }



  }

  disableDownload() {
    const formValue = this.info.value;
    const mapped = Object.values(formValue).map(value => !!value);
    const hasValues = mapped.some(value => value);

    if (!hasValues || this.quantityToReturn > 1000) {return false}
    return hasValues
  }

  resetAll() {
    this.info.reset()
  }
}