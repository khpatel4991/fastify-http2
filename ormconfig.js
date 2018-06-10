const { 
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
} = process.env;

module.exports = {
   type: "postgres",
   host: POSTGRES_HOST || "0.0.0.0",
   port: 5432,
   username: POSTGRES_USER,
   password: POSTGRES_PASSWORD,
   database: POSTGRES_DB,
   synchronize: true,
   logging: true,
   entities: [
      "src/database/entity/**/*.ts",
   ],
   migrations: [
      "src/database/migration/**/*.ts",
   ],
   subscribers: [
      "src/database/subscriber/**/*.ts",
   ],
   cli: {
      entitiesDir: "src/database/entity",
      migrationsDir: "src/database/migration",
      subscribersDir: "src/database/subscriber",
   },
}