import {REST, Routes, Collection} from 'discord.js'
import fg from 'fast-glob'
import {useAppStore} from '@/store/app'

const updateSlashCommands = async(commands, guildId) => {
    const rest = new REST({version:10}).setToken(process.env.TOKEN)
    const result = await rest.put(
        Routes.applicationGuildCommands(
            process.env.APPLICATION_ID,
            guildId,
        ),
        {
            body:commands
        }
    )

    console.log(result)
}

export const loadCommands = async() =>{
    const appStore = useAppStore()
    const commands = []
    const actions = new Collection()
    const files = await fg('./src/commands/**/index.js')
    
    for(const file of files){
       const cmd =  await import(file)
       commands.push(cmd.command)
       actions.set(cmd.command.name, cmd.action)
    }

    await updateSlashCommands(commands, '1077594166508400731')
    appStore.commandsActionMap = actions
}

export const loadEvents = async() =>{
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg('./src/events/**/index.js')
    for(const file of files){
        const eventFile =  await import(file)

        if(eventFile.event.once){
            client.once(
                eventFile.event.name,
                eventFile.action
            )
        }
        else{
            client.on(
                eventFile.event.name,
                eventFile.action
            )
        }
     }
}