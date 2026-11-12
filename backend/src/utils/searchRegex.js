// Escapes RegExp special characters so they match literally.
// Not RegExp.escape(): it also escapes some letters as \xNN,
// and the letter step below breaks them ("jugo" → \x6augo).
function escapeRegex(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Builds a RegExp that ignores case and accents:
// "cafe" matches "Café Latte".
function buildSearchRegex(searchInput) {
	// 1. Remove accents: NFD splits "é" into "e" + an accent mark
	const unaccented = searchInput
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');

	// 2. Escape before adding the letter classes,
	// or their [ ] would be escaped too
	const escaped = escapeRegex(unaccented);

	// 3. Match each vowel and n with its accented forms
	const accentMap = {
		a: '[aáàäâ]',
		e: '[eéèëê]',
		i: '[iíìïî]',
		o: '[oóòöô]',
		u: '[uúùüû]',
		n: '[nñ]'
	};

	const finalPattern = escaped.replace(/[aeioun]/gi, (letter) => {
		return accentMap[letter.toLowerCase()];
	});

	// 'i' ignores case, also for accented letters
	return new RegExp(finalPattern, 'i');
}

export { buildSearchRegex };
