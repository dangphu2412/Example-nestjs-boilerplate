export interface UserPrinciple {
    isAuthenticated(): boolean;
    isAccountLocked(): boolean;
    isCredentialsExpired(): boolean;
}
