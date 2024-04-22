import { atom } from "jotai"
import { CustomerData } from "./Customer";

/**
 * Defines queue data
 */
export interface QueueData{
    customers: CustomerData[]
}

/**
 * Defines queues for cashiers
 */
const queueList = atom<QueueData[]>([
    {customers: []},
    {customers: []},
    {customers: []},
]);

export default queueList;