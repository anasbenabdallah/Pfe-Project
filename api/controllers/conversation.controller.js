const ConversationModel = require("../models/Conversation.model");
const MessageModel = require("../models/Message.model");
const UserModel = require("../models/user.model");

const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    console.log("dd", req.body);

    if (senderId === receiverId) {
      throw new Error("Cannot create conversation with yourself");
    }

    const existingConversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      throw new Error("Conversation already exists");
    }

    const newCoversation = new ConversationModel({
      members: [senderId, receiverId],
    });
    await newCoversation.save();
    const userId = req.body.senderId;
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    }).select("_id members");

    // Get the user details for each member of the conversation
    const conversationsWithUsers = await Promise.all(
      conversations.map(async (conversation) => {
        const membersWithDetails = await Promise.all(
          conversation.members.map(async (member) => {
            const user = await UserModel.findById(member);
            // Only include the other user in the conversation
            if (user._id.toString() !== userId) {
              return {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                picturePath: user.picturePath,
              };
            }
          })
        );
        // Remove any undefined members from the array
        const filteredMembers = membersWithDetails.filter(Boolean);

        // Get the latest message for the conversation
        const latestMessage = await MessageModel.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .populate("sender", "firstname lastname picturePath")
          .lean();

        // Set the latestMessage property for the member who is not the user
        filteredMembers.forEach((member) => {
          if (member.id.toString() !== userId && latestMessage) {
            member.latestMessage = latestMessage.message;
            member.createdAt = latestMessage.createdAt;
          }
        });

        return {
          conversationId: conversation._id,
          members: filteredMembers,
        };
      })
    );
    console.log("ddddddddddddddd", conversationsWithUsers);
    res.status(200).json(conversationsWithUsers);
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error.message);
  }
};

const getConversations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    }).select("_id members");

    // Get the user details for each member of the conversation
    const conversationsWithUsers = await Promise.all(
      conversations.map(async (conversation) => {
        const membersWithDetails = await Promise.all(
          conversation.members.map(async (member) => {
            const user = await UserModel.findById(member);
            // Only include the other user in the conversation
            if (user._id.toString() !== userId) {
              return {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                picturePath: user.picturePath,
              };
            }
          })
        );
        // Remove any undefined members from the array
        const filteredMembers = membersWithDetails.filter(Boolean);

        // Get the latest message for the conversation
        const latestMessage = await MessageModel.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .populate("sender", "firstname lastname picturePath")
          .lean();

        // Set the latestMessage property for the member who is not the user
        filteredMembers.forEach((member) => {
          if (member.id.toString() !== userId && latestMessage) {
            member.latestMessage = latestMessage.message;
            member.createdAt = latestMessage.createdAt;
          }
        });

        return {
          conversationId: conversation._id,
          members: filteredMembers,
        };
      })
    );

    res.status(200).json(conversationsWithUsers);
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createConversation,
  getConversations,
};
