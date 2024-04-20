import { UserSignInRequestDto } from "../validation/sign-in-form-validation";

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
    email: '',
    password: '',
};

export { DEFAULT_SIGN_IN_PAYLOAD };