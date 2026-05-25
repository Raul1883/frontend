FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API_BASE_URL=https://ttr.dwg-art.ru/api/v1

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]