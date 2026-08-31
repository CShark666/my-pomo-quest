namespace PomoQuestApi.Auth.DTO
{
    public class UserProfileResponse
    {
        public long Id { get; set; }
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
    }
}