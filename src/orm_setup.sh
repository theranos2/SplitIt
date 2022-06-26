dotnet new tool-manifest
dotnet tool install dotnet-ef --version 5.0
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --vserion 5.0 
dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0


#dotnet ef migrations add "commit name"
#dotnet ef database update  # used for creating database