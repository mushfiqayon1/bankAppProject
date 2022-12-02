import {
  BankAccountQuery,
  BankDatabaseTables,
} from "../essentials/typings/types";
import { Account } from "../accounts/entities/account.entity";
import { Transaction } from "../transactions/entities/transaction.entity";

export class Repository {
  //  Access to class name alias for non-static methods

  private readonly myRepo = Repository;

  //  Bank API Database

  private static readonly bankDatabase: Array<BankDatabaseTables> = [
    {
      accounts: [],
      transactions: [],
    },
  ];

  //   Bank API Database

  public static DATASTORE: Array<BankDatabaseTables> = Repository.bankDatabase;

  //  Constant initilization

  private static readonly SUCCESS: boolean = true;

  //  Constant initilization

  private static readonly FAILURE: boolean = false;

  // Insert data into table

  public insert = async (table: string, data: any): Promise<boolean> => {
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

  // Update data in table

  public update = async (
    table: string,
    index: number,
    data: any
  ): Promise<boolean> => {
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

  //  Retrieve all data from a given table

  public findAll = async (
    table: string
  ): Promise<Array<Account> | Array<Transaction>> => {
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

  //  Retrieve all data that matches the provided search options

  public findByKey = async (
    table: string,
    searchCategory?: { key: string; id: string }
  ): Promise<Array<Transaction | Account> | boolean> => {
    return new Promise(async (resolve, reject) => {
      return await this.myRepo
        .isTableInDB(table)
        .then(async () => {
          return await this.findAll(table)
            .then((tableData) => {
              const result = tableData
                .map(
                  (tableObj: Account | Transaction) =>
                    tableObj[this.useKey(searchCategory)] ===
                      searchCategory.id && tableObj
                )
                .filter((transaction) => transaction);

              return resolve(result);
            })
            .catch(() => reject([]));
        })
        .catch((error) => reject(error));
    });
  };

  // Find a given account by Id

  public findById = async (
    id: string,
    table: string
  ): Promise<Array<Account | Transaction> | boolean> =>
    new Promise(async (resolve) =>
      resolve(await this.findByKey(table, { key: this.useKey(), id: id }))
    );

  // Chekc if a given table in the database is empty

  public static isTableEmpty = async (table: string): Promise<boolean> => {
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

  //  Checks if a given table exists in the database

  public static isTableInDB = async (
    table: string
  ): Promise<boolean | BankDatabaseTables> => {
    return new Promise(async (resolve, reject) => {
      const inThisRepo = Repository;
      return await inThisRepo
        .tables()
        .then((tables) =>
          Object.keys(tables).includes(table)
            ? resolve(tables)
            : reject(inThisRepo.FAILURE)
        )
        .catch((error) => reject(error));
    });
  };

  //  If a queries exis on a given account in the database.
  //  If no search options is provided, bu default it will use the ID

  public isExistingAccount = async (
    search: string,
    searchCategory?: {
      key: string;
    }
  ): Promise<BankAccountQuery> => {
    return new Promise(async (resolve, reject) => {
      await this.myRepo.tables().then((tables) => {
        const [isAccountInDB]: undefined | Array<BankAccountQuery> =
          tables.accounts
            .map(
              (account: Account, idx: number) =>
                account[this.useKey(searchCategory)] === search && {
                  account: { ...account },
                  index: idx,
                }
            )
            .filter((account) => account);

        return isAccountInDB === undefined
          ? reject([])
          : resolve(isAccountInDB);
      });
    });
  };

  // Retrive all tables in the database

  public static tables = (): Promise<BankDatabaseTables> => {
    const [tables]: Array<BankDatabaseTables> = Repository.DATASTORE;
    return new Promise((resolve) => resolve(tables));
  };

  //  Defaults to ID key if no searchCategory is provided

  public useKey = (searchCategory?: Record<string, string>) =>
    searchCategory !== undefined ? searchCategory.key : "id";
}
