# PU21

kjør npm install for å installere alle nødvendige pakker

kjør npm run dev for å starte serveren på localhost:3000

mvh Mats A. Nissen-Lie

# database i prisma

For å endre på databasen, gå til /prisma/schema.prisma og lag en ny modell. Deretter kjør "npx prisma db push" i terminal for å oppdatere databasen.

Du kan se databasen i prisma studio ved å kjøre "npx prisma studio" i terminal.

Hvis noen andre gjør endringer i databasen, kjør "npx primsa pull".

Ved enringer kjør "npx prisma generate" for å oppdatere prisma rekksriving fra databasen.
