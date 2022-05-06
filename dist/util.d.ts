export declare const capitalizeFirst: (src: string) => string;
export declare const getRelativeTSPath: (from: string, to: string) => string;
export declare const uniquify: (src: any[]) => any[];
export declare const arrayify: (src: string) => string;
export declare const wrapArrowFunction: (src: string) => string;
export declare const wrapQuote: (src: string) => string;
export declare const log: (src: string) => void;
export declare const parseBoolean: (value: unknown) => boolean;
export declare const toArray: <T>(value: T | T[]) => T[];
export declare const writeTSFile: (fullPath: string, content: string, dryRun?: boolean) => void;
