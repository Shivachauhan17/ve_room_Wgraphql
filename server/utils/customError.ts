

export class CustomError extends Error {
    fileName: string;
    lineNumber:number;

    constructor(message:string, fileName:string,lineNumber:number) {
        super(message);
        this.fileName = fileName;
        this.lineNumber=lineNumber;
        Object.setPrototypeOf(this, CustomError.prototype);

    }
}