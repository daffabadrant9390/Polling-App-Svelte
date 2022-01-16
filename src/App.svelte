<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import AddPollForm from "./components/AddPollForm.svelte";
  import PollList from "./components/PollList.svelte";

  let items = ["Current Polls", "Add New Poll"];
  let currentItem = "Current Polls";

  // Function to updateCurrentItem when toggling the navigation Bar
  const updateCurrentItem = (e) => {
    currentItem = e.detail;
  };

  // Initial data for pools
  let polls = [
    {
      id: 1,
      question: "React or Svelte?",
      answerA: "React",
      answerB: "Svelte",
      votesA: 20,
      votesB: 12,
    },
  ];

  // Function to handle adding new pool through the AddPollForm
  const handleNewPoll = (e) => {
    let newPoll = e.detail;
    polls = [newPoll, ...polls];
    currentItem = "Current Polls";
    console.log(polls);
  };

  const handleIncrementVotes = (e) => {
    const { id, option } = e.detail;
    const copiedPolls = [...polls];
    const updatedPoll = copiedPolls.find(
      (currentPolls) => currentPolls.id === id
    );

    // Check the option whether it's A or B
    if (option === "A") {
      updatedPoll.votesA++;
    } else if (option === "B") {
      updatedPoll.votesB++;
    }

    polls = copiedPolls;
  };
</script>

<Header />
<main>
  <Tabs {items} {currentItem} on:updateCurrent={updateCurrentItem} />
  <!-- Conditional to show component based on currentItem value -->
  {#if currentItem === "Current Polls"}
    <PollList {polls} on:incrementVotes={handleIncrementVotes} />
  {:else if currentItem === "Add New Poll"}
    <AddPollForm on:addNewPoll={handleNewPoll} />
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
