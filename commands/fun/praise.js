const { request } = require(`undici`);
const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`praise`)
        .setDescription(`Hey you're pretty cool.`)
        .addUserOption((option) =>
            option.setName(`user`).setDescription(`Let's be nice to people`)
        ),
    async execute(interaction) {
        
        function generate_random_compliment(){
            adjectives = [`amazing`
                ,`awesome`
                ,`outstanding`
                ,`fantastic`
                ,`incredible`
                ,`exceptional`
                ,`remarkable`
                ,`wonderful`
                ,`phenomenal`
                ,`extraordinary`
                ,`terrific`
                ,`impressive`
                ,`marvelous`
                ,`magnificent`
                ,`outstanding`
                ,`excellence`
                ,`superb`
                ,`splendid`
                ,`admirable`
                ,`spectacular`
                ,`fabulous`
                ,`brilliant`
                ,`genius`
                ,`stellar`
                ,`first-rate`
                ,`dazzling`
                ,`breathtaking`
                ,`awe-inspiring`
                ,`exemplary`
                ,`peerless`
                ,`unparalleled`
                ,`top-notch`
                ,`grand`
                ,`majestic`
                ,`supreme`
                ,`noble`
                ,`distinguished`
                ,`virtuoso`
                ,`masterful`
                ,`unrivaled`
                ,`sensational`
                ,`world-class`
                ,`unbeatable`
                ,`exceptionally talented`
                ,`striking`
                ,`classy`
                ,`resplendent`
                ,`splendiferous`
                ,`eminent`
                ,`radiant`
            ]
            nouns = [`achievements`
                ,`accomplishments`
                ,`excellence`
                ,`success`
                ,`triumph`
                ,`victory`
                ,`mastery`
                ,`brilliance`
                ,`talent`
                ,`expertise`
                ,`skill`
                ,`creativity`
                ,`innovation`
                ,`leadership`
                ,`influence`
                ,`charisma`
                ,`kindness`
                ,`generosity`
                ,`compassion`
                ,`wisdom`
                ,`intelligence`
                ,`insight`
                ,`empathy`
                ,`patience`
                ,`dedication`
                ,`commitment`
                ,`diligence`
                ,`resilience`
                ,`positivity`
                ,`optimism`
                ,`endurance`
                ,`fortitude`
                ,`integrity`
                ,`honesty`
                ,`sincerity`
                ,`trustworthiness`
                ,`loyalty`
                ,`support`
                ,`encouragement`
                ,`inspiration`
                ,`motivation`
                ,`enthusiasm`
                ,`spirit`
                ,`courage`
                ,`determination`
                ,`perseverance`
                ,`tenacity`
                ,`happiness`
                ,`joy`
            ]
            var adjective = adjectives[Math.floor(Math.random()*adjectives.length)];
            var noun = nouns[Math.floor(Math.random()*nouns.length)];
            var noun2 = nouns[Math.floor(Math.random()*nouns.length)];
        
            sentence_options = [`Your ${noun} is a shining example of ${adjective} ${noun}.`
                ,`Your ${noun} embodies ${adjective} ${noun2} at its finest.`
                ,`Your ${noun} reflects your ${adjective} ${noun2} brilliantly.`
                ,`You've achieved ${adjective} ${noun} through your hard work.`
                ,`Your ${noun} demonstrates your ${adjective} ${noun2} remarkably.`
                ,`Your ${noun} showcases your ${adjective} ${noun2} beautifully.`
                ,`Your ${noun} is a testament to your ${adjective} ${noun2}.`
                ,`Your ${noun} displays your ${adjective} ${noun2} with pride.`
                ,`You possess an ${adjective} ${noun2} that inspires others.`
                ,`Your ${noun} is evidence of your ${adjective} ${noun2} nature.`
                ,`You bring ${adjective} ${noun} to everything you do.`
                ,`Your ${noun} reflects your ${adjective} ${noun2} qualities.`
                ,`Your ${noun} is a source of ${adjective} ${noun2}.`
                ,`Your ${noun} is a true example of ${adjective} ${noun2}.`
                ,`You've achieved ${adjective} ${noun2} through dedication.`
                ,`Your ${noun} radiates ${adjective} ${noun2} to those around you.`
                ,`You inspire with your ${adjective} ${noun} ${noun2}.`
                ,`Your ${noun} is filled with ${adjective} ${noun2}.`
                ,`Your ${noun} is a symbol of ${adjective} ${noun2}.`
                ,`Your ${noun} is a reminder of your ${adjective} ${noun2}.`
            ]
        
            compliment =sentence_options[Math.floor(Math.random()*sentence_options.length)];
            return compliment }
        

        await interaction.deferReply();
        const message = await interaction.editReply(
            `${
                interaction.options.getUser(`user`) ?? interaction.user
            } ${generate_random_compliment()}`
        );
        message.react(`🙏`);
        /*
        	if (commandName === 'react') ${
		const message = await interaction.reply(${ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
        */
    },
};
