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
    breakStatus: false,
  };

  if (parsed.status === "justCreated") {
    const newStatus = "justStarted";
    const newStartedTime = Date.now();

    quest.status = newStatus;
    quest.currentInterval.started = newStartedTime;

    parsed.status = newStatus;
    parsed.currentInterval.started = newStartedTime;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  }

  if (quest.remainingTotalTimeInMs < quest.totalTimeInMs) {
    for (let i = quest.currentInterval.index; i < quest.intervals.length; i++) {
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
    status: "justCreated",
    totalTimeInMs: totalTimeInMs,
    intervalDurationInMs: intervalTimeInMs,
    remainingTotalTimeInMs: totalTimeInMs,
    currentInterval: {
      index: clientQuest.amountOfIntervals - 1,
      status: "working",
      started: Date.now(),
      remaining: intervalTimeInMs,
    },
    amountOfIntervals: clientQuest.amountOfIntervals,
    breaks: {
      disabled: clientQuest.breaks.disabled,
      shortBreakInMs: clientQuest.breaks.shortBreak * 60 * 1000,
      longBreakInMs: clientQuest.breaks.longBreak * 60 * 1000,
      currentBreak: "short",
    },
    createdAt: Date.now(),
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

export async function questTimeValidate(clientQues) {
  await delay();

  const remaining =
    clientQues.intervalDurationInMs -
    (Date.now() - clientQues.currentInterval.started);

  let updated = {
    ...clientQues,
    currentInterval: {
      ...clientQues.currentInterval,
      remaining,
    },
  };

  if (remaining <= 1000) {
    updated = handleEndOfInterval(updated);
  }

  saveChanges(updated);
  return updated;
}

function saveChanges(changes) {
  const quest = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const saveChanges = {
    ...quest,
    status: changes.status,
    currentInterval: {
      ...changes.currentInterval,
    },

    remainingTotalTimeInMs: changes.remainingTotalTimeInMs,
    breaks: {
      ...quest.breaks,
      currentBreak: changes.breaks.currentBreak,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveChanges));
}

function handleEndOfInterval(quest) {
  if (quest.currentInterval.status === "working") {
    return endOfWorking(quest);
  }

  return endOfBreak(quest);
}
function endOfWorking(quest) {
  quest.intervals[quest.currentInterval.index].completed = true;
  quest.currentInterval.index -= 1;

  if (quest.currentInterval.index < 0) {
    quest.currentInterval.status = "finis";
    quest.status = "finished";
  }

  quest.remainingTotalTimeInMs -= quest.intervalDurationInMs;
  quest.currentInterval.status = "break";
  quest.currentInterval.remaining =
    quest.currentInterval.index % 2 === 1
      ? quest.breaks.shortBreakInMs
      : quest.breaks.longBreakInMs;
  quest.breaks.currentBreak =
    quest.currentInterval.index % 2 === 1 ? "short" : "long";
  quest.currentInterval.started = Date.now();

  saveChanges(quest);
  return quest;
}
function endOfBreak(quest) {
  quest.currentInterval.status = "working";
  quest.currentInterval.remaining = quest.intervalDurationInMs;
  quest.currentInterval.started = Date.now();

  saveChanges(quest);
  return quest;
}
