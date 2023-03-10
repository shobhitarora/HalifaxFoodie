const {PubSub} = require('@google-cloud/pubsub');

// Instantiates a client
const pubsub = new PubSub();

exports.helloWorld = async (req, res) => {
  if (!req.body.topic || !req.body.restaurant_name || !req.body.customer_id || !req.body.chat_id || !req.body.order_id) {
    return res
      .status(400)
      .send(
        'Missing parameter(s).'
      );
    
  }

  console.log(`Publishing message to topic ${req.body.topic}`);

  // References an existing topic
  const topic = pubsub.topic(req.body.topic);

  const messageObject = {
    data: {
      restaurant_name : req.body.restaurant_name,
      customer_id : req.body.customer_id,
      chat_id : req.body.chat_id,
      order_id : req.body.order_id
    },
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');

  // Publishes a message
  try {
    await topic.publish(messageBuffer);
    res.status(200).send('Message published.');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
};

/** References
 * 1. https://cloud.google.com/functions/docs/samples/functions-pubsub-publish
 */