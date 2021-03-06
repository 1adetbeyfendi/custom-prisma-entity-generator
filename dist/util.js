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
exports.writeTSFile = exports.toArray = exports.parseBoolean = exports.log = exports.wrapQuote = exports.wrapArrowFunction = exports.arrayify = exports.uniquify = exports.getRelativeTSPath = exports.capitalizeFirst = void 0;
const sdk_1 = require("@prisma/sdk");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const generator_1 = require("./generator");
const error_handler_1 = require("./error-handler");
const capitalizeFirst = (src) => {
    return src.charAt(0).toUpperCase() + src.slice(1);
};
exports.capitalizeFirst = capitalizeFirst;
const getRelativeTSPath = (from, to) => {
    let rel = path
        .relative(path.resolve(path.dirname(from)), to)
        .replace('.ts', '');
    if (path.dirname(from) === path.dirname(to)) {
        rel = `./${rel}`;
    }
    return rel;
};
exports.getRelativeTSPath = getRelativeTSPath;
const uniquify = (src) => {
    return [...new Set(src)];
};
exports.uniquify = uniquify;
const arrayify = (src) => {
    return src + '[]';
};
exports.arrayify = arrayify;
const wrapArrowFunction = (src) => {
    return `() => ${src}`;
};
exports.wrapArrowFunction = wrapArrowFunction;
const wrapQuote = (src) => {
    return `'${src}'`;
};
exports.wrapQuote = wrapQuote;
const log = (src) => {
    sdk_1.logger.info(`[${generator_1.GENERATOR_NAME}]:${src}`);
};
exports.log = log;
const parseBoolean = (value) => {
    if (['true', 'false'].includes(value.toString()) === false) {
        throw new error_handler_1.GeneratorFormatNotValidError('parseBoolean failed');
    }
    return value.toString() === 'true';
};
exports.parseBoolean = parseBoolean;
const toArray = (value) => {
    return Array.isArray(value) ? value : [value];
};
exports.toArray = toArray;
const writeTSFile = (fullPath, content, dryRun = true) => {
    (0, exports.log)(`${dryRun ? '[dryRun] ' : ''}Generate ${fullPath}`);
    if (dryRun) {
        console.log(content);
        return;
    }
    const dirname = path.dirname(fullPath);
    if (fs.existsSync(dirname) === false) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
};
exports.writeTSFile = writeTSFile;
//# sourceMappingURL=util.js.map