<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let {
    dokployUrl = "",
    projectId = "",
    applicationId = "",
  }: {
    dokployUrl?: string;
    projectId?: string;
    applicationId?: string;
  } = $props();

  type DeploymentStatus = "success" | "building" | "error" | "idle" | "loading";

  let status: DeploymentStatus = $state("loading");
  let lastDeploymentTime: string | null = $state(null);

  const statusConfig: Record<
    DeploymentStatus,
    { text: string; class: string; dot: string }
  > = {
    success: {
      text: "Deployed",
      class: "text-green-600 dark:text-green-400",
      dot: "bg-green-500",
    },
    building: {
      text: "Building",
      class: "text-yellow-600 dark:text-yellow-400",
      dot: "bg-yellow-500",
    },
    error: {
      text: "Failed",
      class: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    },
    idle: {
      text: "Idle",
      class: "text-gray-600 dark:text-gray-400",
      dot: "bg-gray-500",
    },
    loading: {
      text: "Loading",
      class: "text-gray-600 dark:text-gray-400",
      dot: "bg-gray-500",
    },
  };

  async function fetchDeploymentStatus() {
    if (!browser || !dokployUrl || !projectId || !applicationId) {
      status = "idle";
      return;
    }

    try {
      const response = await fetch(
        `${dokployUrl}/api/application.one?applicationId=${applicationId}`,
      );

      if (!response.ok) {
        status = "error";
        return;
      }

      const data = await response.json();

      if (data.buildStatus === "running") {
        status = "building";
      } else if (data.buildStatus === "done") {
        status = "success";
      } else if (data.buildStatus === "error") {
        status = "error";
      } else {
        status = "idle";
      }

      if (data.lastDeploymentTime) {
        lastDeploymentTime = new Date(
          data.lastDeploymentTime,
        ).toLocaleString();
      }
    } catch (error) {
      console.error("Failed to fetch deployment status:", error);
      status = "error";
    }
  }

  onMount(() => {
    fetchDeploymentStatus();
    const interval = setInterval(fetchDeploymentStatus, 60000);
    return () => clearInterval(interval);
  });

  const dashboardUrl = $derived(
    dokployUrl && projectId && applicationId
      ? `${dokployUrl}/dashboard/project/${projectId}/services/application/${applicationId}`
      : undefined,
  );
</script>

{#if dokployUrl && projectId && applicationId}
  <a
    href={dashboardUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="ring-on-focus-visible flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
    title="View deployment status on Dokploy"
  >
    <span class="relative flex size-2">
      <span
        class={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusConfig[status].dot}`}
      ></span>
      <span
        class={`relative inline-flex size-2 rounded-full ${statusConfig[status].dot}`}
      ></span>
    </span>
    <span class={statusConfig[status].class}>
      {statusConfig[status].text}
    </span>
  </a>
{/if}
