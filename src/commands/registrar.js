import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';

export const registrar = {
  data: new SlashCommandBuilder()
    .setName('registrar')
    .setDescription('Registra tu cédula en el servidor')
    .addStringOption(opt =>
      opt.setName('usuario_discord').setDescription('Tu usuario de Discord').setRequired(true))
    .addStringOption(opt =>
      opt.setName('usuario_roblox').setDescription('Tu usuario de Roblox').setRequired(true))
    .addStringOption(opt =>
      opt.setName('fecha_nacimiento').setDescription('Tu fecha de nacimiento (DD/MM/AAAA)').setRequired(true))
    .addStringOption(opt =>
      opt.setName('estatura').setDescription('Tu estatura (ej: 1.75m)').setRequired(true))
    .addStringOption(opt =>
      opt.setName('pais').setDescription('Tu país').setRequired(true)),

  async execute(interaction) {
    await interaction.deferReply();

    const usuarioDiscord = interaction.options.getString('usuario_discord');
    const usuarioRoblox = interaction.options.getString('usuario_roblox');
    const fechaNacimiento = interaction.options.getString('fecha_nacimiento');
    const estatura = interaction.options.getString('estatura');
    const pais = interaction.options.getString('pais');

    let avatarUrl = 'https://www.roblox.com/favicon.ico';
    let robloxId = null;

    try {
      const userRes = await axios.post('https://users.roblox.com/v1/usernames/users', {
        usernames: [usuarioRoblox],
        excludeBannedUsers: false,
      });
      if (userRes.data.data && userRes.data.data.length > 0) {
        robloxId = userRes.data.data[0].id;
        const avatarRes = await axios.get(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxId}&size=420x420&format=Png&isCircular=false`
        );
        if (avatarRes.data.data && avatarRes.data.data.length > 0) {
          avatarUrl = avatarRes.data.data[0].imageUrl;
        }
      }
    } catch (_) {}

    const embed = new EmbedBuilder()
      .setTitle('📋 CÉDULA DE REGISTRO')
      .setColor(0x2b2d31)
      .setThumbnail(avatarUrl)
      .addFields(
        { name: '👤 Usuario Discord', value: usuarioDiscord, inline: true },
        { name: '🎮 Usuario Roblox', value: usuarioRoblox, inline: true },
        { name: '📅 Fecha de Nacimiento', value: fechaNacimiento, inline: true },
        { name: '📏 Estatura', value: estatura, inline: true },
        { name: '🌍 País', value: pais, inline: true },
      )
      .setFooter({ text: 'Registro completado exitosamente' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
