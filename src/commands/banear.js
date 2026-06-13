import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const banear = {
  data: new SlashCommandBuilder()
    .setName('banear')
    .setDescription('Banea a un usuario del servidor')
    .addStringOption(opt =>
      opt.setName('usuario').setDescription('Usuario baneado').setRequired(true))
    .addStringOption(opt =>
      opt.setName('motivo').setDescription('Motivo del ban').setRequired(true))
    .addStringOption(opt =>
      opt.setName('tipo_ban').setDescription('Tipo de ban').setRequired(true)
        .addChoices(
          { name: 'Temporal', value: 'Temporal' },
          { name: 'Permanente', value: 'Permanente' },
        ))
    .addStringOption(opt =>
      opt.setName('staff').setDescription('Staff que banea').setRequired(true))
    .addStringOption(opt =>
      opt.setName('apelable').setDescription('¿Es apelable?').setRequired(true)
        .addChoices(
          { name: 'Sí', value: 'Sí' },
          { name: 'No', value: 'No' },
        )),

  async execute(interaction) {
    const usuario = interaction.options.getString('usuario');
    const motivo = interaction.options.getString('motivo');
    const tipoBan = interaction.options.getString('tipo_ban');
    const staff = interaction.options.getString('staff');
    const apelable = interaction.options.getString('apelable');

    const esPermamente = tipoBan === 'Permanente';

    const embed = new EmbedBuilder()
      .setTitle(esPermamente ? '🔨 BAN PERMANENTE' : '🔨 BAN TEMPORAL')
      .setColor(0x212121)
      .addFields(
        { name: '👤 Usuario Baneado', value: usuario, inline: true },
        { name: '📋 Motivo', value: motivo, inline: true },
        { name: '⏳ Tipo de Ban', value: `**${tipoBan}**`, inline: true },
        { name: '🛡️ Staff que Banea', value: staff, inline: true },
        { name: '⚖️ Apelable', value: apelable, inline: true },
      )
      .setFooter({ text: 'Sistema de Bans' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
