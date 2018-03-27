const config = require('../config');
const { util, tokenStore } = require('../common');
// 初始化账户Service
const DefaultAccountService = require('../services/DefaultAccountService');

const accountService = new DefaultAccountService();

const doLogin = async ctx => {
  const { body } = ctx.request;
  const user = await accountService.doLogin(body.username, body.pasword);
  const token = util.buildToken();
  tokenStore.set(token, user);
  ctx.body = user;
};

const doAutoLogin = async ctx => {
  const token = ctx.headers['x-token'];
  if (token) {
    const user = tokenStore.get(token);
    if (user) {
      return (ctx.body = user);
    }
  }
  ctx.status = 401;
  ctx.body = true;
};

module.exports = {
  doLogin,
  doAutoLogin
};
