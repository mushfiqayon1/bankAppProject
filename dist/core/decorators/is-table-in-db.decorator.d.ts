declare const isTableInDB: (table: any) => (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export default isTableInDB;
