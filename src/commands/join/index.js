import {SlashCommandBuilder} from 'discord.js';
import {joinVoiceChannel} from '@discordjs/voice'

export const command = new SlashCommandBuilder()
    .setName('join')
    .setDescription('讓機器人加入你的語音頻道');

export const action = async (ctx) => {
    const voiceChannel = ctx.member.voice.channel;

    if (!voiceChannel) {
        return ctx.reply('你需要在語音頻道中才能讓我加入！');
    }

    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    ctx.reply('已加入語音頻道！');
};
