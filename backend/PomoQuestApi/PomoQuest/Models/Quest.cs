using PomoQuestApi.Auth.Models;

namespace PomoQuestApi.PomoQuest.Models
{
    public class Quest
    {
        public Guid UserId { get; set; }
        public long Id { get; set; }
        public string Category { get; set; } = null!;
        public string Title { get; set; } = null!;
        public QuestStatus Status { get; set; }
        public long TotalTimeMs { get; set; }
        public int IntervalsCount { get; set; }
        public Dictionary<BreakType, long>? BreaksConfig { get; set; }
        public DateTime CreatedAt { get; set; }
        public IntervalState CurrentInterval { get; set; } = null!;

        public User User { get; set; } = null!;
    }
    public enum QuestStatus
    {
        InProgress,
        Finished,
        Cancelled
    }
    public enum BreakType
    {
        Short,
        Long
    }
}