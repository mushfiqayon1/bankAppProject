"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor() {
        this.myRepo = Repository;
        this.insert = async (table, data) => {
            return new Promise(async (resolve, reject) => {
                return await this.myRepo
                    .isTableInDB(table)
                    .then(async (tables) => {
                    return tables[table].push(data)
                        ? resolve(this.myRepo.SUCCESS)
                        : reject(this.myRepo.FAILURE);
                })
                    .catch((error) => reject(error));
            });
        };
        this.update = async (table, index, data) => {
            return new Promise(async (resolve, reject) => {
                return await this.myRepo
                    .isTableInDB(table)
                    .then((tables) => {
                    return tables[table].splice(index, 1, data)
                        ? resolve(this.myRepo.SUCCESS)
                        : reject(this.myRepo.FAILURE);
                })
                    .catch((error) => reject(error));
            });
        };
        this.findAll = async (table) => {
            return new Promise(async (resolve, reject) => {
                return await this.myRepo
                    .isTableInDB(table)
                    .then(async (tables) => {
                    return tables[table].length > 0
                        ? resolve(tables[table])
                        : resolve([]);
                })
                    .catch((error) => reject(error));
            });
        };
        this.findByKey = async (table, searchCategory) => {
            return new Promise(async (resolve, reject) => {
                return await this.myRepo
                    .isTableInDB(table)
                    .then(async () => {
                    return await this.findAll(table)
                        .then((tableData) => {
                        const result = tableData
                            .map((tableObj) => tableObj[this.useKey(searchCategory)] ===
                            searchCategory.id && tableObj)
                            .filter((transaction) => transaction);
                        return resolve(result);
                    })
                        .catch(() => reject([]));
                })
                    .catch((error) => reject(error));
            });
        };
        this.findById = async (id, table) => new Promise(async (resolve) => resolve(await this.findByKey(table, { key: this.useKey(), id: id })));
        this.isExistingAccount = async (search, searchCategory) => {
            return new Promise(async (resolve, reject) => {
                await this.myRepo.tables().then((tables) => {
                    const [isAccountInDB] = tables.accounts
                        .map((account, idx) => account[this.useKey(searchCategory)] === search && {
                        account: Object.assign({}, account),
                        index: idx,
                    })
                        .filter((account) => account);
                    return isAccountInDB === undefined
                        ? reject([])
                        : resolve(isAccountInDB);
                });
            });
        };
        this.useKey = (searchCategory) => searchCategory !== undefined ? searchCategory.key : "id";
    }
}
exports.Repository = Repository;
_a = Repository;
Repository.bankDatabase = [
    {
        accounts: [],
        transactions: [],
    },
];
Repository.DATASTORE = Repository.bankDatabase;
Repository.SUCCESS = true;
Repository.FAILURE = false;
Repository.isTableEmpty = async (table) => {
    return new Promise(async (resolve, reject) => {
        const inThisRepo = Repository;
        return await inThisRepo
            .isTableInDB(table)
            .then(async (tables) => {
            return tables[table].length <= 0
                ? reject(inThisRepo.SUCCESS)
                : resolve(inThisRepo.FAILURE);
        })
            .catch((error) => reject(error));
    });
};
Repository.isTableInDB = async (table) => {
    return new Promise(async (resolve, reject) => {
        const inThisRepo = Repository;
        return await inThisRepo
            .tables()
            .then((tables) => Object.keys(tables).includes(table)
            ? resolve(tables)
            : reject(inThisRepo.FAILURE))
            .catch((error) => reject(error));
    });
};
Repository.tables = () => {
    const [tables] = Repository.DATASTORE;
    return new Promise((resolve) => resolve(tables));
};
//# sourceMappingURL=repository.js.map