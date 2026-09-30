namespace PomoQuestApi.Auth
{
    [AttributeUsage(AttributeTargets.Method)]
    public class NotRequiresCsrfValidation : Attribute
    {
    }
}