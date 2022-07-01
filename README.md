# Setting up development environment
- Ensure dotnet 5.0 SDK is installed
- Run `make init`, it executes:
    - `dotnet restore` to restore all project dependencies
    - `dotnet tool restore` to restore tools used for the project
    - Install `pre-commit` tool using `pip` and setup pre-commit hooks
- Ensure the latest LTS node version is installed (v16.15.1)
    - Use [nvm](https://github.com/nvm-sh/nvm) to make your life easier

# Database migrations
- Currently not in use
- Ensuring schema changes are reflected in database:
```
rm -rf Migrations/
rm -f database.db
dotnet ef migrations add "Initial" && dotnet ef database update 
```
- Or just run `make db-reset`

# Using Http Exceptions
```c#
using split_it.Exceptions.Http;

// On error
throw new HttpBadRequest("Reason");
throw new HttpInternalServer("Reason");
throw new HttpNotFound("Reason");
```
