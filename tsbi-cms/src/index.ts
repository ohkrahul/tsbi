import type { Core } from '@strapi/strapi';

/** Content-type UIDs that the public (unauthenticated) role can read */
const PUBLIC_READ_UIDS = [
  'api::case-study.case-study',
  'api::work-item.work-item',
  'api::journal-article.journal-article',
  'api::job-listing.job-listing',
  'api::leadership-slide.leadership-slide',
  'api::client-brand.client-brand',
  'api::site-setting.site-setting',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicReadPermissions(strapi);
  },
};

/**
 * Automatically grants find/findOne read permissions to the Public role
 * for all listed content types, so no manual Strapi admin step is needed.
 */
async function grantPublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existingPerms: { action: string }[] = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: publicRole.id } } });

  const existingActions = new Set(existingPerms.map((p) => p.action));

  const toCreate: { action: string; role: number }[] = [];

  for (const uid of PUBLIC_READ_UIDS) {
    // Derive the controller prefix: api::case-study.case-study → api::case-study
    const prefix = uid.replace(/\.[^.]+$/, '');
    for (const action of ['find', 'findOne']) {
      const actionKey = `${prefix}.${action}`;
      if (!existingActions.has(actionKey)) {
        toCreate.push({ action: actionKey, role: publicRole.id });
      }
    }
  }

  for (const perm of toCreate) {
    await strapi.query('plugin::users-permissions.permission').create({ data: perm });
  }
}
