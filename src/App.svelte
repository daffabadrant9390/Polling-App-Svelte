<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import AddPollForm from "./components/AddPollForm.svelte";
  import PollList from "./components/PollList.svelte";
  import CurrentItemStore from "./stores/CurrentItemStore";
</script>

<Header />
<main>
  <Tabs />
  <!-- Conditional to show component based on currentItem value -->
  {#if $CurrentItemStore === "Current Polls"}
    <PollList />
  {:else if $CurrentItemStore === "Add New Poll"}
    <AddPollForm />
  {/if}
</main>
<Footer />

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
    padding: 20px;
  }
</style>
