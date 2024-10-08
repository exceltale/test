
const Eris = require("eris");
// ----------------------- (toedit) -----------------------------
const prefix = "$"; // prefix of the bot commands
global.themeColor = 0x8ABC3F; // put here the theme color of the bot (format: 0xABCDEF)
global.logsChannel = "0"; // the channel ID of the dev logs
global.chatChannel = "0"; // the channel ID of your ingame chat
global.botsChannel = "0"; // the channel ID of your bot commands channel
global.devRole = "0"; // the ID of the developer role
global.muteRole = "0"; // the ID of the muted role
global.ownerRole = "0"; // the ID of the server owner role
global.memberRole = "0"; // the ID of the basic member role
global.gameImage = "https://arras.io/favicon/128x128.png" // put the url of your game's logo
const {closeArena} = require("../../gamemodes/closeArena");

const envKeys = [ //this is to protect .env from eval, put your .env names here. DO NOT MAKE ANY TYPOS AS IT CAN FALSELY FLAG A COMMAND IF SO.
  'TOKEN1',
  'TOKEN2',
  'TOKEN3',
  'TOKEN4'
];
// --------------------------------------------------------------

global.bot = new Eris(process.env.BOT_TOKEN); // add the token of your application in .env and call it: BOT_TOKEN=yourbottokenhere
bot.on("ready", async () => {
  bot.createMessage(logsChannel, {
    embed: {
      title: "",
      description: "",
      color: 5763719,
      fields: [
        {
          name: `Server initialized`,
          value: `Bot is ready for use`,
        },
      ],
      thumbnail: {},
      footer: {},
    },
  });

  try { // interaction commands ( i made one so i keep the active dev badge )
    await bot.createCommand({
      name: "ping",
      type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
      description: "Pings the bot.",
    });
    console.log("Bot Ready!");
  } catch (err) {
    console.error(err);
  }
});
function updateStatus() {
  bot.editStatus("online", { name: `with ${sockets.clients.length} players!`, type: 0 });
}
bot.on("interactionCreate", (interaction) => {
  // ping command
  if (interaction instanceof Eris.CommandInteraction) {
    if (interaction.data.name == "ping") {
      return interaction.createMessage({
        embed: {
          title: "Ping Command",
          description: "",
          color: themeColor,
          fields: [
            {
              name: ``,
              value: `Pong!`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
        },
      });
    }
  }
});

// error handler
process.on("uncaughtException", function (err) {
  console.error(err);
  updateStatus()
  bot.connect();
});

bot.on("messageCreate", (msg) => { // prefixed commands
  if (msg.member != null && msg.member.roles.includes(memberRole)) {
  if (msg.content === `${prefix}ping`) {
    bot.createMessage(msg.channel.id, "Pong!");
  } 

  else if (msg.content.includes(bot.user.id)) { 
    let phrases = ["I've been pinged again.",
    "Why the frequent pings?",
    "Another ping. Seriously, why are you bothering me?",
    "Received your ping. What's the deal? Can we end this constant interruption?",
    "What's with the repeated pings? This is getting annoying.",
    "You just pinged me. Why? This has to stop. No more pings.",
    "Yet another ping. What's the reason? Consider this a request to stop.",
    "Why am I being pinged again? Enough is enough. Please refrain from further pings.",
    "Once again, a ping. What's going on? Stop it.",
    "Another ping from you. What's the purpose? Let's put an end to this, okay ?",
    "<:peepoPing:1193981184288510024>",
    "Ping me again and see what happens. Go ahead.",
    "Can you stop with the pings ?",
    "Seriously ? Don't you have other things to do ?",
    "Don't you have other things to do ?",
    "Alright, here is your reward for pinging for a total of 69 times: ||[Bot Pinger Token](<https://www.youtube.com/watch?v=iik25wqIuFo>)||",
    "Go touch grass or watch YanisDiss, idk but enough with the mentions!",
    "You think this is funny to constantly ping me, huh?",
    "Okay i will make it clear:\nStop\nPinging\nME!\nOkay? Thanks",
    "look, i do a barrel roll !\n`._.   :|    .-.    |:    ._.`\n\nCool right? Now STOP PINGING ME !",
  ];
    bot.createMessage(msg.channel.id, {
      content: phrases[Math.floor(Math.random() * phrases.length)],
      messageReference: { messageID: msg.id },
    });
    
  } 
// purge
  else if (msg.content === `${prefix}purge`) {
    if (msg.member.roles.includes(devRole)) {
    for (let e of entities)
    if (e.type !== "wall" && !e.godmode) (e.invuln = false), (e.protection = false), e.kill();
  setTimeout(() => {
    bot.createMessage(logsChannel, {
      embed: {
        title: "",
        description: "",
        color: 16776960,
        fields: [
          {
            name: `Warning`,
            value: `All entities have been killed.`,
          },
        ],
      }
    });
    bot.createMessage(msg.channel.id, {
      embed: {
        title: "Purge command",
        description: "",
        color: themeColor,
        fields: [
          {
            name: `Warning`,
            value: `All entities have been killed!`,
          },
        ],
        thumbnail: {
          url: gameImage,
        },
        footer: {
          text:
            `Requested by ` +
            msg.member.username +
            " (" +
            msg.member.id +
            ")",
        },
      },
    });
  }, 60);
} else {
  bot.createMessage(msg.channel.id, {
    embed: {
      title: "Purge Command",
      description: "",
      color: 16711680,
      fields: [
        {
          name: `Warning`,
          value: `You are not permitted to perform this action.`,
        },
      ],
      thumbnail: {
        url: gameImage,
      },
      footer: {},
    },
  });
}
  } 

  // clear
  else if (msg.content === `${prefix}clear`) {
      for (let e of entities)
      if (e.type !== "wall" && e.type !== "tank" && !e.isPlayer && !e.godmode) { 
        e.invuln = false;
        e.protection = false;
         e.kill();
        }
    setTimeout(() => {
      bot.createMessage(logsChannel, {
        embed: {
          title: "",
          description: "",
          color: 16776960,
          fields: [
            {
              name: `Warning`,
              value: `Some of the entities have been killed.`,
            },
          ],
        }
      });
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Clear command",
          description: "",
          color: themeColor,
          fields: [
            {
              name: `Warning`,
              value: `Some of the entities have been killed!`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {
            text:
              `Requested by ` +
              msg.member.username +
              " (" +
              msg.member.id +
              ")",
          },
        },
      });
    }, 60);
  }

  // help command
  else if (
    msg.content === `${prefix}help`
  ) {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Availble Commands",
          description: "Here is a list of commands I Have:",
          color: themeColor,
          fields: [
            {
              name: `${prefix}clear`,
              value: `Kills most of entities to reduce lag.`,
            }, 
            {
              name: `${prefix}purge`,
              value: `Kills all entities.`,
            }, 
            {
              name: `${prefix}ping`,
              value: `Pings the bot`,
            },
            {
              name: `${prefix}pl`,
              value: "Shows the list of connected players.",
            },
            {
              name: `${prefix}apl`,
              value: "Shows a more advanced player list.",
            },
            {
              name: `${prefix}restart`,
              value: "Closes arena and restarts server.",
            },
            {
              name: `${prefix}br`,
              value: `Send ingame messages via this command.`,
            },
            {
              name: `${prefix}abr`,
              value: `Send anonymous ingame messages.`,
            },
            {
              name: `${prefix}eval`,
              value: `evaluate your code via the discord bot.`,
            },
           
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {
            text:
                `Requested by ` +
                msg.member.username +
                " (" +
                msg.member.id +
                ")",
          },
        },
      }
      );   
  }

// broadcast
  if (msg.content.startsWith(`${prefix}br `)) {
    if (msg.channel.id === chatChannel || msg.member.roles.includes(devRole)) {
    if (!msg.member.roles.includes(muteRole)) {

    var message = msg.content.split(prefix + "br ").pop();
     if (!msg.member.roles.includes(devRole) && c.SANITIZE_CHAT_MESSAGE_COLORS) {
        message = message.replace(/§/g, "§§§§");
    }
    if (message.length > 100) return bot.createMessage(msg.channel.id, {
      embed: {
        title: "Broadcast command",
        description: "",
        color: 16776960,
        fields: [
          {
            name: `Warning`,
            value: `Overly-long message !`,
          },
        ],
        thumbnail: {
          url: gameImage,
        },
        footer: {},
      },
    });

    sockets.broadcast(`${msg.author.username} says on Discord: ${message}`)
    msg.addReaction("✅")
  } else {
    msg.addReaction("❌")
    bot.createMessage(msg.channel.id, {
      embed: {
        title: "Broadcast command",
        description: "",
        color: 16711680,
        fields: [
          {
            name: `Warning`,
            value: `You are not allowed to use this command anymore.`,
          },
        ],
        thumbnail: {
          url: gameImage,
        },
        footer: {},
      },
    });
  }
}
}

// anonymous broadcast
if (msg.content.startsWith(`${prefix}abr `)) {
  if (msg.member.roles.includes(devRole)) {
  var message = msg.content.split(prefix + "abr ").pop();
  sockets.broadcast(`${message}`)
  msg.addReaction("✅")
} else {
  bot.createMessage(msg.channel.id, {
    embed: {
      title: "Anonymous Broadcast command",
      description: "",
      color: 16711680,
      fields: [
        {
          name: `Warning`,
          value: `You are not permitted to perform this action.`,
        },
      ],
      thumbnail: {
        url: gameImage,
      },
      footer: {},
    },
  });
}
}

  // restart
  else if (msg.content === `${prefix}restart`) {
    if (msg.member.roles.includes(devRole)) {
      closeArena()
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Restart command",
          description: "",
          color: themeColor,
          fields: [
            {
              name: `Warning`,
              value: `Server restart initialization !`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {
            text:
              `Requested by ` +
              msg.member.username +
              " (" +
              msg.member.id +
              ")",
          },
        },
      });
    } else {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Restart command",
          description: "",
          color: 16711680,
          fields: [
            {
              name: `Warning`,
              value: `You are not permitted to perform this action.`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {},
        },
      });
    }
  } 
   // player list
   else if (msg.content === `${prefix}pl`) {
    if (msg.channel.id === chatChannel || msg.channel.id === botsChannel || msg.member.roles.includes(devRole)) {
    bot.createMessage(msg.channel.id, {
      embed: {
        title: "Player List",
        description: sockets.clients.length + " players connected\n\n" +
        sockets.clients
        .map((c) => {
          let Name =
              c.player.body == null ? "Dead Player" : c.player.body.name === "" ? "An unnamed player" : c.player.body.name
              let playerID =
              c.player.body == null ? "dead" : c.player.body.id;
          return `**${Name}** - [${playerID}]`;
        })
        .join("\n\n"),
        color: themeColor,
        thumbnail: {
          url: gameImage,
        },
      },
    });
  }
}
  else if (msg.content === `${prefix}apl`) {
    if (
      msg.member.roles.includes(devRole) &&
      msg.member.roles.includes(ownerRole) // this commands returns player ips and tokens, that's why i made it ownerOnly
    ) {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Advanced Player List",
          description: sockets.clients.length + " players connected\n\n" +
          sockets.clients
          .map((c) => {
            let Name =
                c.player.body == null ? "Dead Player" : c.player.body.name === "" ? "An unnamed player" : c.player.body.name;
                if (Name.includes('§36§[YAN]§reset§\u200b')) {Name = Name.replace('§36§[YAN]§reset§\u200b','[YAN]')};
                let playerID =
                c.player.body == null ? "dead" : c.player.body.id;
            return `**${Name}**\nPlayerID: [${playerID}] | IP: [${c.ip}] | Token: [${c.key}]`
          })
          .join("\n\n"),
          color: themeColor,
          thumbnail: {
            url: gameImage,
          },
        },
      });
    } else {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Advanced Player List",
          description: "",
          color: 16711680,
          fields: [
            {
              name: `Warning`,
              value: `You are not permitted to perform this action.`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {},
        },
      });
    }
  }

  // eval command
  else if (msg.content.startsWith(`${prefix}eval`)) {
    if (msg.member.roles.includes(devRole)) {
      var command = msg.content.split(prefix + "eval ").pop();
      console.log("new eval: ", command);
      try {
        var result = eval(command)
        var stringResult = String(result)
        if (!envKeys.some(key => stringResult.includes(process.env[key]))) {
          bot.createMessage(msg.channel.id, {
            embed: {
              title: "Eval Command",
              description: "✅ Successful evaluation\n\nOutput: " + result,
              color: themeColor,
              thumbnail: {
                url: gameImage,
              },
              footer: {},
            },
          });
        } else {
          bot.createMessage(msg.channel.id, {
            embed: {
              title: "Eval Command",
              description: "✅ Successful evaluation\n\nOutput: " + result,
              color: themeColor,
              thumbnail: {
                url: gameImage,
              },
              footer: {
                text: "[dangerous eval performed]",
              },
            },
          });
          bot.createMessage(logsChannel, {
            embed: {
              title: `Dangerous eval detected`,
              description: msg.content + "\n\nOutput:\n" + result,
              color: 16711680,
              thumbnail: {},
              footer: {
                text: "Performed by " + msg.author.username + " [" + msg.author.id + "]",
              },
            },
          });
        }
      } catch (err) {
        bot.createMessage(
          bot.createMessage(msg.channel.id, {
            embed: {
              title: "Eval Command",
              description: "",
              color: 16776960,
              fields: [
                {
                  name: `⚠️ An error occured.`,
                  value: `${err.toString()}`,
                },
              ],
              thumbnail: {
                url: gameImage,
              },
              footer: {},
            },
          })
        );
      }
    } else {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "Eval Command",
          description: "",
          color: 16711680,
          fields: [
            {
              name: `Warning`,
              value: `You are not permitted to perform this action.`,
            },
          ],
          thumbnail: {
            url: gameImage,
          },
          footer: {},
        },
      });
    }
  }

}
});
bot.editStatus("online", { name: `with 0 players!`, type: 0 });
bot.connect();
module.exports = ({ Events }) => {
Events.on("chatMessage", ({ message, socket }) => {
  if (!socket.player.body || message.startsWith("/")) return;
  let playerName = socket.player.body.name
    ? socket.player.body.name
    : "Unnamed";
  bot.createMessage(chatChannel, {
    embed: {
      color: themeColor,
      fields: [
        {
          name: `${playerName + ":"}`,
          value: `${message}`,
        },
      ],
    },
  });
  updateStatus()
bot.connect();
});
};
