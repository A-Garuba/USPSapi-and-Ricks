<script lang="ts">
	import { goto } from '$app/navigation';
	import { XMLParser } from 'fast-xml-parser';

	import { verifyPlace } from '$utils/api/address.util';

	import Address from '$components/Address.svelte';
	import Ricks from '$components/Rick.svelte';

	const parser = new XMLParser();

	let values: Place = {
		address: '',
		suiteOrApt: '',
		city: '',
		state: '',
		zip: ''
	};

	let USPSAddress;
	let displayAddress: Place;

	/**
	 * This function makes a call to the USPS API and stores response in local variable 'displayAddress'
	 * If the API returns an error, we clear 'displayAddress'
	 */
	const updateUSPS = async () => {
		let response = await verifyPlace(values);
		let parsedRes = parser.parse(response);

		// if we got an address back, update UI
		if (!parsedRes.AddressValidateResponse.Address.Error) {
			USPSAddress = parsedRes.AddressValidateResponse.Address;
			displayAddress = {
				address: USPSAddress.Address2 || '',
				suiteOrApt: USPSAddress.Address1 || '',
				city: USPSAddress.City || '',
				state: USPSAddress.State || '',
				zip: `${USPSAddress.Zip5}-${USPSAddress.Zip4}` || ''
			};
		} else {
			displayAddress = null;
		}
	};

	// make API request when any of the fields change
	$: if (values.address || values.suiteOrApt || values.city || values.state || values.zip)
		updateUSPS();
</script>

<div class="section">
	<div class="absolute top-0 left-0 p-4">
		<img
			class="w-8 h-8 rounded object-cover cursor-pointer hover:scale-110 hover:drop-shadow-xl"
			src="static/images/favicon.png"
			alt="GoodR Co Logo"
			on:click={() => goto('https://goodr.co/')}
		/>
	</div>

	<div class="text-lg md:text-2xl px-16 md:px-0 text-center">
		Enter an Address for your Pickup Request
	</div>

	<!-- Address form -->
	<div class="flex flex-col gap-3 mt-4">
		<input
			class="w-full {values.address ? 'border-color-green-primary' : 'border-gray-300'}"
			placeholder="Street"
			on:input={(e) => {
				values.address = e.currentTarget.value;
			}}
		/>

		<input
			class="w-full {values.suiteOrApt ? 'border-color-green-primary' : 'border-gray-300'}"
			placeholder="Apt/Suite #"
			on:input={(e) => {
				values.suiteOrApt = e.currentTarget.value;
			}}
		/>

		<div class="flex flex-row gap-3">
			<input
				class="grow {values.city ? 'border-color-green-primary' : 'border-gray-300'}"
				placeholder="City"
				on:input={(e) => {
					values.city = e.currentTarget.value;
				}}
			/>

			<input
				class="w-1/5 {values.state ? 'border-color-green-primary' : 'border-gray-300'}"
				placeholder="State"
				on:input={(e) => {
					values.state = e.currentTarget.value;
				}}
			/>

			<input
				class="w-1/5 {values.zip ? 'border-color-green-primary' : 'border-gray-300'}"
				placeholder="Zip"
				on:input={(e) => {
					values.zip = e.currentTarget.value;
				}}
			/>
		</div>

		<!-- <div class="flex flex-row gap-3">
            <input class="grow"
                    placeholder="County">

            <input class="grow"
                placeholder="Country">
        </div> -->
	</div>
</div>

{#if displayAddress}
	<!-- Formatted API response -->
	<Address
		bind:address={displayAddress.address}
		suiteOrApt={displayAddress.suiteOrApt}
		city={displayAddress.city}
		state={displayAddress.state}
		zip={displayAddress.zip}
	/>

	<Ricks />
{/if}

<style lang="postcss">
	input {
		@apply rounded p-1;
		@apply border-2;
		@apply focus:border-color-green-primary focus:shadow-lg;
		@apply hover:border-color-green-primary hover:shadow-lg;
	}
</style>
