# Install dependencies and tools
init:
	dotnet restore
	dotnet tool restore
	# pip install pre-commit
	# pre-commit install

# Reset database
db-reset:
	rm -rf ./Migrations
	rm -f database.db
	dotnet ef migrations add "Initial"
	dotnet ef database update 


typescript-client:
	java -jar '../swagger-codegen-cli.jar' generate \
        -Dio.swagger.v3.parser.util.RemoteUrl.trustAll=true \
		-i https://localhost:5001/swagger/v1/swagger.json \
		-l typescript-fetch \
		-o './ClientApp/src/api' 

