const { getOrganizationData, } = require('./OrganizationData');
const response = require('../../common/response');


const getOrganization = async (req, res) => {
  const apiDescription = req.apiDescription;
  let code = 200;
  let responseMeta = {api_description: apiDescription, code: code};
  let meta;

  // Get organizationId.
  const {query: {id},} = req;

  try {
    const result = await getOrganizationData(id);

    // TODO:
    //  Refactor this code
    if (typeof result === {}) {
      return response.setResponse({meta, data: {}}, res);
    }

    // Send response to client.
    const data = {
      organization_id: result.id,
      organization_name: result.organization_name,
      domain: result.domain,
      created_by: result.created_by,
      created_date: result.created_date,
      updated_by: result.updated_by,
      updated_date: result.updated_date,
    };
    meta = {...responseMeta, code: code, message: 'Organization details.'};
    return response.setResponse({meta, data}, res);
  } catch (e) {
    console.log(e);
    return response.serverError(req, res);
  }
};

module.exports = {
  getOrganization,
};
