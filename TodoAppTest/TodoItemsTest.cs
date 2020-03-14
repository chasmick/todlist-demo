using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TodoApp.Controllers;
using TodoApp.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TodoAppTest
{
    [TestClass]
    public class TodoItemsTest
    {

        private TodoContext _todoContext;

        [TestInitialize]
        public void Configure()
        {
            DbContextOptions<TodoContext> options = new DbContextOptions<TodoContext>();
            DbContextOptionsBuilder<TodoContext> optionsBuilder = new DbContextOptionsBuilder<TodoContext>(options);
            optionsBuilder.UseSqlite("Filename=AssessmentTest.db");
            _todoContext = new TodoContext(optionsBuilder.Options);
        }

        [TestMethod]
        public void Can_Add_Todo_Item()
        {
            TodoItemsController controller = new TodoItemsController(_todoContext);

            TodoItem item = new TodoItem()
            {
                Name = "Can_Add_Todo_Item",
                IsComplete = false
            };

            Task<ActionResult<TodoItem>> result = controller.PostTodoItem(item);

            Assert.AreEqual("201", result.Status);
        }

        [TestMethod]
        public void Add_Todo_Item_Should_Fail_If_Supplied_Id()
        {
            TodoItemsController controller = new TodoItemsController(_todoContext);

            TodoItem item = new TodoItem()
            {
                Name = "Can_Add_Todo_Item",
                IsComplete = false,
                Id = 99
            };

            Task<ActionResult<TodoItem>> result = controller.PostTodoItem(item);

            Assert.AreEqual(TaskStatus.Faulted, result.Status);
        }

        [TestMethod]
        public void Can_Delete_Todo_Item()
        {
            
        }

        [TestMethod]
        public void Can_Update_Todo_Item()
        {
            
        }

    }
}
