<div
  aria-hidden="true"
  class="bg-accent-600 fixed top-0 left-0 z-10 h-1 w-full"
></div>

<style>
  @keyframes progress {
    from {
      scale: 0 1;
    }
    to {
      scale: 1 1;
    }
  }

  div {
    transform-origin: left;
    animation: progress linear;
    animation-timeline: scroll();

    @supports not (animation-timeline: scroll()) {
      display: none;
    }
  }
</style>
