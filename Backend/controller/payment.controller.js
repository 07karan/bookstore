import Razorpay from "razorpay";
import dotenv from "dotenv";
import { createInvoice } from "ez-invoice";
import { createWriteStream } from "fs";
import path from "path";
dotenv.config();

export const makePayment = async (req, res) => {
  try {
    // Extract the cart array from the request body
    const { cart,currency } = req.body;

    // Validate that the cart array is not empty
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Invalid or empty cart array" });
    }

    // Initialize an array to store the orders
    const orders = [];

    // Process each item in the cart array
    for (const item of cart) {
      // Extract required fields from the item
      const { id, name, price, currency,quantity } = item;

      // Calculate the amount in paisa
      const amt = price * 100;
      const amount=amt*quantity;

      // Create options object for Razorpay order creation
      const options = {
        amount,
        currency,
        receipt: id, // Use item ID as receipt ID
        payment_capture: 1,
      };
      console.log(options);

      // Create Razorpay instance with key_id and key_secret
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      // Create order using Razorpay instance and options
      const order = await instance.orders.create(options);

      // Check if order creation was successful
      if (!order) {
        return res
          .status(500)
          .json({ message: `Failed to generate order ID for item: ${name}` });
      }

      // Push the order to the orders array
      orders.push(order);
    }

    // Return success response with array of order details
    return res
      .status(200)
      .json({ message: "Order IDs generated successfully", orders });
  } catch (error) {
    // Handle any errors and return appropriate response
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


export const generateInvoice = async (req, res) => {
  const { name, price, currency, ReciptId } = req.body;
  const options = {
    storeName: "Bookstore",
    tax: 10,
    currency: currency,
    paymentMode: "card",
    location: "Pune",
    invoiceID: ReciptId,
  };

  let items = [
    {
      name: name,
      beforeTax: price,
    },
  ];

  const invoice = createInvoice(options, items);
  const pdfPath = `./invoices/${name}.png`; // Path where the PDF will be saved
  const pdfStream = invoice.png.pipe(createWriteStream(pdfPath));
  pdfStream.on("finish", () => {
    // Send the saved PDF file in the response
    res.status(200).json({message:"Invoice Created successfully..!!"});
  });
};


export const invoice= async(req, res) => {
  const filePath = path.join(__dirname, 'invoices', 'invoice.png');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'image/png');
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else {
    res.status(404).json({ message: 'Invoice not found' });
  }
}