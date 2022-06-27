# Install dependencies and tools
init:
	dotnet restore
	dotnet tool restore

# Reset database
db-reset:
	rm -rf ./Migrations
	rm -f database.db
	dotnet ef migrations add "Initial"
	dotnet ef database update 
