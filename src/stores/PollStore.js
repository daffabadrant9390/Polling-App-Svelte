import { writable } from "svelte/store";

const PollStore = writable([
  {
    id: 1,
    question: "React or Svelte?",
    answerA: "React",
    answerB: "Svelte",
    votesA: 20,
    votesB: 12,
  },
]);

export default PollStore;
