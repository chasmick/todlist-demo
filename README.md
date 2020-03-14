# Todolist Demo Application

Requirements: dotnet core, tsc

Start the api server:
dotnet run

Prepare the client:
cd TodoWebApi\wwwroot
npm install
npm run build

Navigate to http://localhost:5000 to start building your task list!

Server Notes:
- API is a dotnet core Web API 
- SQLite database for persistent storage
- Server unit tests included

Client Notes:
- Written in Typescript
- Hyperscript for pure JavaScript templating
- Pub/sub mechanism for dispatching events
- Vanilla JS component model using one-way databinding
- Supported browsers: Chrome, Firefox, and Safari





