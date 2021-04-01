import {CYAN, RED, YELLOW} from './constants';

const log = (color: string, ...args: any[]) => console.log(color + '%s', ...args);

export const info = (...args: any[]) => log(CYAN, ...args);
export const warn = (...args: any[]) => log(YELLOW, ...args);
export const error = (...args: any[]) => log(RED, ...args);
