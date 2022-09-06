# dotnetcore-angular-inventory-management  

## Built With  
* [SQL_Server](https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver16/// "SQL Server technical documentation")
* [C#](https://docs.microsoft.com/en-us/dotnet/csharp/// "C# documentation")   
* [DotNet_Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0/// "ASP.NET Core documentation")   
* [TypeScript](https://www.typescriptlang.org/docs/// "TypeScript documentation")  
* [Angular](https://angular.io/docs// "Angular Documentation")  

## Getting Started  
### Prerequisites
* [Node.js](https://nodejs.org/en/ "Download Node.js 16.15.0 LTS")  

### Project Setup (VS Code)
* Angular
  * Install Angular CLI globally (one time setup)  
  ```bash
  npm install -g @angular/cli
  ng version
  ```   
  * Open project in vsCode (command run in the project directory)  
  ```bash
  code .
  ```   
  * Create Angular App  
  ```bash
  ng new project-name
  ```    
  * Run the project and open http://localhost:4200   
  ```bash
  ng serve
  ```   

  * Create new Angular Component  
  ```bash 
  ng generate component componentName
  
  --dry-run 
  --skip-tests
  --module=app
  --skip-import 
  ```
  * Create new Angular Service  
  ```bash
  ng generate service service-name
  ```
  * Lazy loading  
  ```bash
  ng generate module name --route name --module app.module
  ```  
* DotNet Core   
  * Create web api project  
 ```bash
 dotnet new webapi
 ``` 
* SQL Server  
  * Add nuget package   
 ```bash
 dotnet add package Microsoft.EntityFrameworkCore.SqlServer
 dotnet add package Microsoft.EntityFrameworkCore.Design
 ```  
 * Migrations  
  * First Migration   
```bash
dotnet ef migrations add InitialCreate
```
  * Database schema   
```bash
dotnet ef database update
```

### Topics practiced to get things done  
  

### Error messages for future reference  
✖ Error: Invalid Character (typing ng --version in the terminal)   
Solution: Use bash (workaround)   
✖ Error: Property 'name' has no initializer and is not definitely assigned in the constructor.      
Solution: Add ```"strictPropertyInitialization": false``` in the compiler options of the tsconfig.json or a default value to the property.    
✖ Error: Can't bind to 'ngModel' since it isn't a known property of 'input'.      
Solution: Add FormsModule and ReactiveFormsModule to the imports array in app.module.ts.
