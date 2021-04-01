import {compareSync, hashSync, genSaltSync} from 'bcrypt';

export class BcryptService {
    private readonly SALT_ROUND: number;

    constructor(saltRound = 10) {
        this.SALT_ROUND = saltRound;
    }

    hash(content: string) {
        return hashSync(content, genSaltSync(this.SALT_ROUND));
    }

    compare(data: any, encrypted: string) {
        return compareSync(data, encrypted);
    }
}

export const BcryptSingleton = new BcryptService();
