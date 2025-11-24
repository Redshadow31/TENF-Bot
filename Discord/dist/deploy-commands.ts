import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const token = process.env.token!;
const clientId = '1386776996100440145';
const guildId = process.env.GUILD_ID!;

const commands = [
  {
    name: 'givebadge',
    description: 'Give a badge to a player.',
    options: [
      {
        name: 'user',
        description: 'The user who will receive the badge.',
        type: 6,
        required: true,
      },
    ],
  },
  {
    name: 'maintenance',
    description: 'Set the bot in maintenance mode.',
    options: [
      {
        name: 'enable',
        description: 'Enable or disable maintenance mode.',
        type: 5,
        required: true,
      },
      {
        name: 'save',
        description: 'Save the maintenance mode to the configuration file.',
        type: 5,
        required: true,
      },
    ],
  },
];

async function deployCommands() {
  const rest = new REST({ version: '10' }).setToken(token);
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

deployCommands();
