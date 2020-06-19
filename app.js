const Discord = require("discord.js");
const client = new Discord.Client();

const logger = require("./res/logger");

const dbuse = require("./res/loadQna");
const config = require("./config.json");
const db = require("./res/db");

client.on("ready", () => {
  console.log("BBAGUI IS READY!");
}); // 이게 봇이 시작되었을 때 실행됨

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot || newMessage.author.bot) return;
  logger.messageEditEvent(oldMessage, newMessage);
}); // 이건 메세지가 수정되었을 때 실행됨

client.on("messageDelete", (deletedMessage) => {
  if (deletedMessage.author.bot) return;
  logger.messageDeleteEvent(deletedMessage);
}); // 이건 메세지가 삭제되었을 때 실행됨

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.nickname !== newMember.nickname) {
    return logger.guildMemberNicknameUpdateEvent(oldMember, newMember);
  } else if (oldMember._roles !== newMember._roles) {
    return logger.guildMemberRoleUpdate(oldMember, newMember);
  }
}); //이건 멤버가 업데이트되었을 때 실행됨

client.on("guildMemberAdd", (member) => {
  return logger.guildMemberAdd(member);
}); //이건 멤버가 추가되었을 때 실행됨

client.on("guildMemberRemove", (member) => {
  return logger.guildMemberRemove(member);
});

client.on("message", async (message) => {
  if (!message.content.startsWith("빠귀야")) return;

  let args = message.content.split(" ").slice(1);

  args = args.toString().replace(",", " ");

  if (message.content.split(" ")[1] === "청소") {
    if (!message.content.split(" ")[2])
      return message.channel.send("no args given");
    if (isNaN(message.content.split(" ")[2]))
      return message.channel.send("숫자를 입력해주세요!");

    if (message.content.split(" ")[2] > 100)
      return message.channel.send("100개 이상의 메세지는 삭제할 수 없어요!");
    if (message.content.split(" ")[2] < 1)
      return message.channel.send("1개 이하의 메세지는 삭제할 수 없어요!");
    return message.channel
      .bulkDelete(message.content.split(" ")[2])
      .then(
        message.channel.send(
          message.content.split(" ")[2] + "개의 메세지를 삭제했어요!"
        )
      )
      .catch(console.error());
  } else if (message.content.split(" ")[1] === "배워") {
    if (!message.content.split(" ")[2] || !message.content.split(" ")[3])
      return message.channel.send("no arguments given");

    return await dbuse.learn(
      message.content.split(" ")[2],
      message.content.split(" ")[3],
      message
    );
  } else if (message.content.split(" ")[1] === "수정") {
    if (!message.content.split(" ")[2] || !message.content.split(" ")[3])
      return message.channel.send("no arguments given");

    return await dbuse.update(
      message.content.split(" ")[2],
      message.content.split(" ")[3],
      message
    );
  } else if (message.content.split(" ")[1] === "삭제") {
    if (!message.content.split(" ")[2])
      return message.channel.send("no arguments given");

    return await dbuse.delete(message.content.split(" ")[2], message);
  } else {
    if ((await dbuse.get(args)) === null)
      return message.channel.send("그런 말은 몰라요!");
    return message.channel.send(await dbuse.get(args));
  }
}); //이건 메세지가 보내졌을 때 실행됨
//
client.login(config.token);
