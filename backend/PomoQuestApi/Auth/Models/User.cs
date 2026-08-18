namespace PomoQuestApi.Auth.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Email { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public bool IsActive { get; set; }

        public ICollection<Session> Sessions { get; set; } = new List<Session>();
    }
}