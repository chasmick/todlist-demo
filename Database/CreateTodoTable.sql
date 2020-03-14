
/*
SQLite Table Definitions
The database and table(s) will be created automatically by the app if it doesn't exist
*/
CREATE TABLE TodoItems (
    Id         INTEGER NOT NULL
                       CONSTRAINT PK_TodoItems PRIMARY KEY AUTOINCREMENT,
    Name       TEXT,
    IsComplete INTEGER NOT NULL
);
