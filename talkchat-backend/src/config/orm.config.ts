import configuration from './configuration';

export const ormConfig: any = () => {
  const { host, port, name, password, username } = configuration.db;
  return {
    type: 'mysql',
    host: host,
    port: +port,
    username: username,
    password: password,
    database: name,
    entities: [__dirname + '/../models/**/entity/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: ['dist/database/migrations/*.js'],
    //default charset
    charset: 'utf8_general_ci',
    cli: {
      entitiesDir: 'src/models/**/entity',
      migrationsDir: 'src/database/migrations',
    },
  };
};