/**
 * Runnable check for the client <-> case-study matching.
 *   node --experimental-strip-types src/lib/clients.check.ts
 * Runs against the bundled case studies, so it needs no database.
 */
import assert from 'node:assert/strict';
import { caseStudies } from './caseStudies.ts';
import { CLIENT_ROSTER, clientSlug, siblingStudies, studiesForClient } from './clients.ts';

const count = (client: string) => studiesForClient(client, caseStudies).length;

// Qualified names still belong to the brand.
assert.equal(count('Ashok Leyland'), 7);
assert.equal(count('Zydus'), 6); // Lifesciences x4 + India + Vaxiflu
assert.equal(count('Sandu'), 2); // "Sandu" + "Sandu Pharma"
assert.equal(count('LuLu'), 1); // "LuLu Hypermarket"
assert.equal(count('Thailand Tourism'), 1); // "...Tourism Board"
assert.equal(count('Dharma Productions'), 2);

// A collaboration counts for both brands.
assert.equal(count('DHL'), 1);
assert.equal(count('Mumbai Indians'), 1);
assert.equal(
  studiesForClient('DHL', caseStudies)[0].slug,
  studiesForClient('Mumbai Indians', caseStudies)[0].slug,
);

// Aliases, for names that share no words with the brand.
assert.equal(count('Protinex'), 1); // "ProteinX India"

// Whole words only: "Fiat" must not claim a hypothetical "FiatPe" study.
assert.equal(
  studiesForClient('Fiat', [
    { slug: 'x', clientName: 'FiatPe' } as (typeof caseStudies)[number],
  ]).length,
  0,
);
// ...and a client with no work links nowhere.
assert.equal(count('Warner Bros'), 0);

// Siblings group by brand, not by name: a Vaxiflu reader is offered the rest
// of the Zydus work even though the two client names share no words.
const vaxiflu = caseStudies.find((s) => s.clientName === 'Zydus Vaxiflu')!;
const sibs = siblingStudies(vaxiflu, caseStudies);
assert.equal(sibs.client?.name, 'Zydus');
assert.equal(sibs.studies.length, 5);
assert.ok(!sibs.studies.some((s) => s.slug === vaxiflu.slug), 'never lists itself');

// Slugs round-trip to something usable in a URL.
assert.equal(clientSlug('Ashok Leyland'), 'ashok-leyland');
assert.equal(clientSlug('&TV'), 'tv');
assert.equal(new Set(CLIENT_ROSTER.map((c) => clientSlug(c.name))).size, CLIENT_ROSTER.length, 'slugs are unique');

const linked = CLIENT_ROSTER.filter((c) => count(c.name) > 0);
console.log(
  `clients check: ok — ${linked.length}/${CLIENT_ROSTER.length} clients link to work,`,
  `${linked.filter((c) => count(c.name) > 1).length} with more than one`,
);
