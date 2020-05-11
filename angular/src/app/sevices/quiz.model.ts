export class Quiz {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: number;
    timeOut: number;
    difficulty: string;
    desearialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
