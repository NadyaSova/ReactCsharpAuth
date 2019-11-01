using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace AuthTest.API.Helpers
{
    public class UserHelper : IUserHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserHelper(IHttpContextAccessor httpContextAccessor)
        {
            this._httpContextAccessor = httpContextAccessor;

        }
        public int? GetCurrentUserId()
        {
            var identity = _httpContextAccessor.HttpContext?.User?.Identity as ClaimsIdentity;
            if (identity == null)
                return null;

            var userIdString = identity.FindFirst(ClaimTypes.NameIdentifier).Value;
            int userId;
            if (int.TryParse(userIdString, out userId))
                return userId;
            else
                return null;
        }
    }
}