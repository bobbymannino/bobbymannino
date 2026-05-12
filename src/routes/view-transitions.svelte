<script>
  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
        if (navigation.type === "link" && !navigation.to?.url.hash) {
          window.scrollTo({ top: 0 });
        }
      });
    });
  });
</script>

<style>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 200ms;
  }

  :global([style*="--vtn"]) {
    view-transition-name: var(--vtn);
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
</style>
