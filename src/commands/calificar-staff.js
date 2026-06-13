import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const calificarStaff = {
  data: new SlashCommandBuilder()
    .setName('calificar_staff')
    .setDescription('Califica el desempeño de un miembro del staff')
    .addStringOption(opt =>
      opt.setName('persona_califica').setDescription('Persona que califica').setRequired(true))
    .addStringOption(opt =>
      opt.setName('staff_calificado').setDescription('Staff que es calificado').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('calificacion').setDescription('Calificación del 1 al 10').setRequired(true)
        .addChoices(
          { name: '1', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 },
          { name: '4', value: 4 }, { name: '5', value: 5 }, { name: '6', value: 6 },
          { name: '7', value: 7 }, { name: '8', value: 8 }, { name: '9', value: 9 },
          { name: '10', value: 10 },
        ))
    .addStringOption(opt =>
      opt.setName('debe_mejorar').setDescription('¿En qué debe mejorar? (opcional)').setRequired(false)),

  async execute(interaction) {
    const personaCalifica = interaction.options.getString('persona_califica');
    const staffCalificado = interaction.options.getString('staff_calificado');
    const calificacion = interaction.options.getInteger('calificacion');
    const debeMejorar = interaction.options.getString('debe_mejorar');

    const estrellas = '⭐'.repeat(Math.round(calificacion / 2));
    let color;
    if (calificacion >= 8) color = 0x00c853;
    else if (calificacion >= 5) color = 0xf9a825;
    else color = 0xd50000;

    const embed = new EmbedBuilder()
      .setTitle('⭐ CALIFICACIÓN DE STAFF')
      .setColor(color)
      .addFields(
        { name: '👤 Persona que Califica', value: personaCalifica, inline: true },
        { name: '🛡️ Staff Calificado', value: staffCalificado, inline: true },
        { name: '🔢 Calificación', value: `**${calificacion}/10** ${estrellas}`, inline: false },
      )
      .setFooter({ text: 'Sistema de Calificación de Staff' })
      .setTimestamp();

    if (debeMejorar) {
      embed.addFields({ name: '📝 Debe Mejorar', value: debeMejorar, inline: false });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
