using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Http;
using Xunit;
using UploadFilesServer;
using System.Threading.Tasks;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
namespace UploadFilesServer.Tests
{
    public class UserApiTest
    {
        private readonly HttpClient _client;
        public UserApiTest()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseStartup<Startup>());
            _client = server.CreateClient();
        }
        [Theory]
        [InlineData("Get")]
        public async Task UserGetAllTestAsync(string method)
        {
            try
            {
                //Arrange
                var request = new HttpRequestMessage(new HttpMethod(method), "/api/users");

                //Act
                var response = await _client.SendAsync(request);

                //Assert
                response.EnsureSuccessStatusCode();
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
