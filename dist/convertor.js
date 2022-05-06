"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConvertor = void 0;
const class_1 = require("./components/class");
const decorator_1 = require("./components/decorator");
const field_1 = require("./components/field");
const util_1 = require("./util");
const primitiveMapType = {
    Int: 'number',
    String: 'string',
    DateTime: 'Date',
    Boolean: 'boolean',
    Json: 'any',
    BigInt: 'bigint',
    Float: 'number',
    Decimal: 'number',
    Bytes: 'Buffer',
};
class PrismaConvertor {
    constructor() {
        this.extractSwaggerDecoratorFromField = (dmmfField) => {
            const options = {};
            const decorator = new decorator_1.PrismaDecorator({
                name: 'ApiProperty',
                importFrom: '@nestjs/swagger',
            });
            let type = primitiveMapType[dmmfField.type];
            if (type && type !== 'any') {
                options.type = (0, util_1.capitalizeFirst)(type);
                decorator.params.push(options);
                return decorator;
            }
            type = dmmfField.type;
            if (dmmfField.isList) {
                options['isArray'] = true;
            }
            if (dmmfField.relationName) {
                options.type = (0, util_1.wrapArrowFunction)(dmmfField.type);
                decorator.params.push(options);
                return decorator;
            }
            if (dmmfField.kind === 'enum') {
                options.enum = dmmfField.type;
                options.enumName = (0, util_1.wrapQuote)(dmmfField.type);
            }
            decorator.params.push(options);
            return decorator;
        };
        this.convertModel = (model) => {
            const { useSwagger } = this.config;
            const pClass = new class_1.PrismaClass({
                name: model.name,
            });
            const fields = model.fields.map((field) => {
                const converted = this.convertField(field);
                if (useSwagger) {
                    const decorator = this.extractSwaggerDecoratorFromField(field);
                    converted.decorators.push(decorator);
                }
                return converted;
            });
            const relationTypes = model.fields
                .filter((field) => field.relationName && model.name !== field.type)
                .map((v) => v.type);
            const enums = model.fields.filter((field) => field.kind === 'enum');
            pClass.fields = fields;
            pClass.relationTypes = (0, util_1.uniquify)(relationTypes);
            pClass.enumTypes = enums.map((field) => field.type);
            return pClass;
        };
        this.convertModels = () => {
            return this.dmmf.datamodel.models.map((model) => this.convertModel(model));
        };
        this.convertField = (dmmfField) => {
            const field = new field_1.PrismaField({
                name: dmmfField.name,
            });
            let type = primitiveMapType[dmmfField.type];
            if (type) {
                field.type = type;
                if (dmmfField.isList) {
                    field.type = (0, util_1.arrayify)(type);
                }
                return field;
            }
            field.type = dmmfField.type;
            if (dmmfField.isList) {
                field.type = (0, util_1.arrayify)(field.type);
            }
            return field;
        };
    }
    get dmmf() {
        return this._dmmf;
    }
    set dmmf(value) {
        this._dmmf = value;
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
    }
    static getInstance() {
        if (PrismaConvertor.instance) {
            return PrismaConvertor.instance;
        }
        PrismaConvertor.instance = new PrismaConvertor();
        return PrismaConvertor.instance;
    }
}
exports.PrismaConvertor = PrismaConvertor;
//# sourceMappingURL=convertor.js.map