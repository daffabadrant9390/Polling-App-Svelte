<script>
  import { createEventDispatcher } from "svelte";
  export let items;
  export let currentItem;
  const dispatch = createEventDispatcher();
  const handleCurrentItem = (e) => {
    dispatch("updateCurrent", e);
  };
</script>

<div class="tabs">
  <ul>
    {#each items as item}
      <li on:click={handleCurrentItem(item)}>
        <div class:active={item === currentItem}>{item}</div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
  }
  li {
    margin: 0 16px;
    cursor: pointer;
  }
  .active {
    color: rgb(252, 60, 60);
    padding-bottom: 8px;
    border-bottom: 1px solid rgb(252, 60, 60);
    font-weight: bold;
  }
</style>
