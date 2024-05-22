const init = {
  challenges: [],
  companyChallenges: [],
  userChallenges: [],
  challengeUsers: [],
  success: false,
  error: null,
};

export const selectChallenges = (state) => state.Challenge.challenges;
export const selectCompanyChallenges = (state) =>
  state.Challenge.companyChallenges;
export const selectUserChallenges = (state) => state.Challenge.userChallenges;

export const selectChallengeUsers = (state) => state.Challenge.challengeUsers;
export const selectError = (state) => state.Challenge.error;
export const selectSuccess = (state) => state.Challenge.success;

const ChallengesReducer = (state = init, action) => {
  switch (action.type) {
    case "get_challenges_success":
      return {
        ...state,
        challenges: action.payload,
        success: false,
        error: null,
      };
    case "delete_challenge_success":
      const updatedUserChallenges = state.companyChallenges.filter(
        (challenge) => challenge._id !== action.payload.challenge._id
      );
      return {
        ...state,
        companyChallenges: updatedUserChallenges,
        success: false,
        error: null,
      };
    case "get_company_challenges_success":
      console.log(action.payload);
      return {
        ...state,
        companyChallenges: action.payload,
        error: null,
      };
    case "get_user_challenges_success":
      console.log(action.payload.challenges);
      return {
        ...state,
        userChallenges: action.payload.challenges,
        error: null,
      };
    case "add_challenge_success":
      return {
        ...state,
        challenges: [...state.challenges, action.payload],
        success: true,
        error: null,
      };
    case "join_challenge_success":
      return {
        ...state,
        challengeUsers: [...state.challengeUsers, action.payload],
        error: null,
      };
    case "winner_challenge_success":
      return {
        ...state,
        error: null,
      };
    case "unjoin_challenge_success":
      return {
        ...state,
        challengeUsers: [
          ...state.challengeUsers.filter((user) => user._id !== action.payload),
        ],
        error: null,
      };
    case "submit_challenge_success":
      return {
        ...state,
        error: null,
      };
    case "get_user_submit_success":
      return {
        ...state,
        error: null,
      };
    case "get_challenge_users_success":
      if (
        JSON.stringify(state.challengeUsers) === JSON.stringify(action.payload)
      ) {
        console.log(true);
        // The challengeUsers array hasn't changed, no need to update state
        return {
          ...state,
          error: null,
        };
      } else {
        console.log(false);
        // The challengeUsers array has changed, update state
        return {
          ...state,
          challengeUsers: action.payload,
          error: null,
        };
      }
    case "get_challenges_error":
    case "add_challenge_error":
    case " get_company_challenges_error":
    case " join_challenge_error":
    case " unjoin_challenge_error":
    case " submit_challenge_error":
    case "get_challenge_users_error":
    case "get_user_submit_error":
    case "get_user_challenges_error":
    case "delete_challenge_error":
    case "winner_challenge_error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ChallengesReducer;
