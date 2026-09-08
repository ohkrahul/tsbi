import type { Field } from 'payload'

/**
 * Archive instead of delete. An archived document disappears from the website
 * but stays here in full, and unticking this publishes it again — so taking
 * something down never means destroying it. Delete remains for the times you
 * really do want it gone.
 *
 * Indexed because every public query filters on it.
 */
export const archivedField: Field = {
  name: 'archived',
  type: 'checkbox',
  defaultValue: false,
  index: true,
  admin: { description: 'Hidden from the website but kept here. Untick to put it back.' },
}
