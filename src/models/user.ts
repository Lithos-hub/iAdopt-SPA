export interface LoginUser {
	email: string;
	password: string;
}

export interface RegisterUser extends LoginUser {
	rep_password: string;
}

export interface UserDB extends LoginUser {
	_id: string;
}
