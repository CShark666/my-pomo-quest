using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.PomoQuest.DTO
{
    public record CurrentQuestResponse : QuestResponse
    {
        public IntervalStateResponse CurrentInterval { get; set; } = null!;
        public long IntervalDurationMs { get; set; }
        public long RemainingTotalTimeMs { get; set; }
    }
}