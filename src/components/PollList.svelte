<script>
  import PollDetail from "./PollDetail.svelte";
  import { fade, scale, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { onDestroy } from "svelte";
  import PollStore from "../stores/PollStore";
  let polls = [];

  // Subscribe the Store
  const unsub = PollStore.subscribe((data) => {
    polls = data;
  });

  // When we move to the other component, unsubscribe the Store
  onDestroy(() => {
    console.log("Component Destroyed");
    unsub();
  });

  const handleIncrementVotes = (e) => {
    const { id, option } = e.detail;
    const copiedPolls = [...polls];
    const updatedPoll = copiedPolls.find(
      (currentPoll) => currentPoll.id === id
    );

    // Update the votes by checking the option whether it's A or B
    if (option === "A") {
      updatedPoll.votesA++;
    } else if (option === "B") {
      updatedPoll.votesB++;
    }

    polls = copiedPolls;
  };

  const handleDeletePoll = (e) => {
    PollStore.update((currentPolls) => {
      return currentPolls.filter((poll) => poll.id != e.detail);
    });
  };
</script>

{#if polls.length === 0}
  <p class="empty-msg">No Polls Available. Try to create new one!</p>
{:else}
  <div class="poll-container">
    {#each polls as poll (poll.id)}
      <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
        <PollDetail
          {poll}
          on:incrementVotes={handleIncrementVotes}
          on:deletePoll={handleDeletePoll}
        />
      </div>
    {/each}
  </div>
{/if}

<style>
  .poll-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .empty-msg {
    text-align: center;
    color: #aaa;
    font-size: 14px;
    padding: 40px;
  }
</style>
