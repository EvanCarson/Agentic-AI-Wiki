// Playbooks share the same Entry/Group/Related/Localized shape as Deep-Dives.
// One source of truth lives under deep-dives/types.ts; re-export here so this
// section's group files can import from `../types.ts` like deep-dives does.
export type { Localized, Entry, Group, Related } from '../deep-dives/types.ts';
export { L } from '../deep-dives/types.ts';
