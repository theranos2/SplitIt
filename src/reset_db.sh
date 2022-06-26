rm -rf Migrations/
rm -f database.db
dotnet ef migrations add "Initial" && dotnet ef database update 