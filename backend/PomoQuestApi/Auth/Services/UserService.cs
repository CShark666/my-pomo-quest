using Microsoft.EntityFrameworkCore;
using PomoQuestApi.Auth.DTO;
using PomoQuestApi.data;
using PomoQuestApi.PomoQuest.Controllers;

namespace PomoQuestApi.Auth.Services
{
    public class UserService(AppDbContext db, GameService gameService)
    {
        public async Task<UserProfileResponse> GetProfileAsync(Guid userId)
        {
            var profile = await db.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
            var level = gameService.CalculateLevel(profile!.Experience);
            var currentExperience = gameService.CalculateCurrentExp(profile.Experience);

            return new UserProfileResponse
            {
                Id = profile.Id,
                Email = profile.Email,
                Name = profile.Name,
                CurrentExperience = currentExperience,
                Level = level
            };
        }
    }
}