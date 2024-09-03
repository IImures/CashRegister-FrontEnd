import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  private readonly PHONE_REGEX = /^(\d{3})(\d{3})(\d{4})$/;
  private readonly PHONE_PREFIX = /\+?(1)?/;
  private readonly SPACES = /\s+/g;

  transform(value: string, ...args: unknown[]): string {
    let trimmed = value.replace(this.SPACES, '');
    trimmed = trimmed.replace(this.PHONE_PREFIX, '');

    const matches = trimmed.match(this.PHONE_REGEX);

    if (!matches) {
      return value;
    }

    const phoneParts = matches.slice(1,);
    return phoneParts.join('-');
  }

}
