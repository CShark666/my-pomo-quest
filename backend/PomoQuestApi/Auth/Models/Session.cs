namespace PomoQuestApi.Auth.Models
{
    public class Session(Guid id, Guid userId, string csrfTokenHash, DateTime createdAt, DateTime expiresAt)
    {
        public Guid Id { get; set; } = id;
        public Guid UserId { get; set; } = userId;
        public string? CsrfTokenHash { get; set; } = csrfTokenHash;
        public DateTime CreatedAt { get; set; } = createdAt;
        public DateTime ExpiresAt { get; set; } = expiresAt;
        public User User { get; set; } = null!;
    }
}