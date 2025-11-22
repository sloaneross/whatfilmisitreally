import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed file for parent-child film relationships
 * 
 * This is for tracking rebranded films - films that are actually the same base stock
 * sold under different brand names.
 * 
 * Format: Each entry defines a base film (parent) and its rebranded versions (children)
 * 
 * Example:
 * {
 *   parent: { brand: "Foma", name: "Fomapan 400" },
 *   children: [
 *     { brand: "Arista", name: "EDU 400" },
 *     { brand: "Freestyle", name: "B&W 400" },
 *   ]
 * }
 * 
 * This means "Arista EDU 400" and "Freestyle B&W 400" are actually rebranded versions
 * of "Foma Fomapan 400" - they're the same film stock, just sold under different names.
 * 
 * The parent is the original/base film stock.
 * The children are the rebranded versions.
 */

interface FilmIdentifier {
  brand: string;
  name: string;
}

interface Relationship {
  parent: FilmIdentifier;
  children: FilmIdentifier[];
}

// Define your rebranding relationships here
// 
// Format: Each object has a base film (parent) and rebranded versions (children)
// The parent is the original/base film stock
// The children are rebranded versions of that same film stock
//
// Example: Arista EDU 400 is actually Fomapan 400 rebranded
const relationships: Relationship[] = [
  // Add your rebranding relationships here in this format:
  // {
  //   parent: { brand: "BaseBrand", name: "Base Film Name" },
  //   children: [
  //     { brand: "Rebrand1", name: "Rebranded Film 1" },
  //     { brand: "Rebrand2", name: "Rebranded Film 2" },
  //   ]
  // },
  
  // Example (commented out - uncomment and modify as needed):
  {
    parent: { brand: "Foma", name: "Fomapan 400" },
    children: [
      { brand: "Arista", name: "EDU 400" },
      { brand: "Lomography", name: "Lady Grey 400" },
    ]
  },
  {
    parent: { brand: "Foma", name: "Fomapan 100" },
    children: [
      { brand: "Arista", name: "EDU 100" },
      { brand: "Lomography", name: "Earl Grey 100" },
    ]
  },
  {
    parent: { brand: "Foma", name: "Fomapan 200" },
    children: [
      { brand: "Arista", name: "EDU 200" }
    ]
  },
  {
    parent: { brand: "Kodak", name: "Eastman Double X 5222" },
    children: [
      { brand: "CineStill", name: "BwXX" },
      { brand: "Film Photography Project", name: "XX-250" },
      { brand: "Reflx Lab", name: "Double X" }
    ]
  },
  {
    parent: { brand: "Kodak", name: "Vision3 500T 5219" },
    children: [
      { brand: "CineStill", name: "800T" },
      { brand: "Film Photography Project", name: "Aurora 800" },
      { brand: "Reflx Lab", name: "800 Tungsten" }, 
    ]
  },
];

async function main() {
  console.log("Starting relationship seed...");
  console.log(`Found ${relationships.length} relationship(s) to process`);

  for (const relationship of relationships) {
    // Find parent film
    const parentBrand = await prisma.brand.findFirst({
      where: { name: relationship.parent.brand },
    });

    if (!parentBrand) {
      console.error(`Brand not found: ${relationship.parent.brand}`);
      continue;
    }

    const parentFilm = await prisma.film.findFirst({
      where: {
        name: relationship.parent.name,
        brandId: parentBrand.id,
      },
    });

    if (!parentFilm) {
      console.error(
        `Parent film not found: ${relationship.parent.brand} ${relationship.parent.name}`
      );
      continue;
    }

    console.log(
      `Processing parent: ${relationship.parent.brand} ${relationship.parent.name}`
    );

    // Process each child
    for (const childIdentifier of relationship.children) {
      const childBrand = await prisma.brand.findFirst({
        where: { name: childIdentifier.brand },
      });

      if (!childBrand) {
        console.error(`Brand not found: ${childIdentifier.brand}`);
        continue;
      }

      const childFilm = await prisma.film.findFirst({
        where: {
          name: childIdentifier.name,
          brandId: childBrand.id,
        },
      });

      if (!childFilm) {
        console.error(
          `Child film not found: ${childIdentifier.brand} ${childIdentifier.name}`
        );
        continue;
      }

      // Check if relationship already exists
      const existingRelation = await prisma.filmToParent.findUnique({
        where: {
          parentId_childId: {
            parentId: parentFilm.id,
            childId: childFilm.id,
          },
        },
      });

      if (existingRelation) {
        console.log(
          `  Relationship already exists: ${childIdentifier.brand} ${childIdentifier.name} is ${relationship.parent.brand} ${relationship.parent.name}`
        );
        continue;
      }

      // Create the relationship
      await prisma.filmToParent.create({
        data: {
          parentId: parentFilm.id,
          childId: childFilm.id,
        },
      });

      console.log(
        `  Created relationship: ${childIdentifier.brand} ${childIdentifier.name} is actually ${relationship.parent.brand} ${relationship.parent.name}`
      );
    }
  }

  console.log("Relationship seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

