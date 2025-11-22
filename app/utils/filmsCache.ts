import { cache } from "react";
import { getAllFilms, type Film } from "./database";

/**
 * Gets all films with React cache
 * React's cache function ensures the database is only queried once per request
 * and the result is shared across all components in the same request
 * 
 * Note: In Next.js, this caches per request. For true app-startup-only caching,
 * you'd need to use a module-level cache or external state management.
 */
export const getCachedFilms = cache(async (): Promise<Film[]> => {
  return getAllFilms();
});

// Module-level cache for true app-startup-only behavior
let globalFilmsCache: Film[] | null = null;
let globalFilmsCachePromise: Promise<Film[]> | null = null;

/**
 * Gets all films with module-level caching
 * Only queries the database once per server instance lifetime
 * Persists across page refreshes and navigation (until server restart)
 * @returns Promise<Film[]> Array of all films
 */
export async function getGlobalCachedFilms(): Promise<Film[]> {
  // Return cached films if available
  if (globalFilmsCache !== null) {
    return globalFilmsCache;
  }

  // If a query is already in progress, wait for it
  if (globalFilmsCachePromise !== null) {
    return globalFilmsCachePromise;
  }

  // Query database and cache the result
  globalFilmsCachePromise = getAllFilms().then((films) => {
    globalFilmsCache = films;
    return films;
  });

  return globalFilmsCachePromise;
}

/**
 * Clears the global films cache (useful for testing or forced refresh)
 */
export function clearGlobalFilmsCache(): void {
  globalFilmsCache = null;
  globalFilmsCachePromise = null;
}

