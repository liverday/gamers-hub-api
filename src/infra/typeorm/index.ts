import { Connection, createConnection, getConnectionOptions } from 'typeorm';

(async (name: string = 'default'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            name
        })
    )
})();