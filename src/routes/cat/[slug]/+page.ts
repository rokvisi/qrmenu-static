// import type { EntryGenerator } from './$types';

// export const entries: EntryGenerator = () => {
// 	return [{ slug: 'hello-world' }, { slug: 'another-blog-post' }];
// };

export async function load({ params, parent }) {
	const parentData = await parent();

	const category = parentData.categories.find((cat: any) => cat.folder === params.slug)!;
	return {
		category
	};
}
