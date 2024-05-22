import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AdminReducer from "./AdminReducer";
import SocialPostReducer from "./SocialPostReducer";
import UserProfileReducer from "./userProfileReducer";
import CompanyProfileReducer from "./companyProfileReducer";
import ChallengeReducer from "./ChallengeReducer";
import ConversationReducer from "./ConversationReducer";
import MessageReducer from "./MessageReducer";
import UserReducer from "./UserReducer";
import ReviewReducer from "./ReviewReducer";

import CategoryReducer from "./CategoryReducer";
import CommentReducer from "./CommentReducer";

export const RootReducer = combineReducers({
  Auth: AuthReducer,
  Admin: AdminReducer,
  userProfile: UserProfileReducer,
  posts: SocialPostReducer,
  CompanyProfile: CompanyProfileReducer,
  Challenge: ChallengeReducer,
  Conversation: ConversationReducer,
  Message: MessageReducer,
  User: UserReducer,
  Review: ReviewReducer,

  Category: CategoryReducer,
  Comment: CommentReducer,
});

export default RootReducer;
