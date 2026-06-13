import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const abrirServer = {
  data: new SlashCommandBuilder()
    .setName('abrir_server')
    .setDescription('Anuncia que el servidor está abierto')
    .addStringOption(opt =>
      opt.setName('codigo').setDescription('Código para unirse al servidor').setRequired(true)),

  async execute(interaction) {
    const codigo = interaction.options.getString('codigo');

    const embed = new EmbedBuilder()
      .setTitle('🔓 SERVIDOR ABIERTO')
      .setColor(0x00c853)
      .setDescription(
        `¡Atención a todos! El servidor ya está **ABIERTO** 🔓\nVengan a rolear y pasarla bien con la mejor experiencia 💯🔥\n\n📌 **Código para unirse:**\n\`\`\`${codigo}\`\`\`\nNo te lo pierdas, hay rol activo, diversión y muchas oportunidades 👀🎭\n¡Los esperamos dentro!`
      )
      .setFooter({ text: `Anunciado por ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
