const tf = require("@tensorflow/tfjs");
const csv = require("csvtojson");
require("tfjs-node-save");
const fs = require("fs");

const numPredictions = 3;
const predictions = [];

async function sortappliers(users) {
  // Load and preprocess data
  const data = await csv().fromFile("./tensorflow/Data.csv");
  const inputs = data.map((d) => [
    parseFloat(d["Years Registered"]),
    parseFloat(d["Challenges Done"]),
  ]);
  console.log(inputs);
  const labels = data.map((d) => parseFloat(d["Job Fit Score"]));
  const inputTensor = tf.tensor2d(inputs);
  const inputMin = inputTensor.min(0);
  const inputMax = inputTensor.max(0);
  const normalizedInputs = inputTensor
    .sub(inputMin)
    .div(inputMax.sub(inputMin));

  const labelTensor = tf.tensor1d(labels);

  // Define and train the model
  const predictions = await Promise.all(
    users.map(async (user, index) => {
      let predictionssum = 0;
      for (let i = 0; i < numPredictions; i++) {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
        await model.fit(normalizedInputs, labelTensor, { epochs: 100 });

        // Use the model to make predictions

        const prediction = model.predict(
          tf.tensor2d([[user.yearsRegistered, user.challengesDone]])
        );
        predictionssum = predictionssum + prediction.dataSync()[0];
      }
      console.log(`Predicted job score: ${index}  ${predictionssum}`);
      return { ...user.toObject(), jobScore: predictionssum };
    })
  );
  // Sort users by job score
  const sortedPredictions = predictions.sort((a, b) => b.jobScore - a.jobScore);
  console.log("test", sortedPredictions);
  return sortedPredictions;
}

module.exports = { sortappliers };
