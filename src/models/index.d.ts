import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Appliance {
  readonly id: string;
  readonly appliance_name: string;
  readonly appliance_status?: string;
  constructor(init: ModelInit<Appliance>);
  static copyOf(source: Appliance, mutator: (draft: MutableModel<Appliance>) => MutableModel<Appliance> | void): Appliance;
}