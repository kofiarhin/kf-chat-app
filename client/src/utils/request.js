export const checkUser = async (username) => {
  try {
    const res = await fetch(`/checkUser`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
