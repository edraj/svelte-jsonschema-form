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

const notificationSystemData = {
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

const adminNotificationData = {
    "title": "System Notification Request",
    "additionalProperties": false,
    "type": "object",
    "properties": {
        "msisdns": {
            "title": "Send To",
            "type": "array",
            "items": {
                "title": "MSISDN",
                "type": "string"
            }
        },
        "filter_rules": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            }
        },
        "scheduled_at": {
            "type": "integer",
            "format": "date-time"
        },
        "push_only": {
            "title": "Push Only",
            "description": "If marked as 'yes', the notification won't be stored for the user's future access",
            "type": "boolean",
            "default": false
        },
        "priority": {
            "type": "string",
            "enum": [
                "high",
                "medium",
                "low"
            ]
        },
        "status": {
            "type": "string",
            "enum": [
                "pending",
                "finished"
            ],
            "default": "pending"
        },
        "governorate": {
            "type": "object",
            "properties": {
                "shortname": {
                    "type": "string"
                },
                "sector_shortname": {
                    "type": "string"
                }
            },
            "required": []
        },
        "sender_id": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "types": {
            "title": "Send to",
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "web",
                    "mobile",
                    "sms"
                ]
            }
        }
    },
    "required": [
        "priority",
        "types"
    ]
};

const schemaFolderRenderingData = {
    "title": "Folder schema",
    "description": "Folder schema description",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "stream": {
            "title": "Enable websocket stream",
            "description": "folder level websocket watch",
            "type": "boolean"
        },
        "disable_filter": {
            "title": "Disable filter",
            "description": "The search filter icon / functionality is disabled",
            "type": "boolean"
        },
        "expand_children": {
            "title": "Expand folders' children",
            "description": "If the folder should expand children",
            "type": "boolean"
        },
        "append_subpath": {
            "title": "Append string to subpath",
            "type": "string"
        },
        "csv_columns": {
            "title": "CSV columns",
            "description": "CSV columns title",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "title": "Key",
                        "type": "string"
                    },
                    "name": {
                        "title": "Name",
                        "type": "string"
                    }
                }
            }
        },
        "search_columns": {
            "title": "Search columns",
            "description": "Search columns title",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "title": "Key",
                        "type": "string"
                    },
                    "name": {
                        "title": "Name",
                        "type": "string"
                    }
                }
            }
        },
        "enable_pdf_schema_shortnames": {
            "title": "List of schema shortnames for which pdf icon is displayed",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "workflow_shortnames": {
            "title": "Workflow shortname",
            "description": "workflow shortname field title",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "shortname_title": {
            "title": "shortname field title",
            "description": "shortname field title",
            "type": "string"
        },
        "query": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "subpath",
                        "search"
                    ]
                },
                "search": {
                    "type": "string"
                },
                "filter_types": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "icon": {
            "title": "folder main icon",
            "description": "The icon displayed next to the folder",
            "type": "string"
        },
        "icon_opened": {
            "title": "folder opened icon",
            "description": "The icon displayed next to the folder when opened",
            "type": "string"
        },
        "icon_closed": {
            "title": "folder closed icon",
            "description": "The icon displayed next to the folder when closed",
            "type": "string"
        },
        "sort_by": {
            "title": "sort by",
            "description": "the field name to be used in ordering",
            "type": "string"
        },
        "sort_type": {
            "title": "sort order",
            "description": "the ordering of the sort asc/desc",
            "type": "string",
            "enum": [
                "ascending",
                "descending"
            ]
        },
        "content_resource_types": {
            "title": "Resource types",
            "description": "Resource types",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "content_schema_shortnames": {
            "title": "schema shortname",
            "description": "schema shortnames",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "filter": {
            "title": "Additional filter options",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {}
            }
        },
        "index_attributes": {
            "title": "index attributes",
            "description": "the attributes from the schema that should be displayed in index page",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "title": "Key",
                        "type": "string"
                    },
                    "name": {
                        "title": "Name",
                        "type": "string"
                    }
                }
            },
            "uniqueItems": true
        },
        "unique_fields": {
            "title": "Unique Fields",
            "description": "List of list of composite fields which should be unique accross the folder entries",
            "type": "array",
            "items": {
                "title": "Composite unique list",
                "type": "array",
                "items": {
                    "title": "Field Name",
                    "type": "string"
                }
            }
        },
        "allow_view": {
            "title": "flag to enable or disable resource view inside this folder",
            "description": "flag to enable or disable resource view inside this folder",
            "type": "boolean"
        },
        "allow_create": {
            "title": "flag to enable or disable resource creation inside this folder",
            "description": "flag to enable or disable resource creation inside this folder",
            "type": "boolean"
        },
        "allow_create_category": {
            "title": "flag to enable or disable folder creation inside this folder",
            "description": "flag to enable or disable folder creation inside this folder",
            "type": "boolean"
        },
        "allow_update": {
            "title": "flag to enable or disable resource update inside this folder",
            "description": "flag to enable or disable resource update inside this folder",
            "type": "boolean"
        },
        "allow_delete": {
            "title": "flag to enable or disable resource delete inside this folder",
            "description": "flag to enable or disable resource delete inside this folder",
            "type": "boolean"
        },
        "allow_csv": {
            "title": "flag to enable or disable CSV download button",
            "description": "Allow the user to download csv of the displayed list",
            "type": "boolean"
        },
        "allow_upload_csv": {
            "title": "flag to enable or disable CSV upload feature",
            "description": "Allow the user to upload  csv",
            "type": "boolean"
        },
        "use_media": {
            "title": "does the content inside this folder has a media or not",
            "description": "does the content inside this folder has a media or not",
            "type": "boolean"
        }
    },
    "required": [
        "index_attributes"
    ]
}

const nestedArrayData = {
    "title": "Folder schema",
    "description": "Folder schema description",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "unique_fields": {
            "title":
                "Unique Fields",
            "description":
                "List of list of composite fields which should be unique accross the folder entries",
            "type":
                "array",
            "items":
                {
                    "title":
                        "Composite unique list",
                    "type":
                        "array",
                    "items":
                        {
                            "title":
                                "Field Name",
                            "type":
                                "string"
                        }
                }
        }
    }
}

export default [
    {
        name: "nested_array", schema: nestedArrayData as JSONSchema7, data: {}
    },
    {
        name: "folder_rendering", schema: schemaFolderRenderingData as JSONSchema7, data: {}
    },
    {
        name: "admin_notification", schema: adminNotificationData as JSONSchema7, data: {}
    },
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
