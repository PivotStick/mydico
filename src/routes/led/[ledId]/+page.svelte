<script>
	import { page } from "$app/stores";
	import { data } from "$lib/stores/data";

	// @ts-ignore
	$: index = $data.values.leds.findIndex((l) => l._id === $page.params.ledId);
</script>

<pre>{JSON.stringify($data.values.leds[index], null, 2)}</pre>
