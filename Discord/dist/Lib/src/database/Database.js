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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
const umzug_1 = require("umzug");
const fs_1 = require("fs");
const mariadb_1 = require("mariadb");
var TYPES = sequelize_1.Transaction.TYPES;
class Database {
    constructor(connectionConfiguration, modelsPath, migrationsPath) {
        this.modelsPath = modelsPath;
        this.migrationsPath = migrationsPath;
        this.databaseConfiguration = connectionConfiguration;
    }
    init(doMigrations) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectDatabase();
            if (doMigrations) {
                yield this.umzug.up();
            }
            yield this.initModels();
        });
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sequelize) {
                return;
            }
            const dbName = `${this.databaseConfiguration.prefix}_${this.databaseConfiguration.databaseName}`;
            if (this.databaseConfiguration.rootPassword) {
                const mariadbConnection = yield (0, mariadb_1.createConnection)({
                    host: this.databaseConfiguration.host,
                    port: this.databaseConfiguration.port,
                    user: this.databaseConfiguration.rootUser,
                    password: this.databaseConfiguration.rootPassword
                });
                yield mariadbConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
                try {
                    yield mariadbConnection.execute(`GRANT ALL PRIVILEGES ON ${dbName}.* TO '${this.databaseConfiguration.user}'@${this.databaseConfiguration.host};`);
                }
                catch (_a) {
                    yield mariadbConnection.execute(`GRANT ALL PRIVILEGES ON ${dbName}.* TO '${this.databaseConfiguration.user}';`);
                }
                yield mariadbConnection.end();
            }
            this.sequelize = new sequelize_1.Sequelize(`${dbName}`, this.databaseConfiguration.user, this.databaseConfiguration.userPassword, {
                dialect: "mariadb",
                host: this.databaseConfiguration.host,
                port: this.databaseConfiguration.port,
                logging: false,
                transactionType: TYPES.IMMEDIATE
            });
            yield this.sequelize.authenticate();
            this.umzug = new umzug_1.Umzug({
                context: this.sequelize.getQueryInterface(),
                logger: console,
                migrations: {
                    glob: ["*.js", { cwd: this.migrationsPath.replace("\\", "/") }]
                },
                storage: new umzug_1.SequelizeStorage({ sequelize: this.sequelize })
            });
        });
    }
    initModels() {
        return __awaiter(this, void 0, void 0, function* () {
            const modelsFiles = yield fs_1.promises.readdir(this.modelsPath);
            const models = [];
            for (const modelFile of modelsFiles) {
                yield this.initModelFromFile(modelFile, models);
            }
        });
    }
    initModelFromFile(modelFile, models) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelSplit = modelFile.split(".");
            const modelName = modelSplit[0];
            if (modelSplit[1] !== "js" || modelSplit.length !== 2) {
                return;
            }
            const model = yield Promise.resolve(`${`${this.modelsPath}/${modelName}`}`).then(s => require(s));
            models.push(model);
            if (model.initModel) {
                yield model.initModel(this.sequelize);
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map