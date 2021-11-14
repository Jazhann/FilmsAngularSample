import { ValidatorFn, AbstractControl } from "@angular/forms";

export function validateArray(array: any[]): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  
        array.length > 0 ? null : {required: true};
}


export function validateParam(param: any): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  
        param != null ? null : {required: true};
}