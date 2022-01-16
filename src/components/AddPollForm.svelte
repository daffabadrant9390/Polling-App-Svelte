<script>
  import Button from "../shared/Button.svelte";
  import { v4 as uuidv4 } from "uuid";
  import { onDestroy } from "svelte";
  import PollStore from "../stores/PollStore.js";
  import CurrentItemStore from "../stores/CurrentItemStore";

  let disabled = false;
  let valid = false;
  let field = { question: "", answerA: "", answerB: "" };
  let error = { errQuestion: "", errAnswerA: "", errAnswerB: "" };
  let polls = [];

  // subscribe PollStore
  const unsub = PollStore.subscribe((data) => (polls = data));
  // unsubscribe PollStore when the component is destroyed
  onDestroy(() => {
    console.log("Component Destroyed");
    unsub();
  });

  const handleSubmitForm = () => {
    valid = true;

    // Validation for Question
    if (field.question.trim().length < 5) {
      valid = false;
      error.errQuestion = `Your Question must be more than 5 characters`;
    } else {
      error.errQuestion = "";
    }

    // Validation for Answer A
    if (field.answerA.trim().length < 1) {
      valid = false;
      error.errAnswerA = `Your Answer A cannot be empty!`;
    } else {
      error.errAnswerA = "";
    }

    // Validation for Answer B
    if (field.answerB.trim().length < 1) {
      valid = false;
      error.errAnswerB = `Your Answer B cannot be empty!`;
    } else {
      error.errAnswerB = "";
    }

    if (valid) {
      let poll = {
        ...field,
        votesA: 0,
        votesB: 0,
        id: uuidv4(),
      };

      // Add the data
      PollStore.update((currentPoll) => {
        return [poll, ...currentPoll];
      });

      CurrentItemStore.update((current) => {
        current = "Current Polls";
        return current;
      });
    }
  };
</script>

<div class="poll-form">
  <form on:submit|preventDefault={handleSubmitForm}>
    <div class="input-group">
      <label for="poll-question">Polls Question</label>
      <input
        type="text"
        id="poll-question"
        placeholder="Type your question here..."
        bind:value={field.question}
      />
      <div class="errorMsg">{error.errQuestion}</div>
    </div>
    <div class="input-group">
      <label for="poll-answerA">Answer A</label>
      <input
        type="text"
        id="poll-answerA"
        placeholder="Type your first answer..."
        bind:value={field.answerA}
      />
      <div class="errorMsg">{error.errAnswerA}</div>
    </div>
    <div class="input-group">
      <label for="poll-answerB">Answer B</label>
      <input
        type="text"
        id="poll-answerB"
        placeholder="Type your second answer..."
        bind:value={field.answerB}
      />
      <div class="errorMsg">{error.errAnswerB}</div>
    </div>
    <Button type="submit" {disabled}>Submit Poll</Button>
  </form>
</div>

<style>
  .poll-form {
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }
  .input-group label {
    margin-bottom: 4px;
    text-align: left;
  }
  input {
    width: 100%;
    border-radius: 6px;
  }

  .errorMsg {
    color: rgb(253, 72, 72);
    padding: 5px;
    font-size: 12px;
  }
</style>
