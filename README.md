# PU21

kjør npm install for å installere alle nødvendige pakker

kjør npm run dev for å starte serveren på localhost:3000

mvh Mats A. Nissen-Lie

# Backend tutorial

opprett en fil for den entiteten du vil lage funksjonalitet [backend](/src/server/api/routers/). Se [category](/src/server/api/routers/category.ts) for eksempel. KOK!
Legg til den ny routeren i [server.ts](/src/server/api/root.ts) for å bruke den i front end.

Bruk:
For å bruke getFunksjoner i front end, se [gamePage](/src/pages/gamePage.tsx) for eksempel.

For å bruke create funksjoner i front end, se [createGame](/src/pages/createGame.tsx) for eksempel.

# Frontend tutorial

Routing:
bruk
const router = useRouter();
eller

<Link> tag for å navigere mellom sider.</Link>

se [create game ](/src/pages/createGame.tsx) for på useRouter og se [navigationBar](/src/components/navigationBar.tsx) for Link. Merk at herf samsvarer med navnet på filen.

backendQuery

```javascript
const categoriesQuery = api.category.getAll.useQuery();

const useGameMutation = api.gameRouter.create.useMutation();

const game = await useGameMutation.mutateAsync(input);
```

Dette er sånn dere henter og oppdatere data fra backend. Se [create game ](/src/pages/createGame.tsx) for eksempel.

# komponent bibliotek for front-end

Komponenter:
Gå til [local](http://localhost:3000/components) for å se alle komponenter som er tilgjengelig.
Helst bruk layout som gjort i [gamePage](/src/pages/createGame.tsx) for å lage nye sider.
Alle komponents er stylet med tailwind custom farger. Hvis du vil endre på fargene så må du gjøre det fra tailwind config.![](/tailwind.config.ts)

# database i prisma

For å endre på databasen, gå til /prisma/schema.prisma og lag en ny modell. Deretter kjør "npx prisma db push" i terminal for å oppdatere databasen.

Du kan se databasen i prisma studio ved å kjøre "npx prisma studio" i terminal.

Hvis noen andre gjør endringer i databasen, kjør "npx primsa pull".

Ved enringer kjør "npx prisma generate" for å oppdatere prisma rekksriving fra databasen.

https://ui.shadcn.com/

# authentication

Alle api kall som krever autentisering må bruker "privateProcedure" eller bruker vi "publicProcedure" for å få tilgang til data uten autentisering.

Alle urler som skal være tilgjengelig uten autentisering må legges til i [middleware](/src/middleware.ts) filen.

# for å kjøre sqlite

[env](.env): Endre DATABASE_URL til sqlite:./dev.db
[prisma](/prisma/schema.prisma): Endre providor i til sqlite:./dev.db
[db](/src/server/db.ts): Kommenter ut linje 19 "adapter: new PrismaPlanetScale(client)," i

```

```
