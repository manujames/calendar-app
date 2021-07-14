import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'keyValueUnsorted', pure: false})
export class KeyValuePipe implements PipeTransform {
  transform(input: any): any {
    let keys = [];
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        keys.push({ key: key, value: input[key] });
      }
    }
    return keys;
  }
}

@Pipe({ name: 'keyValueRevered', pure: false})
export class KeyValuePipeReversed implements PipeTransform {
  transform(input: any): any {
    let keys = [];
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        keys.push({ key: key, value: input[key] });
      }
    }
    keys.reverse();
    return keys;
  }
}