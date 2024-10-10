import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
    .setName('usagi')
    .setDescription('huh command')


export const action = async (ctx)=>{
    ctx.reply('蛤?')
}