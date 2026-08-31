using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PomoQuestApi.Auth.DTO;
using PomoQuestApi.Auth.Services;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace PomoQuestApi.Auth.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(AuthenticationService authenticationService) : ControllerBase
    {
        private readonly AuthenticationService _authService = authenticationService;


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {
            try
            {
                await _authService.RegisterAsync(request);

                return Ok(new
                {
                    message = "User registered successfully."
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    error = ex.Message
                });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    error = ex.Message
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            try
            {
                var token = await _authService.LoginAsync(request);

                Response.Cookies.Append(
                    "session_id",
                    $"{token}",
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = false,
                        SameSite = SameSiteMode.Lax ,
                        Expires = DateTimeOffset.UtcNow.AddDays(30)
                    });

                return Ok(new
                {
                    message = "Logged successfully."
                });
            }
            catch (ArgumentException)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }
            catch (InvalidOperationException)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }
        }

        [RequiresAuth]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var sessionId = Guid.Parse(User.FindFirstValue("session_id")!);

            await _authService.LogoutAsync(sessionId);

            Response.Cookies.Delete("session_id");

            return Ok(new
            {
                message = "Logged out successfully."
            });
        }

        [RequiresAuth]
        [HttpGet("me")]
        public async Task<IActionResult> GetUser()
        {
            // var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var profileId = long.Parse(User.FindFirstValue("profile_id")!);
            var email = User.FindFirstValue(ClaimTypes.Email)!;
            var name = User.FindFirstValue(ClaimTypes.Name)!;

            return Ok(new UserProfileResponse
            {
                Id = profileId,
                Email = email,
                Name = name
            });
        }
    }
}