using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.PomoQuest.DTO
{
    public record QuestResponse
    {
        public long Id { get; set; }
        public string Category { get; set; } = null!;
        public string Title { get; set; } = null!;
        public QuestStatus Status { get; set; }
        public long TotalTimeMs { get; set; }
        public int IntervalsCount { get; set; }
        public Dictionary<BreakType, long>? Breaks { get; set; }
        public DateTime CreatedAt { get; set; }
        public IntervalStateResponse CurrentInterval { get; set; } = null!;
        public long IntervalDurationMs { get; set; }
        public long RemainingTotalTimeMs { get; set; }
    }
}