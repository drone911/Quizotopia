import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'timer'
})
export class TimerPipe implements PipeTransform{
    transform( time: number): any {
        if (time > 9) {
            return `${time}:00`;
        } else {
            return `0${time}:00`;
        }
    }
}