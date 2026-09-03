using Microsoft.AspNetCore.Mvc;

namespace PomoQuestApi.Auth.Middleware
{
    public class ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger _logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                await HandleNotFoundAsync(context, ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception at {Path}", context.Request.Path);

                context.Response.StatusCode = ex switch
                {
                    ApplicationException => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError
                };

                await context.Response.WriteAsJsonAsync(
                    new ProblemDetails
                    {
                        Type = ex.GetType().Name,
                        Title = "An error occurred",
                        Detail = ex.Message
                    });
            }
        }
        private static Task HandleNotFoundAsync(HttpContext context, NotFoundException ex)
        {
            context.Response.ContentType = "application/problem+json";
            context.Response.StatusCode = StatusCodes.Status404NotFound;

            return context.Response.WriteAsJsonAsync(
                                    new ProblemDetails
                                    {
                                        Type = ex.GetType().Name,
                                        Title = "Not Found",
                                        Detail = ex.Message
                                    });
        }
    }
    public class NotFoundException(string message) : Exception(message)
    {
    }
}