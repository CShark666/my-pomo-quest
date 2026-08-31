namespace PomoQuestApi.Auth.Models
{
    public class Profile
    {
        public Guid UserId { get; set; }
        public long Id { get; set; }
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}