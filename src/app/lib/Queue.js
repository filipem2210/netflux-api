const Queue = require('bull');
const Sentry = require('@sentry/node');
const redisConfig = require('../../config/redis');

const jobs = require('../jobs');

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, `redis://${redisConfig.host}:${redisConfig.port}`),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = queues.find((queueName) => queueName.name === name);

    return queue.bull.add(data, queue.options);
  },
  process() {
    return queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        Sentry.captureException(err);
      });
    });
  },
};
