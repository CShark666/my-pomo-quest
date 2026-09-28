using Microsoft.EntityFrameworkCore;
using PomoQuestApi.data;
using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.PomoQuest.Controllers
{
    // Gamification mechanics service
    public class GameService(AppDbContext db)
    {
        public const int ONE_LEVEL_EXP = 240;

        public int CalculateCurrentExp(long experience)
        {
            return Convert.ToInt32(experience % ONE_LEVEL_EXP);
        }

        public int CalculateLevel(long experience)
        {
            return Convert.ToInt32(experience / ONE_LEVEL_EXP) + 1;
        }

        public async Task VerifyYesterdayStreakAsync(Guid userId)
        {
            await db.Profiles
                .Where(p =>
                    p.UserId == userId &&
                    !db.Quests.Any(q =>
                        q.UserId == userId &&
                        q.CreatedAt.Date == DateTime.UtcNow.AddDays(-1).Date &&
                        q.Status != QuestStatus.Cancelled
                    ))
                .ExecuteUpdateAsync(p =>
                    p.SetProperty(p => p.Streak, 0));
        }
        public async Task VerifyTodayStreak(Guid userId)
        {
            await db.Profiles
                .Where(p =>
                    p.UserId == userId &&
                    !db.Quests.Any(q =>
                        q.UserId == userId &&
                        q.CreatedAt.Date == DateTime.UtcNow.Date &&
                        q.Status == QuestStatus.Finished
                    ))
                .ExecuteUpdateAsync(p =>
                    p.SetProperty(p => p.Streak, p => p.Streak + 1));
        }
    }
}