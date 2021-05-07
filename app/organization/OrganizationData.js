const db = require('../../common/dbpg');


const getOrganizationData = async (organizationId) => {
  const sqlStatement = `
    SELECT id, organization_name, domain, created_by, created_date, updated_by, updated_date
    FROM auth.organization 
    WHERE id = $1
  `;
  const value = [organizationId];

  console.log('query:', sqlStatement);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_USERNAME:', process.env.DB_USERNAME);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

  try {
    console.log('connecting to the database ...');
    const response = await db.pool.query(sqlStatement, value);
    const result = response.rows[0];
    console.log('database result:\n', JSON.stringify(result, null, 4));

    if (typeof result === 'undefined') {
      return {}
    }
    return result;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

module.exports = {
  getOrganizationData,
};