# gyst
A selfhosted productivity app

### Setup instruction
1. Go to packages -> server folder
2. run `yarn install` ( this should install all the dependencies)
3. Setup the Database
    - First create a env file and Put your DB password with the variable name DB_PASSWORD

    ```
    DB_PASSWORD=verystrongPassw0rd
    ```
    - Now, run the scripts/schema.sql on your DB
4. Now, To setup your client
  - Go to packages -> server folder
  - run  `yarn install` ( this should install all the dependencies) 
#### Run from root dir
  - run the server first 
  ```js
    yarn workspace server start
  ```
  - run the client
  ```
    yarn workspace app start
  ```
