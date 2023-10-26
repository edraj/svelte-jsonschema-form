import type { JSONSchema7 } from "json-schema";
import type UISchema from "$lib/UISchema";
import simpleSchema from "../schemas/simple/schema.json";
import simpleData from "../schemas/simple/data.json";
import nestedSchema from "../schemas/nested/schema.json";
import nestedData from "../schemas/nested/data.json";
import arraysSchema from "../schemas/arrays/schema.json";
import arraysData from "../schemas/arrays/data.json";
import numbersSchema from "../schemas/numbers/schema.json";
import numbersData from "../schemas/numbers/data.json";
import referencesSchema from "../schemas/references/schema.json";
import referencesData from "../schemas/references/data.json";
import anyOfSchema from "../schemas/any-of/schema.json";
import anyOfData from "../schemas/any-of/data.json";
import allOfSchema from "../schemas/all-of/schema.json";
import allOfData from "../schemas/all-of/data.json";
import taxonomySchema from "../schemas/taxonomy/schema.json";
import taxonomyUISchema from "../schemas/taxonomy/uischema.json";
import taxonomyData from "../schemas/taxonomy/data.json"; 

export type TestSchema = {
  name: string;
  schema: JSONSchema7;
  uischema?: UISchema;
  data: { [prop: string]: any };
};


const milsimdata = {
  "type": "object",
  "title": "MILSIM",
  "properties": {
    "subrole": {
      "title": "Subrole",
      "type": "string"
    },
    "rank": {
      "title": "Rank",
      "type": "integer",
      "minimum": 1,
      "maximum": 50
    },
    "ex": {
      "title": "EX",
      "type": "boolean"
    },
    "wps": {
      "title": "WPS",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "subrole",
    "rank",
    "ex",
    "wps"
  ]
};

const notificationSystemData =  {
  "title": "System Notification Request",
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "on_space": {
      "title": "On Space",
      "type": "string"
    },
    "on_subpath": {
      "title": "On Subpath",
      "type": "string"
    },
    "on_action": {
      "title": "On Action",
      "type": "string",
      "enum": [
        "query",
        "view",
        "create",
        "update",
        "delete",
        "attach",
        "move",
        "progress_ticket"
      ]
    },
    "on_state": {
      "title": "On State",
      "type": "string"
    },
    "priority": {
      "title": "Priority",
      "type": "string",
      "enum": [
        "high",
        "medium",
        "low"
      ]
    },
    "types": {
      "title": "Priority",
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "web",
          "mobile",
          "sms"
        ]
      }
    },
    "deep_link": {
      "title": "Deep Link",
      "additionalProperties": false,
      "type": "object",
      "properties": {
        "dest": {
          "title": "Destination",
          "type": "string"
        }
      }
    }
  },
  "required": [
    "on_space",
    "on_subpath",
    "on_action",
    "priority"
  ]
};

export default [
  {
    name: "system_notification", schema: notificationSystemData as JSONSchema7, data: {}
  },
  {
    name: "milsom", schema: milsimdata as JSONSchema7, data: {}
  },
  {
    name: "Any Of",
    schema: <unknown>anyOfSchema as JSONSchema7,
    data: anyOfData
  },
  {
    name: "Nested",
    schema: nestedSchema as JSONSchema7,
    data: nestedData
  },
  {
    name: "Simple",
    schema: simpleSchema as JSONSchema7,
    data: simpleData
  },

  {
    name: "Arrays",
    schema: arraysSchema as JSONSchema7,
    data: arraysData
  },
  {
    name: "Numbers",
    schema: numbersSchema as JSONSchema7,
    data: numbersData
  },
  {
    name: "References",
    schema: referencesSchema as JSONSchema7,
    data: referencesData
  },
  {
    name: "All Of",
    schema: <unknown>allOfSchema as JSONSchema7,
    data: allOfData
  },
  {
    name: "Taxonomy",
    schema: taxonomySchema,
    uischema: taxonomyUISchema,
    data: taxonomyData
  }
] as TestSchema[];
