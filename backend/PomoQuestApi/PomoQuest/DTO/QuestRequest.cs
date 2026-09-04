using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.PomoQuest.DTO
{
    public record QuestRequest
    {
        public string Category { get; set; } = null!;
        public string Title { get; set; } = null!;
        public long TotalTimeMs { get; set; }
        public int IntervalCount { get; set; }
        public Dictionary<BreakType, long>? Breaks { get; set; }
    }
}