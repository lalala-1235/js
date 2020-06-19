const Discord = require("discord.js");

module.exports = {
  messageEditEvent: function (oldMessage, newMessage) {
    const guild = oldMessage.member.guild;
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    );

    const editEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BBAGUI LOGGER")
      .setDescription("MESSAGE EDIT")
      .addFields(
        {
          name: "작성자",
          value: `${oldMessage.author.username}#${oldMessage.author.discriminator}`,
        },
        { name: "변경 전 메세지", value: oldMessage, inline: true },
        { name: "변경 후 메세지", value: newMessage, inline: true }
      )
      .setTimestamp()
      .setFooter("by 라라라#6343");

    return logChannel.send(editEmbed);
  },

  messageDeleteEvent: (deletedMessage) => {
    const guild = deletedMessage.member.guild;
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    );

    const deleteEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BBAGUI LOGGER")
      .setDescription("MESSAGE DELETE")
      .addFields(
        {
          name: "작성자",
          value: `${deletedMessage.author.username}#${deletedMessage.author.discriminator}`,
        },
        { name: "삭제된 메세지", value: deletedMessage, inline: true }
      )
      .setTimestamp()
      .setFooter("by 라라라#6343");

    return logChannel.send(deleteEmbed);
  },

  guildMemberNicknameUpdateEvent: (oldMember, newMember) => {
    if (newMember.nickname === null)
      newMember.nickname = newMember.user.username;
    const guild = oldMember.guild;
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    );
    const nicknameUpdateEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BBAGUI LOGGER")
      .setDescription("NICKNAME UPDATE")
      .addFields(
        {
          name: "멤버",
          value: `${oldMember.user.username}#${oldMember.user.discriminator}`,
        },
        { name: "변경 전 닉네임", value: oldMember.nickname },
        { name: "변경 후 닉네임", value: newMember.nickname }
      )
      .setTimestamp()
      .setFooter("by 라라라#6343");

    return logChannel.send(nicknameUpdateEmbed);
  },

  guildMemberAdd: (member) => {
    const guild = member.guild; //유저가 있는 서버를 뽑아냄
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    ); //유저가 있는 서버에서 채널 설명이 '빠귀로그' 라고 되어있는 데를 뽑아냄
    const addEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BBAGUI LOGGER")
      .setDescription("MEMBER JOIN")
      .addFields({
        name: "멤버",
        value: `${member.user.username}#${member.user.discriminator}`,
      })
      .setTimestamp()
      .setFooter("by 라라라#6343");
    return logChannel.send(addEmbed);
  },

  guildMemberRemove: (member) => {
    const guild = member.guild;
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    );
    const removeEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BBAGUI LOGGER")
      .setDescription("MEMBER LEFT")
      .addFields({
        name: "멤버",
        value: `${member.user.username}#${member.user.discriminator}`,
      })
      .setTimestamp()
      .setFooter("by 라라라#6343");
    return logChannel.send(removeEmbed);
  },

  guildMemberRoleUpdate: (oldMember, newMember) => {
    const guild = oldMember.guild; //서버 데이터
    const logChannel = guild.channels.cache.find(
      (channel) => channel.topic === "빠귀로그"
    ); //로그할 채널
    const oldMemberRoles = oldMember._roles.toString(); // 역할 정보
    const newMemberRoles = newMember._roles.toString(); // 새로운 역할 정보
    if (oldMemberRoles.length > newMemberRoles.length) {
      // 이전 역할 정보 > 새로운 역할정보라면
      let removedrole = oldMemberRoles.replace(newMemberRoles, ""); //역할이 빠진 것이므로 이전 역할정보에서 새로운 역할 정보를 제거
      removedrole = removedrole.replace(",", "");
      let role = guild.roles.cache.get(removedrole); // 역할 정보를 id로 가져옴
      const removeRoleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("BBAGUI LOGGER")
        .setDescription("MEMBER ROLE REMOVE")
        .addFields(
          {
            name: "멤버",
            value: `${oldMember.user.username}#${oldMember.user.discriminator}`,
          },
          { name: "삭제된 역할", value: `${role}` }
        )
        .setTimestamp()
        .setFooter("by 라라라#6343"); //임베드
      return logChannel.send(removeRoleEmbed);
    } else if (oldMemberRoles.length < newMemberRoles.length) {
      const logChannel = guild.channels.cache.find(
        (channel) => channel.topic === "빠귀로그"
      );
      let addedRole = newMemberRoles.replace(oldMemberRoles, "");
      addedRole = addedRole.replace(",", "");
      let role = guild.roles.cache.get(addedRole);
      const addedRoleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("BBAGUI LOGGER")
        .setDescription("MEMBER ROLE ADD")
        .addFields(
          {
            name: "멤버",
            value: `${oldMember.user.username}#${oldMember.user.discriminator}`,
          },
          { name: "추가된 역할", value: `${role}` }
        )
        .setTimestamp()
        .setFooter("by 라라라#6343");
      return logChannel.send(addedRoleEmbed);
    } //이런 식으로
  },
}; // 이것들은 로거 기능
