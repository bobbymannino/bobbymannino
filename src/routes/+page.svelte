<script lang="ts">
  import AboutSection from "./sections.about.svelte";
  import TechSection from "./sections.tech.svelte";
  import ProjectsSection from "./sections.projects.svelte";
  import ContactSection from "./sections.contact.svelte";
  import Meta from "$components/meta.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    console.log(
      "%cbobman.dev",
      "font-weight:900;font-size:2.5rem;color:#0675ff",
    );
    console.log("%cyou found me!", "font-size:1rem;color:green");
  });
</script>

<Meta title="Bobby Mannino" description="Software Engineering Undergraduate" />

<AboutSection />
<TechSection />
<ProjectsSection />
<ContactSection />
