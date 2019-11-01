using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthTest.API.Data;
using AuthTest.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthTest.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IUserHelper _userHelper;
        public UserController(IUserRepository repo, IUserHelper userHelper)
        {
            this._userHelper = userHelper;
            this._repo = repo;
        }

        [HttpPost("updatename")]
        public async Task<IActionResult> UpdateName(string name)
        {
            var userId = _userHelper.GetCurrentUserId();
            if (userId == null)
                return BadRequest("Cannot find user");
            
            if (await _repo.UserExists(name))
                return BadRequest("Username already taken");

            if (!await _repo.UpdateName(userId.Value, name))
                return BadRequest("Cannot update user name");

            return Ok();
        }
    }
}