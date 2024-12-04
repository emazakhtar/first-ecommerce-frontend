export function updateReviewById(updatedReview) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/review/update/" + updatedReview.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(updatedReview),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchReviewByUserId(userId) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/review/user/" + userId, {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllReview() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/review/get", {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function createReview(reviewData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here

    const response = await fetch("/review/create/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(reviewData),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
