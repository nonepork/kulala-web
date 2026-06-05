<script lang="ts">
let props = $props();
const Component = $derived(props.data.component);
</script>

<h1 class="title">{props.data.metadata.title}</h1>

<Component />
