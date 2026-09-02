// The one impure piece of the llms.txt build: binds the six section manifests
// (Vite `import.meta.glob` modules, so only importable inside a build) to the
// `Sources` shape the pure builder in `./llms-txt.ts` consumes. Both locale
// routes share this so the two editions can never list different pages.
import { entries as concepts } from '../content/concepts/manifest';
import { GROUPS as deepDives } from '../content/deep-dives/manifest';
import { GROUPS as playbooks } from '../content/playbooks/manifest';
import { GROUPS as operations } from '../content/operations/manifest';
import { PARTS as fieldGuide } from '../content/field-guide/manifest';
import { POSTS as posts } from '../content/blogs/manifest';
import type { Sources } from './llms-txt';

export const SOURCES: Sources = { concepts, deepDives, playbooks, operations, fieldGuide, posts };
