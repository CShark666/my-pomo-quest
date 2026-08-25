namespace PomoQuestApi.Auth
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RequiresAuthAttribute: Attribute
    {
    }
}