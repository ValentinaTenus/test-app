import { type UserSignUpRequestDto } from '../validation/validation';


const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    name: '',
    email: '',
    password: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
