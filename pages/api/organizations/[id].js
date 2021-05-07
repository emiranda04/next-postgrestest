const { getOrganization, getOrganizationPosgresExample } = require('../../../app/organization/OrganizationController');
const response = require('../../../common/response');


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  return await fn(req, res);
};

const handler = async (req, res) => {
  const apiDescription = 'Get organization detail.';
  switch (req.method) {
    case 'GET':
      await getOrganization({...req, apiDescription}, res);
      break;
    default:
      response.methodNotAllowed({apiDescription}, res);
  }
};

module.exports = allowCors(handler);
