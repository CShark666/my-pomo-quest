using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PomoQuestApi.Auth;
using PomoQuestApi.PomoQuest.DTO;
using PomoQuestApi.PomoQuest.Models;
using PomoQuestApi.PomoQuest.Service;

namespace PomoQuestApi.PomoQuest.Controllers
{
    [ApiController]
    [Route("quest")]
    public class QuestController(QuestService questService) : ControllerBase
    {

        [RequiresAuth]
        [HttpPost("create")]
        public async Task<IActionResult> CreateQuest(QuestRequest request)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await questService.CreateQuestAsync(request, userId);

            return Ok(new
            {
                message = "Quest created successfully."
            });
        }

        [RequiresAuth]
        [HttpGet("current")]
        public async Task<IActionResult> CurrentQuest()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var quest = await questService.GetCurrentQuestAsync(userId);

            var questResponse = await questService.CreateQuestResponseAsync(quest);

            return Ok(questResponse);
        }

        [RequiresAuth]
        [HttpGet("skip_transition_to_break")]
        public async Task<IActionResult> SkipTransitionToBreak()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var quest = await questService.GetCurrentQuestAsync(userId);

            var questResponse = await questService.SkipTransitionToBreakAsync(quest);

            return Ok(questResponse);
        }

        [RequiresAuth]
        [HttpGet("skip_break")]
        public async Task<IActionResult> SkipBreak()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var quest = await questService.GetCurrentQuestAsync(userId);

            var questResponse = await questService.SkipBreakAsync(quest);

            return Ok(questResponse);
        }

        [RequiresAuth]
        [HttpGet("cancel")]
        public async Task<IActionResult> CancelQuest()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var quest = await questService.GetCurrentQuestAsync(userId);

            await questService.CancelQuestAsync(quest);

            return Ok(new
            {
                message = "Quest canceled successfully."
            });
        }
    }
}