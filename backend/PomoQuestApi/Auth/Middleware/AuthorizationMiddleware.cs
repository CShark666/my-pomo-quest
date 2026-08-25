namespace PomoQuestApi.Auth.Middleware
{
    public class AuthorizationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;
        public async Task InvokeAsync(HttpContext context)
        {
            if (RequiresAuthentication(context) && context.User.Identity?.IsAuthenticated != true)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
            await _next(context);
        }

        private static bool RequiresAuthentication(HttpContext context)
        {
            return context.GetEndpoint()?
                .Metadata
                .GetMetadata<RequiresAuthAttribute>() is not null;
        }
    }
}