enum UserValidationMessage {
    NAME_REQUIRE = "Name is required",
    NAME_SHORT = "Name length must be at least 2 characters long",
    NAME_LONG = "Name length must be less than or equal to 50 characters long",
    EMAIL_REQUIRE = "Email is required",
    EMAIL_WRONG = "Email is wrong",
    EMAIL_INVALID = "Invalid email format. Must include at least 2 symbols before @",
    PASSWORD_REQUIRED = "Password is required",
    PASSWORD_MIN_LENGTH = "Password length must be at least 8 characters long",
    PASSWORD_MAX_LENGTH = "Password length must be at less than 64 characters",
    PASSWORD_INVALID = "Password must include special characters, capital letters and numbers",
}
export { UserValidationMessage };