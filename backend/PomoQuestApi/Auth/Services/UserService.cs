using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.Models;
using PomoQuestApi.data;

namespace PomoQuestApi.Auth.Services
{
    public class UserService(AppDbContext db)
    {
        public const int ONE_LEVEL_EXP = 240;
        public async Task<Profile> GetProfileAsync(Guid userId)
        {
            var profile = await db.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
            return profile!;
        }

        public int CalculateCurrentExp(long experience)
        {
            return Convert.ToInt32(experience % ONE_LEVEL_EXP);
        }

        public int CalculateLevel(long experience)
        {
            return Math.Max(Convert.ToInt32(experience / ONE_LEVEL_EXP), 1);
        }
    }
}