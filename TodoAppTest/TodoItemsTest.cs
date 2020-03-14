using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TodoApp.Controllers;
using TodoApp.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Linq;

namespace TodoAppTest
{
    [TestClass]
    public class TodoItemsTest
    {

        [TestMethod]
        public void Can_Add_Todo_Item()
        {

            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<TodoContext>()
                    .UseSqlite(connection)
                    .Options;

            // Create the schema in the database
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
            }

            // separte context inserting the data
            using (var context = new TodoContext(options))
            {
                var controller = new TodoItemsController(context);
                TodoItem item = new TodoItem()
                {
                    Name = "Can_Add_Todo_Item",
                    IsComplete = false                   
                };
                ActionResult<TodoItem> result = controller.PostTodoItem(item);
                context.SaveChanges();
            }

            // separate context for checking data after insertion
            using (var context = new TodoContext(options))
            {
                var data = context.TodoItems as IQueryable<TodoItem>;
                Assert.AreEqual(1, data.Count());
                Assert.AreEqual("Can_Add_Todo_Item", data.Single().Name);
                Assert.IsFalse(data.Single().IsComplete);
            }
        }

        [TestMethod]
        public void Add_Todo_Item_Should_Not_Save_If_Supplied_Id()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<TodoContext>()
                    .UseSqlite(connection)
                    .Options;

            // Create the schema in the database
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
            }
          
            TodoItem item = new TodoItem()
            {
                Name = "Can_Add_Todo_Item",
                IsComplete = false,
                Id = 99
            };
            
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
                TodoItemsController controller = new TodoItemsController(context);
                var data = context.TodoItems as IQueryable<TodoItem>;
                Assert.AreEqual(0, data.Count());
            }            
        }

        [TestMethod]
        public void Can_Delete_Todo_Item()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<TodoContext>()
                    .UseSqlite(connection)
                    .Options;

            // Create the schema in the database
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
            }

            using (var context = new TodoContext(options))
            {
                var controller = new TodoItemsController(context);
                TodoItem item = new TodoItem()
                {
                    Name = "Can_Delete_Todo_Item",
                    IsComplete = false
                };
                ActionResult<TodoItem> result = controller.PostTodoItem(item);
                context.SaveChanges();
            }

            // separate context for verifying the deletion
            using (var context = new TodoContext(options))
            {
                var controller = new TodoItemsController(context);
                var data = context.TodoItems as IQueryable<TodoItem>;
                var item = data.Single();

                // first verify we have the record
                Assert.AreEqual(1, data.Count(), "delete test not properly seeded with data");

                controller.DeleteTodoItem(item.Id);          
                
                Assert.AreEqual(0, data.Count());
            }
        }

        [TestMethod]
        public void Can_Update_Todo_Item()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<TodoContext>()
                    .UseSqlite(connection)
                    .Options;

            // Create the schema in the database
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
            }

            // context for seeding the data
            using (var context = new TodoContext(options))
            {
                var controller = new TodoItemsController(context);
                TodoItem item = new TodoItem()
                {
                    Name = "Seeded_Update_Todo_Item",
                    IsComplete = false
                };
                ActionResult<TodoItem> result = controller.PostTodoItem(item);
                context.SaveChanges();
            }

            // context for updating
            using (var context = new TodoContext(options))
            {
                var controller = new TodoItemsController(context);
                var data = context.TodoItems as IQueryable<TodoItem>;
                var item = data.Single();

                item.Name = "Seeded_Update_Todo_Item_Was_Updated";
                item.IsComplete = true;

                IActionResult result = controller.PutTodoItem(item.Id, item);
            }

            // context for verifying the update took affect
            using (var context = new TodoContext(options))
            {
                context.Database.EnsureCreated();
                TodoItemsController controller = new TodoItemsController(context);
                Assert.AreEqual("Seeded_Update_Todo_Item_Was_Updated", context.TodoItems.Single().Name);
                Assert.IsTrue(context.TodoItems.Single().IsComplete);
            }
        }

    }
}
