import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const cerrarServer = {
  data: new SlashCommandBuilder()
    .setName('cerrar_server')
    .setDescription('Anuncia que el servidor está cerrado'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🚫 SERVIDOR CERRADO')
      .setColor(0xd50000)
      .setDescription(
        `El servidor ha sido cerrado por el momento 🚫\n\n🙏 Gracias a todos los que se unieron a rolear y hicieron de la sesión algo increíble 💯🥰\nSe agradece su participación, respeto y buen ambiente 🤝🔥\n\n📣 ¡Pendientes para la próxima apertura!\n\n¡Nos vemos pronto! 👀✨`
      )
      .setFooter({ text: `Cerrado por ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
