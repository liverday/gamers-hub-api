import Gender from "../model/gender";

export default interface CreateUserDTO {
    first_name: string;
    last_name: string;
    username: string;
    gender: Gender;
    email: string;
    password: string;
}
