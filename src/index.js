import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { commands } from './commands/index.js';

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('Falta DISCORD_TOKEN en las variables de entorno.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

client.commands = new Collection();
for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error ejecutando /${interaction.commandName}:`, error);
    const msg = { content: '❌ Ocurrió un error al ejecutar este comando.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(msg);
    } else {
      await interaction.reply(msg);
    }
  }
});

client.login(token);
