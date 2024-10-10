import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export const command = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('讓機器人離開語音頻道');

export const action = async (ctx) => {
    const connection = getVoiceConnection(ctx.guild.id);

    if (!connection) {
        return ctx.reply('我目前不在任何語音頻道中！');
    }

    connection.destroy();
    ctx.reply('已離開語音頻道！');
};
