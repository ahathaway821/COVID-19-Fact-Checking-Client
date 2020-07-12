import axios from "axios";

const feedbackTypes = {
    userQuery: "user_query",
    userFeedback: "user_feedback"
};

const submitFeedback = (claim, isValidatedClaim, type, reason='', isAccurate='') => {
    const config = {
        headers: {
          'x-api-key': 'Atw9UJtWiftiOggtm5HnauIs2lzQXsI4yzpUwTmf',
          'Content-Type': 'application/json'
        }
      }

    const data = {
        claim: claim,
        isValidatedClaim: isValidatedClaim,
        type: type,
        reason: reason,
        isAccurate: isAccurate
    }
    return axios.post(`https://2y9p1y6tr3.execute-api.us-west-2.amazonaws.com/Prod`, data, config);
}

export { submitFeedback, feedbackTypes };