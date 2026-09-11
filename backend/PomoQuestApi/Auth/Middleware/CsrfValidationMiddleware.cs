using System.Security.Claims;

namespace PomoQuestApi.Auth.Middleware
{
    public class CsrfValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly string[] SafeMethods = { "GET", "HEAD", "OPTIONS" };

        public CsrfValidationMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            if (SafeMethods.Contains(context.Request.Method) || context.Request.Path.StartsWithSegments("/auth/login"))
            {
                await _next(context);
                return;
            }

            var sessionId = context.Request.Cookies["session_id"];
            var headerToken = context.Request.Headers["XSRF-TOKEN"].FirstOrDefault();

            if (sessionId is null || headerToken is null)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            var expectedToken = context.User.FindFirstValue("XSRF-TOKEN");

            if (expectedToken is null || headerToken != expectedToken)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("CSRF token invalid");
                return;
            }

            await _next(context);
        }
    }
}