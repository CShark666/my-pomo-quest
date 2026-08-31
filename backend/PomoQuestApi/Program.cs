using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.Middleware;
using PomoQuestApi.Auth.Services;
using PomoQuestApi.data;

var builder = WebApplication.CreateBuilder(args);
var AllowFrontendOrigins = "AllowFrontendOrigins";
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowFrontendOrigins, policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=pqdb.db"));

builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<AuthenticationService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(AllowFrontendOrigins);

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseMiddleware<AuthenticationMiddleware>();
app.UseMiddleware<AuthorizationMiddleware>();

app.MapControllers();

app.Run();
