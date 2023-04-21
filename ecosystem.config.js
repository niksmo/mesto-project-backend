const path = require('path');

const envDeployPath = path.resolve(process.cwd(), '.env.deploy');
require('dotenv').config({ path: envDeployPath });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH } = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-api',
      script: './dist/app.js',
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:NikolaySmolov/mesto-project-backend.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
