namespace PomoQuestApi.Auth.DTO
{
    public class UserProfileResponse
    {
        public long Id { get; set; }
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public int CurrentExperience { get; set; } = 0;
        public int Level { get; set; } = 1;
    }
}