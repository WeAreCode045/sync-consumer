FROM node:18-alpine

# Werkdirectory in container
WORKDIR /app

# Alleen package.json en lockfile kopiëren om caching te benutten
COPY package*.json ./

# Dependencies installeren
RUN npm install --production

# Rest van de app kopiëren
COPY . .

# Default command om de consumer te starten
CMD ["node", "index.js"]
