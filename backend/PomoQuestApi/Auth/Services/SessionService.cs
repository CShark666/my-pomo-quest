using System.Security.Cryptography;
using System.Text;

namespace PomoQuestApi.Auth.Services
{
    public class SessionService
    {
        public string GenerateCsrfToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        }
        public string HashCsrfToken(string token)
        {
            return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
        }
        public bool VerifyCsrfToken(string headerToken, string expectedToken)
        {
            return HashCsrfToken(headerToken) == expectedToken;
        }
    }
}