"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClassFile = void 0;
const change_case_1 = require("change-case");
const import_1 = require("./import");
const path = __importStar(require("path"));
const util_1 = require("../util");
const generator_1 = require("../generator");
class PrismaClassFile {
    constructor(prismaClass) {
        this._imports = [];
        this.echoImports = () => {
            return this.imports
                .reduce((result, importRow) => {
                result.push(importRow.echo());
                return result;
            }, [])
                .join('\r\n');
        };
        this.echo = () => {
            return this.prismaClass
                .echo()
                .replace('#!{IMPORTS}', this.echoImports());
        };
        this.prismaClass = prismaClass;
    }
    get dir() {
        return this._dir;
    }
    set dir(value) {
        this._dir = value;
    }
    get filename() {
        return this._filename;
    }
    set filename(value) {
        this._filename = value;
    }
    get imports() {
        return this._imports;
    }
    set imports(value) {
        this._imports = value;
    }
    get prismaClass() {
        return this._prismaClass;
    }
    set prismaClass(value) {
        this._prismaClass = value;
    }
    registerImport(item, from) {
        const oldIndex = this.imports.findIndex((_import) => _import.from === from);
        if (oldIndex > -1) {
            this.imports[oldIndex].add(item);
            return;
        }
        this.imports.push(new import_1.PrismaImport(from, item));
    }
    resolveImports() {
        const generator = generator_1.PrismaClassGenerator.getInstance();
        this.prismaClass.relationTypes.forEach((relationClassName) => {
            this.registerImport(`${(0, change_case_1.pascalCase)(relationClassName)}`, PrismaClassFile.TEMP_PREFIX + relationClassName);
        });
        this.prismaClass.enumTypes.forEach((enumName) => {
            this.registerImport(enumName, generator.getClientImportPath(this.dir));
        });
        this.prismaClass.decorators.forEach((decorator) => {
            this.registerImport(decorator.name, decorator.importFrom);
        });
        this.prismaClass.fields.forEach((field) => {
            field.decorators.forEach((decorator) => {
                this.registerImport(decorator.name, decorator.importFrom);
            });
        });
    }
    write(dryRun) {
        const filePath = path.resolve(this.dir, this.filename);
        (0, util_1.writeTSFile)(filePath, this.echo(), dryRun);
    }
    getRelativePath(to) {
        return (0, util_1.getRelativeTSPath)(this.getPath(), to);
    }
    getPath() {
        return path.resolve(this.dir, this.filename);
    }
}
exports.PrismaClassFile = PrismaClassFile;
PrismaClassFile.TEMP_PREFIX = '__TEMPORARY_CLASS_PATH__';
//# sourceMappingURL=file.js.map