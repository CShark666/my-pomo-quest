using Microsoft.EntityFrameworkCore;
using PomoQuestApi.data;
using PomoQuestApi.PomoQuest.DTO;
using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.PomoQuest.Service
{
    public class QuestService(AppDbContext db)
    {
        public const int TRANSITION_DURATION_MS = 5000;
        public async Task CreateQuestAsync(QuestRequest request, Guid userId)
        {
            var now = DateTime.UtcNow;
            var nowMs = new DateTimeOffset(now).ToUnixTimeMilliseconds();
            var quest = new Quest
            {
                UserId = userId,
                Category = request.Category,
                Title = request.Title,
                Status = QuestStatus.InProgress,
                TotalTimeMs = request.TotalTimeMs,
                IntervalsCount = request.IntervalCount,
                BreaksConfig = request.Breaks,
                CreatedAt = now,
                CurrentInterval = new IntervalState
                {
                    Index = 0,
                    Status = IntervalStatus.TransitionToWork,
                    Started = nowMs
                }
            };

            await db.Quests.AddAsync(quest);
            await db.SaveChangesAsync();
        }

        public async Task<Quest> GetCurrentQuestAsync(Guid userId)
        {
            var quest = await db.Quests.FirstOrDefaultAsync(q => q.UserId == userId && q.Status == QuestStatus.InProgress);

            if (quest == null)
            {
                throw new ArgumentException("No active quests.");
            }

            if (UpdateQuestIfNeeded(quest)) await db.SaveChangesAsync();

            return quest;
        }

        public async Task<QuestResponse> CreateQuestResponseAsync(Quest quest)
        {
            var remainingIntervals = quest.IntervalsCount - quest.CurrentInterval.Index;
            var intervalDuration = GetIntervalDuration(quest.TotalTimeMs, quest.IntervalsCount);
            var remainingTotalTimeMs = remainingIntervals * intervalDuration;
            var currentIntervalRemaining = GetCurrentIntervalRemaining(quest);

            if (quest.CurrentInterval.Status == IntervalStatus.Work)
            {
                remainingTotalTimeMs += currentIntervalRemaining;
            }

            return new QuestResponse
            {
                Id = quest.Id,
                Category = quest.Category,
                Title = quest.Title,
                Status = quest.Status,
                TotalTimeMs = quest.TotalTimeMs,
                IntervalsCount = quest.IntervalsCount,
                Breaks = quest.BreaksConfig,
                CreatedAt = quest.CreatedAt,
                CurrentInterval = new IntervalStateResponse
                {
                    Index = quest.CurrentInterval.Index,
                    Status = quest.CurrentInterval.Status,
                    Started = quest.CurrentInterval.Started,
                    Remaining = currentIntervalRemaining

                },
                IntervalDuration = intervalDuration,
                RemainingTotalTimeMs = remainingTotalTimeMs
            };
        }

        public async Task<QuestResponse> SkipTransitionToBreakAsync(Quest quest)
        {
            quest.CurrentInterval.Status = IntervalStatus.Break;
            quest.CurrentInterval.Started = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            await db.SaveChangesAsync();

            return await CreateQuestResponseAsync(quest);
        }
        public async Task<QuestResponse> SkipBreakAsync(Quest quest)
        {
            quest.CurrentInterval.Index++;
            quest.CurrentInterval.Status = IntervalStatus.Work;
            quest.CurrentInterval.Started = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            await db.SaveChangesAsync();

            return await CreateQuestResponseAsync(quest);
        }
        private bool UpdateQuestIfNeeded(Quest quest)
        {
            if (quest == null || quest.Status != QuestStatus.InProgress) return false;

            var needsUpdate = false;

            while (GetCurrentIntervalRemaining(quest) < 0)
            {
                needsUpdate = true;

                if (quest.CurrentInterval.Index == quest.IntervalsCount - 1)
                {
                    quest.Status = QuestStatus.Finished;
                    break;
                }

                switch (quest.CurrentInterval.Status)
                {
                    case IntervalStatus.TransitionToWork:
                        quest.CurrentInterval.Status = IntervalStatus.Work;
                        quest.CurrentInterval.Started += TRANSITION_DURATION_MS;
                        break;

                    case IntervalStatus.Work:
                        quest.CurrentInterval.Status = IntervalStatus.TransitionToBreak;
                        quest.CurrentInterval.Started += GetIntervalDuration(quest.TotalTimeMs, quest.IntervalsCount);
                        break;

                    case IntervalStatus.TransitionToBreak:
                        quest.CurrentInterval.Status = IntervalStatus.Break;
                        quest.CurrentInterval.Started += TRANSITION_DURATION_MS;
                        break;

                    case IntervalStatus.Break:
                        quest.CurrentInterval.Status = IntervalStatus.TransitionToWork;
                        quest.CurrentInterval.Started += GetBreakDuration(quest.CurrentInterval.Index, quest.BreaksConfig);
                        quest.CurrentInterval.Index++;
                        break;
                }
            }
            return needsUpdate;
        }

        private long GetIntervalDuration(long totalTimeMs, int intervalsCount)
            => totalTimeMs / intervalsCount;

        private long GetCurrentIntervalRemaining(Quest quest)
        {
            var currentIntervalTotalTime = quest.CurrentInterval.Status switch
            {
                IntervalStatus.Work => GetIntervalDuration(quest.TotalTimeMs, quest.IntervalsCount),
                IntervalStatus.Break => GetBreakDuration(quest.CurrentInterval.Index, quest.BreaksConfig),
                _ => TRANSITION_DURATION_MS,
            };
            var passedTime = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() - quest.CurrentInterval.Started;

            return currentIntervalTotalTime - passedTime;
        }

        private long GetBreakDuration(int index, Dictionary<BreakType, long>? breaksConfig)
        {
            if (breaksConfig == null) return 0;

            var breakType = index % 2 == 0 ? BreakType.Short : BreakType.Long;
            return breaksConfig![breakType];
        }
    }
}