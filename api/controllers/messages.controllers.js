const MessageModel = require("../models/Message.model");

const createMessage = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  const newMessage = new MessageModel(req.body);
  console.log(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    })
      .populate("sender", "firstname picturePath") // join sender information
      .exec();

    // map messages to include sender and receiver information

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
