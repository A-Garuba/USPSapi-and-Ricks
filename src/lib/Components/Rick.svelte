<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import { getRicks } from '$utils/api/rick.util';

	let first = 0,
		second = 1,
		third = 2;
	let ricks = [];

	const fetchRicks = async () => {
		let response = await getRicks();
		if (response) ricks = response;
	};

	const shuffle = () => {
		first += 3;
		first %= 20;
		second += 3;
		second %= 20;
		third += 3;
		third %= 20;
	};

	$: console.log(ricks);
</script>

<div class="my-10" />

<!-- Rick button makes initial request, then shuffles through response -->
<div
	class="section cursor-pointer"
	in:fade={{ delay: 1000 }}
	out:fly={{ x: 100 }}
	on:click={() => {
		ricks.length ? shuffle() : fetchRicks();
	}}
>
	{ricks.length ? 'Shuffle Ricks' : 'Okay cool, now show me ricks'}
</div>
{#if ricks.length}
	<div class="max-w-xl mx-4 md:mx-auto mb-4 relative">
		<div class="flex flex-col md:flex-row gap-3">
			<!-- First Card -->
			<div class="w-full md:w-1/3 md:h-[325px] rounded-2xl shadow-xl hover:shadow-2xl border p-2">
				<div class="text-sm text-center truncate">{ricks[first].name}</div>
				<img
					class="rounded-xl my-2 mx-auto h-1/2"
					src={ricks[first].image}
					alt="some variation of rick sanchez"
				/>
				<div class="text-xs text-center md:text-left">
					First appears in {ricks[first].episode[0].name}
					{`(${ricks[first].episode[0].episode})`} <br />
					Has been seen at {ricks[first].location.name} <br />
					STATUS:
					<span
						class={ricks[first].status === 'Alive'
							? 'text-color-green-primary'
							: ricks[first].status === 'Dead'
							? 'text-red-500'
							: 'text-gray-500'}
					>
						{ricks[first].status}
					</span>
				</div>
			</div>

			<!-- Second Card -->
			<div class="w-full md:w-1/3 md:h-[325px] rounded-2xl shadow-xl hover:shadow-2xl border p-2">
				<div class="text-sm text-center truncate">{ricks[second].name}</div>
				<img
					class="rounded-xl my-2 mx-auto h-1/2"
					src={ricks[second].image}
					alt="some variation of rick sanchez"
				/>
				<div class="text-xs text-center md:text-left">
					First appears in {ricks[second].episode[0].name}
					{`(${ricks[second].episode[0].episode})`} <br />
					Has been seen at {ricks[second].location.name} <br />
					STATUS:
					<span
						class={ricks[second].status === 'Alive'
							? 'text-color-green-primary'
							: ricks[second].status === 'Dead'
							? 'text-red-500'
							: 'text-gray-500'}
					>
						{ricks[second].status}
					</span>
				</div>
			</div>

			<!-- Third Card -->
			<div class="w-full md:w-1/3 md:h-[325px] rounded-2xl shadow-xl hover:shadow-2xl border p-2">
				<div class="text-sm text-center truncate">{ricks[third].name}</div>
				<img
					class="rounded-xl my-2 mx-auto h-1/2"
					src={ricks[third].image}
					alt="some variation of rick sanchez"
				/>
				<div class="text-xs text-center md:text-left">
					First appears in {ricks[third].episode[0].name}
					{`(${ricks[third].episode[0].episode})`} <br />
					Has been seen at {ricks[third].location.name} <br />
					STATUS:
					<span
						class={ricks[third].status === 'Alive'
							? 'text-color-green-primary'
							: ricks[third].status === 'Dead'
							? 'text-red-500'
							: 'text-gray-500'}
					>
						{ricks[third].status}
					</span>
				</div>
			</div>
		</div>
	</div>
{/if}
