<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let address, suiteOrApt, city, state, zip;
</script>

<div class="section text-2xl text-center" in:fade out:fly={{ y: 100 }}>
    <div class="text-lg text-center text-gray-500">Official Address</div>
    {address} {suiteOrApt}<br />
    {city}, {state} {zip}
</div>