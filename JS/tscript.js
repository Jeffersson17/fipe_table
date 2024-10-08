"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
function getBrandCode(mark) {
    return __awaiter(this, void 0, void 0, function () {
        var request, response, _i, response_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(BASE_URL)];
                case 1:
                    request = _a.sent();
                    response = request.data;
                    for (_i = 0, response_1 = response; _i < response_1.length; _i++) {
                        item = response_1[_i];
                        if (item.nome.toUpperCase() === mark.toUpperCase()) {
                            return [2 /*return*/, item.codigo];
                        }
                    }
                    return [2 /*return*/, 'Marca não encontrada'];
            }
        });
    });
}
function getModelCode(code_brand, model_name) {
    return __awaiter(this, void 0, void 0, function () {
        var url, request, response, _i, response_2, item, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = "".concat(BASE_URL, "/").concat(code_brand, "/modelos");
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    request = _a.sent();
                    response = request.data.modelos;
                    for (_i = 0, response_2 = response; _i < response_2.length; _i++) {
                        item = response_2[_i];
                        if (item.nome.toUpperCase().includes(model_name.toUpperCase())) {
                            return [2 /*return*/, item.codigo];
                        }
                    }
                    return [2 /*return*/, 'Modelo não encontrado'];
                case 2:
                    error_1 = _a.sent();
                    console.log('Erro na requisição: ', error_1.message);
                    return [2 /*return*/, 'Erro ao buscar o modelo'];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPrice(code_brand, code_model, age) {
    return __awaiter(this, void 0, void 0, function () {
        var url, request, response, _i, response_3, item, priceUrl, response_price, price, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    url = "".concat(BASE_URL, "/").concat(code_brand, "/modelos/").concat(code_model, "/anos");
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    request = _a.sent();
                    response = request.data;
                    _i = 0, response_3 = response;
                    _a.label = 2;
                case 2:
                    if (!(_i < response_3.length)) return [3 /*break*/, 5];
                    item = response_3[_i];
                    if (!item.nome.includes(String(age))) return [3 /*break*/, 4];
                    priceUrl = "".concat(BASE_URL, "/").concat(code_brand, "/modelos/").concat(code_model, "/anos/").concat(item.codigo);
                    return [4 /*yield*/, axios_1.default.get(priceUrl)];
                case 3:
                    response_price = _a.sent();
                    price = response_price.data.Valor;
                    return [2 /*return*/, price];
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, 'Ano não encontrado'];
                case 6:
                    error_2 = _a.sent();
                    console.error('Erro na requisição:', error_2.message);
                    return [2 /*return*/, 'Erro ao buscar o preço'];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getFipePrice(brand, model, age) {
    return __awaiter(this, void 0, void 0, function () {
        var brandCode, modelCode, price, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getBrandCode(brand)];
                case 1:
                    brandCode = _a.sent();
                    if (brandCode === 'Marca não encontrada') {
                        console.log(brandCode);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getModelCode(brandCode, model)];
                case 2:
                    modelCode = _a.sent();
                    if (modelCode === 'Modelo não encontrado') {
                        console.log(modelCode);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getPrice(brandCode, modelCode, age)];
                case 3:
                    price = _a.sent();
                    console.log("O pre\u00E7o do ".concat(model, " (").concat(age, ") \u00E9: ").concat(price));
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log('Erro ao procurar o preço na tabela FIPE: ', error_3.message);
                    return [2 /*return*/, "Erro ao procurar o pre\u00E7o!"];
                case 5: return [2 /*return*/];
            }
        });
    });
}
getFipePrice("Acura", "NSX 3.0", 1995);
