import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor() { }


  getBoolean = () => {
    return [true, false][Math.floor(Math.random() * 2)]
  }


  getRandomArbitrary = (min: number, max: number) => {
    max++
    return Math.floor(Math.random() * (min - max) + max);
  }

  handleOptions = (value: any) => {
    if (value.includes('boolean')) { return this.getBoolean() }
    // if (value.includes('&')) {return getRandomArbitrary(Number(value[0]), Number(value[2])) }
    if (Array.isArray(value) && value[1] === '&') {
      const min = value[0];
      const max = value[2];
      return this.getRandomArbitrary(min, max);
    }
    // if (Array.isArray(value) && Array.isArray(value[0])) {return 'grupo de cosas'}
    if (Array.isArray(value) && !value.includes('&')) { return value[Math.floor(Math.random() * value.length)] }

    return value
  }

  getRandomObj = (obj: any) => {

    let randomObj = {}

    for (const [key, value] of Object.entries(obj)) {
      randomObj = {
        ...randomObj,
        [key]: this.handleOptions(value)
      }
    }

    return randomObj
  }


  generateRandom(quantity: number, obj: object): object {
    return [...Array(quantity).keys()].map(() => this.getRandomObj(obj))
  }


}
