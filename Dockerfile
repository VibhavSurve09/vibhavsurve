# Install dependencies only when needed
FROM node:17-alpine

WORKDIR /vibhav_portfolio
#Copy All the files from host directory to container working directory
COPY . .

RUN npm install

RUN npm run build 

EXPOSE 3000

CMD ["npm","start"]
