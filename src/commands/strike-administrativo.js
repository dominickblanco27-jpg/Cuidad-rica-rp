import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const strikeAdministrativo = {
  data: new SlashCommandBuilder()
    .setName('strike_administrativo')
    .setDescription('Aplica un strike administrativo a un miembro del staff')
    .addStringOption(opt =>
      opt.setName('staff').setDescription('Staff al que se le aplica el strike').setRequired(true))
    .addStringOption(opt =>
      opt.setName('motivo').setDescription('Motivo del strike').setRequired(true))
    .addStringOption(opt =>
      opt.setName('alto_mando').setDescription('Alto mando que aplica el strike').setRequired(true))
    .addStringOption(opt =>
      opt.setName('apelable').setDescription('¿Es apelable?').setRequired(true)
        .addChoices(
          { name: 'Sí', value: 'Sí' },
          { name: 'No', value: 'No' },
        )),

  async execute(interaction) {
    const staff = interaction.options.getString('staff');
    const motivo = interaction.options.getString('motivo');
    const altoMando = interaction.options.getString('alto_mando');
    const apelable = interaction.options.getString('apelable');

    const embed = new EmbedBuilder()
      .setTitle('🚨 STRIKE ADMINISTRATIVO')
      .setColor(0x6a1b9a)
      .addFields(
        { name: '🛡️ Staff Sancionado', value: staff, inline: true },
        { name: '📋 Motivo del Strike', value: motivo, inline: true },
        { name: '👑 Alto Mando que Aplica', value: altoMando, inline: true },
        { name: '⚖️ Apelable', value: apelable, inline: true },
      )
      .setFooter({ text: 'Sistema de Moderación Interna' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
