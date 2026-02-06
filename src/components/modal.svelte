<script lang="ts">
  import type { Snippet } from "svelte";

  let isMetaKeyPressed = $state(false);
  let dialog: HTMLDialogElement;

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key == "Meta") isMetaKeyPressed = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Meta") isMetaKeyPressed = true;

    if (
      (isMetaKeyPressed || event.ctrlKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      open();

      onopen?.();
    }
  }

  export function close() {
    dialog.close();
  }

  export function open() {
    dialog.showModal();
  }

  type Props = {
    children: Snippet;
    onopen?: () => void;
    onclose?: () => void;
    id?: string;
  };

  let { id, children, onopen, onclose }: Props = $props();
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<dialog
  {id}
  {onclose}
  bind:this={dialog}
  class="w-full max-w-full touch-none bg-transparent pt-6 backdrop:bg-black/50"
>
  <div class="mx-auto w-full max-w-prose bg-zinc-50 p-6 dark:bg-zinc-800">
    {@render children()}
  </div>
</dialog>

<!-- <style>
  dialog {
    z-index: 50;
    opacity: 0;
    translate: 0 -1rem;
    transition:
      display 200ms,
      opacity 200ms,
      translate 200ms;
    transition-behavior: allow-discrete;

    &::backdrop {
      display: none;
    }

    &[open] {
      opacity: 1;
      translate: 0 0;

      @starting-style {
        opacity: 0;
        translate: 0 1rem;
      }
    }
  }
</style> -->
