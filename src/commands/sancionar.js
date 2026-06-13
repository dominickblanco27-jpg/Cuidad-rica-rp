import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const sancionar = {
  data: new SlashCommandBuilder()
    .setName('sancionar')
    .setDescription('Aplica una sanción a un usuario')
    .addStringOption(opt =>
      opt.setName('usuario').setDescription('Usuario sancionado').setRequired(true))
    .addStringOption(opt =>
      opt.setName('motivo').setDescription('Motivo de la sanción').setRequired(true))
    .addStringOption(opt =>
      opt.setName('staff').setDescription('Staff que sanciona').setRequired(true))
    .addStringOption(opt =>
      opt.setName('fecha').setDescription('Fecha de la sanción (DD/MM/AAAA)').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('numero_sancion').setDescription('Número de sanción (1-5)').setRequired(true)
        .addChoices(
          { name: '1/5', value: 1 },
          { name: '2/5', value: 2 },
          { name: '3/5', value: 3 },
          { name: '4/5', value: 4 },
          { name: '5/5', value: 5 },
        ))
    .addStringOption(opt =>
      opt.setName('apelable').setDescription('¿Es apelable?').setRequired(true)
        .addChoices(
          { name: 'Sí', value: 'Sí' },
          { name: 'No', value: 'No' },
        )),

  async execute(interaction) {
    const usuario = interaction.options.getString('usuario');
    const motivo = interaction.options.getString('motivo');
    const staff = interaction.options.getString('staff');
    const fecha = interaction.options.getString('fecha');
    const numero = interaction.options.getInteger('numero_sancion');
    const apelable = interaction.options.getString('apelable');

    const colores = [0xffd600, 0xffa000, 0xf57c00, 0xe64a19, 0xb71c1c];

    const embed = new EmbedBuilder()
      .setTitle(`⚠️ SANCIÓN ${numero}/5`)
      .setColor(colores[numero - 1])
      .addFields(
        { name: '👤 Usuario Sancionado', value: usuario, inline: true },
        { name: '📋 Motivo', value: motivo, inline: true },
        { name: '🛡️ Staff que Sanciona', value: staff, inline: true },
        { name: '📅 Fecha', value: fecha, inline: true },
        { name: '🔢 Conteo de Sanciones', value: `**${numero}/5**`, inline: true },
        { name: '⚖️ Apelable', value: apelable, inline: true },
      )
      .setFooter({ text: 'Sistema de Sanciones' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
