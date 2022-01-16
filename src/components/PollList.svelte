<script>
  import PollDetail from "./PollDetail.svelte";
  export let polls = [];
</script>

<div class="poll-container">
  {#each polls as poll (poll.id)}
    <PollDetail {poll} on:incrementVotes />
  {/each}
</div>

<style>
  .poll-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
</style>
