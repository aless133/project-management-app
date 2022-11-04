export interface IUser {
	id?:string;
	name?:string;
	login?:string;
	token?:string;
}

export interface TStoreState {
	user: IUser;
}