using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.Middleware;
using PomoQuestApi.Auth.Services;
using PomoQuestApi.data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=pqdb.db"));

builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<SessionService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseMiddleware<AuthorizationMiddleware>();

app.MapControllers();

app.Run();
