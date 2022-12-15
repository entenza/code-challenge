import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';



export function IsValidMonth(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            // this.error = propertyName + ' is empty';
            return true;
          }

          value = value.toString().trim();
					console.log('====================================================')
					console.log('esto dentro del validador ', value)
					console.log('====================================================')
					const validMonths = [
						'january',
						'february',
						'march',
						'april',
						'may',
						'june',
						'july',
						'august',
						'september',
						'October',
						'november',
						'december',
					];

          if (!validMonths.includes(value)) {
            this.error = `This '${value}' is not a valid month ... [${validMonths}]`;
            return false;
          }

          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        },
      },
    });
  };
}
