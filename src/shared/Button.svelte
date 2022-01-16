<script>
  export let style = "primary";
  export let type = "button";
  export let disabled = true;
</script>

<button class={style} {type} {disabled}>
  <slot />
</button>

<style>
  button {
    padding: 8px 12px;
    width: 140px;
    border-radius: 6px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.4);
    font-size: 14px;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .primary {
    background-color: rgb(104, 212, 255);
  }
  .secondary {
    background-color: rgb(78, 78, 78);
  }
  button:disabled {
    background-color: rgb(155, 155, 155);
    color: #ccc;
    box-shadow: none;
  }
</style>
