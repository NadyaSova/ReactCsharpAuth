using System.Threading.Tasks;
using AuthTest.API.Models;

namespace AuthTest.API.Data
{
    public interface IUserRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task<bool> UpdateName(int userId, string username);
    }
}