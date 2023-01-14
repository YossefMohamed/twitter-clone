import mongoose, { ObjectId, PopulatedDoc } from "mongoose";
import { IMessage } from "./messageSchema";
import { IPost } from "./postSchema";
import { IUser } from "./userSchema";

const Schema = mongoose.Schema;

interface INotification extends mongoose.Document {
  userTo: PopulatedDoc<IUser>;
  userFrom: PopulatedDoc<IUser>;
  opened: boolean;
  notificationType: string;
  entityId: PopulatedDoc<IUser | IPost | IMessage>;
}

interface INModel extends mongoose.Model<IUser> {
  insertNotification(notificationData: {
    userTo: ObjectId;
    userFrom: ObjectId;
    notificationType: string;
    entityId: ObjectId;
  }): INotification;
}

const notificationSchema: mongoose.Schema<INotification> =
  new mongoose.Schema<INotification>(
    {
      userTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      userFrom: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      opened: {
        type: Boolean,
        default: false,
      },
      notificationType: {
        type: String,
      },
      entityId: {
        type: Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

// statics accessed directly from the Model
notificationSchema.statics.insertNotification = async (notificationData: {
  userTo: ObjectId;
  userFrom: ObjectId;
  notificationType: string;
  entityId: ObjectId;
}) => {
  await Notification.deleteOne(notificationData);
  return Notification.create(notificationData);
};

const Notification = mongoose.model<INotification, INModel>(
  "Notification",
  notificationSchema
);
export default Notification;
