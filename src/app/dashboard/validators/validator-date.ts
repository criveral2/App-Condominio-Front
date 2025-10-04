import { AbstractControl, ValidatorFn } from "@angular/forms";

export function minDateValidator(minDate: string | Date): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;

    const controlVal = control.value; // 'YYYY-MM-DD' del input
    const [year, month, day] = controlVal.split('-').map(Number);
    const controlDate = new Date(year, month - 1, day); // mes base 0

    const min = typeof minDate === 'string' ? new Date(minDate) : minDate;
    const minDateOnly = new Date(min.getFullYear(), min.getMonth(), min.getDate());

    return controlDate >= minDateOnly ? null : { minDate: true };
  };
}
