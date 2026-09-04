using System.Text.Json.Serialization;

namespace PomoQuestApi.PomoQuest.Models
{
    public class IntervalState
    {
        public int Index { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public IntervalStatus Status { get; set; }
        public long Started { get; set; }
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