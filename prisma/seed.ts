import { PrismaClient } from "@prisma/client";
import { getFilmImage } from "./filmImages";

type Process = "C_41" | "E_6" | "ECN_2" | "B_W";

const prisma = new PrismaClient();

// Film data extracted from Wikipedia: https://en.wikipedia.org/wiki/List_of_photographic_films
const filmData = [
  // ADOX
  { brand: "ADOX", name: "CMS 20 II PRO", iso: 20, process: "B_W", formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "ADOX", name: "HR-50", iso: 50, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "ADOX", name: "CHS 100 II", iso: 100, process: "B_W" as Process, formats: ["135-36", "120", "Sheet film"], isAvailable: true },
  { brand: "ADOX", name: "Scala 50", iso: 50, process: "B_W" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "ADOX", name: "Color Mission Helios", iso: 3, process: "C_41" as Process, formats: ["135-36", "Sheet film"], isAvailable: false },
  { brand: "ADOX", name: "Color Mission 200", iso: 200, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },

  // Arista
  { brand: "Arista", name: "EDU 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Arista", name: "EDU 200", iso: 200, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Arista", name: "EDU 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  // Fujifilm
  { brand: "Fujifilm", name: "Acros 100 II", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Fujifilm", name: "Neopan 100", iso: 100, process: "B_W" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Superia X-Tra 400", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Superia Premium 400", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Superia Venus 800", iso: 800, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Fujicolor 100", iso: 100, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Fujicolor 200", iso: 200, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Fujicolor 400", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Fujifilm", name: "Provia 100F", iso: 100, process: "E_6" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Fujifilm", name: "Velvia 50", iso: 50, process: "E_6" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Fujifilm", name: "Velvia 100", iso: 100, process: "E_6" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },

  // Kodak
  { brand: "Kodak", name: "T-Max 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120", "4x5\"", "8x10\""], isAvailable: true },
  { brand: "Kodak", name: "T-Max 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\"", "8x10\""], isAvailable: true },
  { brand: "Kodak", name: "T-Max P3200", iso: 3200, process: "B_W" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Kodak", name: "Tri-X 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\"", "8x10\""], isAvailable: true },
  { brand: "Kodak", name: "Plus-X 125", iso: 125, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: false },
  { brand: "Kodak", name: "Portra 160", iso: 160, process: "C_41" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Kodak", name: "Portra 400", iso: 400, process: "C_41" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Kodak", name: "Portra 800", iso: 800, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Kodak", name: "Ektar 100", iso: 100, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Kodak", name: "Gold 200", iso: 200, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Kodak", name: "UltraMax 400", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Kodak", name: "Ektachrome E100", iso: 100, process: "E_6" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Kodak", name: "Ektachrome E200", iso: 200, process: "E_6" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Kodak", name: "Vision3 500T 5219", iso: 500, process: "ECN_2" as Process, formats: ["35mm", "65mm"], isAvailable: true },
  { brand: "Kodak", name: "Eastman Double X 5222", iso: 200, process: "B_W" as Process, formats: ["35mm", "65mm"], isAvailable: true },
  // Ilford
  { brand: "Ilford", name: "Delta 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Ilford", name: "Delta 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Ilford", name: "Delta 3200", iso: 3200, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Ilford", name: "HP5 Plus", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\"", "8x10\""], isAvailable: true },
  { brand: "Ilford", name: "FP4 Plus", iso: 125, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Ilford", name: "Pan F Plus", iso: 50, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Ilford", name: "XP2 Super", iso: 400, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Lomography
  { brand: "Lomography", name: "Lady Grey 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "Earl Grey 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "Berlin Kino 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "Color Negative 100", iso: 100, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "Color Negative 400", iso: 400, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "Color Negative 800", iso: 800, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Lomography", name: "LomoChrome Purple", iso: 100, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "LomoChrome Turquoise", iso: 100, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "LomoChrome Metropolis", iso: 100, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Lomography", name: "LomoChrome Color '92", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Lomography", name: "Lomography Redscale XR", iso: 50, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },

  // CineStill
  { brand: "CineStill", name: "800T", iso: 800, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "CineStill", name: "400D", iso: 400, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "CineStill", name: "50D", iso: 50, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "CineStill", name: "BwXX", iso: 200, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Foma
  { brand: "Foma", name: "Fomapan 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Foma", name: "Fomapan 200", iso: 200, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },
  { brand: "Foma", name: "Fomapan 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },

  // Rollei
  { brand: "Rollei", name: "RPX 25", iso: 25, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Rollei", name: "RPX 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Rollei", name: "RPX 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Rollei", name: "Superpan 200", iso: 200, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Rollei", name: "CR 200", iso: 200, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Rollei", name: "Crossbird", iso: 200, process: "E_6" as Process, formats: ["135-36"], isAvailable: true },

  // AgfaPhoto
  { brand: "AgfaPhoto", name: "APX 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "AgfaPhoto", name: "APX 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "AgfaPhoto", name: "Vista Plus 200", iso: 200, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "AgfaPhoto", name: "Vista Plus 400", iso: 400, process: "C_41" as Process, formats: ["135-36"], isAvailable: true },

  // Kentmere
  { brand: "Kentmere", name: "Pan 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Kentmere", name: "Pan 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Harman (formerly Ilford)
  { brand: "Harman", name: "Phoenix 200", iso: 200, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Ferrania
  { brand: "Ferrania", name: "P30", iso: 80, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Bergger
  { brand: "Bergger", name: "Pancro 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120", "4x5\""], isAvailable: true },

  // Shanghai
  { brand: "Shanghai", name: "GP3 100", iso: 100, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Shanghai", name: "GP3 400", iso: 400, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Svema
  { brand: "Svema", name: "FN64", iso: 64, process: "B_W" as Process, formats: ["135-36"], isAvailable: true },
  { brand: "Svema", name: "MZ-3", iso: 3, process: "B_W" as Process, formats: ["135-36"], isAvailable: true },

  // Film Photography Project (rebranded films)
  { brand: "Film Photography Project", name: "XX-250", iso: 250, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Film Photography Project", name: "Aurora 800", iso: 800, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },

  // Reflx Lab (rebranded films)
  { brand: "Reflx Lab", name: "Double X", iso: 200, process: "B_W" as Process, formats: ["135-36", "120"], isAvailable: true },
  { brand: "Reflx Lab", name: "800 Tungsten", iso: 800, process: "C_41" as Process, formats: ["135-36", "120"], isAvailable: true },
];

async function main() {
  console.log("Starting database seed...");

  // Get unique brands
  const uniqueBrands = [...new Set(filmData.map((f) => f.brand))];

  // Create brands
  const brandMap = new Map<number, string>();
  for (const brandName of uniqueBrands) {
    let brand = await prisma.brand.findFirst({
      where: { name: brandName },
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          name: brandName,
          location: null,
          does_coat: null,
        },
      });
      console.log(`Created brand: ${brandName}`);
    } else {
      console.log(`Brand already exists: ${brandName}`);
    }
    
    brandMap.set(Number(brand.id), brandName);
  }

  // Create films
  for (const film of filmData) {
    // Find the brand ID
    const brand = await prisma.brand.findFirst({
      where: { name: film.brand },
    });

    if (!brand) {
      console.error(`Brand not found: ${film.brand}`);
      continue;
    }

    // Check if film already exists (by name and brand)
    const existingFilm = await prisma.film.findFirst({
      where: {
        name: film.name,
        brandId: brand.id,
      },
    });

    const imageUrl = getFilmImage(film.brand, film.name);

    if (existingFilm) {
      // Update existing film with image URL if it doesn't have one
      if (!existingFilm.image_url && imageUrl) {
        await prisma.film.update({
          where: { id: existingFilm.id },
          data: { image_url: imageUrl },
        });
        console.log(`Updated film with image: ${film.brand} ${film.name}`);
      } else {
        console.log(`Film already exists: ${film.brand} ${film.name}`);
      }
      continue;
    }

    await prisma.film.create({
      data: {
        name: film.name,
        brandId: brand.id,
        ISO: film.iso,
        dev_process: film.process as "C_41" | "E_6" | "ECN_2" | "B_W" | null,
        is_available: film.isAvailable,
        formats: film.formats,
        image_url: imageUrl,
      },
    });

    console.log(`Created film: ${film.brand} ${film.name}`);
  }

  console.log("Database seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

