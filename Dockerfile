FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# copy everything including prisma schema
COPY . .

# ensure prisma generate runs inside container build
RUN npx prisma generate

EXPOSE 3000 5555

CMD ["npm", "run", "dev"]
