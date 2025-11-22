/**
 * Film image URL mappings
 * These URLs point to film canister/box images from various sources
 * 
 * Note: Many of these are placeholder URLs. Replace with actual image URLs from:
 * - Wikimedia Commons (https://commons.wikimedia.org)
 * - Manufacturer websites
 * - Photography equipment retailers
 * - Stock photo sites
 * 
 * To find real images, search for: "[Brand] [Film Name] 135 film canister" or similar
 */

// Helper function to generate placeholder images
function getPlaceholderUrl(brand: string, name: string): string {
  const text = encodeURIComponent(`${brand} ${name}`);
  return `https://via.placeholder.com/300x400/cccccc/000000?text=${text}`;
}

// Specific image URL mappings for known films
// These are example URLs - replace with actual working URLs
const filmImageMap: Record<string, string> = {
  // Kodak films
  "Kodak Portra 400": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.cEBNidStHtMCUYTahaLE5wHaHa%3Fpid%3DApi&f=1&ipt=f0b43971835483e38f073396d48ac44954045df26e5cf84c7566942687f7f713&ipo=images",
  "Kodak Portra 160": getPlaceholderUrl("Kodak", "Portra 160"),
  "Kodak Portra 800": getPlaceholderUrl("Kodak", "Portra 800"),
  "Kodak Tri-X 400": getPlaceholderUrl("Kodak", "Tri-X 400"),
  "Kodak T-Max 100": getPlaceholderUrl("Kodak", "T-Max 100"),
  "Kodak T-Max 400": getPlaceholderUrl("Kodak", "T-Max 400"),
  "Kodak T-Max P3200": getPlaceholderUrl("Kodak", "T-Max P3200"),
  "Kodak Plus-X 125": getPlaceholderUrl("Kodak", "Plus-X 125"),
  "Kodak Ektar 100": getPlaceholderUrl("Kodak", "Ektar 100"),
  "Kodak Gold 200": getPlaceholderUrl("Kodak", "Gold 200"),
  "Kodak UltraMax 400": getPlaceholderUrl("Kodak", "UltraMax 400"),
  "Kodak Ektachrome E100": getPlaceholderUrl("Kodak", "Ektachrome E100"),
  "Kodak Ektachrome E200": getPlaceholderUrl("Kodak", "Ektachrome E200"),
  
  // Fujifilm
  "Fujifilm Acros 100 II": getPlaceholderUrl("Fujifilm", "Acros 100 II"),
  "Fujifilm Neopan 100": getPlaceholderUrl("Fujifilm", "Neopan 100"),
  "Fujifilm Superia X-Tra 400": getPlaceholderUrl("Fujifilm", "Superia X-Tra 400"),
  "Fujifilm Superia Premium 400": getPlaceholderUrl("Fujifilm", "Superia Premium 400"),
  "Fujifilm Superia Venus 800": getPlaceholderUrl("Fujifilm", "Superia Venus 800"),
  "Fujifilm Fujicolor 100": getPlaceholderUrl("Fujifilm", "Fujicolor 100"),
  "Fujifilm Fujicolor 200": getPlaceholderUrl("Fujifilm", "Fujicolor 200"),
  "Fujifilm Fujicolor 400": getPlaceholderUrl("Fujifilm", "Fujicolor 400"),
  "Fujifilm Provia 100F": getPlaceholderUrl("Fujifilm", "Provia 100F"),
  "Fujifilm Velvia 50": getPlaceholderUrl("Fujifilm", "Velvia 50"),
  "Fujifilm Velvia 100": getPlaceholderUrl("Fujifilm", "Velvia 100"),
  
  // Ilford
  "Ilford Delta 100": getPlaceholderUrl("Ilford", "Delta 100"),
  "Ilford Delta 400": getPlaceholderUrl("Ilford", "Delta 400"),
  "Ilford Delta 3200": getPlaceholderUrl("Ilford", "Delta 3200"),
  "Ilford HP5 Plus": getPlaceholderUrl("Ilford", "HP5 Plus"),
  "Ilford FP4 Plus": getPlaceholderUrl("Ilford", "FP4 Plus"),
  "Ilford Pan F Plus": getPlaceholderUrl("Ilford", "Pan F Plus"),
  "Ilford XP2 Super": getPlaceholderUrl("Ilford", "XP2 Super"),
  
  // Lomography
  "Lomography Lady Grey 400": getPlaceholderUrl("Lomography", "Lady Grey 400"),
  "Lomography Berlin Kino 400": getPlaceholderUrl("Lomography", "Berlin Kino 400"),
  "Lomography Color Negative 100": getPlaceholderUrl("Lomography", "Color Negative 100"),
  "Lomography Color Negative 400": getPlaceholderUrl("Lomography", "Color Negative 400"),
  "Lomography Color Negative 800": getPlaceholderUrl("Lomography", "Color Negative 800"),
  "Lomography LomoChrome Purple": getPlaceholderUrl("Lomography", "LomoChrome Purple"),
  "Lomography LomoChrome Turquoise": getPlaceholderUrl("Lomography", "LomoChrome Turquoise"),
  "Lomography LomoChrome Metropolis": getPlaceholderUrl("Lomography", "LomoChrome Metropolis"),
  "Lomography LomoChrome Color '92": getPlaceholderUrl("Lomography", "LomoChrome Color '92"),
  "Lomography Lomography Redscale XR": getPlaceholderUrl("Lomography", "Lomography Redscale XR"),
  
  // CineStill
  "CineStill 800T": getPlaceholderUrl("CineStill", "800T"),
  "CineStill 400D": getPlaceholderUrl("CineStill", "400D"),
  "CineStill 50D": getPlaceholderUrl("CineStill", "50D"),
  "CineStill BwXX": getPlaceholderUrl("CineStill", "BwXX"),
  
  // Foma
  "Foma Fomapan 100": getPlaceholderUrl("Foma", "Fomapan 100"),
  "Foma Fomapan 200": getPlaceholderUrl("Foma", "Fomapan 200"),
  "Foma Fomapan 400": getPlaceholderUrl("Foma", "Fomapan 400"),
  
  // Rollei
  "Rollei RPX 25": getPlaceholderUrl("Rollei", "RPX 25"),
  "Rollei RPX 100": getPlaceholderUrl("Rollei", "RPX 100"),
  "Rollei RPX 400": getPlaceholderUrl("Rollei", "RPX 400"),
  "Rollei Superpan 200": getPlaceholderUrl("Rollei", "Superpan 200"),
  "Rollei CR 200": getPlaceholderUrl("Rollei", "CR 200"),
  "Rollei Crossbird": getPlaceholderUrl("Rollei", "Crossbird"),
  
  // ADOX
  "ADOX CMS 20 II PRO": getPlaceholderUrl("ADOX", "CMS 20 II PRO"),
  "ADOX HR-50": getPlaceholderUrl("ADOX", "HR-50"),
  "ADOX CHS 100 II": getPlaceholderUrl("ADOX", "CHS 100 II"),
  "ADOX Scala 50": getPlaceholderUrl("ADOX", "Scala 50"),
  "ADOX Color Mission Helios": getPlaceholderUrl("ADOX", "Color Mission Helios"),
  "ADOX Color Mission 200": getPlaceholderUrl("ADOX", "Color Mission 200"),
  
  // AgfaPhoto
  "AgfaPhoto APX 100": getPlaceholderUrl("AgfaPhoto", "APX 100"),
  "AgfaPhoto APX 400": getPlaceholderUrl("AgfaPhoto", "APX 400"),
  "AgfaPhoto Vista Plus 200": getPlaceholderUrl("AgfaPhoto", "Vista Plus 200"),
  "AgfaPhoto Vista Plus 400": getPlaceholderUrl("AgfaPhoto", "Vista Plus 400"),
  
  // Kentmere
  "Kentmere Pan 100": getPlaceholderUrl("Kentmere", "Pan 100"),
  "Kentmere Pan 400": getPlaceholderUrl("Kentmere", "Pan 400"),
  
  // Harman
  "Harman Phoenix 200": getPlaceholderUrl("Harman", "Phoenix 200"),
  
  // Ferrania
  "Ferrania P30": getPlaceholderUrl("Ferrania", "P30"),
  
  // Bergger
  "Bergger Pancro 400": getPlaceholderUrl("Bergger", "Pancro 400"),
  
  // Shanghai
  "Shanghai GP3 100": getPlaceholderUrl("Shanghai", "GP3 100"),
  "Shanghai GP3 400": getPlaceholderUrl("Shanghai", "GP3 400"),
  
  // Svema
  "Svema FN64": getPlaceholderUrl("Svema", "FN64"),
  "Svema MZ-3": getPlaceholderUrl("Svema", "MZ-3"),
};

/**
 * Gets the image URL for a film by brand and name
 * @param brand The brand name (e.g., "Kodak", "Fujifilm")
 * @param name The film name (e.g., "Portra 400", "Velvia 50")
 * @returns The image URL or null if not found
 */
export function getFilmImage(brand: string, name: string): string | null {
  const key = `${brand} ${name}`;
  return filmImageMap[key] || getPlaceholderUrl(brand, name);
}
