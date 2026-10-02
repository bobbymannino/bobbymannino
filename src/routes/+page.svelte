<script lang="ts">
  import Meta from "#components/meta.svelte";
  import { m } from "#lib/paraglide/messages.js";
  import AboutSection from "./sections.about.svelte";
  import BlogSection from "./sections.blog.svelte";
  import ContactSection from "./sections.contact.svelte";
  import ProjectsSection from "./sections.projects.svelte";
  import TechSection from "./sections.tech.svelte";
</script>

<Meta title="Bobby Mannino" description={m.home_description()} />

<AboutSection />
<ProjectsSection />
<TechSection />
<BlogSection />
<ContactSection />
