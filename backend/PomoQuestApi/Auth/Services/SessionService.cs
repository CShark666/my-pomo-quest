using System.Buffers.Text;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PomoQuestApi.data;

namespace PomoQuestApi.Auth.Services
{
    public class SessionService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;
        public string GenerateToken()
        {
            var token = RandomNumberGenerator.GetBytes(32);
            return Base64Url.EncodeToString(token);
        }

        public string HashToken(string token)
        {
            byte[] hash = SHA256.HashData(
                Encoding.UTF8.GetBytes(token));

            return Convert.ToHexString(hash);
        }

        // public async Task<bool> VerifySessionAsync(string token)
        // {
        //     var hash = HashToken(token);

        //     var session = await _context.Sessions.SingleOrDefaultAsync(s => s.TokenHash == hash);

        //     if (session == null)
        //         return false;

        //     var now = DateTime.UtcNow;

        //     if (session.ExpiresAt <= now || session.RevokedAt >= now)
        //         return false;

        //     return true;
        // }
    }
}

