using System;
using System.Collections.Generic;
using System.Text;
using UploadFilesServer.Controllers;
using UploadFilesServer.Context;
using Microsoft.EntityFrameworkCore;
using Xunit;
using UploadFilesServer.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore.Query;
namespace UploadFilesServer.Tests
{
    public class UserControllerTest
    {
        UsersController _controller;
        UserContext _userContext;
        public static DbContextOptions<UserContext> dbContextOptions { get; set; }
        public static string connectionString = "Server=DESKTOP-1BD6V7M;Database=UploadFiles;";
        public UserControllerTest()
        {
            dbContextOptions = new DbContextOptionsBuilder<UserContext>().Options;
                
            _userContext = new UserContext(dbContextOptions);
            _controller = new UsersController(_userContext);
        }

        [Fact]
        public void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            //Arrage
            var nameMissingItem = new User()
            {
                ImgPath = "test.jpeg",
                ImgSize = "123456"
            };
            _controller.ModelState.AddModelError("Name", "Required");

            //Act
            var badResponse = _controller.CreateUser(nameMissingItem);

            //Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        public void Add_ValidObjectPassed_ReturnsOkResponse()
        {
            //Arrange
            var validItem = new User
            {
                
                Name = "Anthony",
                ImgPath = "test.jpeg",
                ImgSize = "123456",
                Up_time = "2019-04-26 00-00-00"
            };

            //Act
            var createResponse = _controller.CreateUser(validItem);

            //Asert
            Assert.IsType<OkResult>(createResponse);

        }
        

    }
}
