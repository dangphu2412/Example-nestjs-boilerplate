<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Nestjs typeorm built-in filter with query</p>
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[Typeorm](https://typeorm.io) ORM TypeScript

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Built-in filter query with typeorm

Check it out with our example filter query in branch v1.1/filter-example
First let define some schema and use decorator to format query

```bash
/**
 * Rename User to @SpecifyName
 */
import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UserService} from '../service';
import {QueryContainer} from '@packages/restBuilder/core/QueryContainer';
import {QueryFactory} from '@packages/restBuilder/decorators/queryFactory';
import {ApiQuerySchema} from '@packages/restBuilder/decorators/apiQuerySchema';
import {RestBuilder} from '@packages/restBuilder/decorators/restBuilder';

@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(private service: UserService) { }

    @Get()
    @ApiQuerySchema()
    @RestBuilder({
        main: {
            alias: 'users',
            fields: ['id', 'username', 'password']
        },
        associates: [
            {
                table: 'roles',
                fields: ['id', 'name']
            }
        ]
    })
    getAll(@QueryFactory() query: QueryContainer) {
        return this.service.findAll(query);
    }
}
```
## Parsing query in request

### Query formatter

- Above will be the format of the input from query of the url (everything after question mark ('?') parameter)

- Example
```bash
http://localhost:3000/api/users?page=2&size=20&sort=id&filter=username|$eq|fusdeptrai
```

Then it will be form as interface below
```bash
FilterQueryRequest {
    page?: string;
    size?: string;
    sort?: string | Array<string>;
    filter?: string | Array<string>;
    associates?: AssociateSchema[];
    main?: MainSchema
}
```
- associates and main are things not coming from query. These will appear when we want to define main table with fields, alias and define association with its schema by using below decorator before each method in controller:

```bash
@Get
@RestBuilder({
    main: {
        alias: 'users',
        fields: ['id', 'username', 'password']
    },
    associates: [
        {
            table: 'roles',
            fields: ['id', 'name']
        }
    ]
})
getAll(@QueryFactory() query: QueryContainer) {
    return this.service.findAll(query);
}
```

- <b>main</b> will define alias and column selected in main table query in TypeormRepositoryBaseImpl
- <b>associates</b> are array of association which is defined in entity. So when we pass into <b>table</b> field typeorm will auto understand the relationship.
- <b>alias</b> will be used to defined as alias of join table.
- <b>joinType</b> have two type: 'left' and 'inner' which is left join and inner join. Because typeorm not support right join so base code not contain this one.
- <b>joinCondition</b> will contain condition for joining. It will be formatted as FilterSchema which will be talked later. 

- FilterQuery is a param decorator which help to format query to specific format as class <b>QueryFormatter</b> that help built-in query in base code. You can custom a query which is not using TypeormRepositoryBaseImpl, use native query or query builder only we can reuse this one.

```bash
QueryFormatter: {
    page?: number,
    size?: number,
    sort?: SortSchema[],
    filter?: FilterSchema[],
    associates?: AssociateSchema[],
    main?: MainSchema
}
```

- <b>page</b> is page that get from query. We can get limit get getOffset() method
- <b>size</b> is content size that get from query. We can get offset by getLimit() method
- <b>sort</b> is array of schema that help us to having well understand about direction that we gonna sort and column that we want to sort.
- <b>filter</b> is array of schema that help us to having well understand about <b>column</b> to be filtered, <b>sign</b> is some character we define in enum <b>FilterSign</b> that we defined before and the last one is <b>value</b>.

### Query document
- page and size pass into url:
```bash
localhost:3000/api/users?page=1&size=20
```
- If not pass any thing like this: <code>localhost:3000/api/users</code> which will have default page=1 and size=10 then when it comes to TypemOrmRepositoryBaseImpl will be format into offset=0 and limit=size=10

- sort pass into url:
```bash
localhost:3000/api/users?sort=username
localhost:3000/api/users?sort=-username
# Sort mutiple columns
localhost:3000/api/users?sort=username&sort=id&sort=-age
```
- With hyphen that column will be sorted as descending
- Sort with relational column:
```bash
localhost:3000/api/users?sort=roles.username
localhost:3000/api/users?sort=-roles.username
```

- filter pass into url:
```bash
localhost:3000/api/users?filter=username|$eq|somevalue
localhost:3000/api/users?filter=username|$like|somevalue&filter=id|$gt|4
```
- First argument is column that you want to filter, second is the sign related to condition in query and the last is value for filtering
- Here are some sign for filter:
```bash
{
    $eq = '=',
    $gt = '>',
    $ls = '<',
    $like = 'LIKE'
}
```
