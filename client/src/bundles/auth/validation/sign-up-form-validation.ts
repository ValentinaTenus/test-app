import joi from 'joi';

import { UserValidationMessage } from './user-validation-messages';
import { UserValidationRule } from './user-validation-rules';

type UserSignUpRequestDto = {
    name: string;
    email: string;
    password: string;
};

const userSignUpValidation = joi.object<
    UserSignUpRequestDto,
    true
>({
    name: joi.string().min(2).max(50).trim().required().messages({
        'string.empty': UserValidationMessage.NAME_REQUIRE,
        'string.min': UserValidationMessage.NAME_SHORT,
        'string.max': UserValidationMessage.NAME_LONG,
    }),
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

export { type UserSignUpRequestDto, userSignUpValidation };
