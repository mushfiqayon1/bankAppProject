"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor() {
        this.repo = Repository;
        this.insert = async (table, data) => {
            return new Promise(async (resolve, reject) => {
                return await this.repo
                    .isTableInDB(table)
                    .then(async (tables) => {
                    return tables[table].push(data)
                        ? resolve(this.repo.SUCCESS)
                        : reject(this.repo.FAILURE);
                })
                    .catch((error) => reject(error));
            });
        };
        this.update = async (table, index, data) => {
            return new Promise(async (resolve, reject) => {
                return await this.repo
                    .isTableInDB(table)
                    .then((tables) => {
                    return tables[table].splice(index, 1, data)
                        ? resolve(this.repo.SUCCESS)
                        : reject(this.repo.FAILURE);
                })
                    .catch((error) => reject(error));
            });
        };
        this.delete = async (table, index) => {
            return new Promise(async (resolve, reject) => {
                return await this.repo
                    .isTableInDB(table)
                    .then((tables) => {
                    return tables[table].splice(index, 1).length
                        ? resolve(this.repo.SUCCESS)
                        : reject(this.repo.FAILURE);
                })
                    .catch((error) => reject(error));
            });
        };
        this.findAll = async (table) => {
            return new Promise(async (resolve, reject) => {
                return await this.repo
                    .isTableInDB(table)
                    .then(async (tables) => {
                    return tables[table].length > 0
                        ? resolve(tables[table])
                        : resolve([]);
                })
                    .catch((error) => reject(error));
            });
        };
        this.findByKey = async (table, searchOptions) => {
            return new Promise(async (resolve, reject) => {
                return await this.repo
                    .isTableInDB(table)
                    .then(async () => {
                    return await this.findAll(table)
                        .then((tableData) => {
                        const result = tableData
                            .map((tableObj) => tableObj[this.useKey(searchOptions)] === searchOptions.id &&
                            tableObj)
                            .filter((transaction) => transaction);
                        return resolve(result);
                    })
                        .catch(() => reject([]));
                })
                    .catch((error) => reject(error));
            });
        };
        this.findById = async (id, table) => new Promise(async (resolve) => resolve(await this.findByKey(table, { key: this.useKey(), id: id })));
        this.isExistingAccount = async (search, searchOptions) => {
            return new Promise(async (resolve, reject) => {
                await this.repo.tables().then((tables) => {
                    const [isAccountInDB] = tables.accounts
                        .map((account, idx) => account[this.useKey(searchOptions)] === search && {
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
        this.useKey = (searchOptions) => searchOptions !== undefined ? searchOptions.key : 'id';
    }
}
exports.Repository = Repository;
_a = Repository;
Repository.swyftDatabase = [
    {
        accounts: [],
        transactions: [],
    },
];
Repository.DATASTORE = Repository.swyftDatabase;
Repository.SUCCESS = true;
Repository.FAILURE = false;
Repository.isTableEmpty = async (table) => {
    return new Promise(async (resolve, reject) => {
        const $_this = Repository;
        return await $_this
            .isTableInDB(table)
            .then(async (tables) => {
            return tables[table].length <= 0
                ? reject($_this.SUCCESS)
                : resolve($_this.FAILURE);
        })
            .catch((error) => reject(error));
    });
};
Repository.isTableInDB = async (table) => {
    return new Promise(async (resolve, reject) => {
        const $_this = Repository;
        return await $_this
            .tables()
            .then((tables) => Object.keys(tables).includes(table)
            ? resolve(tables)
            : reject($_this.FAILURE))
            .catch((error) => reject(error));
    });
};
Repository.tables = () => {
    const [tables] = Repository.DATASTORE;
    return new Promise((resolve) => resolve(tables));
};
//# sourceMappingURL=repository.js.map