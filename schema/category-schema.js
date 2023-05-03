export const categorySingleSchema = 
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Schema for single category result",
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "count": {
      "type": "number"
    },
    "description": {
      "type": "string"
    },
    "link": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "slug": {
      "type": "string"
    },
    "taxonomy": {
      "type": "string"
    },
    "parent": {
      "type": "number"
    },
    "meta": {
      "type": "array",
      "items": {}
    },
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "href": {
                "type": "string"
              }
            },
            "required": [
              "href"
            ]
          }
        },
        "collection": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "href": {
                "type": "string"
              }
            },
            "required": [
              "href"
            ]
          }
        },
        "about": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "href": {
                "type": "string"
              }
            },
            "required": [
              "href"
            ]
          }
        },
        "wp:post_type": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "href": {
                "type": "string"
              }
            },
            "required": [
              "href"
            ]
          }
        },
        "curies": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "href": {
                "type": "string"
              },
              "templated": {
                "type": "boolean"
              }
            },
            "required": [
              "name",
              "href",
              "templated"
            ]
          }
        }
      },
      "required": [
        "self",
        "collection",
        "about",
        "wp:post_type",
        "curies"
      ]
    }
  },
  "required": [
    "id",
    "count",
    "description",
    "link",
    "name",
    "slug",
    "taxonomy",
    "parent",
    "meta",
    "_links"
  ]
}