import joi from 'joi';

import { UserValidationMessage } from './user-validation-messages';
import { UserValidationRule } from './user-validation-rules';

type UserSignInRequestDto = {
    email: string;
    password: string;
};

const userSignInValidation = joi.object<
    UserSignInRequestDto,
    true
>({
    email: joi
        .string()
        .email({
            tlds: {
                allow: false,
            },
        })
        .custom((value, helpers) => {
            const [localPart] = value.split('@');
            if (localPart.length <= UserValidationRule.EMAIL_LOCAL_PART) {
                return helpers.error('string.emailInvalid');
            }
            return value;
        })
        .required()
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'string.emailInvalid': UserValidationMessage.EMAIL_INVALID,
        }),
    password: joi
        .string()
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])(?=\S{8,64}$).*$/,
        )
        .min(UserValidationRule.PASSWORD_MIN_LENGTH)
        .max(UserValidationRule.PASSWORD_MAX_LENGTH)
        .required()
        .messages({
            'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
            'string.pattern.base': UserValidationMessage.PASSWORD_INVALID,
            'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
            'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
        })
});

export { type UserSignInRequestDto, userSignInValidation };
