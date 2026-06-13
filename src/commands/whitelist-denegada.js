import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const whitelistDenegada = {
  data: new SlashCommandBuilder()
    .setName('whitelist_denegada')
    .setDescription('Notifica que una whitelist fue denegada')
    .addStringOption(opt =>
      opt.setName('usuario_discord').setDescription('Usuario de Discord').setRequired(true))
    .addStringOption(opt =>
      opt.setName('usuario_roblox').setDescription('Usuario de Roblox').setRequired(true))
    .addStringOption(opt =>
      opt.setName('staff').setDescription('Staff que deniega la whitelist').setRequired(true)),

  async execute(interaction) {
    const usuarioDiscord = interaction.options.getString('usuario_discord');
    const usuarioRoblox = interaction.options.getString('usuario_roblox');
    const staff = interaction.options.getString('staff');

    const embed = new EmbedBuilder()
      .setTitle('❌ WHITELIST DENEGADA')
      .setColor(0xd50000)
      .addFields(
        { name: '👤 Usuario Discord', value: usuarioDiscord, inline: true },
        { name: '🎮 Usuario Roblox', value: usuarioRoblox, inline: true },
        { name: '📋 Estado', value: '❌ **DENEGADO**', inline: true },
        { name: '🛡️ Staff que Deniega', value: staff, inline: true },
      )
      .setFooter({ text: 'Sistema de Whitelist' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
