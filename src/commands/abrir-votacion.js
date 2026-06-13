import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const abrirVotacion = {
  data: new SlashCommandBuilder()
    .setName('abrir_votacion')
    .setDescription('Abre una votación para abrir el servidor')
    .addStringOption(opt =>
      opt.setName('hora_apertura').setDescription('Hora de apertura del servidor').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('civiles_listos').setDescription('Civiles listos actualmente').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('civiles_necesarios').setDescription('Civiles necesarios para abrir').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('moderadores_necesarios').setDescription('Moderadores necesarios para abrir').setRequired(true)),

  async execute(interaction) {
    const hora = interaction.options.getString('hora_apertura');
    const civilesListos = interaction.options.getInteger('civiles_listos');
    const civilesNecesarios = interaction.options.getInteger('civiles_necesarios');
    const moderadoresNecesarios = interaction.options.getInteger('moderadores_necesarios');

    const progreso = Math.min(Math.floor((civilesListos / civilesNecesarios) * 10), 10);
    const barra = '🟩'.repeat(progreso) + '⬛'.repeat(10 - progreso);

    const embed = new EmbedBuilder()
      .setTitle('🗳️ VOTACIÓN DE APERTURA')
      .setColor(0xf9a825)
      .setDescription('¡Se ha iniciado una votación para abrir el servidor!')
      .addFields(
        { name: '🕐 Hora de Apertura', value: hora, inline: true },
        { name: '👥 Civiles Listos', value: `${civilesListos}/${civilesNecesarios}`, inline: true },
        { name: '🛡️ Moderadores Necesarios', value: `${moderadoresNecesarios}`, inline: true },
        { name: '📊 Progreso de Civiles', value: barra },
      )
      .setFooter({ text: `Votación iniciada por ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
