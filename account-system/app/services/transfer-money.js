const { transferMoney } = require('../dao/account-dao');

module.exports = async (req, res, next) => {
    const { fromAccountId, toAccountId, amount } = req.body;
    const transferObj = {
        fromAccountId,
        toAccountId,
        amount,
    }
    const failedRes = {
        errorCode: '',
        errorMessage: ''
    };

    if (fromAccountId === toAccountId) {
        failedRes.errorCode = 400,
        failedRes.errorMessage = 'Transfer between accounts belonging to the same user is not allowed.'
        res.status(400).send(failedRes);
    } else {
        const response = await transferMoney(transferObj);
        console.log('response: ', response);
        if (response && response.errorCode && response.errorCode === 400) {
            res.status(400).send(response);
        } else {
            res.status(200).send(response);
        }
    }
    
};
