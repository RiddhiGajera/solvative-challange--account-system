const { addAccount } = require('../dao/account-dao');

module.exports = async (req, res, next) => {
    const { username, type, amount } = req.body;
    const accountInfo = {
        username,
        type,
        amount
    }
    const account = await addAccount(accountInfo);
    const response = { message: 'Account added successfuly', data: account};
    if (account) {
        res.status(200).send(response);
    } else {
        res.status(500).send({ message: 'Something went wrong'});
    }
    
};