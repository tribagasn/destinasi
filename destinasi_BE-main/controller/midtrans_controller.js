const { snap } = require('../utils/midtrans');

const getTokenMidtrans = async (req, res) => {
    try {
        const reqBody = req.body;

        const transactionDetails = {
            transaction_details: {
                order_id: reqBody.order_id,
                gross_amount: reqBody.gross_amount
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: reqBody.first_name,
                last_name: reqBody.last_name,
                email: reqBody.email,
                phone: reqBody.phone
            }
        };

        // Mengambil token transaksi dari Midtrans
        const transactionToken = await snap.createTransaction(transactionDetails);

        res.send({ data: transactionToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getTokenMidtrans };
