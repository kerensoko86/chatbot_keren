import { Collection, ObjectId } from "mongodb";
import * as db from "../db/db";
import { User } from "../interfaces/user.interface";
import { Message } from "../interfaces/message.interface";

let userCollection: Collection<User>;

export async function loadUserData(): Promise<User[]> {
  try {
    userCollection = await db.getCollection();
    const users = userCollection.find({}).toArray();
    return users;
  } catch (error: unknown) {
    console.error("Error loading user data:", error);
    throw error;
  }
}

export async function addUser(user: User): Promise<User> {
  try {
    userCollection = await db.getCollection();
    const newUser: User = {
      ...user,
      messages: [],
    };

    const result = await userCollection.insertOne(newUser);
    console.log("User added successfully");
    const insertedId = result.insertedId as ObjectId;

    return { ...newUser, _id: insertedId };
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export const addMessage = async (
  user: User,
  message: Message
): Promise<void> => {
  userCollection = await db.getCollection();
  const { _id } = user;
  const updatedUser = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $push: {
        messages: message,
      },
    },
    { returnDocument: "after" }
  );

  if (updatedUser) {
    const newMessage = updatedUser.messages.find(
      (m: Message) => m.messageId === message.messageId
    );
    console.log("newMessage", newMessage);

    if (newMessage) {
      console.log("New message added successfully:", newMessage);
    } else {
      console.error("New message not found in updated user");
    }
  } else {
    console.error("User not found or update failed");
  }
};

export const deleteAllusers = async () => {
  try {
    userCollection = await db.getCollection();
    await userCollection.deleteMany({});
    console.log("All users deleted successfully");
  } catch (error) {
    console.error("Error deleting all users:", error);
    throw error;
  }
};
