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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = require("../interfaces/user");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: Object.values(user_1.Gender), required: true },
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    },
    preferences: [{ type: String }]
});
// Static methods
UserSchema.statics.findByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email: email });
    });
};
UserSchema.statics.getAllUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.find({});
    });
};
UserSchema.statics.findByFirstName = function (firstName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.find({ firstName: new RegExp(firstName, 'i') });
    });
};
// Virtual
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map