// import { axios } from "axios";

const testQuest = {
  id: 33,
  title: "test",
  category: "hobby",
  status: "inProgress",
  totalTimeInMs: 7200000,
  timeIntervalInMs: 1200000,
  amountOfIntervals: 6,
  remainingTotalTimeInMs: 7200000,
  breakConfig: { active: true, shortBreak: 300000, longBreak: 900000 },
};

const STORAGE_KEY = "pomoQuest";

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getQuest() {
  await delay();

  //   const data = localStorage.getItem(STORAGE_KEY);
  //   if (!data) return null;

  //   return JSON.parse(data);
  return testQuest;
}

export async function createQuest(quest) {
  await delay();

  const questWithId = {
    ...quest,
    id: crypto.randomUUID(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(questWithId));
}

// export async function updateQuest(id, quest) {}
