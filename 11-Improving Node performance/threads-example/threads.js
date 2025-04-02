const { isMainThread, workerData, Worker } = require("worker_threads");

if (isMainThread) {
  console.log(`WORKER id:${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 42, 2],
  });
  new Worker(__filename, {
    workerData: [1, 30, 9, 8],
  });
} else {
  console.log(`WORKER id:${process.pid}`);
  console.log(`${workerData} sorted is ${workerData.sort((a, b) => a - b)}`);
}
