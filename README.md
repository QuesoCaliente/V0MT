# V0MT Discord Bot

Este proyecto es un bot de Discord desarrollado con TypeScript y Discord.js, preparado para enviar información sobre recursos a N8N para ser subidos al sitio web AssetBox

## Requisitos

- Node.js 18+
- Una aplicación de Discord (bot) creada en https://discord.com/developers/applications
- Un bucket en Cloudflare R2 (https://dash.cloudflare.com/)

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DISCORD_TOKEN=tu_token_de_discord
CLIENT_ID=tu_application_id_de_discord
GUILD_ID=tu_guild_id_de_pruebas
R2_ACCESS_KEY_ID=tu_access_key_id_de_r2
R2_SECRET_ACCESS_KEY=tu_secret_access_key_de_r2
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
R2_BUCKET_NAME=nombre_de_tu_bucket
```

### ¿Cómo obtener estas variables?

- **DISCORD_TOKEN**: En el portal de desarrolladores de Discord, ve a tu aplicación > Bot > Token.
- **CLIENT_ID**: En la misma app de Discord, es el Application ID.
- **GUILD_ID**: Haz clic derecho en tu servidor de Discord y selecciona "Copiar ID" (debes tener el modo desarrollador activado en Discord).
- **R2_ACCESS_KEY_ID** y **R2_SECRET_ACCESS_KEY**: En el panel de Cloudflare R2, crea un API Token y copia ambos valores.
- **R2_ENDPOINT**: En Cloudflare R2, busca el endpoint de tu cuenta (formato: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`).
- **R2_BUCKET_NAME**: El nombre de tu bucket creado en R2.

## Instalación

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. (Opcional) Instala las dependencias de desarrollo para TypeScript:
   ```sh
   npm install --save-dev typescript ts-node @types/node
   ```

## Uso

### 1. Registrar los slash commands

Ejecuta:

```sh
npx ts-node ./src/registerSlashCommands.ts
```

Esto registrará los comandos en tu servidor de pruebas (GUILD_ID).

### 2. Iniciar el bot

Ejecuta:

```sh
npm run start
```

O si usas ts-node directamente:

```sh
npx ts-node ./src/bot.ts
```

## Notas

- Si cambias los comandos, vuelve a ejecutar el registro de slash commands.
- El bot debe estar invitado a tu servidor con permisos de `applications.commands` y `bot`.
- Para producción, registra los comandos globalmente (consulta la documentación de Discord.js).

---

¿Dudas? Abre un issue en el repo o revisa el código fuente para más detalles.
