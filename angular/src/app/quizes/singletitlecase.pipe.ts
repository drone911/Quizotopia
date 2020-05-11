import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'singletitlecase'
})
export class SingleTitleCasePipe implements PipeTransform {
    transform(input: any) {
        if (typeof(input) === 'number') {
            return input;
        }
        return input[0].toUpperCase() + input.slice(1);
    }
}