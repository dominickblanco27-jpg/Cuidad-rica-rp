import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
  console.error('Faltan DISCORD_TOKEN o DISCORD_CLIENT_ID en las variables de entorno.');
  process.exit(1);
}

const rest = new REST().setToken(token);

const commandData = commands.map(cmd => cmd.data.toJSON());

try {
  console.log(`Registrando ${commandData.length} comandos slash...`);
  await rest.put(Routes.applicationCommands(clientId), { body: commandData });
  console.log('✅ Comandos registrados correctamente.');
} catch (error) {
  console.error('Error al registrar comandos:', error);
}
