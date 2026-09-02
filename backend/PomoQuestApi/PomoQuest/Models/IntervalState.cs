namespace PomoQuestApi.PomoQuest.Models
{
    public class IntervalState
    {
        public int Index { get; set; }
        public IntervalStatus Status { get; set; }
        public DateTime Started { get; set; }
    }
    public class IntervalStateResponse : IntervalState
    {
        public long Remaining { get; set; }
    }

    public enum IntervalStatus
    {
        Work,
        Break,
        TransitionToWork,
        TransitionToBreak,
    }
}