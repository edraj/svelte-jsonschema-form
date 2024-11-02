<script lang="ts">
    import SchemaForm, {type ValidationError} from "$lib";
    import type {JSONSchema7} from "json-schema";


    // const sample = {
    //     "type": "object",
    //     "title": "title",
    //     "properties": {
    //         "oodi_mobile": {
    //             "type": "string",
    //             "title": "",
    //             "description": ""
    //         },
    //         "user_shortname": {
    //             "type": "string",
    //             "title": "",
    //             "description": ""
    //         },
    //         "plan_shortname": {
    //             "type": "string",
    //             "title": "",
    //             "description": ""
    //         },
    //         "tracking_id": {
    //             "type": "string",
    //             "title": "",
    //             "description": ""
    //         },
    //         "addons": {
    //             "type": "array",
    //             "items": {
    //                 "type": "string"
    //             },
    //             "title": "",
    //             "description": ""
    //         },
    //         "high5": {
    //             "type": "boolean",
    //             "title": "",
    //             "description": ""
    //         },
    //         "delivery": {
    //             "type": "object",
    //             "properties": {
    //                 "requested_date": {
    //                     "type": "string",
    //                     "title": "",
    //                     "description": ""
    //                 },
    //                 "scheduled_date": {
    //                     "type": "string",
    //                     "title": "",
    //                     "description": ""
    //                 },
    //                 "method": {
    //                     "type": "string",
    //                     "enum": [
    //                         "store_pickup",
    //                         "home"
    //                     ],
    //                     "title": "",
    //                     "description": ""
    //                 },
    //                 "store_shortname": {
    //                     "type": "string",
    //                     "title": "",
    //                     "description": ""
    //                 },
    //                 "address": {
    //                     "type": "object",
    //                     "properties": {
    //                         "city": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "governorate_shortname": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "district_shortname": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "apartment": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "building": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "street": {
    //                             "type": "string",
    //                             "title": "",
    //                             "description": ""
    //                         },
    //                         "location": {
    //                             "type": "object",
    //                             "properties": {
    //                                 "latitude": {
    //                                     "type": "number",
    //                                     "title": "",
    //                                     "description": ""
    //                                 },
    //                                 "longitude": {
    //                                     "type": "number",
    //                                     "title": "",
    //                                     "description": ""
    //                                 }
    //                             },
    //                             "title": "",
    //                             "description": ""
    //                         }
    //                     },
    //                     "title": "",
    //                     "description": ""
    //                 }
    //             },
    //             "title": "",
    //             "description": ""
    //         },
    //         "iccid": {
    //             "type": "string",
    //             "title": "",
    //             "description": ""
    //         }
    //     },
    //     "description": ""
    // }
    //
    // const data = {
    //     "addons": [
    //         "123",
    //         "123",
    //         "123",
    //         "123"
    //     ],
    //     "oodi_mobile": "qwe",
    //     "user_shortname": "qwe",
    //     "plan_shortname": "qwe",
    //     "tracking_id": "qwe",
    //     "iccid": "xcv"
    // }

    // const sample = {
    //     "type": "object",
    //     "title": "title",
    //     "description": "",
    //     "properties": {
    //         "one": {
    //             "type": "number",
    //             "title": "one",
    //             "description": ""
    //         },
    //         "two": {
    //             "type": "array",
    //             "title": "two",
    //             "description": "",
    //             "items": {
    //                 "type": "object",
    //                 title: "Dates",
    //                 "properties": {
    //                     "two_one": {
    //                         "type": "string",
    //                         "title": "two 1",
    //                         "description": ""
    //                     },
    //                     // "two_a": {
    //                     //     "type": "array",
    //                     //     "title": "two_a",
    //                     //     "description": "",
    //                     //     "items": {
    //                     //         "properties": {
    //                     //             "two_aa": {
    //                     //                 "type": "string",
    //                     //                 "title": "two_aa",
    //                     //                 "description": ""
    //                     //             }
    //                     //         }
    //                     //     }
    //                     // }
    //                 }
    //             }
    //         },
    //         "three": {
    //             "type": "object",
    //             "title": "three",
    //             "description": "",
    //             "properties": {
    //                 "three_a": {
    //                     "type": "string",
    //                     "title": "three_a",
    //                     "description": ""
    //                 },
    //                 "three_b": {
    //                     "type": "string",
    //                     "title": "",
    //                     "description": ""
    //                 }
    //             }
    //         },
    //         "four": {
    //             "type": "string",
    //             "title": "four",
    //             "description": ""
    //         },
    //         "five": {
    //             "type": "string",
    //             "title": "five",
    //             "description": ""
    //         }
    //     }
    // }

    // const sample: any = {
    //     "type": "object",
    //     "title": "title",
    //     "description": "",
    //     "properties": {
    //         "qwe": {
    //             "type": "string",
    //             "title": "QWE",
    //             "description": ""
    //         },
    //         "asd": {
    //             "type": "number",
    //             "title": "ASD",
    //             "description": ""
    //         },
    //         "zxc": {
    //             "type": "integer",
    //             "title": "ZXC",
    //             "description": ""
    //         },
    //         "wer": {
    //             "type": "boolean",
    //             "title": "WER",
    //             "description": ""
    //         },
    //         "ert": {
    //             "type": "array",
    //             "title": "ERT",
    //             "description": "",
    //             "items": {
    //                 "type": "array",
    //                 "title": "ERT items",
    //                 "properties": {
    //                     "qwe1": {
    //                         "type": "string",
    //                         "title": "QWE1",
    //                         "description": ""
    //                     },
    //                     "asd1": {
    //                         "type": "number",
    //                         "title": "ASD1",
    //                         "description": ""
    //                     }
    //                 },
    //                 "type": "object"
    //             },
    //             "required": [
    //                 "asd1",
    //                 "qwe1"
    //             ],
    //             "properties": {
    //                 "undefined": {
    //                     "type": "number",
    //                     "title": "ASD1",
    //                     "description": ""
    //                 }
    //             },
    //             "uniqueItems": false
    //         }
    //     },
    //     "required": [
    //         "ert",
    //         "wer",
    //         "zxc",
    //         "asd",
    //         "qwe"
    //     ]
    // }
    //

    const sample: any = {
        "type": "object",
        "title": "Title",
        "description": "",
        "properties": {
            "subject": {
                "type": "string",
                "title": "Subject",
                "description": "Subject"
            },
            "user": {
                "type": "string",
                "title": "User",
                "description": "User"
            },
            "is_urgent": {
                "type": "boolean",
                "title": "is urgent",
                "description": "is urgent"
            },
            "incidents ": {
                "type": "array",
                "title": "Incidents",
                "description": "",
                "items": {
                    "type": "object",
                    "properties": {
                        "incident": {
                            "type": "object",
                            "title": "incident",
                            "properties": {
                                "cause": {
                                    "type": "string",
                                    "title": "Cause",
                                    "description": ""
                                },
                                "doer": {
                                    "type": "string",
                                    "title": "Doer",
                                    "description": ""
                                }
                            }
                        }
                    },
                }
            }
        }
    }
    const data = {}
</script>

<SchemaForm ref={null} schema={sample} {data} />
