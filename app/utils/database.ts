import { prisma } from "@/lib/prisma";

export type Film = {
  id: number;
  name: string;
  brand: {
    id: number;
    name: string | null;
    location: string | null;
    does_coat: boolean | null;
  } | null;
  ISO: number | null;
  dev_process: "C_41" | "E_6" | "ECN_2" | "B_W" | null;
  is_available: boolean | null;
  formats: string[];
  image_url: string | null;
  parent: Film | null;
  children: Film[] | null;
};

/**
 * Reads all films from the database with their relationships
 * Handles parent-child relationships where a film can have:
 * - No parent and no children
 * - A parent (and no children)
 * - Children (and no parent)
 * 
 * @returns Promise<Film[]> Array of all films with nested relationships
 */
export async function getAllFilms(): Promise<Film[]> {
  // Fetch all films with their brand and relationships
  const films = await prisma.film.findMany({
    include: {
      brand: true,
      parentRelations: {
        include: {
          child: {  // parentRelations = this film is parent, so include child
            include: {
              brand: true,
            },
          },
        },
      },
      childRelations: {
        include: {
          parent: {  // childRelations = this film is child, so include parent
            include: {
              brand: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  // Create a map of films by ID for quick lookup
  const filmsMap = new Map<bigint, any>();
  films.forEach((f: any) => {
    filmsMap.set(f.id, f);
  });

  // Transform the data to match the Film type structure
  const transformedFilms: Film[] = films.map((film: any) => {
    // parentRelations = relations where this film is the parent → contains children
    // childRelations = relations where this film is the child → contains parent
    
    // Find if this film has a parent (is a child)
    const childRelation = film.childRelations?.[0];
    let parent: Film | null = null;
    
    if (childRelation && childRelation.parent) {
      // Get the parent film from the map to access its full relations
      // Use childRelation.parent.id to look it up
      const parentId = childRelation.parent.id;
      const parentFilm = filmsMap.get(parentId);
      
      if (parentFilm) {
        // Build parent's children from the parent film's parentRelations
        const parentChildren: Film[] = (parentFilm.parentRelations || [])
          .filter((rel: any) => rel.child && rel.child.id !== film.id) // Exclude current film and ensure child exists
          .map((relation: any) => {
            if (!relation.child) return null; // Extra safety check
            return {
              id: Number(relation.child.id),
              name: relation.child.name || `Film ${relation.child.id}`,
              brand: relation.child.brand
                ? {
                    id: Number(relation.child.brand.id),
                    name: relation.child.brand.name,
                    location: relation.child.brand.location,
                    does_coat: relation.child.brand.does_coat,
                  }
                : null,
              ISO: relation.child.ISO,
              dev_process: relation.child.dev_process,
              is_available: relation.child.is_available,
              formats: relation.child.formats,
              image_url: relation.child.image_url,
              parent: null,
              children: null,
            };
          })
          .filter((f: any) => f !== null); // Remove any null entries

        // Build parent's parent if it exists
        const parentParentRelation = parentFilm.childRelations?.[0];
        const parentParent: Film | null = parentParentRelation && parentParentRelation.parent
          ? {
              id: Number(parentParentRelation.parent.id),
              name: parentParentRelation.parent.name || `Film ${parentParentRelation.parent.id}`,
              brand: parentParentRelation.parent.brand
                ? {
                    id: Number(parentParentRelation.parent.brand.id),
                    name: parentParentRelation.parent.brand.name,
                    location: parentParentRelation.parent.brand.location,
                    does_coat: parentParentRelation.parent.brand.does_coat,
                  }
                : null,
              ISO: parentParentRelation.parent.ISO,
              dev_process: parentParentRelation.parent.dev_process,
              is_available: parentParentRelation.parent.is_available,
              formats: parentParentRelation.parent.formats,
              image_url: parentParentRelation.parent.image_url,
              parent: null, // Stop recursion at 2 levels
              children: null,
            }
          : null;

        parent = {
          id: Number(childRelation.parent.id),
          name: childRelation.parent.name || `Film ${childRelation.parent.id}`,
          brand: childRelation.parent.brand
            ? {
                id: Number(childRelation.parent.brand.id),
                name: childRelation.parent.brand.name,
                location: childRelation.parent.brand.location,
                does_coat: childRelation.parent.brand.does_coat,
              }
            : null,
          ISO: childRelation.parent.ISO,
          dev_process: childRelation.parent.dev_process,
          is_available: childRelation.parent.is_available,
          formats: childRelation.parent.formats,
          image_url: childRelation.parent.image_url,
          parent: parentParent,
          children: parentChildren.length > 0 ? parentChildren : null,
        };
      }
    }

    // Get children if exist (film is a parent)
    const children: Film[] = (film.parentRelations || [])
      .filter((rel: any) => rel.child) // Safety check
      .map((relation: any) => ({
        id: Number(relation.child.id),
        name: relation.child.name || `Film ${relation.child.id}`, // Added missing name
        brand: relation.child.brand
          ? {
              id: Number(relation.child.brand.id),
              name: relation.child.brand.name,
              location: relation.child.brand.location,
              does_coat: relation.child.brand.does_coat,
            }
          : null,
        ISO: relation.child.ISO,
        dev_process: relation.child.dev_process,
        is_available: relation.child.is_available,
        formats: relation.child.formats,
        image_url: relation.child.image_url,
        parent: null, // Don't recurse child's parent (would be this film)
        children: null, // Changed from [] to null to match type
      }));

    return {
      id: Number(film.id),
      name: film.name || `Film ${film.id}`, // Ensure name is never null
      brand: film.brand
        ? {
            id: Number(film.brand.id),
            name: film.brand.name,
            location: film.brand.location,
            does_coat: film.brand.does_coat,
          }
        : null,
      ISO: film.ISO,
      dev_process: film.dev_process,
      is_available: film.is_available,
      formats: film.formats,
      image_url: film.image_url,
      parent,
      children: children.length > 0 ? children : null,
    };
  });

  return transformedFilms;
}

/**
 * Gets a single film by ID with its relationships
 */
export async function getFilmById(id: number): Promise<Film | null> {
  const film = await prisma.film.findUnique({
    where: { id: BigInt(id) },
    include: {
      brand: true,
      parentRelations: {
        include: {
          child: {  // parentRelations = this film is parent, so include child
            include: {
              brand: true,
            },
          },
        },
      },
      childRelations: {
        include: {
          parent: {  // childRelations = this film is child, so include parent
            include: {
              brand: true,
            },
          },
        },
      },
    },
  });

  if (!film) return null;

  // parentRelations = relations where this film is the parent → contains children
  // childRelations = relations where this film is the child → contains parent
  const childRelation = film.childRelations?.[0];
  const parent: Film | null = childRelation && childRelation.parent
    ? {
        id: Number(childRelation.parent.id),
        name: childRelation.parent.name || `Film ${childRelation.parent.id}`,
        brand: childRelation.parent.brand
          ? {
              id: Number(childRelation.parent.brand.id),
              name: childRelation.parent.brand.name,
              location: childRelation.parent.brand.location,
              does_coat: childRelation.parent.brand.does_coat,
            }
          : null,
        ISO: childRelation.parent.ISO,
        dev_process: childRelation.parent.dev_process,
        is_available: childRelation.parent.is_available,
        formats: childRelation.parent.formats,
        image_url: childRelation.parent.image_url,
        parent: null,
        children: null,
      }
    : null;

  const children: Film[] = (film.parentRelations || [])
    .filter((rel: any) => rel.child) // Safety check
    .map((relation: any) => ({
      id: Number(relation.child.id),
      name: relation.child.name || `Film ${relation.child.id}`,
      brand: relation.child.brand
        ? {
            id: Number(relation.child.brand.id),
            name: relation.child.brand.name,
            location: relation.child.brand.location,
            does_coat: relation.child.brand.does_coat,
          }
        : null,
      ISO: relation.child.ISO,
      dev_process: relation.child.dev_process,
      is_available: relation.child.is_available,
      formats: relation.child.formats,
      image_url: relation.child.image_url,
      parent: null,
      children: null,
    }));

  return {
    id: Number(film.id),
    name: film.name || `Film ${film.id}`, // Ensure name is never null
    brand: film.brand
      ? {
          id: Number(film.brand.id),
          name: film.brand.name,
          location: film.brand.location,
          does_coat: film.brand.does_coat,
        }
      : null,
    ISO: film.ISO,
    dev_process: film.dev_process,
    is_available: film.is_available,
    formats: film.formats,
    image_url: film.image_url,
    parent,
    children: children.length > 0 ? children : null,
  };
}
