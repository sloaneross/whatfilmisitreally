import type { Film } from "./database";

/**
 * Finds a film by ID from an array of films
 * Uses in-memory lookup instead of database query
 */
export function findFilmById(films: Film[], id: number): Film | null {
  return films.find((film) => film.id === id) || null;
}

