export async function load({ params, parent }) {
	const parentData = await parent();

	const category = parentData.categories.find((cat: any) => cat.folder === params.slug)!;
	return {
		category
	};
}
