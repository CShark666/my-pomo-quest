const STORAGE_KEY = "pomoQuest";

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getQuest() {
  await delay();

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  const parsed = JSON.parse(data);

  const quest = {
    ...parsed,

    intervals: Array.from({ length: parsed.amountOfIntervals }, () => ({
      completed: false,
    })),

    currentIntervalIndex: parsed.amountOfIntervals - 1,
    breakStatus: false,
  };
  
  if (quest.remainingTotalTimeInMs < quest.totalTimeInMs) {
    const intervalRemaining = Math.floor(
      quest.remainingTotalTimeInMs / quest.intervalDurationInMs,
    );

    quest.currentIntervalIndex = intervalRemaining - 1;

    for (let i = quest.currentIntervalIndex; i < quest.intervals.length; i++) {
      quest.intervals[i].completed = true;
    }
  }

  return quest;
}

export async function createQuest(clientQuest) {
  await delay();

  const totalTimeInMs =
    clientQuest.totalTime.hours * 60 * 60 * 1000 +
    clientQuest.totalTime.minutes * 60 * 1000;
  const intervalTimeInMs = clientQuest.timeInterval * 60 * 1000;

  const pomoQuest = {
    id: crypto.randomUUID(),
    category: clientQuest.category,
    title: clientQuest.title,
    status: "inProgress",
    totalTimeInMs: totalTimeInMs,
    intervalDurationInMs: intervalTimeInMs,
    remainingTotalTimeInMs: totalTimeInMs,
    amountOfIntervals: clientQuest.amountOfIntervals,
    breaks: {
      disabled: clientQuest.breaks.disabled,
      shortBreakInMs: clientQuest.breaks.shortBreak * 60 * 1000,
      longBreakInMs: clientQuest.breaks.longBreak * 60 * 1000,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(pomoQuest));
}

export async function cancelQuest() {
  await delay();

  localStorage.removeItem(STORAGE_KEY);
}

export async function hasActiveQuest() {
  await delay();
  return localStorage.getItem(STORAGE_KEY) !== null;
}
