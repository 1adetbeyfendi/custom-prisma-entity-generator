import { Dictionary } from '@prisma/sdk';
export declare class GeneratorFormatNotValidError extends Error {
    config: Dictionary<string>;
    constructor(config: any);
}
export declare class GeneratorPathNotExists extends Error {
}
export declare const handleGenerateError: (e: Error) => void;
