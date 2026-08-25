using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using PomoQuestApi.data;

namespace PomoQuestApi.Auth.Middleware
{
    public class AuthenticationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;
        public async Task InvokeAsync(HttpContext context, AppDbContext db)
        {
            var cookieSession = context.Request.Cookies["session_id"];

            if (!string.IsNullOrEmpty(cookieSession) && Guid.TryParse(cookieSession, out var sessionId))
            {
                var session = await db.Sessions
                    .Include(s => s.User)
                        .ThenInclude(u => u.Profile)
                    .FirstOrDefaultAsync(s => s.Id == sessionId);

                if (session != null && session.ExpiresAt > DateTime.UtcNow && session.User.IsActive)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier,session.User.Id.ToString()),

                        new Claim("session_id",session.Id.ToString()),

                        new Claim( "profile_id", session.User.Profile.Id.ToString()),

                        new Claim( ClaimTypes.Email, session.User.Profile.Email),

                        new Claim(ClaimTypes.Name, session.User.Profile.Name)
                    };

                    var identity = new ClaimsIdentity(claims, authenticationType: "Session");

                    context.User = new ClaimsPrincipal(identity);
                }
            }
            await _next(context);
        }
    }
}