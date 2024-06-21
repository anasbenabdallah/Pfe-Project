const { loadData, prepareData, trainAndSaveModel } = require("./dataloader");

async function main() {
  await loadData();
  const { featureTensor, labelTensor } = prepareData();
  await trainAndSaveModel(featureTensor, labelTensor);
}

main().catch(console.error);
