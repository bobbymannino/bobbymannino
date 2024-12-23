<script lang="ts">
  type Props = {
    text: string;
  };

  let { text }: Props = $props();
</script>

<li>
  <p>{text}</p>
</li>
