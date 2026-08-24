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
        private readonly AuthenticationService _authenticationService = authenticationService;


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {
            try
            {
                await _authenticationService.RegisterAsync(request);

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
                var token = await _authenticationService.LoginAsync(request);

                Response.Cookies.Append(
                    "session_token",
                    $"{token}",
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = false,
                        SameSite = SameSiteMode.Strict,
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
                    error = "Invalid email or password."
                });
            }
            catch (InvalidOperationException)
            {
                return Unauthorized(new
                {
                    error = "Invalid email or password."
                });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            if (Request.Cookies.TryGetValue("session_token", out var token))
            {
                if (!Guid.TryParse(token, out var sessionId) || sessionId == Guid.Empty)
                {
                    return Unauthorized(new { error = "Invalid session token." });
                }

                await _authenticationService.LogoutAsync(sessionId);
            }

            Response.Cookies.Delete("session_token");

            return Ok(new
            {
                message = "Logged out successfully."
            });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetUser()
        {
            if (!Request.Cookies.TryGetValue("session_token", out var token))
            {
                return Unauthorized(new
                {
                    error = "Authentication required."
                });
            }

            try
            {
                if (!Guid.TryParse(token, out var sessionId) || sessionId == Guid.Empty)
                    return Unauthorized(new { error = "Invalid session token." });

                var user = await _authenticationService.GetUserAsync(sessionId);

                return Ok(new UserProfileResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new
                {
                    error = "Invalid or expired session."
                });
            }
        }
    }
}