// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Appliance } = initSchema(schema);

export {
  Appliance
};