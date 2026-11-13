import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchRegex } from './searchRegex.js';

describe('buildSearchRegex', () => {
	describe('ignores case and accents', () => {
		for (const input of ['cafe', 'CAFE', 'café', 'CAFÉ']) {
			test(`"${input}" matches "Café Latte"`, () => {
				assert.match('Café Latte', buildSearchRegex(input));
			});
		}

		test('"café" matches a name saved without accent', () => {
			assert.match('Cafe de olla', buildSearchRegex('café'));
		});

		test('matches anywhere in the name', () => {
			assert.match('Café Latte', buildSearchRegex('latte'));
		});

		test('"cafe" does not match "Té verde"', () => {
			assert.doesNotMatch('Té verde', buildSearchRegex('cafe'));
		});
	});

	describe('treats special characters as plain text', () => {
		for (const input of ['(', '[', '+56', '\\', '?']) {
			test(`"${input}" does not throw`, () => {
				assert.doesNotThrow(() => buildSearchRegex(input));
			});
		}

		test('".*" only matches the literal text ".*"', () => {
			assert.doesNotMatch('Café Latte', buildSearchRegex('.*'));
			assert.match('a.*b', buildSearchRegex('.*'));
		});

		test('"+56" matches a phone that contains it', () => {
			assert.match('+56987654321', buildSearchRegex('+56'));
		});
	});

	// RegExp.escape() turns "j" into \x6a and ":" into \x3a, and the
	// vowel step broke them. These failed with it.
	describe('letters and signs RegExp.escape() broke', () => {
		test('"jugo" matches "Jugo de naranja"', () => {
			assert.match('Jugo de naranja', buildSearchRegex('jugo'));
		});

		test('"naranja" matches "Jugo de naranja"', () => {
			assert.match('Jugo de naranja', buildSearchRegex('naranja'));
		});

		test('"te:" matches "Té: verde"', () => {
			assert.match('Té: verde', buildSearchRegex('te:'));
		});
	});

	// Documents current behavior: the helper doesn't trim or skip empty
	// input, the controller does it before calling it.
	test('an empty input matches every name', () => {
		assert.match('Café Latte', buildSearchRegex(''));
	});

	for (const input of ['nino', 'niño', 'NIÑO']) {
		test(`"${input}" matches "Niño"`, () => {
			assert.match('Niño', buildSearchRegex(input));
		});
	}
});
