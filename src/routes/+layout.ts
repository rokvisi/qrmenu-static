import { DataSchema } from '$lib/schemas/data';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

export const prerender = 'auto';
export const ssr = false;

export async function load({ fetch }) {
	// Fetch the '/data/data.json' file from the server.
	const res = await fetch('/data/data.json');
	const json = await res.json();

	// Parse the json.
	const parseResult = v.safeParse(DataSchema, json);
	if (!parseResult.success) {
		console.log('validation issues:', parseResult.issues);

		throw error(500, {
			message: 'Invalid data format'
		});
	}

	const data = parseResult.output;
	return data;
}
