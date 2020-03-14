# Todolist Demo Application

Requirements: dotnet core

Start the api server: <br/>
cd TodoApp
dotnet run

Prepare the client: <br/>
cd TodoApp/wwwroot <br/>
npm install <br/>
npm run build <br/>

Navigate to http://localhost:5000 to start building your task list!

Server Notes:
- API is a dotnet core Web API 
- SQLite database for persistent storage

Client Notes:
- Written in Typescript
- Hyperscript for pure JavaScript templating
- Pub/sub mechanism for dispatching events
- Vanilla JS component model using one-way databinding
- Supported browsers: Chrome, Firefox, and Safari





