namespace PomoQuestApi.PomoQuest.Controllers
{
    // Gamification mechanics service
    public class GameService
    {
        public const int ONE_LEVEL_EXP = 240;

        public int CalculateCurrentExp(long experience)
        {
            return Convert.ToInt32(experience % ONE_LEVEL_EXP);
        }

        public int CalculateLevel(long experience)
        {
            return Convert.ToInt32(experience / ONE_LEVEL_EXP) + 1;
        }
    }
}