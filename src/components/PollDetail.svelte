<script>
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { tweened } from "svelte/motion";
  export let poll;

  const dispatch = createEventDispatcher();

  // Create total votes variable using reactive
  $: totalVotes = poll.votesA + poll.votesB;
  // Since when the poll.votesA and totalVotes is 0, we got NaN. So to avoid NaN, give OR statement to 0
  $: percentA = Math.floor((100 / totalVotes) * poll.votesA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;

  // Tweened Motion
  const tweenedA = tweened(0);
  const tweenedB = tweened(0);

  $: tweenedA.set(percentA);
  $: tweenedB.set(percentB);
  // $: console.log($tweenedA);

  const incrementVotes = (id, option) => {
    dispatch("incrementVotes", { id, option });
  };

  const deletePoll = (id) => {
    console.log(id);
    dispatch("deletePoll", id);
  };
</script>

<Card>
  <div class="poll-detail">
    <h3>{poll.question}</h3>
    <p>Total votes : {totalVotes}</p>
    <div class="answer" on:click={() => incrementVotes(poll.id, "A")}>
      <div class="percent percent-a" style="width:{$tweenedA}%" />
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => incrementVotes(poll.id, "B")}>
      <div class="percent percent-b" style="width:{$tweenedB}%" />
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
    <div class="delete-btn">
      <Button style="danger" on:click={() => deletePoll(poll.id)}
        >Delete Poll</Button
      >
    </div>
  </div>
</Card>

<style>
  h3 {
    font-size: 20px;
    margin-bottom: 4px;
    color: #555;
  }

  p {
    margin-bottom: 20px;
    color: #aaa;
    font-size: 14px;
  }

  .answer {
    background-color: #f4f4f4;
    margin-bottom: 16px;
    cursor: pointer;
    position: relative;
  }

  .answer:hover {
    opacity: 0.8;
  }

  span {
    display: inline-block;
    padding: 12px 20px;
    font-size: 14px;
  }

  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }

  .percent-a {
    border-left: 4px solid #d91b42;
    background-color: rgba(217, 27, 66, 0.2);
  }

  .percent-b {
    border-left: 4px solid #45c496;
    background-color: rgba(69, 196, 150, 0.2);
  }

  .delete-btn {
    margin-top: 24px;
    text-align: center;
  }
</style>
