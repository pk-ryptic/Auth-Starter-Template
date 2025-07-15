export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
};

export type LoginAccountParams = {
    email: string,
    password: string,
    userAgent?: string
}