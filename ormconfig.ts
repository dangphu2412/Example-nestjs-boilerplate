import { DB_TYPE, DB_URI } from "./src/env";
export =
  [
    {
      "name": "default",
      "type": DB_TYPE,
      "url": DB_URI,
      "synchronize": false,
      "migrations": ["src/database/migrations/*.ts"],
      "entities": ["src/**/*.entity{.ts,.js}"],
      "factories": ["src/database/factories/**/*.factory{.ts,.js}"],
      "seeds": [`src/database/seedings/**/*.seed{.ts,.js}`],
      "cli": {
        migrationsDir: "src/database/migrations",
      }
    }
  ];
