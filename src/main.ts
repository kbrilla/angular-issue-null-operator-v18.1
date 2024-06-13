import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

export type AccessibleValue<T> =
  | { isAccessible: true; value: T }
  | {
      isAccessible: false;
      value: null;
    };

@Pipe({
  standalone: true,
  name: 'stringOnlyPipe',
})
export class StringOnlyPipePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Component({
  standalone: true,
  selector: 'my-app',
  imports: [StringOnlyPipePipe],
  template: `
    @if(testValue.accessible?.isAccessible === true) {
      <p>
      {{ testValue.accessible.value | stringOnlyPipe }} <span></span>
      </p>
    } 
    <p>
    {{ testValue.accessible?.value | stringOnlyPipe }} <span></span>
    </p>
`,
})
export class AppComponent {
  testValue: { accessible?: AccessibleValue<string> } = {
    accessible: { isAccessible: true, value: 'type narrowing test' },
  };
  stringOnlyToTest!: string;

  test() {
    // this.stringOnlyToTest = this.testValue.accessible.value; throws as it should

    if (this.testValue.accessible?.isAccessible) {
      this.stringOnlyToTest = this.testValue.accessible.value;
    }
  }
}

bootstrapApplication(AppComponent);
