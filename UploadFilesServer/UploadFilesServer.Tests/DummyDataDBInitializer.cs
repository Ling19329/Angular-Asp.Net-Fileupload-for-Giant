using System;
using System.Collections.Generic;
using System.Text;
using UploadFilesServer.Models;
using UploadFilesServer.Context;
namespace UploadFilesServer.Tests
{
    public class DummyDataDBInitializer
    {
        public DummyDataDBInitializer()
        {
        }
        
        public void Seed(UserContext dbContext)
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            dbContext.Users.AddRange(
                new User()
                {
                    Id = new Guid("62FA647C-AD54-4BCC-A860-E5A2664B019D"),
                    Name = "Harry Potter",
                    ImgPath = "Resources\\Images\\result1.png",
                    Up_time = "4/25/2019 11:48:15 PM"
                },
                new User()
                {
                    Id = new Guid("62FA647C-AD54-4BCC-A960-E5A2664B019D"),
                    Name = "Anthony",
                    ImgPath = "Resources\\Images\\result2.png",
                    Up_time = "4/26/2019 11:48:15 PM"
                }

            );
            dbContext.SaveChanges();
        }

        
        
    } 
}
