"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Film } from "../utils/database";

interface FilmsContextType {
  films: Film[];
  loading: boolean;
  error: string | null;
  loadFilms: () => Promise<void>;
}

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

export function FilmsProvider({ children, initialFilms }: { children: ReactNode; initialFilms: Film[] }) {
  const [films, setFilms] = useState<Film[]>(initialFilms);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadFilms = async () => {
    if (films.length > 0) {
      // Already loaded, don't reload
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/films");
      if (!response.ok) {
        throw new Error("Failed to fetch films");
      }
      const data = await response.json();
      setFilms(data.films || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load films");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FilmsContext.Provider value={{ films, loading, error, loadFilms }}>
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilms() {
  const context = useContext(FilmsContext);
  if (context === undefined) {
    throw new Error("useFilms must be used within a FilmsProvider");
  }
  return context;
}

