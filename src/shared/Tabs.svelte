<script>
  import CurrentItemStore from "../stores/CurrentItemStore";
  import TabsStore from "../storeS/TabsStore";

  const updateCurrentItem = (e) => {
    CurrentItemStore.update((current) => {
      current = e;
      return current;
    });
  };
</script>

<div class="tabs">
  <ul>
    {#each $TabsStore as item}
      <li on:click={updateCurrentItem(item)}>
        <div class:active={item === $CurrentItemStore}>{item}</div>
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
