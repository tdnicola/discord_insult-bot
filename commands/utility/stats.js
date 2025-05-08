const { SlashCommandBuilder } = require('discord.js');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get overall usage stats for all commands.'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await pool.query(`
        SELECT
          COALESCE(SUM(insult_given), 0) AS total_insults,
          COALESCE(SUM(praise_given), 0) AS total_praises,
          COALESCE(SUM(gif_posted), 0) AS total_gifs,
          COALESCE(SUM(moo_made), 0) AS total_moos,
          COALESCE(SUM(eightball_asked), 0) AS total_8balls,
          COALESCE(SUM(dadjoke_told), 0) AS total_dadjokes,
          COALESCE(SUM(thank_given), 0) AS total_thanks
        FROM user_stats;
      `);

      const row = res.rows[0];

      const reply = `**Bot Stats**\n` +
        `Total insults: ${row.total_insults}\n` +
        `Total praises: ${row.total_praises}\n` +
        `Total GIFs used: ${row.total_gifs}\n` +
        `Total moos: ${row.total_moos}\n` +
        `Total 8balls: ${row.total_8balls}\n` +
        `Total dadjokes: ${row.total_dadjokes}\n` +
        `Total thanks given: ${row.total_thanks}`;

      await interaction.editReply(reply);
    } catch (err) {
      console.error('❌ Error fetching stats:', err.message);
      await interaction.editReply('Failed to retrieve stats. Please try again later.');
    }
  },
};
