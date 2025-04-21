<script lang="ts">
  type Props = {
    text: string;
    href: string;
  };

  let { text, href }: Props = $props();
</script>

<a target="_blank" {href} rel="noopener noreferrer">{text}</a>
