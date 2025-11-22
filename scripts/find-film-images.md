# Finding Film Images

This guide helps you find and add real images for the films in the database.

## Best Sources for Film Product Images

1. **Wikimedia Commons** (https://commons.wikimedia.org)
   - Search for: "[Brand] [Film Name] 135 film canister"
   - Example: "Kodak Portra 400 135 film canister"
   - These images are usually free to use

2. **Manufacturer Websites**
   - Kodak: https://www.kodak.com
   - Fujifilm: https://www.fujifilm.com
   - Ilford: https://www.ilfordphoto.com
   - Check their product pages for official images

3. **Photography Retailers**
   - B&H Photo: https://www.bhphotovideo.com
   - Adorama: https://www.adorama.com
   - These sites often have product images you can reference

4. **Free Stock Photo Sites**
   - Unsplash: https://unsplash.com (search "film canister", "35mm film")
   - Pexels: https://www.pexels.com
   - Pixabay: https://pixabay.com

## How to Add Images

1. Find an image URL for a film
2. Open `prisma/filmImages.ts`
3. Find the film entry in the `filmImageMap` object
4. Replace `getPlaceholderUrl("Brand", "Film Name")` with the actual URL string
5. Example:
   ```typescript
   "Kodak Portra 400": "https://example.com/path/to/image.jpg",
   ```
6. Run `npx prisma db seed` to update the database

## Image URL Format

- Use direct image URLs (ending in .jpg, .png, etc.)
- For Wikimedia Commons, use the direct file URL format:
  `https://upload.wikimedia.org/wikipedia/commons/thumb/[hash]/[filename]/[size]px-[filename]`

## Quick Search Queries

Try these search terms on Wikimedia Commons or Google Images:
- "Kodak Portra 400 135 film canister"
- "Fujifilm Velvia 50 film box"
- "Ilford HP5 Plus 35mm film"
- "[Brand] [Film Name] product photo"
- "[Brand] [Film Name] canister box"

