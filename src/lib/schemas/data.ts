import { isValidIANATimezone } from '$lib';
import * as v from 'valibot';

export const DataSchema = v.object({
	restaurant: v.object({
		name: v.string(),
		bannerImage: v.string(),
		address: v.string(),
		phone: v.string(),
		wifiPassword: v.string(),
		timezone: v.pipe(v.string(), v.check(isValidIANATimezone)),
		time: v.object({
			monday: v.string(),
			tuesday: v.string(),
			wednesday: v.string(),
			thursday: v.string(),
			friday: v.string(),
			saturday: v.string(),
			sunday: v.string()
		})
	}),
	categories: v.array(
		v.object({
			name: v.string(),
			folder: v.string(),
			items: v.array(
				v.object({
					name: v.string(),
					image: v.string(),
					description: v.string(),
					weight: v.string(),
					price: v.string(),
					isVegan: v.boolean()
				})
			)
		})
	)
});

export type DataType = v.InferOutput<typeof DataSchema>;
