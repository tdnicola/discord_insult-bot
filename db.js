const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT to_regclass(\'public.user_stats\') AS table_exists;');
    if (result.rows[0].table_exists === 'user_stats') {
      console.log('✅ Connected to DB and found user_stats table.');
    } else {
      console.log('⚠️ Connected to DB, but user_stats table does not exist.');
    }
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
  } 
}


async function updateUserAction(userId, username, fieldPrefix) {
  const countField = `${fieldPrefix}`;
  const timeField = `last_${fieldPrefix}`;

  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO user_stats (user_id, username, ${countField}, ${timeField})
      VALUES ($1, $2, 1, NOW())
      ON CONFLICT (user_id) DO UPDATE
      SET
        username = EXCLUDED.username,
        ${countField} = user_stats.${countField} + 1,
        ${timeField} = NOW();
    `, [userId, username]);
  } catch (err) {
    console.error(`❌ DB error updating ${fieldPrefix}:`, err.message);
  } finally {
    client.release();
  }
}


async function updateInteractionStats(senderId, senderName, targetId, targetName, prefix) {
  const senderCount = `${prefix}_given`;
  const targetCount = `${prefix}_received`;
  const senderTime = `last_${prefix}_given`;
  const targetTime = `last_${prefix}_received`;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Sender
    await client.query(`
      INSERT INTO user_stats (user_id, username, ${senderCount}, ${senderTime})
      VALUES ($1, $2, 1, NOW())
      ON CONFLICT (user_id) DO UPDATE
      SET
        username = EXCLUDED.username,
        ${senderCount} = user_stats.${senderCount} + 1,
        ${senderTime} = NOW();
    `, [senderId, senderName]);

    // Target
    if (targetId !== senderId) {
      await client.query(`
        INSERT INTO user_stats (user_id, username, ${targetCount}, ${targetTime})
        VALUES ($1, $2, 1, NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET
          username = EXCLUDED.username,
          ${targetCount} = user_stats.${targetCount} + 1,
          ${targetTime} = NOW();
      `, [targetId, targetName]);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`❌ DB error updating ${prefix} stats:`, err.message);
  } finally {
    client.release();
  }
}


module.exports = { testConnection, updateInteractionStats, updateUserAction};
