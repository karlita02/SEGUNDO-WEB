FROM node
COPY . /app
WORKDIR /app
RUN npm install --only=production
ENV PORT 4000
EXPOSE 4000
ENTRYPOINT ["npm","start"]