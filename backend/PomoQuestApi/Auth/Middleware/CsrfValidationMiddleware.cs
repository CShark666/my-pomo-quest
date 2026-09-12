using System.Security.Claims;
using PomoQuestApi.Auth.Services;

namespace PomoQuestApi.Auth.Middleware
{
    public class CsrfValidationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;
        private static readonly string[] SafeMethods = ["GET", "HEAD", "OPTIONS"];

        public async Task InvokeAsync(HttpContext context, SessionService sessionService)
        {
            if (SafeMethods.Contains(context.Request.Method) || context.Request.Path.StartsWithSegments("/auth/login"))
            {
                await _next(context);
                return;
            }

            var headerToken = context.Request.Headers["XSRF-TOKEN"].FirstOrDefault();

            if (headerToken is null)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            var expectedToken = context.User.FindFirstValue("XSRF-TOKEN");

            if (expectedToken is null || !sessionService.VerifyCsrfToken(headerToken, expectedToken))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("CSRF token invalid");
                return;
            }

            await _next(context);
        }
    }
}