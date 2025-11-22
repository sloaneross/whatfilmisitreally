"use client";

import { useFilms } from "@/app/context/FilmsContext";
import { findFilmById } from "@/app/utils/filmsLookup";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { films } = useFilms(); // Get films from context (no database query)
  
  // Find film in memory instead of querying database
  const film = findFilmById(films, Number(id));

  if (!film) {
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <p><a href="/">← Back</a></p>
        <h1>Film not found</h1>
        <p>The film with ID {id} could not be found.</p>
      </div>
    );
  }

  const processNames: Record<string, string> = {
    C_41: "C-41",
    E_6: "E-6",
    ECN_2: "ECN-2",
    B_W: "B/W",
  };

  const hasParent = film.parent !== null;
  const hasChildren = film.children !== null && film.children.length > 0;
  const isUnique = !hasParent && !hasChildren;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <p><a href="/">← Back</a></p>
      <table border={1} cellPadding="5" cellSpacing="0" style={{ width: "70%", marginTop: "20px" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              {film.image_url && (
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Image
                    src={film.image_url}
                    alt={`${film.brand?.name || ""} ${film.name}`.trim()}
                    width={300}
                    height={400}
                    style={{ objectFit: "contain" }}
                    unoptimized={film.image_url.startsWith("https://via.placeholder.com")}
                  />
                </div>
              )}
            </td>
            <td style={{ verticalAlign: "top" }}>
              <table cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
                <tbody>
                  {film.brand && (
                    <tr>
                      <td><strong>Brand</strong></td>
                      <td>{film.brand.name || "Unknown"}</td>
                    </tr>
                  )}
                  {film.brand?.location && (
                    <tr>
                      <td><strong>Location</strong></td>
                      <td>{film.brand.location}</td>
                    </tr>
                  )}
                  {film.ISO && (
                    <tr>
                      <td><strong>ISO</strong></td>
                      <td>{film.ISO}</td>
                    </tr>
                  )}
                  {film.dev_process && (
                    <tr>
                      <td><strong>Process</strong></td>
                      <td>{processNames[film.dev_process] || film.dev_process}</td>
                    </tr>
                  )}
                  {film.formats && film.formats.length > 0 && (
                    <tr>
                      <td><strong>Formats</strong></td>
                      <td>{film.formats.join(", ")}</td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Available</strong></td>
                    <td>{film.is_available ? "Yes" : "No"}</td>
                  </tr>
                  {isUnique && (
                    <tr>
                      <td colSpan={2} style={{ 
                        backgroundColor: "#e8f5e9", 
                        padding: "10px", 
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#2e7d32"
                      }}>
                        This film is unique
                      </td>
                    </tr>
                  )}
                  {hasParent && film.parent && (
                    <tr>
                      <td><strong>Base Film</strong></td>
                      <td>
                        <Link 
                          href={`/film/${film.parent.id}`}
                          style={{ color: "#1976d2", textDecoration: "underline" }}
                        >
                          {film.parent.brand?.name || "Unknown"} {film.parent.name}
                        </Link>
                      </td>
                    </tr>
                  )}
                  {hasChildren && film.children && (
                    <tr>
                      <td><strong>Rebranded As</strong></td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                          {film.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/film/${child.id}`}
                              style={{ color: "#1976d2", textDecoration: "underline" }}
                            >
                              {child.brand?.name || "Unknown"} {child.name}
                            </Link>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

