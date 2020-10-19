const mongoose = require('mongoose');
const { AccountSchemaModel } = require('../model/account-model');

module.exports.addAccount = async (accountData) => {
    try {
        accountData.transferedAt = 0;
        return account = await new AccountSchemaModel(accountData).save();
    } catch (error) {
        return undefined;
    }
}

module.exports.transferMoney = async (transferObj) => {
    timestamp = + new Date();
    const response = {}
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const from = await AccountSchemaModel.findOne({ _id: transferObj.fromAccountId}).select('amount');
        const to = await AccountSchemaModel.findOne({ _id: transferObj.toAccountId}).select('amount');
        let fromAmount = from.amount;
        let toAmount = to.amount + transferObj.amount;
        console.log('fromAmount: ', fromAmount, 'toamount: ', typeof(toAmount));
        if (transferObj.amount > fromAmount) {
            response.errorCode = 400;
            response.errorMessage = 'Transaction failed!!, Source account do not have the sufficient amount';
        } else if (transferObj.type === 'BasicSavings' && toAmount > 50000) {
            response.errorCode = 400;
            response.errorMessage = 'Transaction failed!!, Destination account is exceeding the amount limit 50,000';
        }else {
            fromAmount = fromAmount - transferObj.amount;
            const fromdata = await AccountSchemaModel.findByIdAndUpdate({ _id: transferObj.fromAccountId }, { amount: fromAmount, transferedAt: timestamp}, {options: { new: true }});
            const toData = await AccountSchemaModel.findByIdAndUpdate({ _id: transferObj.toAccountId}, { amount: toAmount, transferedAt: timestamp}, {options: { new: true }});
            
            response.newSrcBalance = fromAmount;
            response.totalDestBalance = toAmount,
            response.transferedAt = timestamp;
        }
        await session.commitTransaction();
        session.endSession();
        return response;
    } catch(error) {
        return response.errorCode = 400;
    }
}