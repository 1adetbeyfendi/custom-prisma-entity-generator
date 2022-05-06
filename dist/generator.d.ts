import { GeneratorOptions } from '@prisma/generator-helper';
export declare const GENERATOR_NAME = "Prisma Entity Generator";
export interface PrismaClassGeneratorConfig {
    useSwagger: boolean;
    dryRun: boolean;
    makeIndexFile: boolean;
    use: boolean;
}
export declare class PrismaClassGenerator {
    static instance: PrismaClassGenerator;
    _options: GeneratorOptions;
    rootPath: string;
    clientPath: string;
    constructor(options?: GeneratorOptions);
    get options(): GeneratorOptions;
    set options(value: GeneratorOptions);
    static getInstance(options?: GeneratorOptions): PrismaClassGenerator;
    getClientImportPath(from?: string): string;
    setPrismaClientPath(): void;
    run: () => Promise<void>;
    getConfig: () => PrismaClassGeneratorConfig;
}
