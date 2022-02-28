export default interface UserAuth {
    name?:string,
    token?: string,
    authenticated: boolean;
}