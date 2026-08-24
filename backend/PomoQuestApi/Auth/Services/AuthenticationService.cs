using System.Net.Mail;
using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.DTO;
using PomoQuestApi.Auth.Models;
using PomoQuestApi.data;

namespace PomoQuestApi.Auth.Services
{
    public class AuthenticationService(AppDbContext context, PasswordService passwordService)
    {
        private readonly AppDbContext _context = context;
        private readonly PasswordService _passwordService = passwordService;

        public async Task RegisterAsync(UserRegisterRequest request)
        {
            var email = request.Email.Trim().ToLowerInvariant();

            if (!isEmailValid(email))
                throw new ArgumentException("Invalid email.");

            if (await IsEmailUsedAsync(email))
                throw new InvalidOperationException("Email is already used.");

            if (request.Name.Length < 2)
                throw new ArgumentException("Name must be at least 2 characters long.");

            if (request.Password.Length < 8)
                throw new ArgumentException("Password must be at least 8 characters long.");

            if (request.Password != request.ConfirmPassword)
                throw new ArgumentException("Passwords do not match.");


            var hashedPassword = _passwordService.HashPassword(request.Password);
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                PasswordHash = hashedPassword,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };
            var profile = new Profile
            {
                Email = email,
                Name = request.Name,
                User = user
            };

            await _context.Users.AddAsync(user);
            await _context.Profiles.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task<Guid> LoginAsync(UserLoginRequest request)
        {
            var email = request.Email.Trim().ToLowerInvariant();

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new ArgumentException("Invalid email or password.");

            if (!user.IsActive)
                throw new InvalidOperationException("User is inactive.");

            if (!_passwordService.VerifyPassword(request.Password, user.PasswordHash))
            {
                throw new ArgumentException("Invalid email or password.");
            }

            var now = DateTime.UtcNow;
            var id = Guid.NewGuid();

            var session = new Session
            {
                Id = id,
                UserId = user.Id,
                CreatedAt = now,
                ExpiresAt = now.AddDays(30)
            };

            await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();

            return id;
        }

        public async Task LogoutAsync(Guid sessionId)
        {
            var session = await _context.Sessions.FindAsync(sessionId);

            if (session == null)
                throw new UnauthorizedAccessException("Invalid session.");

            _context.Sessions.Remove(session);
            await _context.SaveChangesAsync();
        }

        public async Task<Profile> GetUserAsync(Guid id)
        {
            var session = await _context.Sessions
                .Include(s => s.User)
                    .ThenInclude(u => u.Profile)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                throw new UnauthorizedAccessException("Invalid session.");

            if (session.ExpiresAt <= DateTime.UtcNow)
            {
                _context.Remove(session);
                await _context.SaveChangesAsync();

                throw new UnauthorizedAccessException("Session expired.");
            }

            if (!session.User.IsActive)
                throw new UnauthorizedAccessException("User is inactive.");

            return session.User.Profile;
        }
        private bool isEmailValid(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            if (!MailAddress.TryCreate(email, out var mailAddress))
                return false;

            var hostParts = mailAddress.Host.Split('.');
            return hostParts.Length > 1 && !string.IsNullOrWhiteSpace(hostParts.Last());
        }

        private Task<bool> IsEmailUsedAsync(string email) =>
            _context.Users.AnyAsync(u => u.Email == email);
    }
}
