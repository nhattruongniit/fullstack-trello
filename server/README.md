# BE
- Code: express, prisma ORM

## prisma ORM:
https://www.prisma.io/express
```bash
# generate schema to code 
$ yarn prisma generate

# create migrations version every update schema
$ yarn prisma migrate dev --create-only --name ${name}

# apply migration file to db
$ yarn prisma migrate deploy
```

- DB: postgreSql
- Deploy: docker