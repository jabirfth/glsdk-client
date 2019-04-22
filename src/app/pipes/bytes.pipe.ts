import { Pipe, PipeTransform } from '@angular/core';

export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

@Pipe({
  name: 'bytes',
})
export class BytesPipe implements PipeTransform {

  static formats: { [key: string]: { max: number, prev?: ByteUnit }} = {
    B: { max: 1024 },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'KB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' },
  };

  transform (input: any, decimal = 2, from: ByteUnit = 'B'): any {
    let bytes = input;
    let unit = from;
    while (unit !== 'B') {
      bytes *= 1024;
      unit = BytesPipe.formats[unit].prev!;
    }

    const key = Object.getOwnPropertyNames(BytesPipe.formats).find((key: string) => {
      const format = BytesPipe.formats[key];
      return bytes < format.max;
    });

    if (key !== null) {
      const format = BytesPipe.formats[key];
      const prev = format.prev !== null ? BytesPipe.formats[format.prev] : undefined;
      const result = prev ? bytes / prev.max : bytes;
      return `${result.toFixed(decimal)} ${key}`;
    }
    throw new Error('Should not happen... Is input a valid number ?');
  }
}
