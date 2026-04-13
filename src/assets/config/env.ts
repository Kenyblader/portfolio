const env = {
  API: process.env.REACT_APP_API || 'API non défini',
  VISIT_KEY: process.env.REACT_APP_VISIT_KEY || 'VISIT_KEY non défini',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'TOKEN_KEY non défini',
  SERVICE_ID: process.env.REACT_APP_SERVICE_ID || 'SERVICE_ID non défini',
  TEMPLATE_ID: process.env.REACT_APP_TEMPLATE_ID || 'TEMPLATE_ID non défini',
  PUBLIC_KEY: process.env.REACT_APP_PUBLIC_KEY || 'PUBLIC_KEY non défini',
};
console.log('Env variables:', env);
export default env;
