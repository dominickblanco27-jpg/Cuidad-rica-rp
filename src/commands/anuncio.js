import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const anuncio = {
  data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('Publica un anuncio oficial')
    .addStringOption(opt =>
      opt.setName('titulo').setDescription('Título del anuncio').setRequired(true))
    .addStringOption(opt =>
      opt.setName('mensaje').setDescription('Contenido del anuncio').setRequired(true)),

  async execute(interaction) {
    const titulo = interaction.options.getString('titulo');
    const mensaje = interaction.options.getString('mensaje');

    const embed = new EmbedBuilder()
      .setTitle(`📢 ${titulo.toUpperCase()}`)
      .setColor(0x1565c0)
      .setDescription(mensaje)
      .setFooter({ text: `Anuncio publicado por ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
