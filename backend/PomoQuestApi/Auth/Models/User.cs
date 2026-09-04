using PomoQuestApi.PomoQuest.Models;

namespace PomoQuestApi.Auth.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public Profile Profile { get; set; } = null!;
        public ICollection<Session> Sessions { get; set; } = new List<Session>();
        public ICollection<Quest> Quests { get; set; } = new List<Quest>();

    }
}