App.get("/", async (req, res) => {
  let prompt = req.query.prompt;
  let data = await gemniresponse(prompt);
  res.send(data);
  console.log("data" + data);
});
