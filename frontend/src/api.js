const STORAGE_KEY = "pomoQuest";

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getQuest() {
  await delay();

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export async function createQuest(quest) {
  await delay();

  let timeInMs = quest.totalTime * 60 * 60 * 1000;

  const questWithId = {
    ...quest,
    id: crypto.randomUUID(),
    status: "inProgress",
    totalTimeInMs: timeInMs,
    remainingTotalTimeInMs: timeInMs,
    timeIntervalInMs: quest.timeInterval * 60 * 1000,
    breakConfig: { active: true, shortBreak: 300000, longBreak: 900000 },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(questWithId));
}

export async function cancelQuest(){
  await delay();

  localStorage.removeItem(STORAGE_KEY);
}
