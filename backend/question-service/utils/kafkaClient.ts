import { getSuitableQuestion } from "../controllers/questionsController";
import { Kafka } from "kafkajs";

const HOST = process.env.KAFKA_HOST || "localhost";
const PORT = process.env.KAFKA_PORT || "9092";

const kafka = new Kafka({
    clientId: "question-service",
    brokers: [`${HOST}:${PORT}`],
});

export const MATCH_TOPIC = "match_topic";
export const QUESTION_TOPIC = "question_topic";

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "question-service-group" });

async function initKafka() {
    await producer.connect();
    await consumer.connect();
}

export async function setUpKafkaSubscribers() {
    await initKafka();

    await consumer.subscribe({ topic: MATCH_TOPIC, fromBeginning: true });
    await consumer.run({
        eachMessage: getSuitableQuestion,
    });
}