using Microsoft.AspNetCore.Mvc;

namespace PomoQuestApi.Middleware
{
    public class ExceptionHandlerMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = ex switch
                {
                    ApplicationException => StatusCodes.Status400BadRequest,
                    NoCurrentQuestException => StatusCodes.Status404NotFound,
                    _ => StatusCodes.Status500InternalServerError
                };

                var problemDetails = new ProblemDetails
                {
                    Type = ex.GetType().Name,
                    Title = "An error occurred",
                    Detail = ex.Message
                };

                problemDetails.Extensions["code"] = ex switch
                {
                    NoCurrentQuestException => "NO_CURRENT_QUEST",
                    ApplicationException => "BAD_REQUEST",
                    _ => "INTERNAL_ERROR"
                };

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
        }
    }
    public class NoCurrentQuestException(string message) : Exception(message)
    {
    }
}