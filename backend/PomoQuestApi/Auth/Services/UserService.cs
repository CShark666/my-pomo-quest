using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.Models;
using PomoQuestApi.data;

namespace PomoQuestApi.Auth.Services
{
    public class UserService(AppDbContext db)
    {
        public async Task<Profile> GetProfileAsync(Guid userId)
        {
            var profile = await db.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
            return profile!;
        }

    }
}