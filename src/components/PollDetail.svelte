<script>
  import Card from "../shared/Card.svelte";
  import { createEventDispatcher } from "svelte";
  export let poll;

  const dispatch = createEventDispatcher();

  // Create total votes variable using reactive
  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = Math.floor((100 / totalVotes) * poll.votesA);
  $: percentB = Math.floor((100 / totalVotes) * poll.votesB);

  console.log(`Total votes : ${totalVotes}`);
  console.log(`Percent A : ${percentA}%`);
  console.log(`Percent B : ${percentB}%`);

  const incrementVotes = (id, option) => {
    dispatch("incrementVotes", { id, option });
  };
</script>

<Card>
  <div class="poll-detail">
    <h3>{poll.question}</h3>
    <p>Total votes : {totalVotes}</p>
    <div class="answer" on:click={() => incrementVotes(poll.id, "A")}>
      <div class="percent percent-a" style="width:{percentA}%" />
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => incrementVotes(poll.id, "B")}>
      <div class="percent percent-b" style="width:{percentB}%" />
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
  </div>
</Card>

<style>
  h3 {
    font-weight: normal;
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
    margin-bottom: 4px;
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
</style>
