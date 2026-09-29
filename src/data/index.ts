// The data barrel.
//
// `@/data/universities` is the single source of truth; this file only
// re-exports it so callers can `import { universities } from "@/data"` without
// reaching past the module boundary. It declares no entities of its own.

export * from "./universities";
